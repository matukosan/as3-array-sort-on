declare global {
  export interface Array<T> {
    CASEINSENSITIVE    : number;
    DESCENDING         : number;
    UNIQUESORT         : number;
    RETURNINDEXEDARRAY : number;
    NUMERIC            : number;

    sortOn(fieldNames : string) : void;
    sortOn(fieldNames : string,   options?: number  ) : void | T[];

    sortOn(fieldNames : string[]) : void;
    sortOn(fieldNames : string[], options?: number[]) : void | T[];
  }
}

declare function sortOn<T>(array: Array<T>, fieldNames: string) : void;
declare function sortOn<T>(array: Array<T>, fieldNames: string, options: number): void | Array<T>;

declare function sortOn<T>(array: Array<T>, fieldNames: string[]): void;
declare function sortOn<T>(array: Array<T>, fieldNames: string[], options: number[]): void | Array<T>;

declare namespace sortOn {
  export const CASEINSENSITIVE    : number;
  export const DESCENDING         : number;
  export const UNIQUESORT         : number;
  export const RETURNINDEXEDARRAY : number;
  export const NUMERIC            : number;

  export function extend(prototype : any);
  export function defineConstants(prototype : any);
}

export = sortOn;