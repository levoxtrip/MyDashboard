import React, { useState, useEffect } from "react";
//docs.google.com/spreadsheets/d/1ggxeHqlsY17zsUGS5-N6RfrhhkTCLDRiSx39q0LuHHs/edit?gid=0#gid=0
const GOOGLE_SHEETS_API_URL =
  "https://script.google.com/macros/s/AKfycbxJowOYVFrfKhJ6LRDOotAcKzKL8BPiDUx0zEoqs4DRa8XI7bZ--Ts_QVwu_2zpKnL-/exec"; // Replace with your Google Apps Script URL

function App() {
  const [count, setCount] = useState(0);

  // Fetch initial value from Google Sheets
  useEffect(() => {
    fetch(GOOGLE_SHEETS_API_URL)
      .then((response) => response.json())
      .then((data) => setCount(data.count));
  }, []);

  // Function to update Google Sheets
  const updateSheet = (newCount) => {
    fetch(GOOGLE_SHEETS_API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ count: newCount }),
    });
  };

  // Handlers
  const increment = () => {
    const newCount = count + 1;
    setCount(newCount);
    updateSheet(newCount);
  };

  const decrement = () => {
    const newCount = count - 1;
    setCount(newCount);
    updateSheet(newCount);
  };

  const reset = () => {
    setCount(0);
    updateSheet(0);
  };

  return (
    <div>
      <h1>Counter: {count}</h1>
      <button onClick={increment}>Increment</button>
      <button onClick={decrement}>Decrement</button>
      <button onClick={reset}>Reset</button>
    </div>
  );
}

export default App;
