
const limitByLength = function(string) {
    // if characters is less than 100 return the string
    let stringLength = string.length;
    if (stringLength < 100) return string;

    // else return the first 100 characters concatenated with an ellipsis eg. ...boy...
    let word = '';
    for (let i = 0; i < 100; i++) {
        if (i === 99 && string[99] === ' ') {
            continue;
        }
        word += string[i];
    }
    word += '...';
    return word;
}
