const Product = require('../../models/product.model');

exports.createProduct = async (req, res) =>{
    try {
        const {title, description, images, price, quantity, category} = req.body;

        const product = new Product({
            title,
            description,
            images,
            price,
            quantity,
            category
        });

        await product.save();
        res.status(201).json({ product_id: product.product_id, message: 'New Product is created...'})
        
    } catch (err) {
        console.log(err);
        res.status(500).json({message: 'Failed to Create Product'});
    }
};


exports.getAllProducts = async (req, res) =>{
    try {
        const getProducts = await Product.find();
        res.status(200).json(getProducts);
        
    } catch (err) {
        console.log(err);
        res.status(500).json({message: 'Failed to Get All Product'});  
    }
};


exports.getProduct = async (req, res) =>{
    try {
        const getProduct = await Product.findById(req.params.id);

        if(!getProduct)
            res.status(400).json({message:'Product is not found...'});
        res.status(200).json({product_id: getProduct._id,title:getProduct.title, description: getProduct.description, images: getProduct.images, price: getProduct.price, quantity: getProduct.quantity});
        
    } catch (err) {
        console.log(err);
        res.status(500).json({message: 'Failed to Get Product Details'});  
    }
};

exports.updateProduct = async (req, res) =>{
    try {
        const getProduct = await Product.findById(req.params.id);

        if(!getProduct)
            res.status(400).json({message:'Product is not found...'});

        const updateProduct = await Product.findByIdAndUpdate(getProduct, req.body);

        await updateProduct.save();
        res.status(200).json({product_id: updateProduct._id,title:updateProduct.title, description: updateProduct.description, images: updateProduct.images, price: updateProduct.price, quantity: updateProduct.quantity, message: 'Product is Updated...'});
        
    } catch (err) {
        console.log(err);
        res.status(500).json({message: 'Failed to Update Product'});  
    }
};


exports.removeProduct = async (req, res) =>{
    try {
        const getProduct = await Product.findById(req.params.id);

        if(!getProduct)
            res.status(400).json({message:'Product is not found...'});

        const removeProduct = await Product.findByIdAndRemove(getProduct);
        res.status(200).json({product_id: removeProduct._id,title:removeProduct.title, description: removeProduct.description, images: removeProduct.images, price: removeProduct.price, quantity: removeProduct.quantity, message: 'Product is Removed...'});
        
    } catch (err) {
        console.log(err);
        res.status(500).json({message: 'Failed to Removed Product'});  
    }
};