import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer } from 'recharts';
import './Dashboard.css';

// Sample data (unchanged)
const managerRatings = [
  { stars: 5, count: 500 },
  { stars: 4, count: 450 },
  { stars: 3, count: 300 },
  { stars: 2, count: 200 },
  { stars: 1, count: 100 }
];

const monthlyTrends = [
  { month: 'Jan', visits: 300 },
  { month: 'Feb', visits: 400 },
  { month: 'Mar', visits: 450 },
  { month: 'Apr', visits: 500 },
  { month: 'May', visits: 100 },
  { month: 'Jun', visits: 350 },
  { month: 'Jul', visits: 300 },
  { month: 'Aug', visits: 400 },
  { month: 'Sep', visits: 350 },
  { month: 'Oct', visits: 350 },
  { month: 'Nov', visits: 400 },
  { month: 'Dec', visits: 350 },  
];

const topDishes = [
  { 
    name: 'Pizza', 
    orders: '82 orders', 
    image: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?w=300&h=300&fit=crop' 
  },
  { 
    name: 'Pasta', 
    orders: '60 orders', 
    image: 'https://images.unsplash.com/photo-1551183053-bf91a1d81141?w=300&h=300&fit=crop' 
  },
  { 
    name: 'Salad', 
    orders: '30 orders', 
    image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=300&h=300&fit=crop' 
  }
];

const Dashboard = () => {
  return (
    <div className="dashboard">
      <h1>DASHBOARD</h1>
      
      {/* Header Stats */}
      <div className="stats-container">
        <div className="stat-card">
          <div className="stat-content">
            <div className="stat-icon">👥</div>
            <div className="stat-info">
              <h3>TOTAL VISITS</h3>
              <div className="stat-value">1,643,983</div>
              <div className="stat-subtext">📈 2.5% increase</div>
            </div>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-content">
            <div className="stat-icon">⏰</div>
            <div className="stat-info">
              <h3>HOURLY VISITS</h3>
              <div className="stat-value">309,827</div>
              <div className="stat-subtext">📈 1.8% increase</div>
            </div>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-content">
            <div className="stat-icon">🍕</div>
            <div className="stat-info">
              <h3>MOST ORDERED CUISINE</h3>
              <div className="stat-value">Italian</div>
              <div className="stat-subtext">2394 orders</div>
            </div>
          </div>
        </div>
      </div>

      {/* Manager Ratings Section */}
      <div className="charts-container">
        <div className="ratings-chart">
          <h3 className="section-title2">AVG MANAGER RATINGS</h3>
          <div className="bar-chart-container">
            <ResponsiveContainer width="100%" height={200}>
              <BarChart data={managerRatings} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis type="number" />
                <YAxis dataKey="stars" type="category" />
                <Bar dataKey="count" fill="#3498db" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="rating-circle">
          <h3 className="section-title2">TOP RATED MANAGERS</h3>
          <div className="circle-stats">
            <div className="progress-ring">
              <div className="progress-circle">
                <div className="inner-content">
                  <div className="rating-number">2,234</div>
                  <div className="rating-text">ratings</div>
                </div>
              </div>
            </div>
            <div className="rating-percentages">
              <div className="percentage-row">
                <div className="percentage-block normal">
                  <span className="percentage">54.2%</span>
                  <span className="label">Normal</span>
                </div>
                <div className="percentage-block medium">
                  <span className="percentage">36.8%</span>
                  <span className="label">Medium</span>
                </div>
                <div className="percentage-block great">
                  <span className="percentage">9%</span>
                  <span className="label">Great</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Seating Section */}
      <div className="seating-section">
        <h3 className="section-title2">MOST IMPORTANT SEATING</h3>
        <div className="seating-options">
          <div className="seating-card">
            <img 
              src="https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=400&h=300&fit=crop" 
              alt="Balcony" 
            />
            <span>Balcony</span>
          </div>
          <div className="seating-card">
            <img 
              src="https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=400&h=300&fit=crop" 
              alt="Window" 
            />
            <span>Window</span>
          </div>
        </div>
      </div>

      {/* Top Dishes Section */}
      <div className="top-dishes">
        <h3 className="section-title">TOP DISHES THIS MONTH</h3>
        <div className="dishes-container">
          {topDishes.map((dish, index) => (
            <div key={index} className="dish-card">
              <div className="dish-image">
                <img src={dish.image} alt={dish.name} />
              </div>
              <div className="dish-info">
                <div className="dish-name">{dish.name}</div>
                <div className="dish-orders">{dish.orders}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Monthly Trends */}
      <div className="monthly-trends">
        <h3 className="section-title">Monthly trends</h3>
        <div className="trend-chart">
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={monthlyTrends}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Bar dataKey="visits" fill="#3498db" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;

