interface Array<T> {
  sortOn(
    fieldNames : string | string[],
    options    : number | number[]
  ) : void | T[];
}