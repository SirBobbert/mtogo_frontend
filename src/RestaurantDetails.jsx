import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css"; // Add this line

const RestaurantDetails = () => {
  const { restaurantId } = useParams();
  const [restaurantDetails, setRestaurantDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [userId, setUserId] = useState("");
  const [cart, setCart] = useState([]);
  const [orderPlaced, setOrderPlaced] = useState(false);

  useEffect(() => {
    const fetchRestaurantDetails = async () => {
      try {
        setUserId(localStorage.getItem("userId"));
        const response = await axios.get(
          `http://localhost:8082/restaurants/find/${restaurantId}`
        );

        setRestaurantDetails(response.data);
      } catch (error) {
        setError("Error fetching restaurant details");
      } finally {
        setLoading(false);
      }
    };

    fetchRestaurantDetails();
  }, [restaurantId]);

  const handleAddToCart = (itemId, itemName, price) => {
    const existingItem = cart.find((item) => item.itemId === itemId);

    if (existingItem) {
      setCart((prevCart) =>
        prevCart.map((item) =>
          item.itemId === itemId
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      );
    } else {
      setCart((prevCart) => [
        ...prevCart,
        { itemId, itemName, price, quantity: 1 },
      ]);
    }
  };

  const calculateTotalPrice = () => {
    return cart.reduce((total, item) => total + item.quantity * item.price, 0);
  };

  const handlePurchase = async () => {
    try {
      const orderData = {
        userId: userId,
        items: cart,
      };

      const response = await axios.post(
        `http://localhost:8081/api/orders/create/${restaurantId}`,
        orderData,
        {
          withCredentials: true,
        }
      );

      if (response.data) {
        console.log("Order placed successfully:", response.data);
        setOrderPlaced(true);
        setCart([]); // Clear the cart after placing the order
      } else {
        console.error("Order creation error: Invalid response format");
      }
    } catch (error) {
      console.error(
        "Order creation error:",
        error.response?.data || error.message
      );
    }
  };

  return (
    <div className="container">
      <h1 className="mb-4">Restaurant Details</h1>
      {loading && <p>Loading...</p>}
      {error && <p>{error}</p>}
      {!loading && !error && restaurantDetails && (
        <div>
          <h2>{restaurantDetails.name}</h2>
          <p>Address: {restaurantDetails.address}</p>
          <p>Phone: {restaurantDetails.phoneNumber}</p>
          <p>Website: {restaurantDetails.website}</p>
          <p>Email: {restaurantDetails.email}</p>
          <p>Description: {restaurantDetails.description}</p>

          {restaurantDetails.menu.length > 0 ? (
            <div>
              <h3>Menu</h3>
              <div className="row">
                {restaurantDetails.menu.map((menuItem) => (
                  <div key={menuItem.menu_item_id} className="col-md-4 mb-4">
                    <div className="card">
                      <div className="card-body">
                        <h5 className="card-title">{menuItem.name}</h5>
                        <p className="card-text">
                          Description: {menuItem.description}
                        </p>
                        <p className="card-text">Price: {menuItem.price}</p>
                        <button
                          id="addToCartButton"
                          className="btn btn-primary"
                          onClick={() =>
                            handleAddToCart(
                              menuItem.menu_item_id,
                              menuItem.name,
                              menuItem.price
                            )
                          }
                        >
                          Add to Cart
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <p>No menu items available</p>
          )}

          {cart.length > 0 && (
            <div>
              <h3>Shopping Cart</h3>
              <ul>
                {cart.map((cartItem) => (
                  <li key={cartItem.itemId}>
                    <p>
                      {cartItem.itemName} - Quantity: {cartItem.quantity} -{" "}
                      Total Price: {cartItem.quantity * cartItem.price}
                    </p>
                  </li>
                ))}
              </ul>
              <p className="font-weight-bold">
                Total Order Price: {calculateTotalPrice()}
              </p>
              <button className="btn btn-success" onClick={handlePurchase}>
                Checkout
              </button>
            </div>
          )}

          {orderPlaced && (
            <div className="alert alert-success mt-3" role="alert">
              Order placed successfully! Thank you for your purchase.
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default RestaurantDetails;
