const uploadProduct = async function (req, res) {
    const { productName } = req.body;
    
    const response = await uploadItem(productName);

    
}

module.exports = {
    uploadProduct,
}