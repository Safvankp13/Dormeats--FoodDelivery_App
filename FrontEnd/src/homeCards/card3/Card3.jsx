import React, { useState, useEffect } from "react";
import "./card3.scss";
import { useCartStore } from '../../store/useCartStore';
import TuneIcon from "@mui/icons-material/Tune";
import Card3Items from "./Card3Items";
import Modal from "../../Models/Modal";
import { Modal as MuiModal } from "@mui/material";
import { useProductStore } from "../../store/useProductStore";

const filterOptions = {
  Category: ["Biriyani", "Dosa", "Chicken Parotta", "Puttu", "Uppma", "Appam"],
  Price: ["₹0 - ₹50", "₹50 - ₹100", "₹100 - ₹150", "₹150 - ₹200", "₹200+"],
  Rating: ["1 Star", "2 Stars", "3 Stars", "4 Stars", "5 Stars"],
  "Veg/ Non-veg": ["Veg", "Non-Veg"],
};

const Card3 = () => {
  const { addToCart } = useCartStore();
  const { products } = useProductStore();

  const [isOpen, setIsOpen] = useState(false);
  const [activeFilter, setActiveFilter] = useState("Category");
  const [sortOption, setSortOption] = useState("");
  const [open, setOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [tempFilters, setTempFilters] = useState({
    Category: [],
    Price: [],
    Rating: [],
    "Veg/ Non-veg": [],
  });
  const [appliedFilters, setAppliedFilters] = useState({
    Category: [],
    Price: [],
    Rating: [],
    "Veg/ Non-veg": [],
  });

  const handleSelect = (category, value) => {
    setTempFilters((prev) => {
      const isSelected = prev[category].includes(value);
      const updated = isSelected
        ? prev[category].filter((item) => item !== value)
        : [...prev[category], value];
      return { ...prev, [category]: updated };
    });
  };

  const handleApply = () => {
    setAppliedFilters(tempFilters);
    setIsOpen(false);
  };

  const handleClear = () => {
    const emptyFilters = {
      Category: [],
      Price: [],
      Rating: [],
      "Veg/ Non-veg": [],
    };
    setTempFilters(emptyFilters);
    setAppliedFilters(emptyFilters);
  };

  const isMatch = (product) => {
    const { Category, Price, Rating, "Veg/ Non-veg": Type } = appliedFilters;

    const categoryMatch = Category.length === 0 || Category.includes(product.category);
    const typeMatch = Type.length === 0 || Type.includes(product.type);
    
    const priceMatch = Price.length === 0 || Price.some((range) => {
      const price = product.price;
      if (range === "₹0 - ₹50") return price <= 50;
      if (range === "₹50 - ₹100") return price > 50 && price <= 100;
      if (range === "₹100 - ₹150") return price > 100 && price <= 150;
      if (range === "₹150 - ₹200") return price > 150 && price <= 200;
      if (range === "₹200+") return price > 200;
      return false;
    });
    const ratingMatch = Rating.length === 0 || Rating.some((selectedRating) => {
      const roundedRating = `${Math.round(product.rating)} Star`;
      return selectedRating === roundedRating;
    });

    return categoryMatch && typeMatch && priceMatch && ratingMatch;
  };

  const filteredProducts = products
    .filter(isMatch)
    .sort((a, b) => {
      switch (sortOption) {
        case "Price: Low to High":
          return a.price - b.price;
        case "Price: High to Low":
          return b.price - a.price;
        case "Rating: High to Low":
          return b.rating - a.rating;
        default:
          return 0;
      }
    });

  const handleOpen = (item) => {
    setSelectedItem(item);
    setQuantity(1);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedItem(null);
  };

  const handleAddToCart = () => {
    addToCart(selectedItem.id);
    handleClose();
  };

  return (
    <div className="card3--main">
      <div className="card3--main--flex">
        <div className="card3--left">
          <div className="left--top">
            <div className="top--left">
              <h2>Find Your Healthy Foods</h2>
            </div>
            <div className="top--right">
              {isOpen && (
                <Modal onClose={() => setIsOpen(false)}>
                  <div className="filter-modal">
                    <div className="filter-modal-left">
                      <ul>
                        {Object.keys(filterOptions).map((key) => (
                          <li
                            key={key}
                            className={activeFilter === key ? "active" : ""}
                            onClick={() => setActiveFilter(key)}
                          >
                            {key}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div className="filter-modal-right">
                      <ul>
                        {filterOptions[activeFilter].map((option) => (
                          <li key={option}>
                            <input
                              type="checkbox"
                              id={option}
                              value={option}
                              checked={tempFilters[activeFilter].includes(option)}
                              onChange={() => handleSelect(activeFilter, option)}
                            />
                            <label htmlFor={option}>{option}</label>
                          </li>
                        ))}
                      </ul>
                      <div className="filter--actions">
                        <button className="clear" onClick={handleClear}>Clear All</button>
                        <button className="apply" onClick={handleApply}>Apply</button>
                      </div>
                    </div>
                  </div>
                </Modal>
              )}
              <div className="right--flex" onClick={() => setIsOpen(true)}>
                <TuneIcon fontSize="small" /> Filter
              </div>
              <select
                value={sortOption}
                onChange={(e) => setSortOption(e.target.value)}
                className="sort-dropdown"
              >
                <option value="">Sort</option>
                <option value="Price: Low to High">Price: Low to High</option>
                <option value="Price: High to Low">Price: High to Low</option>
                <option value="Rating: High to Low">Rating: High to Low</option>
              </select>
            </div>
          </div>
          <div className="left--bottom">
            {filteredProducts.map((item) => (
              <Card3Items key={item.id} items={item} handleOpen={() => handleOpen(item)} />
            ))}
          </div>
        </div>
      </div>

      <MuiModal open={open} onClose={handleClose}>
        <div className={`add-modal ${open ? 'open' : ''}`}>
          <div className="add-modal-content-body">
            <button className="close-btn" onClick={handleClose}>×</button>
            <div className="add-modal-image">
              <img src={selectedItem?.image} alt={selectedItem?.name} />
            </div>
            <div className="model-flex">
              <h2>{selectedItem?.name}</h2>
              <p>{selectedItem?.description || "Freshly made with the finest ingredients."}</p>
              <div className="quantity-price">
                <label>
                  Quantity
                  <input
                    type="number"
                    value={quantity}
                    onChange={(e) =>
                      setQuantity(Math.max(1, parseInt(e.target.value) || 1))
                    }
                    min="1"
                  />
                </label>
                <span className="modal-price">₹{selectedItem?.price}</span>
              </div>
              <button className="confirm-btn" onClick={handleAddToCart}>
                Add to Cart
              </button>
            </div>
          </div>
        </div>
      </MuiModal>
    </div>
  );
};

export default Card3;
