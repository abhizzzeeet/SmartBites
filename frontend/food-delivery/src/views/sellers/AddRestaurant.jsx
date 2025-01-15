import React, { useState } from "react";
import Restaurant from "../../models/Restaurant";
import { useUserContext } from "../../contexts/UserProvider";

const AddRestaurant = () => {
    const { getUser } = useUserContext();
    const user = getUser();
    const [formData, setFormData] = useState({
        restaurantName: "",
        address: "",
        city: "",
        state: "",
        latitude: "",
        longitude: "",
        pincode: "",
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        // Check if all fields are filled
        // const allFieldsFilled = Object.values(formData).every((value) => value.trim() !== "");
        // if (!allFieldsFilled) {
        //     alert("Please fill out all the fields.");
        //     return;
        // }
        // Replace with actual userId (this is just a placeholder)
        const userId = user.id;

        // Create a Restaurant instance
        const newRestaurant = new Restaurant(
            formData.restaurantName,
            formData.address,
            formData.city,
            formData.state,
            formData.latitude,
            formData.longitude,
            formData.pincode,
            userId
        );

        console.log("Restaurant object being sent:", newRestaurant);

        // Send the Restaurant instance to Spring Boot backend
        fetch('http://localhost:8081/api/restaurants', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(newRestaurant),
        })
            .then((response) => {
                if (response.ok) {
                    alert("Restaurant added successfully!");
                    setFormData({
                        restaurantName: "",
                        address: "",
                        city: "",
                        state: "",
                        latitude: "",
                        longitude: "",
                        pincode: "",
                    });
                } else {
                    alert("Failed to add restaurant.");
                }
            })
            .catch((error) => {
                console.error("Error:", error);
                alert("An error occurred.");
            });
    };

    return (
        <div>
            <h1>Add Restaurant</h1>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Restaurant Name:</label>
                    <input
                        type="text"
                        name="restaurantName"
                        value={formData.restaurantName}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label>Address:</label>
                    <input
                        type="text"
                        name="address"
                        value={formData.address}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label>City:</label>
                    <input
                        type="text"
                        name="city"
                        value={formData.city}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label>State:</label>
                    <input
                        type="text"
                        name="state"
                        value={formData.state}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label>Latitude:</label>
                    <input
                        type="text"
                        name="latitude"
                        value={formData.latitude}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label>Longitude:</label>
                    <input
                        type="text"
                        name="longitude"
                        value={formData.longitude}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label>Pincode:</label>
                    <input
                        type="text"
                        name="pincode"
                        value={formData.pincode}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label>Google Maps:</label>
                    <a href="https://www.google.com/maps" target="_blank" rel="noopener noreferrer">https://www.google.com/maps</a>
                </div>
                <button type="submit">Submit</button>
            </form>
        </div>
    );
};

export default AddRestaurant;
