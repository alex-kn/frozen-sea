'use strict';

describe('userStudy.version module', function() {
  beforeEach(module('userStudy.version'));

  describe('version service', function() {
    it('should return current version', inject(function(version) {
      expect(version).toEqual('0.1');
    }));
  });
});
