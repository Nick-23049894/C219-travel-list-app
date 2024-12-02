import React, { useState } from "react";
import Logo from "./Logo";
import Form from "./Form";
import PackingList from "./PackingList";
import Stats from "./Stats";

const initialItems = [
  { id: 1, description: "Shirt", quantity: 5, packed: false },
  { id: 2, description: "Pants", quantity: 2, packed: false },
];

function App() {
  const [items, setItems] = useState(initialItems);
  const [sortCriteria, setSortCriteria] = useState("input");

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
      setItems([]);
    }
  }

  function handleSort(criteria) {
    setSortCriteria(criteria);
  }

  const sortedItems = [...items].sort((a, b) => {
    if (sortCriteria === "description") {
      return a.description.localeCompare(b.description);
    } else if (sortCriteria === "packed") {
      return a.packed - b.packed;
    }
    return 0;
  });

  return (
    <div className="app">
      <Logo />
      <Form
        handleAddItems={handleAddItems}
        handleClearAll={handleClearAll}
        handleSort={handleSort}
      />
      <PackingList
        items={sortedItems}
        handleTogglePacked={handleTogglePacked}
        handleDeleteItem={handleDeleteItem}
      />
      <Stats items={items} />
    </div>
  );
}

export default App;
