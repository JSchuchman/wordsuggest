class Node {
  constructor(value = 0, word = "") {
    this.value = value;
    this.word = word
    this.children = {}
  }
}

class Trie {
  constructor(){
    this.root = new Node();
  }

  insert(word){
    let node = this.root;
    for (let i = 0; i < word.length; i++){
      let char = word.charAt(i);
      if (!(char in node.children)){
        node.children[char] = new Node();
      }
      node = node.children[char]
    }
    node.value++;
    if(node.value == 1){
      node.word = word
    }
  }

  find(word){
    let node = this.root;
    for (let i = 0; i < word.length; i++){
      let char = word.charAt(i);
      if (char in node.children){
        node = node.children[char]
      }else{
        return
      }
    }
    return node
  }
}

module.exports = Trie