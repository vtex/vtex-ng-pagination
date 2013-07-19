(function() {
  describe('Man', function() {
    var man;
    man = new Man('Brian Peter George St. Jean le Baptiste de la Salle Eno');
    it('should have a name', function() {
      return expect(man.name).toBe('Brian Peter George St. Jean le Baptiste de la Salle Eno');
    });
    return it('should be male', function() {
      return expect(man.gender).toBe('male');
    });
  });

  describe('Woman', function() {
    var woman;
    woman = new Woman('Princess Diana');
    it('should have a name', function() {
      return expect(woman.name).toBe('Princess Diana');
    });
    return it('should be female', function() {
      return expect(woman.gender).toBe('female');
    });
  });

}).call(this);
