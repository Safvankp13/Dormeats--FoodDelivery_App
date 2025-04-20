import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { useProductStore } from "../../store/useProductStore";
import {
  Modal,
  Box,
  Typography,
  Button,
  IconButton,
  TextField,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import "./category.scss";

export default function Category() {
  const { categoryName } = useParams();
  const { products } = useProductStore();
  const filteredItems = products.filter((p) => p.category === categoryName);

  const [open, setOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [quantity, setQuantity] = useState(1);

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


    handleClose();
  };

  return (
    <div className="category-page">
      <div className="header-section">
        <h1>{categoryName}</h1>
        <p>Explore the finest {categoryName} meals.</p>
      </div>

      <div className="category-grid">
        {filteredItems.map((item) => (
          <div className="item-card" key={item.id}>
            <img src={item.image} alt={item.name} />
            <div className="info">
              <h3>{item.name}</h3>
              <p>
                {item.description?.slice(0, 60) ||
                  "Deliciously made with love and care."}
              </p>
              <span className="price">₹{item.price}</span>
              <button className="button" onClick={() => handleOpen(item)}>
                Add
              </button>
            </div>
          </div>
        ))}
      </div>

      <Modal open={open} onClose={handleClose}>
        <div className="custom-modal-overlay">
          <div className="custom-modal">
            <button className="close-btn" onClick={handleClose}>
              ×
            </button>

            <div className="modal-image">
              <img src={selectedItem?.image} alt={selectedItem?.name} />
            </div>

            <div className="modal-content">
              <h2>{selectedItem?.name}</h2>
              <p>
                {selectedItem?.description ||
                  "Freshly made with the finest ingredients."}
              </p>

              <div className="quantity-price">
                <label>
                  Qty:
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
      </Modal>
    </div>
  );
}
