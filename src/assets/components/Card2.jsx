import React from "react";
import '../../App.css';

const Card2 = () => {
  return (
    <div style={styles.container}>
      <h2 style={styles.title}>Ongoing Offers</h2>
      <div style={styles.offerList}>
        <div style={styles.offerItem}><span>🍛</span> 20% Off on Indian Cuisine</div>
        <div style={styles.offerItem}><span>🥢</span> Buy 1 Get 1 Free - Chinese Special</div>
        <div style={styles.offerItem}><span>🍕</span> Flat ₹100 Off on Orders Above ₹500</div>
        <div style={styles.offerItem}><span>🍹</span> Free Mocktail with Every Meal</div>
        <div style={styles.offerItem}><span>🍔</span> 30% Off on Burgers & Wraps</div>
        <div style={styles.offerItem}><span>🍣</span> Sushi Lovers: 25% Discount</div>
        <div style={styles.offerItem}><span>🍝</span> Free Garlic Bread with Pasta</div>
        <div style={styles.offerItem}><span>🍩</span> Dessert Combo at ₹199</div>
        <div style={styles.offerItem}><span>🥗</span> Healthy Bowls - Flat ₹50 Off</div>
      </div>
    </div>
  );
};

const styles = {
  container: {
    width: "100%",
    fontFamily: "'DK Crayon Crumble', sans-serif",
    maxWidth: "100%",
    height: "430px",
    background: "radial-gradient(circle, #2b2b2b 10%, #1d1d1d 80%)", // Blackboard Effect
    color: "#fff",
    borderRadius: "30px",
    padding: "15px",
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start", 
    boxShadow: "inset 0px 0px 10px rgba(0, 0, 0, 0.5)", // Blackboard Texture
    transition: "transform 0.3s ease-in-out",
    cursor: "pointer",
    marginTop: "0px",
    marginBottom: "0px",
    border: "0px solid rgba(255, 255, 255, 0.2)", // Chalk Dust Effect
  },
  title: {
    fontSize: "24px",
    fontWeight: "bold",
    fontFamily: "Trebuchet MS", // BEST Chalk Font
    textAlign: "left",
    marginLeft: "0px",
    marginTop: "-12px",
    marginBottom:"30px",
    color: "#fff",
  },
  offerList: {
    display: "flex",
    flexDirection: "column",
    gap: "12px",
    width: "100%",
    flexGrow: 1,
    overflowY: "auto",
    paddingRight: "5px",
    maxHeight: "350px",
    scrollbarWidth: "none", // Hide scrollbar for Firefox
    msOverflowStyle: "none", // Hide scrollbar for IE/Edge
  },
  offerItem: {
    background: "rgba(255, 255, 255, 0.1)",
    padding: "12px 15px",
    borderRadius: "8px",
    fontFamily: "'DK Crayon Crumble', sans-serif",
    fontSize: "18px",
    fontWeight: "500",
    display: "flex",
    alignItems: "center",
    gap: "10px",
    justifyContent: "center", 
    color: "#fff",
    textShadow: "2px 2px 3px rgba(255, 255, 255, 0.4)", // Chalk Dusty Look
    transition: "background 0.3s ease",
  },
};

// Hide scrollbar for Chrome/Safari
styles.offerList["::-webkit-scrollbar"] = { display: "none" };

// Hover effect
styles.container[":hover"] = { transform: "scale(1.05)" };
styles.offerItem[":hover"] = { background: "rgba(255, 255, 255, 0.3)" };

export default Card2;
