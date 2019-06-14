const readline = require('readline');
const Autocompleteprovider = require('./autocompleteprovider.js')
const stdin = process.stdin;

let training = true
let currentWord = ""

const autocompleteprovider = new Autocompleteprovider()

function train(){
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });
  rl.question('Train: ', (answer) => {
    autocompleteprovider.train(answer)
    training = false;
    rl.close();
    run()
  });
}

function input() {
  currentWord = "";
  candidatesString = "";
  process.stdout.write("Input: ");
  stdin.resume();
  stdin.setRawMode( true );
  stdin.setEncoding( 'utf8' );
  stdin.on( 'data', function keyListener( key ){
    readline.clearLine(process.stdout, 0);
    readline.cursorTo(process.stdout, 0);
    
    if ( key === '\u0003' ) { //if user enters '^c'
      process.exit();
    }else if(key === '\u000D' || key === '\u000A'){ //if user enters 'return' or 'enter'
      stdin.removeListener('data', keyListener)
      autocompleteprovider.train(currentWord);
      console.log("Input: \"" + currentWord + "\" --> " + candidatesString);
      run()
    }else if(key === '\u0021'){ //if user enters '!'
      stdin.removeListener('data', keyListener)
      training = true
      run()
    }else{
      if(key === '\u007f'){//if user enters backspace
        currentWord = currentWord.substring(0, currentWord.length - 1)
      }else{
        currentWord += key
      }
      candidates = autocompleteprovider.getWords(currentWord)
      if (candidates){
        if(process.env.CLEAN_AUTO_COMPLETE){
          candidates = candidates.slice(0, 5)
        }
        candidatesStrings = []
        candidates.forEach(candidate => {
          candidatesStrings.push("\"" + candidate.word + "\" (" + candidate.confidence + ")");
        });
        candidatesString = candidatesStrings.join(",")
        process.stdout.write( "Input: \"" + currentWord + "\" --> " + candidatesString);
      }else{
        candidatesString = ""
        process.stdout.write( "Input: \"" + currentWord + "\"");
      }
    }
  });
}

function run(){
  if(training){
    train()
  }else {
    input()
  }
}

run()

