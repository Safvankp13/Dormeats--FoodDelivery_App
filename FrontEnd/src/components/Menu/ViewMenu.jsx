import React, { useEffect, useState } from 'react';
import './viewMenu.scss';
import EditIcon from '@mui/icons-material/Edit';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import SaveAsIcon from '@mui/icons-material/SaveAs';
import CancelIcon from '@mui/icons-material/Cancel';
import { useMenuStore } from '../../store/useMenuStore';
import Modal from '../../Models/Modal';

const months = [
  "", "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];

const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
const meals = ["Breakfast", "Lunch", "Dinner"];

const ViewMenu = () => {
  const { menu, getMenu, updateMenu, deleteMenu, getFoodItems, foodItems } = useMenuStore();
  const [edit, setEdit] = useState(null);
  const [nav, setNav] = useState('month');
  const [newMenu, setNewMenu] = useState({
    month: "", day_of_week: "", meal_time: "", food_item_id: ""
  });

  useEffect(() => {
    getMenu();
    getFoodItems();
  }, []);

  useEffect(() => {
    if (edit) {
      setNewMenu({
        month: edit.month || "",
        day_of_week: edit.day_of_week || "",
        meal_time: edit.meal_time || "",
        food_item_id: edit.food_item_id || "",
      });
    }
  }, [edit]);

  const handleChange = (e) => {
    setNewMenu({ ...newMenu, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await updateMenu(edit.id, newMenu);
      setEdit(null);
      setNav('month');
    } catch (error) {
      console.log("Error updating menu");
    }
  };

  const getFoodItemById = (id) => {
    return foodItems.find((f) => f.id === id) || {};
  };

  return (
    <div className='view--menu'>
      <table>
        <thead>
          <tr>
            <th>Food</th>
            <th>Month</th>
            <th>Day</th>
            <th>Meal</th>
            <th>Edit</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {menu?.map(item => {
            const food = getFoodItemById(item.food_item_id);
            return (
              <tr key={item.id}>
                <td className="food-cell">
                  <div className="food-info">
                    {food.image && <img src={food.image} alt={food.name} className="food-img" />}
                    <span>{food.name}</span>
                  </div>
                </td>
                <td>{months[item.month]}</td>
                <td>{item.day_of_week}</td>
                <td>{item.meal_time}</td>
                
                <td><EditIcon fontSize='small' onClick={() => setEdit(item)} /></td>
                <td><DeleteOutlineIcon fontSize='small' className='delete-icon' onClick={() => deleteMenu(item.id)} /></td>
              </tr>
            );
          })}
        </tbody>
        <tfoot>
          <tr>
            <td colSpan="3"><strong>Total Menus:</strong></td>
            <td colSpan="3">{menu?.length}</td>
          </tr>
        </tfoot>
      </table>

      {edit && (
        <Modal onClose={() => { setEdit(null); setNav('month'); }}>
          <div className='edit--form--flex'>
            <div className="top">
              {['month', 'day_of_week', 'meal_time', 'food_item_id'].map((tab) => (
                <button key={tab} className={`tab ${nav === tab ? "active" : ""}`} onClick={() => setNav(tab)}>{tab}</button>
              ))}
            </div>
            <div className="bottom">
              {nav === "month" && (
                <div className='bottom--edit'>
                  <label htmlFor="month">Month</label>
                  <select name="month" value={newMenu.month} onChange={handleChange}>
                    <option value="">Select</option>
                    {months.map((m, idx) => idx > 0 && <option key={idx} value={idx}>{m}</option>)}
                  </select>
                </div>
              )}
              {nav === "day_of_week" && (
                <div className='bottom--edit'>
                  <label>Day</label>
                  <select name="day_of_week" value={newMenu.day_of_week} onChange={handleChange}>
                    <option value="">Select</option>
                    {days.map(day => <option key={day} value={day}>{day}</option>)}
                  </select>
                </div>
              )}
              {nav === "meal_time" && (
                <div className='bottom--edit'>
                  <label>Meal Time</label>
                  <select name="meal_time" value={newMenu.meal_time} onChange={handleChange}>
                    <option value="">Select</option>
                    {meals.map(meal => <option key={meal} value={meal}>{meal}</option>)}
                  </select>
                </div>
              )}
              {nav === "food_item_id" && (
                <div className='bottom--edit'>
                  <label>Food Item</label>
                  <select name="food_item_id" value={newMenu.food_item_id} onChange={handleChange}>
                    <option value="">Select</option>
                    {foodItems.map(item => (
                      <option key={item.id} value={item.id}>{item.name}</option>
                    ))}
                  </select>
                </div>
              )}
              <div className='bottom--buttons'>
                <button className='btn' onClick={handleSubmit}><SaveAsIcon className="icon" /> Save</button>
                <button className='btn' onClick={() => { setEdit(null); setNav('month'); }}><CancelIcon className="icon" /> Cancel</button>
              </div>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
};

export default ViewMenu;
