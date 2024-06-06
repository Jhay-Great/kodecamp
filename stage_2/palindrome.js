const palindrome = function(string) {
    /**
     * a palindrome is a word the reads the same when it's read backwards
     * or it's a word that has the same letters when read backwards
     * 
     * level, madam, civic, radar
     * 
     * so we can reverse the word and compare them
     * can use arrays or maps
     * 
     * a) reverse the string
     * b) set the strings as a map
     * c) compare the original string to the reversed string
     * d) if the letters are not the same at any point return false
     * e) if the letters are the same continue iteration and return true when completed
     */

    // const mapObj = new Map();

    // mapObj.set('name', string)
    // console.log(mapObj);

    // const setString = new Set();
    // console.log(setString.add(string));
    
    // const mappedString = new Map(string);
    // const reversedMap = mappedString.reverse();

    // console.log(mappedString, reversedMap);


    /**using arrays and looping through */
    // const reverseString = [...string].reverse();
    // console.log(reverseString);

    // const word = string.toLowerCase().split(' ').filter(name => name !== '').join('');
    // console.log(word);
    const word = string.toLowerCase();

    for (let i = 0; i < word.length; i++) {
        let start = i;
        let end = word.length - (i + 1);
        // console.log(word[i], word[word.length - (i + 1)], i, word.length - (i + 1))

        if (start === end && word[start] === word[end]) {
            return true;
        } else if (word[start] !== word[end]) {
            return false;
        }

    }
    
    
    
}

console.log('12321: ', palindrome('12321'));
console.log('1a2b2a1: ', palindrome('1a2b2a1'));
console.log('12345: ', palindrome('12345'));
console.log('...: ', palindrome('...'));