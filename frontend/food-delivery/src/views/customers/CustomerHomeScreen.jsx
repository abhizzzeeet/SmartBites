import React, { useState } from "react";
import { useParams, useLocation, useNavigate } from "react-router-dom";

const CustomerHomeScreen = () => {
  const navigate = useNavigate();
  const { userId } = useParams(); // Extract the userId from the URL
  const location = useLocation(); // Access additional data passed via state
  const user = location.state?.user;

  // State for the query input and API response
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [error, setError] = useState("");

  // Function to handle the API call
  const handleSearch = async (e) => {
    if (e.key === "Enter") {
      setError(""); // Clear any previous errors
      try {
        const url = `http://localhost:8081/api/customers/search?query=${encodeURIComponent(query)}&latitude=${26.692284424260034}&longitude=${88.3774020141318}`;
        const response = await fetch(url, {
          method: "GET",
        });
        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }
        const data = await response.json();
        setResults(data); // Update results state with the received data
        console.log(`Result received:`, data);
      } catch (err) {
        setError(err.message);
      }
    }
  };

  const handleRestaurantClick = (restaurant) => {
    console.log("menu item clicked");
    navigate(`/restaurantMenu`,{state: {restaurant: restaurant}});
  }

  return (
    <div>
      <h1>Welcome Customer {user?.name || "User"}!</h1>
      <p>Your ID: {userId}</p>
      <button onClick={()=> navigate(`/customerHomeScreen/cart`)}>Cart</button>
      <button onClick={()=> navigate(`/customerHomeScreen/orders`)}>Orders</button>
      <div style={{ marginTop: "20px" }}>
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={handleSearch}
          placeholder="Enter your query and press Enter"
          style={{
            padding: "10px",
            fontSize: "16px",
            width: "300px",
            marginRight: "10px",
          }}
        />
      </div>

      {error && <p style={{ color: "red" }}>{error}</p>}

      {results.length > 0 && (
        <ul style={{ marginTop: "20px" }}>
          {results.map((item) => (
            <li key={item.id} onClick ={ () => {handleRestaurantClick(item)}}>{item.restaurantName}</li> 
          ))}
        </ul>
      )}
    </div>
  );
};

export default CustomerHomeScreen;
