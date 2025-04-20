import React, { useState } from "react";
import CardMiddleItems from "./CardMiddleItems";
import { useProductStore } from "../../store/useProductStore";
import "./card1.scss";
function Card1() {
  const [startIndex, setStartIndex] = useState(0);
  const visibleItems = 4;

  const nextSlide = () => {
    if (startIndex + visibleItems < products.length) {
      setStartIndex(startIndex + 1);
    }
  };
  const previousSlide = () => {
    if (startIndex > 0) {
      setStartIndex(startIndex - 1);
    }
  };
  const {products}=useProductStore()

  return (
    <div style={{display:"flex",gap:"40px",flexDirection:"column",marginTop:"110px"}}>
      <h3 style={{marginLeft:"10%",fontWeight:"600", color:"rgba(32, 32, 32, 0.89)",fontSize:"20px"}}>Find Popular Food</h3>
    <div className="sec--2--main">
      
      
      <div className="left">
        
        <button className="nav-button-1" onClick={previousSlide}>
          ◀
        </button>
      </div>

      <div className="middle">
        {products.slice(startIndex, visibleItems + startIndex).map((item) => (
          <CardMiddleItems key={item.id} items={item} />
        ))}
      </div>
      <div className="right">
        <button className="nav-button-2" onClick={nextSlide}>
          ▶
        </button>
      </div>
    </div>
    </div>
  );
}

export default Card1;
