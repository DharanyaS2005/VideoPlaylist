import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Login.css';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalType, setModalType] = useState(''); // Tracks whether it's Login or Signup
  const navigate = useNavigate();

  const handleOpenModal = (type) => {
    setModalType(type);
    setIsModalOpen(true);
  };

  const handleAction = () => {
    if (username && password) {
      alert(`${modalType} successful!`);
      setIsModalOpen(false);
      navigate('/home');
    } else {
      alert('Please enter a valid username and password.');
    }
  };

  return (
    <div className="login-container">
      <h1>Welcome to Video Playlist Builder</h1>
      <div className="button-container">
        <button
          className="signup-btn"
          onClick={() => handleOpenModal('Signup')}
        >
          Signup
        </button>
        <button
          className="login-btn"
          onClick={() => handleOpenModal('Login')}
        >
          Login
        </button>
      </div>

      {isModalOpen && (
        <div className="modal">
          <div className="modal-content">
            <h2>{modalType}</h2> {/* Heading changes dynamically */}
            <input
              type="text"
              placeholder="Enter username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <input
              type="password"
              placeholder="Enter password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <div className="modal-buttons">
              <button onClick={handleAction}>{modalType}</button>
              <button onClick={() => setIsModalOpen(false)}>Cancel</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Login;
