import Product from '../models/product.model.js';
import User from '../models/user.model.js';


export const createProduct=async(req,res)=>{
    try {
   const { name, price, description, image, stock, category } = req.body;

    const product = await Product.create({
      name,
      price,
      description,
      image: req.file.path,
      stock,
      category,
      createdBy: req.user._id
    });

    res.status(201).json({
      message: "Product created successfully",
      product
    });

  } catch (error) {
    if (error.name === "ValidationError") {
      return res.status(400).json({
        message: "Validation failed",
        errors: error.errors
      });
    }

    res.status(500).json({
      message: "Server error",
      error: error.message
    });
  }

}

export const getProducts=async(req,res)=>{
   
      try {
    let products;

    if (req.user.role === "ADMIN") {
      products = await Product.find();
    } else {
      products = await Product.find({ isActive: true });
    }

    res.status(200).json({
      count: products.length,
      products
    });

    }catch(error){
        res.status(500).json({message:"Server error",error:error.message});
    }

}

export const updateProduct = async (req, res) => {
  try {
   

    const updates = { ...req.body };

  if (req.file) {
    updates.image = req.file.path;
  }

  const product = await Product.findByIdAndUpdate(
    req.params.id,
    updates,
    { new: true }
  );

  res.json({ product });

  } catch (error) {
    if (error.name === "ValidationError") {
      return res.status(400).json({
        message: "Validation failed",
        errors: error.errors
      });
    }

    res.status(500).json({
      message: "Server error",
      error: error.message
    });
  }
};


export const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;

    const product = await Product.findByIdAndUpdate(
      id,
      { isActive: false },
      { new: true }
    );

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.status(200).json({
      message: "Product deleted successfully"
    });

  } catch (error) {
    res.status(500).json({
      message: "Server error",
      error: error.message
    });
  }
};