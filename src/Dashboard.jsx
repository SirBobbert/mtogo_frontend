// Dashboard.js
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css'; // Add this line

const Dashboard = () => {
  const [restaurants, setRestaurants] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:8082/restaurants/all');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }

        const data = await response.json();
        setRestaurants(data);
      } catch (error) {
        setError('Error fetching data');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <h1 className="mb-4">Restaurants</h1>
      {loading && <p>Loading...</p>}
      {error && <p>{error}</p>}
      {!loading && !error && (
        <div className="row row-cols-1 row-cols-md-3">
          {restaurants.map((restaurant) => (
            <div key={restaurant.restaurantId} className="col mb-4">
              <Link to={`/restaurants/${restaurant.restaurantId}`} className="text-decoration-none text-dark">
                <div className="card">
                  <div className="card-body">
                    <h5 className="card-title">{restaurant.name}</h5>
                    {/* Add more restaurant information here if needed */}
                  </div>
                </div>
              </Link>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Dashboard;
