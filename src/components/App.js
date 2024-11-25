import React, { useState } from "react";

const initialItems = [
  { id: 1, description: "Shirt", quantity: 5, packed: false },
  { id: 2, description: "Pants", quantity: 2, packed: false },
];

function Logo() {
  return <h1>My Travel List</h1>;
}

function Form({ handleAddItems, handleClearAll }) {
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

function Item({ item, handleTogglePacked, handleDeleteItem }) {
  return (
    <li>
      <input
        type="checkbox"
        checked={item.packed}
        onChange={() => handleTogglePacked(item.id)}
      />
      <div
        className="description"
        style={{ textDecoration: item.packed ? "line-through" : "none" }}>
        <span className="itemDesc">
          {item.description}
        </span>
        <span className="itemQty">
          x{item.quantity}
        </span>
      </div>
      <button onClick={() => handleDeleteItem(item.id)}>X</button>
    </li>
  );
}

function PackingList({ items, handleTogglePacked, handleDeleteItem }) {
  return (
    <div className="list">
      <ul>
        {items.map((item) => (
          <li key={item.id}>
            <Item
              item={item}
              handleTogglePacked={handleTogglePacked}
              handleDeleteItem={handleDeleteItem}
            />
          </li>
        ))}
      </ul>
    </div>
  );
}

function Stats({ items }) {
  const packedCount = items.filter(item => item.packed).length;
  const totalCount = items.length;
  const packedPercentage = totalCount === 0 ? 0 : Math.round((packedCount / totalCount) * 100);

  // Determine message based on percentage
  let message = "Let's get packing!";
  if (packedPercentage > 0 && packedPercentage < 50) {
    message = "Off to a good start!";
  } else if (packedPercentage >= 50 && packedPercentage < 100) {
    message = "Almost there!";
  } else if (packedPercentage === 100) {
    message = "All packed and ready to go!";
  }

  return (
    <footer className="stats">
      <div className="progress-bar">
        <div
          className="progress-bar-filled"
          style={{ width: `${packedPercentage}%` }}
        ></div>
      </div>
      <em>
        {message} You have packed {packedCount} out of {totalCount} items ({packedPercentage}%).
      </em>
    </footer>
  );
}

function App() {
  const [items, setItems] = useState(initialItems);

  function handleAddItems(item) {
    setItems((prevItems) => [...prevItems, item]);
  }
  function handleTogglePacked(id) {
    setItems((prevItems) =>
      prevItems.map((item) =>
        item.id === id ? { ...item, packed: !item.packed } : item
      )
    );
  }
  function handleDeleteItem(id) {
    setItems((prevItems) => prevItems.filter((item) => item.id !== id));
  }
  function handleClearAll() {
    if (window.confirm("Are you sure you want to clear all items?")) {
      setItems([]); // Set items to an empty array
    }
  }

  return (
    <div className="app">
      <Logo />
      <Form handleAddItems={handleAddItems} handleClearAll={handleClearAll} />
      <PackingList
        items={items}
        handleTogglePacked={handleTogglePacked}
        handleDeleteItem={handleDeleteItem}
      />
      <Stats items={items} />
    </div>
  );
}

export default App;
