const Trie = require("./trie.js");
const Candidate = require("./candidate")

class AutocompleteProvider {
  constructor(){
    this._trie = new Trie();
  }

  train(passage){
    const words = passage.match(/\b(\w+)\b/g);
    if(words){
      words.forEach(word => {
        this._trie.insert(word.toLowerCase());
      });
    }
  }

  getWords(fragment){
    let root = this._trie.find(fragment.toLowerCase());
    const queue = [];
    const candidates = [];
    if(root){
      queue.push(root);
      while (queue.length > 0){
        let node = queue.shift()
        if(node.value){
          candidates.push(new Candidate(node.word, node.value));
        }
        for (let char in node.children){
          queue.push(node.children[char])
        }
      }
      candidates.sort((a, b) => {
        return b.confidence - a.confidence;
      })
      return candidates;
    }
  }
}

module.exports = AutocompleteProvider