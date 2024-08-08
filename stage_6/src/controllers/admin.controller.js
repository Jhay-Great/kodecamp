const { uploadItem, updateItem, getMyItems, deleteItem } = require('../model/product.model');

const uploadProduct = async function (req, res) {
    const { id } = req;
    const response = await uploadItem(id, req.body);
    const data = response;

    return res.status(201).json({
        success: true,
        message: `product saved`,
        data
    })

    
}

const updateProduct = async function (req, res) {
    try {
        const { id } = req;
        const response = await updateItem(id, req.body);

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
        console.log(error);
        return res.status(500).json({
            error: true,
            messge: `Internal server error`
        })
    }


}

const viewProduct = async function (req, res) {
    try {
        const { id } = req;
        const response = await getMyItems(id);
        console.log(response);
        
        if (response.length < 1) return res.status(404).json({
            error: true,
            message: 'No items available currently, kindly restock',
        })
    
        return res.status(200).json({
            success: true,
            message: `Your items`,
            data: response,
        })
        
    } catch (error) {
        
    }
}

const deleteProduct = async function (req, res) {
    try {
        const { id: userId } = req;
        const { id: productId } = req.body;
        const response = await deleteItem(userId, productId);
        return res.status(200).json({
            success: true,
            message: `Successfully deleted`,
            currentData: response,
        })
        
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            error: true,
            message: `Internal server error`
        })
    }
}

module.exports = {
    uploadProduct,
    updateProduct,
    viewProduct, 
    deleteProduct,
}