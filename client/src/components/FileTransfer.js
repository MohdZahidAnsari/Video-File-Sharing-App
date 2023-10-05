import React, { useState } from 'react';
import axios from 'axios';

import './FileTransfer.css';

const FileTransfer = () => {
  const [sourceFileId, setSourceFileId] = useState('');
  const [destinationDirectoryId, setDestinationDirectoryId] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const handleTransfer = async () => {
    try {
      setError(''); // Clear any previous errors
      const response = await axios.post('/transfer', {
        sourceFileId,
        destinationDirectoryId,
      });

      setMessage(response.data.message);
    } catch (err) { // Changed variable name to "err" to avoid conflict with "error" state variable
      if (err.response) {
        setError(`Error: ${err.response.data.error}`);
      } else {
        setError('Network error. Please check your internet connection.');
      }
    }
  };

  return (
    <div className="file-transfer-container">
      <h2>Google Drive File Transfer</h2>
      <div className="form-group">
        <label htmlFor="sourceFileId">Source File ID:</label>
        <input
          type="text"
          id="sourceFileId"
          className="form-control"
          value={sourceFileId}
          onChange={(e) => setSourceFileId(e.target.value)}
        />
      </div>
      <div className="form-group">
        <label htmlFor="destinationDirectoryId">Destination Directory ID:</label>
        <input
          type="text"
          id="destinationDirectoryId"
          className="form-control"
          value={destinationDirectoryId}
          onChange={(e) => setDestinationDirectoryId(e.target.value)}
        />
      </div>
      <button className="btn btn-primary" onClick={handleTransfer}>
        Start Transfer
      </button>
      {error && <div className="error">{error}</div>}
      {message && <div className="message">{message}</div>}
    </div>
  );
};

export default FileTransfer;
