const assert = require('assert');
const sortOn = require('../');

describe('as3 sortOn', function(){

  const fixtures = [
    { name : 'Andreas', age: 45 },
    { name : 'Matt',    age: 29 },
    { name : 'Steve',   age: 29 },
    { name : 'matthias',age: 29 },
    { name : 'matThew' ,age: 29 }
  ];

  describe('arguments', function() {
    it('works with just an array', function() {
      const array = [3,5,1];
      array.sortOn();
      assert.deepEqual(array, [1, 3, 5]);
    });

    it('works with an array and fieldName', function() {
      const array = [{a: 3},{a: 5},{a: 1}]
      sortOn(array, 'a');
      assert.deepEqual( array, [{a: 1}, {a: 3}, {a: 5}]);
    });

    it('works with an array and options', function() {
      const array = ['3', '5', '1'];
      sortOn(array, sortOn.NUMERIC);
      assert.deepEqual(array, [1, 3, 5]);
    });

  });

  describe('extending Array', function() {
    sortOn.extend(Array);

    describe('constants', function() {
      const constantNames =  [
        'CASEINSENSITIVE',
        'DESCENDING',
        'UNIQUESORT',
        'RETURNINDEXEDARRAY',
        'NUMERIC'
      ]

      constantNames.forEach(function(constant) {
        it(`has a property \`${constant}\``, function(){
          assert.ok(Array.hasOwnProperty(constant));
        });
      });

      constantNames.forEach(function(constant) {
        it(`\`Array.${constant}\` is a constant`, function(){
          assert.throws( () => Array[constant] = 1 );
        });
      });
    });

    it('can call `sortOn` without arguments', function() {
      const array = [3,5,1];
      array.sortOn();
      assert.deepEqual(array, [1, 3, 5] );
    });

    it('can call `sortOn` with options', function() {
      const array = [3, 5, 1];
      array.sortOn(Array.DESCENDING)
      assert.deepEqual( array, [5, 3, 1]);
    });
  });

  describe('options', function(){
    describe('The following values are acceptable for the options parameter:', function() {
      it('Array.NUMERIC', function() {
        const array = ['1000', '2', '300'];
        array.sortOn(Array.NUMERIC)
        assert.deepEqual(array, [ '2', '300', '1000']);
      });

      it('Array.NUMERIC | Array.DESCENDING', function(){
        const array = ['1000', '2', '300'];
        array.sortOn(Array.NUMERIC | Array.DESCENDING)
        assert.deepEqual(array, ['1000', '300', '2']);
      });

      it('Array.CASEINSENSITIVE', function(){
        const array = ['b', 'Z', 'a'];
        array.sortOn(Array.CASEINSENSITIVE);
        assert.deepEqual(array, ['a', 'b', 'Z']);
      });

      it('Array.CASEINSENSITIVE | Array.DESCENDING', function(){
        const array = ['b', 'z', 'A'];
        array.sortOn(Array.CASEINSENSITIVE | Array.DESCENDING)
        assert.deepEqual(array, ['z', 'b', 'A']);
      });
    });

    describe('multiple fields and options', function(){
      it('CASEINSENSITIVE', function(){
        fixtures.sortOn([ 'age', 'name'], [ 0, Array.CASEINSENSITIVE ])
        assert.deepEqual(fixtures, [
          { name: 'Matt', age: 29 },
          { name: 'matThew', age: 29 },
          { name: 'matthias', age: 29 },
          { name: 'Steve', age: 29 },
          { name: 'Andreas', age: 45 }
        ]);
      });

      it('DESCENDING, CASEINSENSITIVE', function(){
        fixtures.sortOn([ 'age', 'name'], [ Array.DESCENDING, Array.CASEINSENSITIVE ])
        assert.deepEqual(fixtures, [
          { name: 'Andreas', age: 45 },
          { name: 'Matt', age: 29 },
          { name: 'matThew', age: 29 },
          { name: 'matthias', age: 29 },
          { name: 'Steve', age: 29 }
        ]);
      });

      it('DESCENDING, CASEINSENSITIVE | DESCENDING', function(){
        fixtures.sortOn([ 'age', 'name'], [ Array.DESCENDING, Array.CASEINSENSITIVE | Array.DESCENDING]);
        assert.deepEqual(fixtures, [
          { name: 'Andreas', age: 45 },
          { name: 'Steve', age: 29 },
          { name: 'matthias', age: 29 },
          { name: 'matThew', age: 29 },
          { name: 'Matt', age: 29 }
        ]);
      });
    });

    it('UNIQUESORT fails', function() {
      assert.throws(() => fixtures.sortOn('name', Array.UNIQUESORT));
    });

    it('RETURNINDEXEDARRAY fails', function() {
      assert.throws(() => fixtures.sortOn('name', Array.RETURNINDEXEDARRAY));
    });
  });

  describe('AS3 compatibility', function() {
    it('The fieldName and options arrays must have the same number of elements; otherwise, the options array is ignored.', function() {
      const array = [ {a: 100, b: 1}, {a: 99, b: 1}, {a: 8000, b: 1} ];
      array.sortOn('a');
      fixtures.sortOn(['a', 'b'], [ Array.NUMERIC ]);
      assert.deepEqual(array, [ {a: 100, b: 1}, { a: 8000, b: 1 }, { a: 99, b: 1 }]);
    });

    it('Sorting is case-sensitive (Z precedes a), sorting is ascending', function() {
      fixtures.sortOn('name');
      assert.deepEqual(fixtures, [
        { name: 'Andreas', age: 45 },
        { name: 'Matt', age: 29 },
        { name: 'Steve', age: 29 },
        { name: 'matThew', age: 29 },
        { name: 'matthias', age: 29 },
      ]);
    });

    it('Numeric fields are sorted as if they were strings, so 100 precedes 99, because "1" is a lower string value than "9"', function(){
      const array = [ {a: 100}, {a: 99}, {a: 8000} ];
      array.sortOn('a');
      assert.deepEqual(array, [ {a: 100}, { a: 8000 }, { a: 99 }]);
    });

    describe('Returns', function(){
      it('Otherwise, nothing is returned and the array is modified to reflect the sort order', function() {
        assert.strictEqual(fixtures.sortOn('name'), undefined);
      });
    })
  });

});