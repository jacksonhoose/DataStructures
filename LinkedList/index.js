var IndexOutOfBoundsException = require('./exceptions/IndexOutOfBoundsException');
var NoSuchElementException = require('./exceptions/NoSuchElementException');

// http://www.tutorialspoint.com/java/java_linkedlist_class.htm
function LinkedList(head, tail){
  this._head = null;
  this._tail = null;
  this._size = [].slice.call(arguments).length;
}

LinkedList.prototype._decreaseSize = function(){
  this._size--;
};

LinkedList.prototype._increaseSize = function(){
  this._size++;
};

// 1 void add(int index, Object element)
// Inserts the specified element at the specified position index in this list. Throws IndexOutOfBoundsException if the specified index is is out of range (index < 0 || index > size()).

// 2 boolean add(Object o) 
// Appends the specified element to the end of this list.
// 
LinkedList.prototype.add = function(object, index){

  if(index > this.size() + 1) throw new IndexOutOfBoundsException();

  // increase for the new node
  this._increaseSize();

  var size = this.size();

  // initialize the index as the index passed in
  // or the increased size minus one for the last index
  var nodeIndex = index || (size - 1);

  // create a new node with the object as the value
  var node = new LinkedListNode(object);

  // if there is an index passed in 
  // we need to insert at a specific location
  if(index !== undefined && index !== (size-1)){
    // set the head
    if(index === 0){
      var head = this._head;
      node.next = head;
      head.prev = node;
      this._head = node;
    } else {
      // we need to iterate to the 
      // correct location from our head
      var current = this._head;

      // while the index isnt equal to the desired index
      // we can increase our current node until we reach it
      var next = 0;
      while(next !== index){
        current = current.next;
        next++;
      }

      // we are inserting our new node at the 
      // current nodes position so we can grab the previous
      // and attach it to our node.  the nodes next is the current
      // and the current's previous is our new node
      current.prev.next = node;
      node.next = current;
      node.prev = current.prev;
      current.prev = node;
    }
  } else {
    // there is no index specified 
    // this is the first element in the list
    // it is the the head and the tail
    if(size === 1){
      this._head = node;
      this._tail = node;
    } else if(size > 1){
      // there are more than one element in the list
      var tail = this._tail;
      // we can grab the tail and set its .next to the new node
      tail.next = node;
      // our new node's previous is the prev tail
      node.prev = tail;
      // then we set the ._tail to our fresh node
      this._tail = node;
    }
  }
};

// 3 boolean addAll(Collection c)
// Appends all of the elements in the specified collection to the end of this list, in the order that they are returned by the specified collection's iterator. Throws NullPointerException if the specified collection is null.

// 4 boolean addAll(int index, Collection c) 
// Inserts all of the elements in the specified collection into this list, starting at the specified position. Throws NullPointerException if the specified collection is null.
LinkedList.prototype.addAll = function(collection, index){
  if(index === undefined){
    collection.forEach(function(value, i){
      this.addLast(value);
    }, this);
  }
};

// 5 void addFirst(Object o)
// Inserts the given element at the beginning of this list.
LinkedList.prototype.addFirst = function(object){
  var node = object instanceof LinkedListNode ? object : new LinkedListNode(object);
  var head = this._head;
  head.prev = node;
  node.next = head;
  this._head = node;
  this._increaseSize();
};

// 6 void addLast(Object o) 
// Appends the given element to the end of this list.
LinkedList.prototype.addLast = function(object){
  var node = object instanceof LinkedListNode ? object : new LinkedListNode(object);

  if(!this.size()){
    this._head = node;
    this._tail = node;
  } else {
    var tail = this._tail;
    tail.next = node;
    node.prev = tail;
    this._tail = node;
  }

  this._increaseSize();
};

// 7 void clear() 
// Removes all of the elements from this list.
LinkedList.prototype.clear = function(){

};

// 8 Object clone() 
// Returns a shallow copy of this LinkedList.
LinkedList.prototype.clone = function(){

};

// 9 boolean contains(Object o) 
// Returns true if this list contains the specified element. More formally, returns true if and only if this list contains at least one element e such that (o==null ? e==null : o.equals(e)).
LinkedList.prototype.contains = function(object){

};

// 10  Object get(int index) 
// Returns the element at the specified position in this list. Throws IndexOutOfBoundsException if the specified index is is out of range (index < 0 || index >= size()).
LinkedList.prototype.get = function(index){
  var size = this.size() - 1;
  var node, i = 0;

  // if index is 0 we can return the head
  if(index === 0) return this.getFirst();
  // if index is the last item return the tail
  if(index === size) return this.getLast();

  // if the index is greater than half the 
  if(index >= Math.floor(this.size()/2)){
    // get from tail
    i = size - 1;
    node = this.getLast();
    while(i >= index){
      node = node.prev;
      i--;
    }
  } else {
    // get from head
    node = this.getFirst();
    while(i < index){
      node = node.next;
      i++;
    }
  }
  return node;
};

// 11  Object getFirst() 
// Returns the first element in this list. Throws NoSuchElementException if this list is empty.
LinkedList.prototype.getFirst = function(){
  if(!this.size()) throw new NoSuchElementException();
  return this._head;
};

// 12  Object getLast() 
// Returns the last element in this list. Throws NoSuchElementException if this list is empty.
LinkedList.prototype.getLast = function(){
  if(!this.size()) throw new NoSuchElementException();
  return this._tail;
};

// 13  int indexOf(Object o) 
// Returns the index in this list of the first occurrence of the specified element, or -1 if the List does not contain this element.
LinkedList.prototype.indexOf = function(value){
  var result = -1;
  var node = this.getFirst();
  var i = 0;
  var size = this.size() - 1;
  while(i <= size){
    if(node.value === value) {
      result = i;
      break;
    }
    i++;
    node = node.next;
  }
  return result;
};

// 14  int lastIndexOf(Object o)
// Returns the index in this list of the last occurrence of the specified element, or -1 if the list does not contain this element.
LinkedList.prototype.lastIndexOf = function(value){
  var result = -1;
  var node = this.getLast();
  var i = this.size() - 1;
  while(i >= 0){
    if(node.value === value){
      result = i;
      break;
    }
    i--;
    node = node.prev;
  }
  return result;
};

// 15  ListIterator listIterator(int index)
// Returns a list-iterator of the elements in this list (in proper sequence), starting at the specified position in the list. Throws IndexOutOfBoundsException if the specified index is is out of range (index < 0 || index >= size()).
LinkedList.prototype.listIterator = function(index){

};

// 16  Object remove(int index) 
// Removes the element at the specified position in this list. Throws NoSuchElementException if this list is empty.

// 17  boolean remove(Object o) 
// Removes the first occurrence of the specified element in this list. Throws NoSuchElementException if this list is empty. Throws IndexOutOfBoundsException if the specified index is is out of range (index < 0 || index >= size()).
LinkedList.prototype.remove = function(element, index){
  if(!this.size()) throw new NoSuchElementException();
  if(index < 0 || index > this.size() - 1) throw new IndexOutOfBoundsException();
  if(index !== undefined){
    // remove first occurance
    
  } else {
    // remove at index
    
  }
  this._decreaseSize();
};

// 18  Object removeFirst() 
// Removes and returns the first element from this list. Throws NoSuchElementException if this list is empty.
LinkedList.prototype.removeFirst = function(){
  var head = this.getFirst();

  if(this.size() === 1){
    this._head = null;
    this._tail = null;
  } else {
    var newHead;

    if(head.next){
      newHead = head.next;
      newHead.prev = null;
    } else {
      newHead = null;
    }

    this._head = newHead;
  }

  this._decreaseSize();

  return head;
};

// 19  Object removeLast() 
// Removes and returns the last element from this list. Throws NoSuchElementException if this list is empty.
LinkedList.prototype.removeLast = function(){
  if(!this.size()) throw new NoSuchElementException();
 
  var last = this._tail;

  if(this.size() === 1){
    this._tail = null;
    this._head = null;
  } else {
    this._tail = last.prev;
    this._tail.next = null;
  }

  this._decreaseSize();
  
  return last;
};

// 20  Object set(int index, Object element) 
// Replaces the element at the specified position in this list with the specified element. Throws IndexOutOfBoundsException if the specified index is is out of range (index < 0 || index >= size()).
LinkedList.prototype.set = function(index, object){
  if(index < 0 || index > this.size() - 1) throw new IndexOutOfBoundsException();

};

// 21  int size() 
// Returns the number of elements in this list.
LinkedList.prototype.size = function(){
  return this._size;
};

// 22  Object[] toArray() 
// Returns an array containing all of the elements in this list in the correct order. Throws NullPointerException if the specified array is null.
LinkedList.prototype.toArray = function(){
  var array = [];

  if(!this.size()) return array;

  var current = this._head;
  
  // while there is a next value build up the array
  while(current.next){
    array.push(current.value);
    current = current.next;
  }

  // push the final value on
  array.push(current.value);

  return array;
};

// 23  Object[] toArray(Object[] a) 
// Returns an array containing all of the elements in this list in the correct order; the runtime type of the returned array is that of the specified array.

function LinkedListNode(value, index){
  this.value = value;
  this.next = null;
  this.prev = null;
}

LinkedListNode.prototype.getValue = function(){
  return this.value;
};

module.exports.LinkedList = LinkedList;
module.exports.LinkedListNode = LinkedListNode;