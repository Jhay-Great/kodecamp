const formatThousand = function(number) {
    
    let num = number.toString();
    let formatted = [];
    
    let count = 0;
    for (let i = num.length - 1; i >= 0; i--) {

        if (count % 3 === 0 && count !== 0) {
            formatted.push(',');
        }
        
        formatted.push(num[i]);
        count++;
    }

    return formatted.reverse().join('');
}



