import React, { useState } from 'react';
import './Login.css';

const LoginPage = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isLogin, setIsLogin] = useState(true);
  const [error, setError] = useState(null);

  const handleSubmit = (event) => {
    event.preventDefault();
    if (isLogin) {
      // TO DO: implement login logic here
      console.log('Login attempted with:', username, password);
    } else {
      // TO DO: implement signup logic here
      console.log('Signup attempted with:', username, email, password, confirmPassword);
    }
  };

  const toggleForm = () => {
    setIsLogin(!isLogin);
    setError(null);
  };

  return (
    <div>
      <h1>{isLogin ? 'Login' : 'Signup'}</h1>
      <form onSubmit={handleSubmit}>
        {isLogin ? (
          <div>
            <label>Username:</label>
            <input type="text" value={username} onChange={(event) => setUsername(event.target.value)} />
            <br />
            <label>Password:</label>
            <input type="password" value={password} onChange={(event) => setPassword(event.target.value)} />
          </div>
        ) : (
          <div>
            <label>Username:</label>
            <input type="text" value={username} onChange={(event) => setUsername(event.target.value)} />
            <br />
            <label>Email:</label>
            <input type="email" value={email} onChange={(event) => setEmail(event.target.value)} />
            <br />
            <label>Password:</label>
            <input type="password" value={password} onChange={(event) => setPassword(event.target.value)} />
            <br />
            <label>Confirm Password:</label>
            <input type="password" value={confirmPassword} onChange={(event) => setConfirmPassword(event.target.value)} />
          </div>
        )}
        <button type="submit">{isLogin ? 'Login' : 'Signup'}</button>
        {error && <p style={{ color: 'red' }}>{error}</p>}
      </form>
      <p>
        {isLogin ? (
          <span>
            Don't have an account? <a onClick={toggleForm}>Signup</a>
          </span>
        ) : (
          <span>
            Already have an account? <a onClick={toggleForm}>Login</a>
          </span>
        )}
      </p>
    </div>
  );
};

export default LoginPage;