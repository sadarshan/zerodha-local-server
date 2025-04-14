import React, { useState } from 'react';
import './ApiCredentials.css';
import { SHA256 } from 'crypto-js';

const ApiCredentials: React.FC = () => {
  const [showCredentials, setShowCredentials] = useState(false);
  const [showRequestToken, setShowRequestToken] = useState(false);
  const [requestToken, setRequestToken] = useState('');
  const [isEditing, setIsEditing] = useState(true);
  const [loginUrl, setLoginUrl] = useState('');
  const [accessToken, setAccessToken] = useState('');
  const [status, setStatus] = useState('');
  const [fullResponse, setFullResponse] = useState<any>(null);
  
  const apiKey = 'wpcq576nl9i3etyg';
  const apiSecret = 'vwx2jkgkttbbr8wygcn9s1lvbvhwk0yk';

  const toggleCredentials = () => {
    setShowCredentials(!showCredentials);
  };

  const toggleRequestToken = () => {
    setShowRequestToken(!showRequestToken);
  };

  const handleTokenChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setRequestToken(e.target.value);
  };

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleTokenBlur = () => {
    setIsEditing(false);
  };

  const generateLoginUrl = () => {
    const baseUrl = 'https://kite.trade/connect/login';
    const url = `${baseUrl}?api_key=${apiKey}&v=3`;
    setLoginUrl(url);
  };

  const redirectToLogin = () => {
    if (loginUrl) {
      window.open(loginUrl, '_blank');
    }
  };

  const generateAccessToken = async () => {
    try {
      const checksum = SHA256(apiKey + requestToken + apiSecret).toString();

      const response = await fetch('https://api.kite.trade/session/token', {
        method: 'POST',
        headers: {
          'X-Kite-Version': '3',
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: new URLSearchParams({
          api_key: apiKey,
          request_token: requestToken,
          checksum: checksum,
        }),
      });

      const data = await response.json();
      setFullResponse(data);
      
      if (data.status === 'success') {
        setAccessToken(data.data.access_token);
        setStatus('Success');
      } else {
        setStatus('Error: ' + (data.message || 'Unknown error'));
      }
    } catch (error) {
      setStatus('Error: ' + (error instanceof Error ? error.message : 'Unknown error'));
    }
  };

  return (
    <div className="credentials-container">
      <div className="credentials-row">
        <div className="credential-item">
          <label>API Key</label>
          <input 
            type={showCredentials ? "text" : "password"} 
            value={apiKey} 
            readOnly 
          />
        </div>
        <div className="credential-item">
          <label>API Secret</label>
          <input 
            type={showCredentials ? "text" : "password"} 
            value={apiSecret} 
            readOnly 
          />
        </div>
      </div>
      <div className="credentials-row">
        <div className="credential-item">
          <div className="login-buttons">
            <button 
              className="generate-button"
              onClick={generateLoginUrl}
            >
              Generate Login URL
            </button>
            <button 
              className="redirect-button"
              onClick={redirectToLogin}
              disabled={!loginUrl}
            >
              Go to Login
            </button>
          </div>
        </div>
      </div>
      <div className="credentials-row">
        <div className="credential-item">
          <label>Request Token</label>
          <div className="token-input-container">
            <input 
              type={showRequestToken ? "text" : "password"} 
              value={requestToken} 
              onChange={handleTokenChange}
              onBlur={handleTokenBlur}
              readOnly={!isEditing}
              className={isEditing ? 'editing' : ''}
            />
            <button 
              className="edit-button"
              onClick={handleEditClick}
              aria-label="Edit token"
            >
              <svg 
                width="16" 
                height="16" 
                viewBox="0 0 24 24" 
                fill="none" 
                xmlns="http://www.w3.org/2000/svg"
              >
                <path 
                  d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.39-.39-1.02-.39-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z" 
                  fill="currentColor"
                />
              </svg>
            </button>
            <button 
              className="token-eye-button"
              onClick={toggleRequestToken}
              aria-label={showRequestToken ? 'Hide token' : 'Show token'}
            >
              <svg 
                width="16" 
                height="16" 
                viewBox="0 0 24 24" 
                fill="none" 
                xmlns="http://www.w3.org/2000/svg"
              >
                {showRequestToken ? (
                  <path 
                    d="M12 5C7 5 2.73 8.11 1 12.5C2.73 16.89 7 20 12 20C17 20 21.27 16.89 23 12.5C21.27 8.11 17 5 12 5ZM12 17.5C9.24 17.5 7 15.26 7 12.5C7 9.74 9.24 7.5 12 7.5C14.76 7.5 17 9.74 17 12.5C17 15.26 14.76 17.5 12 17.5ZM12 9.5C10.34 9.5 9 10.84 9 12.5C9 14.16 10.34 15.5 12 15.5C13.66 15.5 15 14.16 15 12.5C15 10.84 13.66 9.5 12 9.5Z" 
                    fill="currentColor"
                  />
                ) : (
                  <path 
                    d="M12 7C14.76 7 17 9.24 17 12C17 12.65 16.87 13.26 16.64 13.83L19.56 16.75C21.07 15.49 22.26 13.86 22.99 12C21.26 7.61 17 4.5 12 4.5C10.73 4.5 9.51 4.75 8.36 5.07L10.17 6.88C10.74 6.65 11.35 6.5 12 6.5ZM2 4.27L4.28 6.55L4.74 7.01C3.08 8.3 1.78 10.02 1 12C2.73 16.39 7 19.5 12 19.5C13.55 19.5 15.03 19.2 16.38 18.66L16.8 19.08L19.73 22L21 20.73L3.27 3L2 4.27ZM7.53 9.8L9.08 11.35C9.03 11.56 9 11.78 9 12C9 13.66 10.34 15 12 15C12.22 15 12.44 14.97 12.65 14.92L14.2 16.47C13.53 16.8 12.79 17 12 17C9.24 17 7 14.76 7 12C7 11.21 7.2 10.47 7.53 9.8ZM11.84 9.02L14.99 12.17L15.01 12.01C15.01 10.35 13.67 9.01 12.01 9.01L11.84 9.02Z" 
                    fill="currentColor"
                  />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>
      <div className="credentials-row">
        <div className="credential-item">
          <button 
            className="generate-button"
            onClick={generateAccessToken}
            disabled={!requestToken}
          >
            Generate Access Token
          </button>
        </div>
      </div>

      {status && (
        <div className="credentials-row">
          <div className="credential-item">
            <label>Status</label>
            <div className={`status-box ${status.includes('Error') ? 'error' : 'success'}`}>
              {status}
            </div>
          </div>
        </div>
      )}

      {accessToken && (
        <div className="credentials-row">
          <div className="credential-item">
            <label>Access Token</label>
            <div className="token-box">
              {accessToken}
            </div>
          </div>
        </div>
      )}

      {fullResponse && (
        <div className="credentials-row">
          <div className="credential-item">
            <label>Full Response</label>
            <div className="response-box">
              <pre>{JSON.stringify(fullResponse, null, 2)}</pre>
            </div>
          </div>
        </div>
      )}

      <button 
        className="eye-button"
        onClick={toggleCredentials}
        aria-label={showCredentials ? 'Hide credentials' : 'Show credentials'}
      >
        <svg 
          width="24" 
          height="24" 
          viewBox="0 0 24 24" 
          fill="none" 
          xmlns="http://www.w3.org/2000/svg"
        >
          {showCredentials ? (
            <path 
              d="M12 5C7 5 2.73 8.11 1 12.5C2.73 16.89 7 20 12 20C17 20 21.27 16.89 23 12.5C21.27 8.11 17 5 12 5ZM12 17.5C9.24 17.5 7 15.26 7 12.5C7 9.74 9.24 7.5 12 7.5C14.76 7.5 17 9.74 17 12.5C17 15.26 14.76 17.5 12 17.5ZM12 9.5C10.34 9.5 9 10.84 9 12.5C9 14.16 10.34 15.5 12 15.5C13.66 15.5 15 14.16 15 12.5C15 10.84 13.66 9.5 12 9.5Z" 
              fill="currentColor"
            />
          ) : (
            <path 
              d="M12 7C14.76 7 17 9.24 17 12C17 12.65 16.87 13.26 16.64 13.83L19.56 16.75C21.07 15.49 22.26 13.86 22.99 12C21.26 7.61 17 4.5 12 4.5C10.73 4.5 9.51 4.75 8.36 5.07L10.17 6.88C10.74 6.65 11.35 6.5 12 6.5ZM2 4.27L4.28 6.55L4.74 7.01C3.08 8.3 1.78 10.02 1 12C2.73 16.39 7 19.5 12 19.5C13.55 19.5 15.03 19.2 16.38 18.66L16.8 19.08L19.73 22L21 20.73L3.27 3L2 4.27ZM7.53 9.8L9.08 11.35C9.03 11.56 9 11.78 9 12C9 13.66 10.34 15 12 15C12.22 15 12.44 14.97 12.65 14.92L14.2 16.47C13.53 16.8 12.79 17 12 17C9.24 17 7 14.76 7 12C7 11.21 7.2 10.47 7.53 9.8ZM11.84 9.02L14.99 12.17L15.01 12.01C15.01 10.35 13.67 9.01 12.01 9.01L11.84 9.02Z" 
              fill="currentColor"
            />
          )}
        </svg>
      </button>
    </div>
  );
};

export default ApiCredentials; 