function BinarySearchTree(){
  this.root = null;
  this.count = 0;
}

BinarySearchTree.prototype._increaseCount = function(){
  this.count++;
};

BinarySearchTree.prototype._decreaseCount = function(){
  this.count--;
};

BinarySearchTree.prototype.size = function(){
  return this.count;
};

BinarySearchTree.prototype.insert = function(value){
  if(!this.root){
    this.root = new BinarySearchTreeNode(value);
    this._increaseCount();
  } else {
    this.insertNode(this.root, value)
  }
};

BinarySearchTree.prototype.insertNode = function(current, value){
  if(value < current.value){
    if(!current.left){
      current.left = new BinarySearchTreeNode(value);
      this._increaseCount();
    } else {
      this.insertNode(current.left, value);
    }
  } else {
    if(!current.right){
      current.right = new BinarySearchTreeNode(value);
      this._increaseCount();
    } else {
      this.insertNode(current.right, value);
    }
  }
};

BinarySearchTree.prototype.contains = function(root, value){
  if(!root){
    return false;
  }
  if(root.value === value){
    return true;
  } else if(value < root.value){
    return this.contains(root.left, value);
  } else {
    return this.contains(root.right, value)
  }
};

BinarySearchTree.prototype.remove = function(value){
  var nodeToRemove = this.findNode(this.root, value);
  console.log(nodeToRemove);
  if(!nodeToRemove){
    return false;
  }
  
  var parent = this.findParent(value, this.root);

  if(this.size() === 1){
    this.root = undefined;
  } else if(!nodeToRemove.left && !nodeToRemove.right){
    if(nodeToRemove.value < parent.value){
      parent.left = undefined;
    } else {
      parent.right = undefined;
    }
  } else if(!nodeToRemove.left && nodeToRemove.right){
    if(nodeToRemove.value < parent.value){
      parent.left = nodeToRemove.right;
    } else {
      parent.right = nodeToRemove.right;
    }
  } else if(nodeToRemove.left && !nodeToRemove.right){
    if(nodeToRemove.value < parent.value){
      parent.left = nodeToRemove.left;
    } else {
      parent.right = nodeToRemove.left;
    }
  } else {
    var largestValue = nodeToRemove.left;
    
    while(largestValue.right){
      largestValue = largestValue.right;
    }

    var foundParent = this.findParent(largestValue.value);
    foundParent.right = undefined;
    nodeToRemove.value = largestValue.value;
    
  }
  this._decreaseCount();
  return true;
};

BinarySearchTree.prototype.findNode = function(root, value){
  if(!root){
    return null;
  }
  if(root.value === value){
    return root;
  } else if(value < root.value){
    return this.findNode(root.left, value);
  } else {
    return this.findNode(root.right, value);
  }
};

BinarySearchTree.prototype.findParent = function(value, root){
  if(value === root.value){
    return null;
  }
  if(value < root.value){
    if(!root.left){
      return null;
    } else if(root.left.value === value){
      return root;
    } else {
      return this.findParent(value, root.left);
    }
  } else {
    if(!root.right){
      return null;
    } else if(root.right.value === value){
      return root;
    } else {
      return this.findParent(value, root.right);
    }
  }
};

function BinarySearchTreeNode(value){
  this.value = value;
  this.left = null;
  this.right = null;
}


module.exports.BinarySearchTree = BinarySearchTree;
module.exports.BinarySearchTreeNode = BinarySearchTreeNode;