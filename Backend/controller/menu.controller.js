import pool from "../db/db.js";


export const getAllMenus = async (req, res) => {
  try {
    const menus = await pool.query("SELECT * FROM menu ORDER BY id");

    res.status(200).json(menus.rows);
  } catch (error) {
    console.error("Error in getAllMenus:", error);
    res.status(500).json({ message: error.message });
  }
};
export const getAllFoodItems = async (req, res) => {
    try {
      const foodItems = await pool.query("SELECT id, name,image FROM products ORDER BY name");
      res.status(200).json(foodItems.rows);
    } catch (error) {
      console.error("Error in getAllFoodItems:", error);
      res.status(500).json({ message: error.message });
    }
  };


export const createMenu = async (req, res) => {
  try {
    const { month, day_of_week, meal_time, food_item_id } = req.body;

    const menuQuery =
      "INSERT INTO menu(month, day_of_week, meal_time, food_item_id) values($1,$2,$3,$4) RETURNING *";
    
    const newMenu = await pool.query(menuQuery, [
      month,
      day_of_week,
      meal_time,
      food_item_id,
    ]);

    res.status(201).json(newMenu.rows[0]);
  } catch (error) {
    console.error("Error in createMenu:", error);
    res.status(500).json({ message: error.message });
  }
};


export const updateMenu = async (req, res) => {
  try {
    const { id } = req.params;
    const { month, day_of_week, meal_time, food_item_id } = req.body;

    const existingMenuQuery = "SELECT * FROM menu WHERE id = $1";
    const existingMenuResult = await pool.query(existingMenuQuery, [id]);

    if (existingMenuResult.rows.length === 0) {
      return res.status(404).json({ message: "Menu not found" });
    }

    const updateQuery = `
      UPDATE menu 
      SET month = COALESCE($1, month),
          day_of_week = COALESCE($2, day_of_week),
          meal_time = COALESCE($3, meal_time),
          food_item_id = COALESCE($4, food_item_id)
      WHERE id = $5 RETURNING *;
    `;
    
    const updatedMenu = await pool.query(updateQuery, [
      month,
      day_of_week,
      meal_time,
      food_item_id,
      id,
    ]);

    res.status(200).json(updatedMenu.rows[0]);
  } catch (error) {
    console.error("Error updating menu:", error);
    res.status(500).json({ message: error.message });
  }
};


export const deleteMenu = async (req, res) => {
  try {
    const { id } = req.params;

    const existingMenuQuery = "SELECT * FROM menu WHERE id = $1";
    const existingMenuResult = await pool.query(existingMenuQuery, [id]);

    if (existingMenuResult.rows.length === 0) {
      return res.status(404).json({ message: "Menu not found" });
    }

    const deleteQuery = "DELETE FROM menu WHERE id = $1";
    await pool.query(deleteQuery, [id]);

    res.status(200).json({ message: "Menu deleted successfully" });
  } catch (error) {
    console.error("Error deleting menu:", error);
    res.status(500).json({ message: error.message });
  }
};
