function sortOn(array, fieldNames, options)
{

  if(arguments.length === 2 && typeof fieldNames === 'number') {
    options    = fieldNames;
    fieldNames = undefined;
  }

  if(!Array.isArray(fieldNames)) fieldNames = [ fieldNames ];
  if(!Array.isArray(options)) options = [ options ];

  // Note: The fieldName and options arrays must have the same number of
  // elements; otherwise, the options array is ignored.
  // @see http://help.adobe.com/en_US/FlashPlatform/reference/actionscript/3/Array.html#sortOn()
  if(fieldNames.length !== options.length) {
    options = new Array(fieldNames.length).fill(undefined);
  }

  const returnIndexedArray = options[0] & sortOn.RETURNINDEXEDARRAY;
  if(returnIndexedArray) array = Array.from(array);

  const functions = fieldNames.map( (fieldName, index) => {
    return createComparisonFn(fieldName, options[index]);
  });

  const sorted = array.sort(function comparisonFn(a, b) {
    return functions.reduce( (result, fn) => result || fn(a, b) , 0);
  });

  return returnIndexedArray ? sorted : undefined;


  function createComparisonFn(fieldName, options) {
    options = options || 0;

    if(options & sortOn.UNIQUESORT) throw new Error('UNIQUESORT is not implemented');
//    if(options & sortOn.RETURNINDEXEDARRAY) throw new Error('RETURNINDEXEDARRAY is not implemented');

    const transformations = [];

    if(fieldName) transformations.push(
      function getProperty() { return this[fieldName]; }
    );

    transformations.push(
      (options & sortOn.NUMERIC)
      ? function() { return parseFloat(this); }
      : function() {
          if(typeof this === 'string') return this;
          if(typeof this === 'number') return ''+this;
          return this.toString();
        }
    );

    if(options & sortOn.CASEINSENSITIVE) transformations.push(String.prototype.toLocaleLowerCase);

    transformations.apply = Array.prototype.reduce.bind(
      transformations,
      function(value, transformation) { return transformation.apply(value); }
    );

    const AGreaterThanB = (options & sortOn.DESCENDING) ? -1 : 1;
    const ALessThanB    = -AGreaterThanB;

    return function comparisonFn(a, b) {
      a = transformations.apply(a);
      b = transformations.apply(b);

      if( a > b || (a != null && b == null) ) return AGreaterThanB;
      if( a < b || (a == null && b != null) ) return ALessThanB;

      return 0;
    }
  }
}

sortOn.defineConstants = function(obj) {
  function constant(value) {
    return {
        get: function() { return value; },
        set: function() { throw new Error('trying to set read-only property'); }
    };
  }

  Object.defineProperties(obj, {
    CASEINSENSITIVE    : constant(1),
    DESCENDING         : constant(2),
    UNIQUESORT         : constant(4),
    RETURNINDEXEDARRAY : constant(8),
    NUMERIC            : constant(16)
  });
}

sortOn.defineConstants(sortOn);

sortOn.extend = function(klass) {
  klass.prototype.sortOn = function(fieldName, options) {
    const args = [ this ];
    for(i of arguments) args.push(i);
    return sortOn.apply(this, args);
  }
  sortOn.defineConstants(klass);
}

module.exports = sortOn;
