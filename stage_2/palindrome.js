const palindrome = function(string) {
    const word = string.toLowerCase();

    for (let i = 0; i < word.length; i++) {
        let start = i;
        let end = word.length - (i + 1);

        if (start === end && word[start] === word[end]) {
            return true;
        } else if (word[start] !== word[end]) {
            return false;
        }

    }
    
    
    
}
