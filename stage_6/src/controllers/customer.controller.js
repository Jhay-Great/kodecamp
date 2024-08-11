
// local imports
const { getProductsFromDB, getSingleProductFomDB, checkoutProducts, processOrders } = require('../model/product.model')

const allProducts = async function (req, res) {
    try {
        const products = await getProductsFromDB()
        if (products === null) return res.status(200).json({
            message: `No products available currently`
        })

        return res.status(200).json({
            success: true,
            message: products,
        })
        
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            error: true,
            message: `Internal server error`,
        })
    }
};


const productItem = async function (req, res) {
    const { productId } = req.params;
    const product = await getSingleProductFomDB(productId);

    if (product === null) return res.status(403).json({
        success: false,
        message: `Item is currently not available`,
        data: product,
    })
    
    return res.status(200).json({
        success: true,
        message: product,
    })
};


// const productCheckout = async function (req, res) {

//     try {
//         const { id } = req;
//         const purchaseData = req.body;
    
//         const response = await checkoutProducts(purchaseData);
    
//         console.log(response);
    
//         return res.status(200).json({
//             success: true,
//             message: `Successfully checked out products`
//         })
        
//     } catch (error) {
//         console.log(error);
//         return res.status(500).json({
//             error: true,
//             message: `Internal server error`,
//         })
//     }

// };

const orders = async function (req, res) {
    const { id } = req;
    try {
        const {orders} = req.body;
        // console.log('placed orders: ', orders);
        const response = await processOrders(id, orders);
    
        if (response === null) return res.status(402).json({
            success: false,
            message: `Failed to place order`,
        });

        const purchaseData = response.orders.map(order => ({item: order.productName, cost: order.cost}))
    
        return res.status(200).json({
            success: true,
            message: `Your orders has been placed successfully`,
            data: purchaseData,
        })
        
    } catch (error) {
        console.log(error);
        return res.status(200).json({
            error: true,
            message: `Internal server error, kindly contact admin via www.kodecamp.org`
        })
    }

}


module.exports = { allProducts, productItem, /*productCheckout,*/ orders }


// register, login, reset their password, view all products, view a single product, checkout with products

/**checkout
 * the checkout will record the products ordered, the user that ordered the product and the status of that product
 */