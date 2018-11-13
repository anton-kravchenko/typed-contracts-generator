// @flow
import EventEmitter from 'events';
import { NodeEmitContractMapping } from './nodeEmitterMapping';
import prettier from 'prettier';

// TODO: add tabulation
const TAB_SIZE = 2;

// FIXME: remove code styling (tabs, spacing, e.t.c) from emitter

type Hook = {
  nestingLevel: number,
  hook: (type: string) => boolean,
};

export class Emitter {
  tabsAmount: number = 0;

  nestingLevel: number = 0;

  result: string = '';

  preHooks: Array<Hook> = [];

  postHooks: Array<Hook> = [];

  append = (s: string): string => (this.result += s);

  cleanTailTrailingComasAndNewLines = (source: string): string => {
    while (true) {
      let lastChar = source[source.length - 1];
      if (lastChar === ',' || lastChar === '\n') {
        /* trailing coma */
        source = source.substr(0, source.length - 1);
      } else {
        break;
      }
    }
    return source;
  };

  extract = (): string => {
    this.result = this.cleanTailTrailingComasAndNewLines(this.result);
    if (
      this.result.substr(this.result.length - 4, this.result.length) !== "('')" &&
      this.result[this.result.length - 1] !== '{' &&
      this.result[this.result.length - 1] !== '('
    ) {
      this.result += "('')"; // Tailing call to generate validator func
    }

    // try {
    // FIXME: use prettier in a more smart way - prettier.resolveConfig
    // avoid passing object with options directly
    // FIXME: fix this No parser and no filepath given, using 'babylon' the parser now but this will throw an error in the future. Please specify a parser or a filepath so one can be inferred.
    const prettierConfig = {
      parser: 'babylon',
      singleQuote: true,
      tabWidth: 2,
      trailingComma: 'all',
      printWidth: 100,
    };
    return prettier.format(this.result, prettierConfig);
    // } catch (e) {
    // That's expected - some of the tests may produce not sintactically invalid js
    // return this.result;
    // }
  };

  reset = (): void => {
    this.result = '';
    this.tabsAmount = 0;
    this.preHooks = [];
    this.postHooks = [];
  };

  incrementTabsAmount = (): number => ++this.tabsAmount;

  decrementTabsAmount = (): number => --this.tabsAmount;

  addTab = (): void => {
    ++this.tabsAmount;
    this.append(this.tabulate());
  };

  deleteTab = (): void => {
    --this.tabsAmount;
    this.append(this.tabulate());
  };

  tabulate = (): string => {
    return ' '.repeat(this.tabsAmount * TAB_SIZE);
  };

  //  EMITTERS
  emitValType(type: string, varName: ?string) {
    if (type === 'boolean' || type === 'string' || type === 'number') {
      // TODO: add type NodeTag for type
      const m = NodeEmitContractMapping.get(type);
      if (m) {
        if (null != varName) {
          this.emitPrintTab('current');
          this.append(`"${varName}": ${m},\n`);
        } else {
          this.append(`${m},\n`);
        }
        return;
      }
    }
    throw new Error(`"${type}" type is not supported.`);
  }

  // FIXME: FIGURE OUT HOW TO HANDLE IT
  emitNullType(varName: ?string) {
    if (null != varName) {
      this.emitPrintTab('current');
      this.append(`"${varName}": ${'null'},\n`);
    } else {
      this.append(`null,\n`);
    }
  }

  emitObjectType(varName: ?string) {
    this.applyPreHook('object');
    this.increaseNesting();

    const m = NodeEmitContractMapping.get('object'); // TODO: add type NodeTag for type
    if (m) {
      this.emitPrintTab('current');
      this.append(
        null != varName // FIXME: must be strict
          ? `"${varName}": ${m}({\n`
          : `${m}({\n`,
      );
      this.incrementTabsAmount();
    }
  }

  emitArrayType(varName: ?string) {
    const m = NodeEmitContractMapping.get('array'); // TODO: add type NodeTag for type

    if (m) {
      this.emitPrintTab('current');
      this.append(
        null != varName // FIXME: must be strict
          ? `"${varName}": ${m}(`
          : `${m}(`,
      );

      this.addArrayPreHook();
      this.addArrayPostHook();

      return;
    }
  }

  emitPrintTab(amount: string) {
    if ('current' === amount) {
      this.append(this.tabulate());
    } else if ('more' === amount) {
      this.addTab();
    } else if ('less' === amount) {
      this.deleteTab();
    } else {
      throw new Error(`Unsupported value for the "print_tab" event: ${amount}`);
    }
  }

  emitPrintNewLine(amount: string) {
    this.append('\n');
  }

  emitCloseObject() {
    this.decreaseNesting();

    this.result = this.cleanTailTrailingComasAndNewLines(this.result);
    this.result += ',\n';
    this.deleteTab();
    this.append('})');
    if (false === this.applyPostHook('object')) {
      this.append("(''),\n");
    } else {
      this.append(',');
    }
  }

  emitCloseArray(type: string) {
    this.result = this.cleanTailTrailingComasAndNewLines(this.result);
    this.applyPostHook(type);
    this.append('),\n');
    // this.append(")(''),\n"); // FIXME: CHECK IT
  }

  emitCleanTailingComasAndNewLines() {
    this.result = this.cleanTailTrailingComasAndNewLines(this.result);
  }

  // HOOKS
  preArrayOfObjectsHook = (type: string): boolean => {
    // FIXME: USE NODE TYPE ALIAS INSTEAD
    if (type === 'object') {
      this.append('(valueName, value) =>\n');
      return true;
    }
    return false;
  };

  postArrayOfObjectsHook = (type: string): boolean => {
    // FIXME: USE NODE TYPE ALIAS INSTEAD
    if (type === 'object') {
      this.append('(valueName, value),\n');
      return true;
    }
    return false;
  };

  addArrayPreHook() {
    this.preHooks.push({ nestingLevel: this.nestingLevel, hook: this.preArrayOfObjectsHook });
  }

  addArrayPostHook() {
    this.postHooks.push({ nestingLevel: this.nestingLevel, hook: this.postArrayOfObjectsHook });
  }

  // FIXME: USE NODE INSTEAD
  applyPreHook(type: string): boolean {
    const hook = this.preHooks.pop();
    if (hook) {
      if (this.nestingLevel === hook.nestingLevel) {
        return hook.hook(type);
      } else {
        this.preHooks.push(hook); // return hook to its place
      }
    }
    return false;
  }

  // FIXME: USE NODE INSTEAD
  applyPostHook(type: string): boolean {
    const hook = this.postHooks.pop();
    if (hook) {
      if (this.nestingLevel === hook.nestingLevel) {
        return hook.hook(type);
      } else {
        this.postHooks.push(hook); // return hook to its place
      }
    }
    return true;
  }

  // NESTING
  increaseNesting(): number {
    // FIXME: nesting is the same as tabulation
    return (this.nestingLevel += 1);
  }

  decreaseNesting(): number {
    // FIXME: nesting is the same as tabulation
    if (this.nestingLevel > 0) {
      return (this.nestingLevel -= 1);
    }
    throw Error(`Nesting is less then 0.`);
  }
}
