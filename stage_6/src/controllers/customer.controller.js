
// local imports
const { getProductsFromDB, getSingleProductFomDB } = require('../model/product.model')

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
    // console.log(productId); 
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


const productCheckout = async function (req, res) {};


module.exports = { allProducts, productItem, productCheckout }