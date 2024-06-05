const formatName = function(name) {
    
    return name.toLowerCase().split(' ').filter(name => name !== '').map(name => name.replace(name.at(0), name.at(0).toUpperCase())).join(' ');

};

console.log(formatName('red victor'))