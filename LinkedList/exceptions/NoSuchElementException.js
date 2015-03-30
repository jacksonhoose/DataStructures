function NoSuchElementException(message){
  this.name = 'NoSuchElementException';
  this.message = message || 'Element does not exist';
}

NoSuchElementException.prototype = Object.create(Error.prototype);
NoSuchElementException.prototype.contructor = NoSuchElementException;

module.exports = NoSuchElementException;