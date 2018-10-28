// @flow
import EventEmitter from 'events';
import { NodeEmitContractMapping } from './nodeEmitterMapping';
import prettier from 'prettier';

// TODO: add tabulation
const TAB_SIZE = 2;

// FIXME: remove code styling (tabs, spacing, e.t.c) from emitter

export class Emitter extends EventEmitter {
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

    try {
      // FIXME: use prettier in a more smart way - prettier.resolveConfig
      // avoid passing object with options directly
      // FIXME: fix this No parser and no filepath given, using 'babylon' the parser now but this will throw an error in the future. Please specify a parser or a filepath so one can be inferred.
      return prettier.format(this.result, {
        parser: 'babylon',
        singleQuote: true,
        tabWidth: 2,
        trailingComma: 'all',
        printWidth: 80,
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
    // console.log('TABS ', this.tabsAmount);
    return ' '.repeat(this.tabsAmount * TAB_SIZE);
  };
}

const emitter = new Emitter();

emitter.on('val_type', (type: string, varName: ?string) => {
  if (type === 'boolean' || type === 'string' || type === 'number') {
    // TODO: add type NodeTag for type
    const m = NodeEmitContractMapping.get(type);
    if (m) {
      if (null != varName) {
        emitter.emit('print_tab', 'current');
        emitter.append(`${varName}: ${m},\n`);
      } else {
        emitter.append(`${m},\n`);
      }
      return;
    }
  }
  throw new Error(`"${type}" type is not supported.`);
});

emitter.on('ref_type', (type: string, varName: string | null) => {
  if ('object' === type) {
    const m = NodeEmitContractMapping.get(type); // TODO: add type NodeTag for type

    if (m) {
      emitter.emit('print_tab', 'current');
      emitter.append(
        null != varName // FIXME: must be strict
          ? `${varName}: ${m}({\n`
          : `${m}({\n`,
      );
      emitter.incrementTabsAmount();
      return;
    }
  } else if ('array' === type) {
    const m = NodeEmitContractMapping.get(type); // TODO: add type NodeTag for type

    if (m) {
      emitter.emit('print_tab', 'current');
      emitter.append(
        null != varName // FIXME: must be strict
          ? `${varName}: ${m}(`
          : `${m}(`,
      );

      return;
    }
  }
  throw new Error(`"object" type is not supported.`);
});

emitter.on('print_tab', (amount: string) => {
  if ('current' === amount) {
    emitter.append(emitter.tabulate());
  } else if ('more' === amount) {
    emitter.addTab();
  } else if ('less' === amount) {
    emitter.deleteTab();
  } else {
    throw new Error(`Unsupported value for the "print_tab" event: ${amount}`);
  }
});

emitter.on('print_new_line', (amount: string) => {
  emitter.append('\n');
});

emitter.on('close_object', () => {
  // console.log(`=============================================================`);
  // console.log(`RESULT: BEFORE"${emitter.result}"`);
  emitter.result = emitter.cleanTailTrailingComasAndNewLines(emitter.result);
  // console.log(`RESULT: AFTER CLEAN UP"${emitter.result}"`);

  emitter.result += ',\n';
  // console.log(`RESULT: AFTER ADDING TRAILING COMA "${emitter.result}"`);

  emitter.deleteTab();
  // console.log(`RESULT: AFTER DELETTING TAB"${emitter.result}"`);

  emitter.append('}),\n');
  // console.log(`RESULT: AFTER ADDING NEW LINE AND BRACES"${emitter.result}"`);

  // console.log(`RESULT:FINAL "${emitter.result}"`);
  // console.log(`=============================================================`);
});

emitter.on('close_array', () => {
  emitter.result = emitter.cleanTailTrailingComasAndNewLines(emitter.result);
  emitter.append('),\n');
});

emitter.on('clean_tailing_comas_and_new_lines', () => {
  emitter.result = emitter.cleanTailTrailingComasAndNewLines(emitter.result);
});
export { emitter };
