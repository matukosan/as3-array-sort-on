import 'mocha';
import * as sortOn from '../';
import * as assert from 'assert';

describe('TypeScript interface', function(){
  it('can extend Array', function() {
    sortOn.extend(Array);
  });

  it('can sort arrays', function() {
    const array = [
      { name: 'Matthias' },
      { name: 'Andreas'  }
    ];
    array.sortOn('name');
    assert.deepEqual(array, [
      { name: 'Andreas'  },
      { name: 'Matthias' }
    ])
  });
});
