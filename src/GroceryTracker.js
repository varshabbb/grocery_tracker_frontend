import { useState } from "react";

export default function GroceryTracker() {
  // Minor change: added basic validation
  const [itemName, setItemName] = useState("");
  const [quantity, setQuantity] = useState("");
  const [error, setError] = useState("");

  const addItem = () => {
    if (itemName.trim() === "" || quantity === "") {
      setError("Please enter item name and quantity");
      return;
    }

    fetch("http://localhost:8080/api/groceries", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        itemName: itemName,
        quantity: Number(quantity),
        purchased: false
      })
    })
      .then(res => res.json())
      .then(data => {
        console.log(data);
        setItemName("");
        setQuantity("");
        setError("");
      })
      .catch(err => {
        console.error(err);
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

      <button onClick={addItem}>Add</button>
    </div>
  );
}
