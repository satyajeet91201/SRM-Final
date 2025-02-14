import React from 'react';
import './AdminPage.css'; // Import CSS for styling

const AdminPage = () => {
  const manager = {
    name: 'Main Manager',
    designation: 'Manager',
    photo: 'https://randomuser.me/api/portraits/men/9.jpg',
    email: 'manager@example.com',
    phone: '123-456-7890',
  };

  const subManagers = [
    { name: 'Priya Kulkarni', designation: 'Sub-Manager', photo: 'https://randomuser.me/api/portraits/men/14.jpg', email: 'priya.kulkarni@example.com' },
    { name: 'Ajay Shinde', designation: 'Sub-Manager', photo: 'https://randomuser.me/api/portraits/men/15.jpg', email: 'ajay.shinde@example.com' },
    { name: 'Anita Pawar', designation: 'Sub-Manager', photo: 'https://randomuser.me/api/portraits/men/16.jpg', email: 'anita.pawar@example.com' },
    { name: 'Sanjay More', designation: 'Sub-Manager', photo: 'https://randomuser.me/api/portraits/men/17.jpg', email: 'sanjay.more@example.com' },
    { name: 'Nisha Bhosale', designation: 'Sub-Manager', photo: 'https://randomuser.me/api/portraits/men/18.jpg', email: 'nisha.bhosale@example.com' },
    { name: 'Karan Ghosh', designation: 'Sub-Manager', photo: 'https://randomuser.me/api/portraits/men/19.jpg', email: 'karan.ghosh@example.com' },
    { name: 'Deepa Mhatre', designation: 'Sub-Manager', photo: 'https://randomuser.me/api/portraits/men/20.jpg', email: 'deepa.mhatre@example.com' },
];


  return (
    <div className="admin-page">
      <h1 style={{color:"white"}}>Admin Page</h1>
      <div className="manager-card">
        <img src={manager.photo} alt={manager.name} className="profile-photo" />
        <h2>{manager.name}</h2>
        <p>{manager.designation}</p>
        <p>Email: {manager.email}</p>
        <p>Phone: {manager.phone}</p>
      </div>
      <h2>Sub-Managers</h2>
      <div className="sub-manager-list">
        {subManagers.map((subManager, index) => (
          <div className="sub-manager-card" key={index}>
            <img src={subManager.photo} alt={subManager.name} className="profile-photo" />
            <h3>{subManager.name}</h3>
            <p>{subManager.designation}</p>
            <p>Email: {subManager.email}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminPage;
