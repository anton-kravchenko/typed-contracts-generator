// @flow
import fs from 'fs';
import type { Node } from '../contracts_emitter/types';
import type { READ_ERROR, PARSE_ERROR } from './error_codes';

const readFile = (fPath: string): string | READ_ERROR => {
  try {
    return fs.readFileSync(fPath).toString();
  } catch (e) {
    // TODO: handle no file
    // TODO: handle no rights
    return 1;
  }
};

const parseFile = (source: string): Node | PARSE_ERROR => {
  // TODO: add typed contract validation
  try {
    const parsed = JSON.parse(source);
    return parsed;
  } catch (e) {
    return 4;
  }
};

const handleReadError = (readErrCode: READ_ERROR, fPath: string): void => {
  switch (readErrCode) {
    case 1: {
      console.log(`${fPath.length} was not found.`);
      console.log(`${fPath} was not found.`);
      console.log(`${fPath} was not found.`);
      console.log(`${fPath} was not found.`);
      console.log(`${fPath} was not found.`);
      console.log(`${fPath} was not found.`);
      console.log(`${fPath} was not found.`);
      console.log(`${fPath} was not found.`);
      return process.exit(readErrCode);
    }
    case 2: {
      console.log(`${fPath} - not enough rights to read file.`);
      return process.exit(readErrCode);
    }
    case 3: {
      console.log(`${fPath} - encounter unknown error during reading file.`);
      return process.exit(readErrCode);
    }
    default:
      (readErrCode: empty); /* eslint-disable-line */
  }
};

const handleParseError = (parseErrCode: PARSE_ERROR, fPath: string): void => {
  switch (parseErrCode) {
    case 4:
      throw Error(`${fPath} - not a valid JSON file.`); // FIXME: figure out how to handle it
      return process.exit(parseErrCode);
    default:
      (parseErrCode: empty); /* eslint-disable-line */
  }
};

export const readJsonSchema = (fPath: string): Node => {
  const data = readFile(fPath);
  if (typeof data === 'number') {
    const readErrCode = data;
    handleReadError(readErrCode, fPath);
  } else {
    const parsedData = parseFile(data);

    if (typeof parsedData === 'number') {
      const parseErrCode = parsedData;
      handleParseError(parseErrCode, fPath);
    } else {
      if (Object.keys(parsedData).length === 1) {
        throw new Error(`${fPath} - empty json schema`);
      }
      return parsedData;
    }
  }
  throw new Error(`Unexpected flow.`); // FIXME: rethink error handling
};
