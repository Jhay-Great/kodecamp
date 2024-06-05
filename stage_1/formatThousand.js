const formatThousand = function(number) {
    /**format with commas
     * loop through the input or number
     * count from right to left
     * add comma after every 3 digits counted
     * 
     * so:
     * loop would start at the length of input
     * condition for the loop would be initializer greater than 0
     * loop would be decreasing
     * 
     * for or while loop alt. recursive
     * 
     * alt2.0
     * initialize a count variable
     * increment count per every push
     * when count is 3 add a comma
     */

    let num = number.toString();
    let formatted = [];
    
    let count = 0;
    for (let i = num.length - 1; i >= 0; i--) {

        if (count % 3 === 0 && count !== 0) {
            formatted.push(',');
            // continue;
        }
        
        formatted.push(num[i]);
        count++;
    }

    console.log(formatted.reverse().join(''));

    
}



formatThousand(8832);
