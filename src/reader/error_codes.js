// @flow

export const NO_FILE_ERR_CODE = 1;
export const UNKNOWN_READ_ERROR = 3;
export const NO_SUFFICIENT_RIGHTS_TO_READ_ERR = 3;
export type READ_ERROR = 1 | 2 | 3; // FIXME: extract value from READ errors vars

export const PARSE_ERR_CODE = 4;
export type PARSE_ERROR = 4;
