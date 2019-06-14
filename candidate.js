class Candidate {
  constructor(word, confidence) {
    this._word = word
    this._confidence = confidence
  }

  get word(){
    return this._word;
  }

  get confidence(){
    return this._confidence;
  }
}

module.exports = Candidate