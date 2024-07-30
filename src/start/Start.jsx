import "./Start.css"
import { motion } from "framer-motion";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
function Start(){
    const navigate = useNavigate();
    useEffect(()=>{
      function deleteCookie(name) {
        document.cookie = name + '=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
      }
      if(localStorage.getItem("email"))
          localStorage.removeItem("email")
      if(localStorage.getItem("password"))
          localStorage.removeItem("password")
      deleteCookie('token');
    },[])
    return (
      <div
      className="start"
      style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          height: "100vh",
          backgroundColor: "#f0f4f8", // Light background color for the page
          textAlign: "center", // Center-align text
      }}
  >
      <div
          className="middle"
          style={{
              padding: "40px",
              backgroundColor: "#fff", // White background for the content area
              borderRadius: "8px", // Rounded corners for the content area
              boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)", // Subtle shadow for depth
              maxWidth: "600px", // Maximum width for the content area
              width: "100%", // Full width with a maximum limit
          }}
      >
          <h1 style={{ fontSize: "48px", margin: "10px 0", color: "#32406D" }}>MGI</h1>
          <h1 style={{ fontSize: "48px", margin: "10px 0", color: "#32406D" }}>Special Care</h1>
  
          <div style={{ display: "flex", justifyContent: "center", marginTop: "30px" }}>
              <motion.button
                  className="error-refresh"
                  id="addCandidateSubmit"
                  type="button"
                  style={{
                      border: "none",
                      borderRadius: "4px",
                      background: "#007bff", // Blue background for buttons
                      color: "#fff",
                      padding: "10px 20px",
                      fontSize: "16px",
                      margin: "0 15px",
                      cursor: "pointer",
                      transition: "background-color 0.3s, transform 0.2s",
                  }}
                  whileTap={{ scale: 0.95 }} // Slightly scale down on click
                  animate={{ scale: 1 }} // Animate back to original size
                  transition={{ duration: 0.2 }} // Duration for the animation
                  onClick={() => navigate("/login")}
              >
                  Login
              </motion.button>
  
              <motion.button
                  className="error-refresh"
                  id="addCandidateSubmit"
                  type="button"
                  style={{
                      border: "none",
                      borderRadius: "4px",
                      background: "#007bff", // Blue background for buttons
                      color: "#fff",
                      padding: "10px 20px",
                      fontSize: "16px",
                      margin: "0 15px",
                      cursor: "pointer",
                      transition: "background-color 0.3s, transform 0.2s",
                  }}
                  whileTap={{ scale: 0.95 }} // Slightly scale down on click
                  animate={{ scale: 1 }} // Animate back to original size
                  transition={{ duration: 0.2 }} // Duration for the animation
                  onClick={() => navigate("/signup")}
              >
                  Sign Up
              </motion.button>
          </div>
      </div>
  </div>
  
    )
}
export default Start;