const productModel = require('./productSchema');
const { generateId, formatPrice, findAndUpdateDetails } = require('../utils/helpers');

const uploadItem = async function (item) {
    const { productName, quantity, unitPrice:price } = item;
    const itemObj = {
        id: generateId(),
        name: productName,
        quantity,
        unitPrice: formatPrice(price),
    };

    const response = await productModel.create(itemObj);
    console.log('response: ', response);

    return response;

}

const updateItem = async function (item) {
    const { productName, quantity, unitPrice:price } = item;
    
    const updatedData = {
        name: productName,
        quantity,
        unitPrice: formatPrice(price),
    };   

    const response = await findAndUpdateDetails(productModel, {name: productName}, updatedData);
    return response;
}


module.exports = {
    uploadItem,
    updateItem,
}