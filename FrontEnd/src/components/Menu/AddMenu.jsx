import React, { useEffect } from 'react';
import '../createProducts/createProducts.scss';
import { useMenuStore } from '../../store/useMenuStore';
import toast from 'react-hot-toast';

const AddMenu = () => {
  const { createMenu, getFoodItems, foodItems } = useMenuStore();
  const [newMenu, setNewMenu] = React.useState({
    month: "",
    day_of_week: "",
    meal_time: "",
    food_item_id: "",
  });

  useEffect(() => {

    getFoodItems();
  }, [getFoodItems]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
        console.log(newMenu);
      await createMenu(newMenu);
      setNewMenu({
        month: "",
        day_of_week: "",
        meal_time: "",
        food_item_id: "",
      });
    } catch (error) {
      console.log('Error creating Menu');
    }
  };

  const handleChange = (e) => {
    setNewMenu({ ...newMenu, [e.target.name]: e.target.value });
  };


  const months = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];

  const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
  const mealTimes = ["Breakfast", "Lunch", "Dinner"];

  return (
    <div className="cr--products--main">
      <div className="cr--products--container">
        <h2>Create Menu</h2>
        <div className="cr--products--form">
          <form onSubmit={handleSubmit}>
            <div className="cr--products--input">
              <label htmlFor="month">Month</label>
              <select
                id="month"
                name="month"
                value={newMenu.month}
                onChange={handleChange}
              >
                <option value="">Select Month</option>
                {months.map((month, index) => (
                  <option key={index} value={index + 1}>
                    {month}
                  </option>
                ))}
              </select>
            </div>

            <div className="cr--products--input">
              <label htmlFor="day_of_week">Day of the Week</label>
              <select
                id="day_of_week"
                name="day_of_week"
                value={newMenu.day_of_week}
                onChange={handleChange}
              >
                <option value="">Select Day</option>
                {days.map((day, index) => (
                  <option key={index} value={day}>
                    {day}
                  </option>
                ))}
              </select>
            </div>

            <div className="cr--products--input">
              <label htmlFor="meal_time">Meal Time</label>
              <select
                id="meal_time"
                name="meal_time"
                value={newMenu.meal_time}
                onChange={handleChange}
              >
                <option value="">Select Meal Time</option>
                {mealTimes.map((meal, index) => (
                  <option key={index} value={meal}>
                    {meal}
                  </option>
                ))}
              </select>
            </div>

           
            <div className="cr--products--input">
              <label htmlFor="food_item_id">Food Item</label>
              <select
                id="food_item_id"
                name="food_item_id"
                value={newMenu.food_item_id}
                onChange={handleChange}
              >
                <option value="">Select Food Item</option>
                {foodItems && foodItems.length > 0 ? (
                  foodItems.map((item) => (
                    <option key={item.id} value={item.id}>
                      {item.name}
                    </option>
                  ))
                ) : (
                  <option disabled>Loading food items...</option>
                )}
              </select>
            </div>

            <button type="submit">Create Menu</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddMenu;
