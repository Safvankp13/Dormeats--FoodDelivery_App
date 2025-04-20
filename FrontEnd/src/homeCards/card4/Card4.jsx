import { useNavigate } from "react-router-dom";
import "./card4.scss";
import React from "react";
export default function Card4() {
  const navigate = useNavigate();
  const donatedMeals = 1843;
  const goal = 5000;
  const percentage = Math.min((donatedMeals / goal) * 100, 100).toFixed(1);

  return (
    <section className="donation-section">
      <div className="donation">
        <h2>Don’t waste it — donate it. Every bite counts.</h2>
        <div className="donation-main">
          <div className="donation-row">
            <div className="row-1">
              <img src="Resourses/updated_givesure_one.jpg" alt="" />
            </div>
            <div className="row-2">
              <div className="row-2-heading">
                <img src="Resourses/donate_3430447.png" alt="" />
                <h3>Why we Donate Food!</h3>
              </div>
              <p>
                We all know what it’s like to be hungry not just for food, but
                for comfort, support, and the feeling that someone cares. That’s
                why we’ve made food donation a part of who we are. Every time
                you order from us, you’re not just feeding yourself you’re
                helping us feed someone who really needs it. Maybe it’s a
                student far from home, a family going through a rough patch, or
                someone who's just having a hard day. It’s simple, really. If we
                have the power to share a meal, why wouldn’t we? Together, we’re
                turning your everyday meals into small acts of kindness and
                those add up to something truly meaningful.
              </p>
            </div>
          </div>
          {/* <div className="donation-row">
            <div className="row-2">
              <div className="row-2-heading">
                <img src="/Resourses/help.png" alt="" />
                <h3 style={{ color: " rgb(16, 154, 218)", fontSize: "30px" }}>
                  Our Vision
                </h3>
              </div>
              <p>
                Food is more than just fuel it’s care, it’s comfort, it’s
                connection. While we serve meals with love every day, we believe
                that love shouldn’t stop at our customers. Our vision is to make
                sure that good food reaches those who need it most. A small act
                like sharing a meal can mean everything to someone. We’re
                building a future where no one is left out at the table where
                every meal makes a difference.
              </p>
            </div>
            
            <div className="row-1">
              <img src="Resourses/updated_givesure_two.jpg" alt="" />
            </div>
            
          </div> */}
          <div className="row-3">
            <div className="row-3-1">
              <div className="row-3-1-flex">
                <img src="Resourses/happy_4980254.png" alt="" />
                <h4>14,342,10 - Meals Donated</h4>
              </div>
            </div>
            <div className="row-3-2">
              <h3>Now Its Your Turn</h3>
              <button onClick={() =>window.open("https://givesure.eatsure.com/", "_blank")}>
                Donate Now!
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
