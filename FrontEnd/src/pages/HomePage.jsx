import React, { useEffect } from "react";
import "./homePage.scss";
import Card1 from "../homeCards/card1/Card1";
import Card2 from "../homeCards/card2/Card2";
import Card3 from "../homeCards/card3/Card3";
import CardFooter from "../homeCards/CardFooter/CardFooter";
import { useProductStore } from "../store/useProductStore";
import { useCartStore } from "../store/useCartStore";
import Card4 from "../homeCards/card4/Card4";

function HomePage() {
  const {getProducts}=useProductStore()
  useEffect(() => {
    getProducts() 
  }
  , [])
 
  return (
    <>
      <section className="section--1">
        <div className="section--1--main">
          <div className="pic--hero">
            
            <div className="section--1--img">
              
            </div>

            <div className="hero--h1">
              <h1>
                Say Goodbye to Unhealthy Choices Get{" "}
                <span>Fresh,</span> <span>Healthy</span> Meals!
              </h1>
              <div className="form">
                <form>
                  <input type="text" placeholder="Enter your Location" />
                  <button>Search</button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>
      <Card2 />
      <Card1 />
      <Card3 />
      <Card4/>
      <CardFooter/>
    </>
  );
}

export default HomePage;
