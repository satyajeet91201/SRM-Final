import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useAppContext } from '../../context/AppContext';
import styles from './CustomerInfoForm.module.css';

const CustomerInfoForm = () => {
  const { addCustomerToRecognized, removeCustomerFromNew } = useAppContext();
  const location = useLocation();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    customerName: '',
    image: '',
    mobileNumber: '',
    vegOrNonVeg: '',
    cuisine: '',
    specialOccasion: [],
    specialOccasionDate: '',
    anniversaryDate: '',
    assistance: '',
    favoriteDishes: [],
    specialInstructions: [],
    customInstructions: '',
    specialAssistanceOption: ''
  });
  const [newDish, setNewDish] = useState('');

  const customer = location.state?.customer || {};

  useEffect(() => {
    if (customer) {
      setFormData({
        customerName: customer.name || '',
        mobileNumber: customer.mobileNumber || '',
        image: customer.image || '',
        vegOrNonVeg: customer.vegOrNonVeg || '',
        cuisine: '',
        specialOccasion: Array.isArray(customer.specialOccasion) ? customer.specialOccasion : [],
        assistance: '',
        favoriteDishes: customer.favoriteDishes || [],
        specialInstructions: customer.specialInstructions || [],
        customInstructions: customer.customInstructions || '',
        specialAssistanceOption: customer.specialAssistanceOption || ''
      });
    }
  }, [customer]);
  

  const { submitNewCustomer } = useAppContext();  

  const handleFormSubmission = async (e) => {
    e.preventDefault();
    const newCustomer = {
      id: customer.id,  // ✅ Keep original ID
      name: formData.customerName,
      image: formData.image,
      mobileNumber: formData.mobileNumber,
      vegOrNonVeg: formData.vegOrNonVeg,
      orders: [],
      specialOccasion: formData.specialOccasion.length ? formData.specialOccasion : [],
      assistance: formData.assistance,
      specialAssistanceOption: formData.specialAssistanceOption,
      favoriteDishes: formData.favoriteDishes,
      specialInstructions: formData.specialInstructions,
      color: 'green'
    };
  
    try {
      await submitNewCustomer(newCustomer);  // ✅ Now updates both "recognized" & "new"
      navigate('/');
    } catch (error) {
      console.error("Error submitting customer:", error);
    }
  };
  
  const handleVegOrNonVegChange = (e) => {
    setFormData({
      ...formData,
      vegOrNonVeg: e.target.value, // Update the state based on the radio button selection
    });
  };

  const handleAddDish = (e) => {
    e.preventDefault();
    if (newDish.trim()) {
      setFormData({
        ...formData,
        favoriteDishes: [...formData.favoriteDishes, newDish.trim()],
      });
      setNewDish('');
    }
  };

  const handleDishChange = (e) => {
    setNewDish(e.target.value);
  };

  const handleSpecialOccasionChange = (type, date) => {
    setFormData((prev) => {
      let updatedOccasions = prev.specialOccasion.filter((item) => item.type !== type);
  
      // If a date is provided (checkbox checked), add or update the occasion
      if (date !== null) {
        updatedOccasions.push({ type, date });
      }
  
      // Ensure only a max of 2 occasions
      return { ...prev, specialOccasion: updatedOccasions.slice(0, 2) };
    });
  };
  


  const handleCustomInstructionsChange = (e) => {
    setFormData({
      ...formData,
      customInstructions: e.target.value,
    });
  };

  // Add Special Instruction to List
  const handleAddSpecialInstruction = (instruction) => {
    if (formData.specialInstructions.length < 2) {
      setFormData({
        ...formData,
        specialInstructions: [...formData.specialInstructions, instruction],
      });
    }
  };

  // Remove Special Instruction
  const handleRemoveSpecialInstruction = (instruction) => {
    setFormData({
      ...formData,
      specialInstructions: formData.specialInstructions.filter(item => item !== instruction),
    });
  };

  // Handle Special Assistance Option Change
  const handleSpecialAssistanceChange = (e) => {
    setFormData({
      ...formData,
      specialAssistanceOption: e.target.value,
    });
  };

  const handleSeatingPreferenceChange = (e) => {
    setFormData({
      ...formData,
      seatingPreference: e.target.value,
    });
  };


  console.log(customer);
  console.log(customer.image);

  return (
    <div className={styles.container}>
      <form className={styles.formContainer} onSubmit={handleFormSubmission}>
        <h3 className={styles.heading} style={{fontFamily:"kanit"}}><b>FORM</b></h3>
        <div className={styles.formcustomerimgcontainer}>
        <img src={customer.image} className={styles.formcustomerimg}></img>
        </div>
        {/* Customer Name */}
        <div className={styles.formGroup}>
          <label htmlFor="customerName" className={styles.formLabel}>Customer Name</label>
          <input
            type="text"
            className={styles.formControl}
            id="customerName"
            placeholder="Enter your name"
            value={formData.customerName}
            onChange={(e) => setFormData({ ...formData, customerName: e.target.value })}
          />
        </div>

          {/* Mobile Number */}
          <div className={styles.formGroup}>
          <label htmlFor="mobileNumber" className={styles.formLabel}>Mobile Number</label>
          <input
            type="tel"
            className={styles.formControl}
            id="mobileNumber"
            placeholder="Enter your mobile number"
            value={formData.mobileNumber}
            onChange={(e) => setFormData({ ...formData, mobileNumber: e.target.value })}
            pattern="[0-9]{10}" // Restrict to 10-digit numbers
            maxLength="10"
            required
          />
        </div>

        {/* Veg or Non-Veg Preference */}
        <div className={styles.formGroup}>
          <label className={styles.formLabel}>Veg or Non-Veg</label>
          <div className="form-check">
            <input
              className="form-check-input"
              type="radio"
              name="vegOrNonVeg"
              id="veg"
              value="Veg"
              checked={formData.vegOrNonVeg === 'Veg'}
              onChange={handleVegOrNonVegChange}
            />
            <label className="form-check-label" htmlFor="veg">Veg</label>
          </div>
          <div className="form-check">
            <input
              className="form-check-input"
              type="radio"
              name="vegOrNonVeg"
              id="nonVeg"
              value="Non-Veg"
              checked={formData.vegOrNonVeg === 'Non-Veg'}
              onChange={handleVegOrNonVegChange}
            />
            <label className="form-check-label" htmlFor="nonVeg">Non-Veg</label>
          </div>
        </div>

        {/* Cuisine Preference */}
        <div className={styles.formGroup}>
          <label className={styles.formLabel}>Cuisine Preference</label>
          <select
            className={styles.formControl}
            value={formData.cuisine}
            onChange={(e) => setFormData({ ...formData, cuisine: e.target.value })}
          >
            <option value="">Select Cuisine</option>
            <option value="indian">Indian</option>
            <option value="mexican">Mexican</option>
            <option value="chinese">Chinese</option>
            <option value="continental">Continental</option>
            <option value="american">American</option>
            <option value="italian">Italian</option>
          </select>
        </div>

    {/* Special Occasion */}
    <div className={styles.formGroup}>
      <label className={styles.formLabel}>Special Occasion</label>
      
      <div className="form-check">
        <input
          className="form-check-input"
          type="checkbox"
          id="birthday"
          checked={formData.specialOccasion?.some((item) => item.type === "Birthday") || false}
          onChange={(e) =>
            handleSpecialOccasionChange("Birthday", e.target.checked ? "" : null)
          }
        />
        <label className="form-check-label" htmlFor="birthday">Birthday</label>
      </div>

      <div className="form-check">
        <input
          className="form-check-input"
          type="checkbox"
          id="anniversary"
          checked={formData.specialOccasion.some((item) => item.type === "Anniversary")}
          onChange={(e) =>
            handleSpecialOccasionChange("Anniversary", e.target.checked ? "" : null)
          }
        />
        <label className="form-check-label" htmlFor="anniversary">Anniversary</label>
      </div>
    </div>

    {/* Special Occasion Date Inputs */}
    {formData.specialOccasion.map((occasion, index) => (
      <div key={index} className={styles.formGroup}>
        <label htmlFor={`${occasion.type.toLowerCase()}Date`} className={styles.formLabel}>
          {occasion.type} Date
        </label>
        <input
          type="date"
          className={styles.formControl}
          id={`${occasion.type.toLowerCase()}Date`}
          value={occasion.date || ""}
          onChange={(e) => handleSpecialOccasionChange(occasion.type, e.target.value)}
        />
      </div>
    ))}


        {/* Special Assistance */}
        <div className={styles.formGroup}>
          <label className={styles.formLabel}>Special Assistance Required</label>
          <div className="form-check">
            <input
              className="form-check-input"
              type="radio"
              name="assistance"
              id="yes"
              value="yes"
              checked={formData.assistance === 'yes'}
              onChange={() => setFormData({ ...formData, assistance: 'yes' })}
            />
            <label className="form-check-label" htmlFor="yes">Yes</label>
          </div>
          <div className="form-check">
            <input
              className="form-check-input"
              type="radio"
              name="assistance"
              id="no"
              value="no"
              checked={formData.assistance === 'no'}
              onChange={() => setFormData({ ...formData, assistance: 'no' })}
            />
            <label className="form-check-label" htmlFor="no">No</label>
          </div>
        </div>

        {/* Show Special Assistance Option Dropdown if "Yes" is selected */}
        {formData.assistance === 'yes' && (
          <div className={styles.formGroup}>
            <label className={styles.formLabel}>Select Special Assistance</label>
            <select
              className={styles.formControl}
              value={formData.specialAssistanceOption}
              onChange={handleSpecialAssistanceChange}
            >
              <option value="">Select an Option</option>
              <option value="wheelchair">Wheel Chair ♿</option>
              <option value="BabyStroller">Baby Stroller 👶</option>
            </select>
          </div>
        )}
        {/* Favorite Dishes */}
        <div className={styles.formGroup}>
          <label htmlFor="favoriteDishes" className={styles.formLabel}>Favorite Dishes</label>
          <div className={styles.inputGroup}>
            <input
              type="text"
              className={styles.formControl}
              id="favoriteDishes"
              placeholder="Add a favorite dish"
              value={newDish}
              onChange={handleDishChange}
            />
            <button className={styles.addDishButton} onClick={handleAddDish}>Add</button>
          </div>
          <ul className={styles.dishList}>
            {formData.favoriteDishes.map((dish, index) => (
              <li key={index} className={styles.listItem}>{dish}</li>
            ))}
          </ul>
        </div>

        {/* Special Instructions Dropdown */}
        <div className={styles.formGroup}>
          <label htmlFor="specialInstructions" className={styles.formLabel}>Special Instructions</label>
          <select
            className={styles.formControl}
            id="specialInstructions"
            onChange={(e) => handleAddSpecialInstruction(e.target.value)}
            value=""
          >
            <option value="">Select Special Instruction</option>
            <option value="Less Spicy">Less Spicy</option>
            <option value="No Onions">No Onions</option>
            <option value="No Capsicum">No Capsicum</option>
            <option value="No Lactose">No Lactose</option>
            <option value="Other">Other</option>
          </select>

          {/* Custom Instruction Input */}
          {formData.specialInstructions.includes("Other") && (
            <div className={styles.inputGroup}>
              <input
                type="text"
                className={styles.formControl}
                id="customInstructions"
                placeholder="Enter Custom Instructions"
                value={formData.customInstructions}
                onChange={handleCustomInstructionsChange}
              />
            </div>
          )}
          {/* Display Special Instructions List */}
          {formData.specialInstructions.length > 0 && (
            <ul className={styles.dishList}>
              {formData.specialInstructions.map((instruction, index) => (
                <li key={index} className={styles.dishListItem}>
                  <span>{instruction}</span>
                  <button
                    type="button"
                    className={styles.removeButton}
                    onClick={() => handleRemoveSpecialInstruction(instruction)}
                    style={{ margin: "4px" }}
                  >
                    Remove
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
        {/* Seating Preference */}
        <div className={styles.formGroup}>
          <label className={styles.formLabel}>Seating Preference</label>
          <select
            className={styles.formControl}
            value={formData.seatingPreference}
            onChange={()=>handleSeatingPreferenceChange(e.target.value)}
          >
            <option value="Window">Window Seating</option>
            <option value="Balcony Seating">Balcony Seating</option>
            <option value="No Preferncee">No Preference</option>
          </select>
        </div>

        <button type="submit" className={styles.submitButton}>Submit</button>
      </form>
    </div>
  );
};

export default CustomerInfoForm;  
