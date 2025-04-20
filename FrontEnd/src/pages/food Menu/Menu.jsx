import React, { useEffect, useState } from "react";
import { useMenuStore } from "../../store/useMenuStore";
import { useMembershipStore } from "../../store/useMembershipStore";
import "./menu.scss";
import axios from "../../lib/axios";

const Menu = () => {
  const { menu, loading, getMenu, getFoodItems, foodItems } = useMenuStore();
  const { membership} = useMembershipStore();


  const [currentMealTime, setCurrentMealTime] = useState("Breakfast");
  const [progress, setProgress] = useState(0);
  const [isSkipped, setIsSkipped] = useState(false);
  const [skipLoading, setSkipLoading] = useState(false);

  const mealDuration = 3 * 60 * 60 * 1000;
  const kitchenProgress = (progress / mealDuration) * 100;

 
  useEffect(() => {


    if (!menu || menu.length === 0) {
      getMenu();
      getFoodItems();
    }
  }, [menu, getMenu, getFoodItems]);

  

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prev) => (prev < mealDuration ? prev + 1000 : 0));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const handleSkipToday = async () => {
 
    try {
      
      const res = await axios.post("/membership/skip-today");
      if (res.status === 200) {
        setIsSkipped(true);        
      }
    } catch (err) {
      console.error(err);
    } 
  };

  const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
  const menuByDay = {};
  days.forEach((day) => {
    menuByDay[day] = { Breakfast: null, Lunch: null, Dinner: null };
  });

  menu.forEach((item) => {
    if (menuByDay[item.day_of_week]) {
      menuByDay[item.day_of_week][item.meal_time] =
        foodItems.find((food) => food.id === item.food_item_id)?.name || "N/A";
    }
  });

  const today = new Date().toLocaleDateString("en-US", { weekday: "long" });
  const timeElapsed = Math.floor(progress / (60 * 1000));
  const timeLeft = Math.floor((mealDuration - progress) / (60 * 1000));

  return (
    <div className="menu-table-container">
      <h2 className="menu-heading">🍽 Food Menu</h2>

      <div className="kitchen-status">
        <h3>{currentMealTime} Status</h3>
        <p>
          {`${currentMealTime} is ${Math.floor(kitchenProgress)}% complete. 
          ${timeElapsed} min passed, ${timeLeft} min left.`}
        </p>
        <div className="progress-bar">
          <div
            className="progress"
            style={{
              width: `${kitchenProgress}%`,
              backgroundColor: kitchenProgress === 100 ? "green" : "#ff8a00",
            }}
          ></div>
        </div>
        <p>{Math.floor(kitchenProgress)}% Complete</p>

        {!isSkipped ? (
          <button className="skip-btn" onClick={handleSkipToday} disabled={!membership}>
            {skipLoading ? "Skipping..." : "Skip Today"}
          </button>
        ) : (
          <p className="skip-msg">✅ Today's meals have been skipped.</p>
        )}
      </div>

      {loading ? (
        <p>Loading menu...</p>
      ) : (
        <table className="food-table">
          <thead>
            <tr>
              <th>Day</th>
              <th>Breakfast 🥞</th>
              <th>Lunch 🍛</th>
              <th>Dinner 🍲</th>
            </tr>
          </thead>
          <tbody>
            {days.map((day) => (
              <tr key={day}>
                <td>{day}</td>
                <td>{menuByDay[day].Breakfast || "—"}</td>
                <td>{menuByDay[day].Lunch || "—"}</td>
                <td>{menuByDay[day].Dinner || "—"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default Menu;
