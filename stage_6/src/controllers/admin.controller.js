const { uploadItem, updateItem } = require('../model/product.model');

const uploadProduct = async function (req, res) {
    const response = await uploadItem(req.body);
    const { name, quantity, unitPrice } = response;

    return res.status(201).json({
        success: true,
        message: `product saved`,
        data: { name, quantity, unitPrice }
    })

    
}

const updateProduct = async function (req, res) {
    try {
        const response = await updateItem(req.body);

        if (response === null) return res.status(401).json({
            error: true,
            message: `Failed to update selected item`,
        })
    
        return res.status(200).json({
            success: true,
            message: `successfully updated`,
            data: response,
        })
        
    } catch (error) {
        
    }


}

module.exports = {
    uploadProduct,
    updateProduct,
}