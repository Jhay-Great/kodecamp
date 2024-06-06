const linearSearch = function(array, searchQuery) {
    for (let word of array) {
        if (word === searchQuery) return 'Yes'
    }
    return 'No';
}
