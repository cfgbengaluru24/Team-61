import React, { useState } from 'react';
import './Login.css';

const LoginPage = () => {
  const [name, setname] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [collegename, setcollegename] = useState('');
  const [registrationid, setregistrationid] = useState('');
  const [isLogin, setIsLogin] = useState(true);
  const [error, setError] = useState(null);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const endpoint = isLogin ? 'YOUR_LOGIN_ENDPOINT' : 'YOUR_SIGNUP_ENDPOINT';
    const payload = isLogin
      ? { username: name, password }
      : { fullname: name, email, password, collegename, registrationid };

    try {
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json();
      console.log('Success:', data);
      // Handle success (e.g., redirect to dashboard)
    } catch (error) {
      console.error('Error:', error);
      setError('Failed to submit. Please try again.');
    }
  };

  const toggleForm = () => {
    setIsLogin(!isLogin);
    setError(null);
  };

  return (
    <div className="loginpage">
      <div className="logincontainer">
        <h1 className="loginheading">
          {isLogin ? 'Unlock Your Potential' : 'Join the Movement'}
        </h1>
        <p className="loginsubheading">
          {isLogin
            ? 'Login to access exclusive resources and community'
            : 'Sign up to become a part of our women in tech community'}
        </p>
        <form onSubmit={handleSubmit} className="loginform">
          {isLogin ? (
            <div>
              <label>Username:</label>
              <input
                type="text"
                value={name}
                onChange={(event) => setname(event.target.value)}
                placeholder="Your username"
              />
              <br />
              <label>Password:</label>
              <input
                type="password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                placeholder="Your password"
              />
            </div>
          ) : (
            <div>
              <label>Full Name:</label>
              <input
                type="text"
                value={name}
                onChange={(event) => setname(event.target.value)}
                placeholder="Your full name"
              />
              <br />
              <label>Email:</label>
              <input
                type="email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                placeholder="Your email"
              />
              <br />
              <label>Password:</label>
              <input
                type="password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                placeholder="Your password"
              />
              <br />
              <label>College Name:</label>
              <input
                type="text"
                value={collegename}
                onChange={(event) => setcollegename(event.target.value)}
                placeholder="Your college name"
              />
              <br />
              <label>Registration Number:</label>
              <input
                type="number"
                value={registrationid}
                onChange={(event) => setregistrationid(event.target.value)}
                placeholder="Your registration number"
              />
            </div>
          )}
          <button type="submit" className="loginbutton">
            {isLogin ? 'Login' : 'Signup'}
          </button>
          {error && <p style={{ color: 'red' }}>{error}</p>}
        </form>
        <p className="loginfooter">
          {isLogin ? (
            <span>
              Don't have an account?{' '}
              <a onClick={toggleForm} className="loginlink">
                Signup
              </a>
            </span>
          ) : (
            <span>
              Already have an account?{' '}
              <a onClick={toggleForm} className="loginlink">
                Login
              </a>
            </span>
          )}
        </p>
      </div>
    </div>
  );
};

export default LoginPage;