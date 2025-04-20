import pool from "../db/db.js";



export const getCartProducts=async(req,res)=>{
    const userId = req.user.id;
    try {
        const cartProducts = await pool.query(
    
                `SELECT 
                  cart.id,
                  cart.quantity,
                  products.name,
                  products.image,
                  products.price
                FROM cart
                JOIN products ON cart.product_id = products.id
                WHERE cart.user_id = $1 ORDER BY id`,
            
              
            [userId]
        );
        res.status(200).json(cartProducts.rows);
      
    } catch (error) {
        console.error("Error fetching cart products:", error);
        res.status(500).json({ message: "Internal server error" });
    }

}

export const addToCart = async (req, res) => {
    const userId = req.user.id;
    const { productId, quantity } = req.body;
    
    try {
        const existingProduct = await pool.query(
        "SELECT * FROM cart WHERE user_id = $1 AND product_id = $2",
        [userId, productId]
        );
    
        if (existingProduct.rows.length > 0) {
        await pool.query(
            "UPDATE cart SET quantity = quantity + $1 WHERE user_id = $2 AND product_id = $3",
            [quantity, userId, productId]
        );
        } else {
        await pool.query(
            "INSERT INTO cart (user_id, product_id, quantity) VALUES ($1, $2, $3)",
            [userId, productId, quantity]
        );
        }
    
        res.status(200).json({ message: "Product added to cart successfully" });
    } catch (error) {
       
        console.error("Error adding to cart:", error);
        res.status(500).json({ message: "Internal server error" });
    }
}

export const updateQuantity = async (req, res) => {
    try {
        
    
    
    const {id:productId} = req.params;
    const userId = req.user.id;
    const { quantity } = req.body;
    const existingProduct = await pool.query(
        "SELECT * FROM cart WHERE user_id = $1 AND id = $2",
        [userId, productId]
    );
    if(existingProduct.rows.length>0){
        if(existingProduct.rows[0].quantity==0){
           const result = await pool.query(
            "DELETE FROM cart WHERE user_id = $1 AND id = $2",
            [userId, productId]
            )
            res.json(result.rows);}
        else{
            await pool.query(
                "UPDATE cart SET quantity = $1 WHERE user_id = $2 AND id = $3",
                [quantity, userId, productId]
            );
            res.status(200).json({ message: "Product quantity updated successfully" });
        }

    }
}
    catch (error) {
        console.error("Error updating product quantity:", error);
        res.status(500).json({ message: "Internal server error" });
    }
}
export const deleteFromCart = async (req, res) => {
    const userId = req.user.id;
    const { id: productId } = req.params;
    
    try {
        await pool.query("DELETE FROM cart WHERE user_id = $1 AND id = $2", [userId, productId]);
        res.status(200).json({ message: "Product removed from cart successfully" });
    } catch (error) {
        console.error("Error removing product from cart:", error);
        res.status(500).json({ message: "Internal server error" });
    }
}