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
  export default Item;