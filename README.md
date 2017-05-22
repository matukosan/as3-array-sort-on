[![Travis](https://img.shields.io/travis/AndreasPizsa/as3-array-sort-on.svg?style=flat-square)](https://github.com/AndreasPizsa/as3-array-sort-on)
[![Codecov](https://img.shields.io/codecov/c/github/AndreasPizsa/as3-array-sort-on.svg?style=flat-square)](https://codecov.io/gh/AndreasPizsa/as3-array-sort-on)
[![CodeClimatte](https://img.shields.io/codeclimate/github/AndreasPizsa/as3-array-sort-on.svg?style=flat-square)](https://codeclimate.com/github/AndreasPizsa/as3-array-sort-on)


# `Array.sortOn` for JavaScript

This is a (partial) implementation of the [ActionScript 3 `Array.sortOn` method](http://help.adobe.com/en_US/FlashPlatform/reference/actionscript/3/Array.html#sortOn())

## Install

```bash
npm i -S sort-on

```

## Usage

```javascript
const sortOn = require('sort-on');
sortOn.extend(Array);

```
## Supported Features
+ Sorting is case-sensitive (Z precedes a) ✓
+ Sorting is ascending (a precedes b) ✓
+ The array is modified to reflect the sort order; multiple elements that have identical sort fields are placed consecutively in the sorted array in no particular order.  ✓
+ Numeric fields are sorted as if they were strings, so 100 precedes 99, because "1" is a lower string value than "9".
+ To pass multiple flags, separate them with the bitwise OR (`|`) operator ✓

#### Parameter `fieldName`
+ A string that identifies a field to be used as the sort value  ✓
+ or an array in which the first element represents the primary sort field, the second represents the secondary sort field, and so on.  ✓

#### Parameter `options`
+ One or more numbers or names of defined constants, separated by the bitwise OR (|) operator, that change the sorting behavior ✓
+ The following values are acceptable for the options parameter:
+ `Array.CASEINSENSITIVE` ✓
+ `Array.DESCENDING` ✓
+ `Array.NUMERIC` ✓
+ ~~`Array.UNIQUESORT`~~
+ `Array.RETURNINDEXEDARRAY`  ✓
+ the `options` parameter accepts an array of sort options such that each sort option corresponds to a sort field in the `fieldName` parameter  ✓

#### Returns
+ ~~If you specify a value of 4 or `Array.UNIQUESORT` for the `options` parameter, and two or more elements being sorted have identical sort fields, a value of 0 is returned and the array is not modified~~
+ If you specify a value of 8 or `Array.RETURNINDEXEDARRAY` for the `options` parameter, an array is returned that reflects the results of the sort and the array is not modified. ✓
+ Otherwise, nothing is returned and the array is modified to reflect the sort order. ✓
