
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
  
export default Stats;