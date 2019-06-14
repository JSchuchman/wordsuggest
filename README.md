# Mobile Device Keyboard


To run the code, simply run: 
```npm i
npm run-script run```

I ran my code with node version 11.14.0, and npm 6.9.0.

If you train the code with a whole lot of data, the number of suggestions can be overwhelming, so you can also run the code with `npm run-script run-clean` to only output the top five suggestions.

After you enter train the data, you can switch from "input" to "train" by entering '!'. Though suggestions are displayed for every keystroke the user does, only when the user hits 'enter', will that word be added to the list of candidates. 

The data structure I choose for this task was a Trie, and to sort the candidates that were pulled from the Trie, I simply used javascript's built in array sort method. 