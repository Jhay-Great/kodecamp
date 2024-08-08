const productModel = require('./productSchema');
const { userModel } = require('./userSchema')
const { generateId, formatPrice, findAndUpdateDetails, findRequiredData } = require('../utils/helpers');

// const uploadItem = async function (id, item) {
//     const { productName, quantity, unitPrice:price } = item;
//     const response = await userModel.findOne({id: id});
//     const { fullName, id: userId, email, products} = response;
//     console.log(response);

//     if (products === 'undefined') {
//         console.log('run..')
//         const itemObj = {
//             uploadedBy: {
//                 id: userId,
//                 name: fullName, 
//                 email,
//                 products: [
//                     {
//                         id: generateId(),
//                         name: productName,
//                         quantity,
//                         unitPrice: formatPrice(price),
//                     }
//                 ]
//             }
//         };

//         const response = await productModel.create(itemObj);
//         return response.uploadedBy.products;
//     }
    
//     const result = await productModel.findByIdAndUpdate(personId, { $push: { products: item } }, { new: true } );

//     console.log('response: ', result);


// }

const uploadItem = async function (id, item) {
    const { productName, quantity, unitPrice: price } = item;

    // Find the user by ID
    const user = await userModel.findOne({ id: id });
    const { fullName, id: userId, email } = user;

    // console.log('user data: ', user);
    const productObj = await productModel.findOne({ 'uploadedBy.id': id });


    if (productObj) {
        console.log('when there is an existing  product...')
        // If products already exist, update the existing product document
        const result = await productModel.findOneAndUpdate(
            { 'uploadedBy.id': id }, // Find the document by user ID
            { $push: { 'uploadedBy.products': { // Use $push to add the new product
                id: generateId(), // Ensure this function generates unique IDs
                name: productName,
                quantity,
                unitPrice: formatPrice(price),
            } } },
            { new: true } // Return the updated document
        );

        console.log(result);
        
        // Check if update was successful
        if (!result) {
            throw new Error('Failed to update products');
        }

        return result.uploadedBy.products;
    }

    console.log('when there is not existing product')
    // If no products exist, create a new product document with the user's details and the new product
    const itemObj = {
        uploadedBy: {
            id: userId,
            name: fullName,
            email,
            products: [
                {
                    id: generateId(), // Ensure this function generates unique IDs
                    name: productName,
                    quantity,
                    unitPrice: formatPrice(price),
                }
            ]
        }
    };

    // Create a new product document
    const response = await productModel.create(itemObj);
    return response.uploadedBy.products;
    
};


// const updateItem = async function (id, item) {
//     const { productName, quantity, unitPrice:price } = item;
    
//     const updatedData = {
//         name: productName,
//         quantity,
//         unitPrice: formatPrice(price),
//     };   

//     const response = await findAndUpdateDetails(productModel, {name: productName}, updatedData);
//     console.log(response);
//     return response;
// }

const updateItem = async function (userId, item) {
    const { id: productId, productName, quantity, unitPrice: price } = item;

    // Construct the update object
    const updateData = {
        $set: {
            'uploadedBy.products.$[elem].name': productName,
            'uploadedBy.products.$[elem].quantity': quantity,
            'uploadedBy.products.$[elem].unitPrice': formatPrice(price)
        }
    };

    // Specify the array filter to match the product by ID
    const arrayFilters = [
        { 'elem.id': productId }
    ];

    try {
        const result = await productModel.findOneAndUpdate(
            { 'uploadedBy.id': userId }, // Find the document by user ID
            updateData,
            {
                arrayFilters,
                new: true, // Return the updated document
                useFindAndModify: false // Deprecated option, keep it for compatibility
            }
        );

        if (!result) {
            throw new Error('Product not found or failed to update');
        }

        console.log('Updated Document:', result);
        return result.uploadedBy.products;
    } catch (err) {
        console.error('Error updating product:', err);
        throw err;
    }
};


const getMyItems = async function (id) {
    const response = await productModel.findOne({'uploadedBy.id': id});
    // console.log(response.uploadedBy.products);
    return response.uploadedBy.products;
}

// const deleteItem = async function (id, data) {
//     const { id: productId } = data;
//     const response = await productModel.findOne({'uploadedBy.id': id});

//     const items = response.uploadedBy.products

//     items.filter(item => item.id === productId);

//     console.log(items)
// }
const deleteItem = async function (userId, productId) {
    try {
        // Use the $pull operator to remove the specified product from the products array
        const result = await productModel.findOneAndUpdate(
            { 'uploadedBy.id': userId }, // Find the document by user ID
            { $pull: { 'uploadedBy.products': { id: productId } } }, // Remove the product with the specified ID
            { new: true } // Return the updated document
        );

        if (!result) {
            throw new Error('Product not found or failed to delete');
        }

        console.log('Updated Document:', result);
        return result.uploadedBy.products; // Return the updated products array
    } catch (err) {
        console.error('Error deleting product:', err);
        throw err;
    }
};

// getting all the products available
const getProductsFromDB = async function () {
    const response = await productModel.find();

    return response;
}

const getSingleProductFomDB = async function (productId) {
    const response = await productModel.findOne({
        'uploadedBy.products.id': productId
    }, {
        'uploadedBy.products.$': 1
    });    
    
    return response;
}

// const checkoutProducts = async function (data) {
//     const { id, checkout } = data;

//     checkout.map(async (item) => {
//         const response = await productModel.findOne({
//             'uploadedBy.products.id': item.productId
//         }, {
//             'uploadedBy.products.$': 1
//         }); 

//         // console.log(response.uploadedBy.products);
//         const stockData = response.uploadedBy.products;
//         stockData.map(data => {
//             console.log(data.id)
//             if (data.id === item.id) {
//                 console.log(item.id, item.quantity);
//             }
//         })

//         const stockQuantity = response.quantity - item.quantity;
//         // console.log(stockQuantity);
//     })


// }

const checkoutProducts = async function (data) {
    const { id, checkout } = data;

    // Use Promise.all to handle multiple asynchronous operations concurrently
    const results = await Promise.all(checkout.map(async (item) => {
        // Fetch product information from the database based on productId
        const response = await productModel.findOne(
            { 'uploadedBy.products.id': item.productId },
            { 'uploadedBy.products.$': 1 }
        );

        // Ensure response and products exist
        if (!response || !response.uploadedBy || !response.uploadedBy.products) {
            throw new Error(`Product with ID ${item.productId} not found`);
        }

        // Extract the product data from the response
        const stockData = response.uploadedBy.products;

        // Find the specific product to update
        const productToUpdate = stockData.find(product => product.id === item.productId);
        if (!productToUpdate) {
            throw new Error(`Product with ID ${item.productId} not found in stock`);
        }

        // Calculate the new stock quantity
        const newStockQuantity = productToUpdate.quantity - item.quantity;

        // Log for debugging
        console.log(`Updating stock for product ID ${item.productId}: Current quantity ${productToUpdate.quantity}, New quantity ${newStockQuantity}`);

        // Update the stock quantity in the database
        await productModel.updateOne(
            { 'uploadedBy.products.id': item.productId },
            { $set: { 'uploadedBy.products.$.quantity': newStockQuantity } }
        );

        return {
            productId: item.productId,
            oldQuantity: productToUpdate.quantity,
            newQuantity: newStockQuantity
        };
    }));

    return results;
};





module.exports = {
    uploadItem,
    updateItem,
    getMyItems,
    deleteItem,

    getProductsFromDB,
    getSingleProductFomDB,
    checkoutProducts
}