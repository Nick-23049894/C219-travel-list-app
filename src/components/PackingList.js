import Item from "./Item";
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
export default PackingList;