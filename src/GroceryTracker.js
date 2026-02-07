import { useState } from "react";
import { addItem } from "./services/GroceryService"; // 🔥 IMPORTANT

export default function GroceryTracker() {
  const [itemName, setItemName] = useState("");
  const [quantity, setQuantity] = useState("");
  const [error, setError] = useState("");

  const handleAdd = () => {
    if (itemName.trim() === "" || quantity === "") {
      setError("Please enter item name and quantity");
      return;
    }

    addItem({
      itemName,
      quantity: Number(quantity),
      purchased: false
    })
      .then(() => {
        setItemName("");
        setQuantity("");
        setError("");
      })
      .catch(() => {
        setError("Failed to add item");
      });
  };

  return (
    <div>
      <h3>Grocery Tracker</h3>

      {error && <p style={{ color: "red" }}>{error}</p>}

      <input
        placeholder="Item name"
        value={itemName}
        onChange={e => setItemName(e.target.value)}
      />

      <input
        type="number"
        placeholder="Quantity"
        value={quantity}
        onChange={e => setQuantity(e.target.value)}
      />

      <button onClick={handleAdd}>Add</button>
    </div>
  );
}
