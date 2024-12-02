import React, { useState } from "react";

function Form({ handleAddItems, handleClearAll, handleSort }) {
  const [description, setDescription] = useState('');
  const [quantity, setQuantity] = useState(1);

  function handleSubmit(e) {
    e.preventDefault();

    if (description.trim() === "") {
      alert("Please enter an item description.");
      return;
    }

    if (quantity < 1) {
      alert("Please enter a valid quantity (greater than or equal to 1).");
      return;
    }

    const newItem = {
      id: Date.now(),
      description,
      quantity,
      packed: false,
    };

    handleAddItems(newItem);
    setDescription('');
    setQuantity(1);
  }

  function handleQuantityChange(e) {
    const value = Math.max(1, Number(e.target.value));
    setQuantity(value);
  }

  return (
    <form className="add-form" onSubmit={handleSubmit}>
      <h3>What do you need to pack?</h3>

      <input
        type="text"
        placeholder="Item description..."
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />

      <input
        type="number"
        value={quantity}
        onChange={handleQuantityChange}
        className="quantity-input"
        min="1"
      />

      <div className="button-container">
        <button type="submit">Add Item</button>
        <button type="button" onClick={() => handleSort("description")}>
          Sort by Description
        </button>
        <button type="button" onClick={() => handleSort("packed")}>
          Sort by Packed Status
        </button>
        <button
          type="button"
          className="clear-all-btn"
          onClick={handleClearAll}
        >
          Clear All
        </button>
      </div>
    </form>
  );
}

export default Form;
