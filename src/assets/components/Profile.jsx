import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { IoChevronBackCircleSharp } from "react-icons/io5";
import './Profile.css';

const Profile = ({ onClose }) => {
  const location = useLocation();
  const navigate = useNavigate();

  const customer = location.state?.customer;

  const [favoriteDishImages, setFavoriteDishImages] = useState([]);
  
  useEffect(() => {
    const controller = new AbortController(); // Declare controller here
    const signal = controller.signal;
    const fetchDishImages = async () => {
      const dishImages = [];
      

      for (const dish of customer.favoriteDishes) {
        try {
          const response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${dish}`, { signal });
          const data = await response.json();
          if (data.meals && data.meals[0]) {
            dishImages.push(data.meals[0].strMealThumb); // Add the image URL of the dish
          } else {
            dishImages.push(null); // Handle case where no image is found
          }
        } catch (error) {
          console.error('Error fetching dish image:', error);
        }
      }

      setFavoriteDishImages(dishImages); // Update state with fetched images
    };

    if (customer.favoriteDishes && customer.favoriteDishes.length > 0) {
      fetchDishImages();
    }

    return () => {

      console.log("Cleaning useEffect...");
      console.log(favoriteDishImages);
      controller.abort(); // Abort ongoing fetch requests on component unmount
      console.log(favoriteDishImages);
    };
  }, [customer.favoriteDishes]); // Re-run effect if favoriteDishes change

  const handleBackClick = () => {
    navigate('/');
  };



  return (
    <>
    <div className="outer-container">
      <div className="center">
            <header className="header">
                <a href="#" className="back-button" onClick={handleBackClick}><IoChevronBackCircleSharp/></a>
                <h1 style={{fontFamily:"Kanit",color: "#34046b",textAlign:'center'}}><h3><b>PROFILE</b></h3></h1>
            </header>

            <section className="profile-section">
                <div className="profile-container">
                    <div className="profile-image-container">
                        <img
                            src={customer.image} 
                            alt="Profile"
                            className="profile-image " style={{ border: `3px solid ${customer.color}`}}
                        />
                        <h2 className="profile-name">{customer.name}</h2>
                        <div className="profile-tag">
                        <span className="status-dot" style={{ backgroundColor: customer.vegOrNonVeg ==="Veg" ? "green" : "red" }}
                      ></span><div style={{fontSize:"18px"}}>{customer.vegOrNonVeg}</div>
                        </div>
                    </div>
            <div className="special-days">
                   <h3 className="section-title">Special Days</h3>
                  {customer.specialOccasion && customer.specialOccasion.length > 0 ? (
                    customer.specialOccasion.map((occasion, index) => (
                    <div className="special-day" key={index}>
                      <span>{occasion.type === "Birthday" ? "🎂" : "💑"}</span>
                      <span>{occasion.date}</span>
            </div>
        ))
    ) : (
        <p>No special occasions recorded.</p>
    )}
</div>

                </div>
            </section>

            <div className="preferences-grid">
                <div className="preference-card">
                <h3 className='section-title'>Accessibility</h3>
                <div className="preference-item">
                    <span>{customer.specialAssistanceOption === "wheelchair" ? "♿" : "👶"}</span> 
                    <span>{customer.specialAssistanceOption}</span>
                </div>
                </div>
                <div className="preference-card">
                <h3 className='section-title'>Preferences</h3>
                    <div className="preference-item">
                         <span>🪟</span><span>{customer.seatingPreference}</span>
                    </div>
                </div>
                <div className="preference-card">
                <h3 className='section-title'>Special Instructions</h3>
                    <div className="preference-item">
                      <ul>
                      {
                        customer.specialInstructions.map((instructions)=>{
                          return (<li>{instructions}</li>)
                        })
                      }
                      </ul>
                    </div>
                </div>
            </div>

            <section className="cuisines-section">
            <div className="section-title-wrapper">
                <h2 className="section-title">Favorite Cuisines</h2>
                <div className="cuisines-grid">
                    <div className="cuisine-card">
                        <img
                            src="https://images.pexels.com/photos/162993/food-thai-spicy-asian-162993.jpeg?auto=compress&cs=tinysrgb&w=600"
                            alt="Thai"
                        />
                        <div className="cuisine-label">Thai</div>
                    </div>
                    <div className="cuisine-card">
                        <img
                            src="https://images.pexels.com/photos/1437267/pexels-photo-1437267.jpeg?auto=compress&cs=tinysrgb&w=600"
                            alt="Italian"
                        />
                        <div className="cuisine-label">Italian</div>
                    </div>
                    <div className="cuisine-card">
                        <img
                            src="https://images.pexels.com/photos/699953/pexels-photo-699953.jpeg?auto=compress&cs=tinysrgb&w=600"
                            alt="Chinese"
                        />
                        <div className="cuisine-label">Chinese</div>
                    </div>
                    <div className="cuisine-card">
                        <img
                            src="https://images.pexels.com/photos/2474661/pexels-photo-2474661.jpeg?auto=compress&cs=tinysrgb&w=600"
                            alt="Indian"
                        />
                        <div className="cuisine-label">Indian</div>
                    </div>
                    <div className="cuisine-card">
                        <img
                            src="https://images.pexels.com/photos/162993/food-thai-spicy-asian-162993.jpeg?auto=compress&cs=tinysrgb&w=600"
                            alt="Thai"
                        />
                        <div className="cuisine-label">Thai</div>
                    </div>
                    <div className="cuisine-card">
                        <img
                            src="https://images.pexels.com/photos/699953/pexels-photo-699953.jpeg?auto=compress&cs=tinysrgb&w=600"
                            alt="Chinese"
                        />
                        <div className="cuisine-label">Chinese</div>
                    </div>
                    <div className="cuisine-card">
                        <img
                            src="https://images.pexels.com/photos/1148086/pexels-photo-1148086.jpeg?auto=compress&cs=tinysrgb&w=600"
                            alt="Sushi"
                        />
                        <div className="cuisine-label">Sushi</div>
                    </div>
                    <div className="cuisine-card">
                        <img
                            src="https://images.pexels.com/photos/1438672/pexels-photo-1438672.jpeg?auto=compress&cs=tinysrgb&w=600"
                            alt="Pasta"
                        />
                        <div className="cuisine-label">Pasta</div>
                    </div>
                </div>
                </div>
            </section>

            <section className="cuisines-section">
                <div className="section-title-wrapper">
                <h2 className="section-title">Favorite Dishes</h2>
                <div className="cuisines-grid">
                <div className="cuisines-grid">
                    {
                      customer?.favoriteDishes.map((dish, index) => (
                        favoriteDishImages[index] && (
                          <div className="cuisine-card" key={index}>
                            <img src={favoriteDishImages[index]} alt={dish} />
                            <div className="cuisine-label">{dish}</div>
                          </div>
                        )
                      ))
                    }
                  </div>
                </div>
                </div>
            </section>
            </div>
            </div>
    </>
  );
};

export default Profile;
