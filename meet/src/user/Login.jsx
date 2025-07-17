import React, { useState } from 'react';
import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google';
import { jwtDecode } from 'jwt-decode';

const Login = () => {
  const [isSignIn, setIsSignIn] = useState(true);
  const toggleForm = () => setIsSignIn(!isSignIn);

  const handleGoogleSuccess = (credentialResponse) => {
    const decoded = jwtDecode(credentialResponse.credential);
    localStorage.setItem('googleUser', JSON.stringify(decoded));
  };

  const handleGoogleFailure = () => {
    alert("Google Login Failed");
  };

  return (
    <GoogleOAuthProvider clientId="932843359845-bm07vk0q3u97brlp4ta2ics11oje8m0d.apps.googleusercontent.com">
      <div className="container py-5">
        <div className="row shadow rounded overflow-hidden">
          <div className="col-md-6 d-none d-md-block p-0">
            <img
              src="https://source.unsplash.com/600x800/?technology,computer"
              alt="Login Visual"
              className="img-fluid h-100 w-100 object-fit-cover"
              style={{ objectFit: 'cover' }}
            />
          </div>

          <div className="col-md-6 bg-white p-5">
            <h3 className="text-center mb-4">{isSignIn ? 'Login' : 'Sign Up'}</h3>

            <form>
              {!isSignIn && (
                <>
                  <div className="mb-3">
                    <label className="form-label">Username</label>
                    <input type="text" className="form-control" placeholder="Enter username" />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Email</label>
                    <input type="email" className="form-control" placeholder="Enter email" />
                  </div>
                </>
              )}

              {isSignIn && (
                <div className="mb-3">
                  <label className="form-label">Username or Email</label>
                  <input type="text" className="form-control" placeholder="Enter username or email" />
                </div>
              )}

              <div className="mb-3">
                <label className="form-label">Password</label>
                <input type="password" className="form-control" placeholder="Enter password" />
              </div>

              {!isSignIn && (
                <div className="mb-3">
                  <label className="form-label">Confirm Password</label>
                  <input type="password" className="form-control" placeholder="Confirm password" />
                </div>
              )}

              <button type="submit" className="btn btn-primary w-100">
                {isSignIn ? 'Login' : 'Sign Up'}
              </button>
            </form>

            <div className="text-center mt-3">
              <GoogleLogin
                onSuccess={handleGoogleSuccess}
                onError={handleGoogleFailure}
              />
            </div>

            {isSignIn && (
              <p className="text-center mt-3">
                <a href="#" className="text-decoration-none">Forgot password?</a>
              </p>
            )}

            <p className="text-center mt-3">
              {isSignIn ? "Don't have an account?" : 'Already have an account?'}{' '}
              <span
                className="text-primary fw-bold"
                style={{ cursor: 'pointer' }}
                onClick={toggleForm}
              >
                {isSignIn ? 'Sign Up' : 'Login'}
              </span>
            </p>
          </div>
        </div>
      </div>
    </GoogleOAuthProvider>
  );
};

export default Login;
