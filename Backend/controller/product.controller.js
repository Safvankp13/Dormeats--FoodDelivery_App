import sharp from "sharp";
import cloudinary from "../cloudinary.js";
import pool from "../db/db.js";
import fs from "fs";
import path from "path";
import os from "os";
export const getAllProducts = async (req, res) => {
  try {
    const products = await pool.query("SELECT * FROM products ORDER BY id");

    res.status(200).json(products.rows);
  } catch (error) {
    console.error("Error in getAllProducts:", error);
    res.status(500).json({ message: error.message });
  }
};
export const createProducts = async (req, res) => {
  try {
    const { name, description, price, category, image } = req.body;
    let cloudinaryResponse = null;
    let tempFilePath = "";

    if (image) {
      const base64Data = image.replace(/^data:image\/\w+;base64,/, "");
      const imageBuffer = Buffer.from(base64Data, "base64");
      tempFilePath = path.join(os.tmpdir(), "compressedImage.jpg");

      await sharp(imageBuffer)
        .resize({ width: 1024 })
        .jpeg({ quality: 80 })
        .toFile(tempFilePath);

      cloudinaryResponse = await cloudinary.uploader.upload(tempFilePath, {
        folder: "products",
      });
      fs.unlinkSync(tempFilePath);
    }
    const productQuery =
      "INSERT INTO products(name,description,price,category,image) values($1,$2,$3,$4,$5)Returning *";
    const newProduct = await pool.query(productQuery, [
      name,
      description,
      price,
      category,
      cloudinaryResponse?.secure_url ? cloudinaryResponse.secure_url : "",
    ]);
    res.status(201).json(newProduct.rows[0]);
  } catch (error) {
    console.error("Error in createProducts:", error);
    res.status(500).json({ message: error.message });
  }
};

export const updateProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, description, price, category, image } = req.body;
    const existingProductQuery = "SELECT * FROM products WHERE id = $1";
    const existingProductResult = await pool.query(existingProductQuery, [id]);
    if (existingProductResult.rows.length === 0) {
      return res.status(404).json({ message: "Product not found" });
    }
    let existingImageUrl = existingProductResult.rows[0].image;
   let updatedImage=null

    let cloudinaryResponse = null;
    let tempFilePath = "";
    if (image) {
      if (existingImageUrl) {
        const publicId = existingImageUrl.split("/").pop().split(".")[0];
        await cloudinary.uploader.destroy(`products/${publicId}`);
      }
      const base64 = image.replace(/^data:image\/\w+;base64,/, "");
      const imageBuffer = Buffer.from(base64, "base64");
      tempFilePath = path.join(os.tmpdir(), "compressedImage.jpg");
      await sharp(imageBuffer)
        .resize({ width: 1024 })
        .jpeg({ quality: 80 })
        .toFile(tempFilePath);

      cloudinaryResponse = await cloudinary.uploader.upload(tempFilePath, {
        folder: "products",
      });
      fs.unlinkSync(tempFilePath);
      updatedImage = cloudinaryResponse.secure_url;
    }

    const updateQuery = `
      UPDATE products 
      SET name = COALESCE($1, name),
          description = COALESCE($2, description),
          price = COALESCE($3, price),
          category = COALESCE($4, category),
          image = COALESCE($5, image)
      WHERE id = $6 RETURNING *;
    `;
    const updatedProduct=await pool.query(updateQuery,[name,description,price,category,updatedImage,id])
    res.status(200).json(updatedProduct.rows[0]);
  } catch (error) {
    console.error("Error updating product:", error);
    res.status(500).json({ message: error.message });
  }
};
export const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const existingProductQuery = "SELECT * FROM products WHERE id = $1";
    const existingProductResult = await pool.query(existingProductQuery, [id]);
    if (existingProductResult.rows.length === 0) {
      return res.status(404).json({ message: "Product not found" });
    }
    const existingImageUrl = existingProductResult.rows[0].image;
    if (existingImageUrl) {
      const publicId = existingImageUrl.split("/").pop().split(".")[0];
      await cloudinary.uploader.destroy(`products/${publicId}`);
    }
    const deleteQuery = "DELETE FROM products WHERE id = $1";
    await pool.query(deleteQuery, [id]);
    res.status(200).json({ message: "Product deleted successfully" });
  } catch (error) {
    console.error("Error deleting product:", error);
    res.status(500).json({ message: error.message });
  }
}
