function IndexOutOfBoundsException(message){
  this.name = 'IndexOutOfBoundsException';
  this.message = message || 'Index out of bounds';
}

IndexOutOfBoundsException.prototype = Object.create(Error.prototype);
IndexOutOfBoundsException.prototype.contructor = IndexOutOfBoundsException;

module.exports = IndexOutOfBoundsException;