const removeDuplicate = function(array) {
    return [...new Set(array)]
}

console.log(removeDuplicate([1, 2, 2, 3, 3, 3, 4, 5, 5]))