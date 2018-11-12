// @flow
import EventEmitter from 'events';
import { NodeEmitContractMapping } from './nodeEmitterMapping';
import prettier from 'prettier';

// TODO: add tabulation
const TAB_SIZE = 2;

// FIXME: remove code styling (tabs, spacing, e.t.c) from emitter

export class Emitter {
  tabsAmount: number = 0;

  result: string = '';

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

    try {
      // FIXME: use prettier in a more smart way - prettier.resolveConfig
      // avoid passing object with options directly
      // FIXME: fix this No parser and no filepath given, using 'babylon' the parser now but this will throw an error in the future. Please specify a parser or a filepath so one can be inferred.
      return prettier.format(this.result, {
        parser: 'babylon',
        singleQuote: true,
        tabWidth: 2,
        trailingComma: 'all',
        printWidth: 100,
      });
    } catch (e) {
      // That's expected - some of the tests may produce not sintactically invalid js
      return this.result;
    }
  };

  reset = (): void => {
    this.result = '';
    this.tabsAmount = 0;
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

  emitObjectType(varName: ?string) {
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
    this.result = this.cleanTailTrailingComasAndNewLines(this.result);
    this.result += ',\n';
    this.deleteTab();
    this.append("})(''),\n");
  }

  emitCloseArray() {
    this.result = this.cleanTailTrailingComasAndNewLines(this.result);
    this.append(")(''),\n");
  }

  emitCleanTailingComasAndNewLines() {
    this.result = this.cleanTailTrailingComasAndNewLines(this.result);
  }
}
