// App.js
import React from "react";
import "./App.css";
import AppRoutes from "./Routes"; // Import your Routes component

const App = () => {
  return (
    <div className="container">
      <div className="row">
        <h1 className="text-center bg-light">MTOGO</h1>
        <AppRoutes />
      </div>
    </div>
  );
};

export default App;
