import React, { useState } from 'react';
import './App.css'

function App() {
  const [selectedFileName, setSelectedFileName] = useState<string>('');

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      console.log('File selected:', file.name);
      setSelectedFileName(file.name);
      // Handle file upload logic here
    } else {
      setSelectedFileName('');
    }
  };

  const handleDeleteFile = () => {
    setSelectedFileName('');
    // Reset the file input
    const fileInput = document.getElementById('file-upload') as HTMLInputElement;
    if (fileInput) {
      fileInput.value = '';
    }
    console.log('File deleted');
  };

  const handleAcceptFile = () => {
    console.log('File accepted:', selectedFileName);
    // TODO: Send file to backend
    alert(`File "${selectedFileName}" accepted! (Backend integration pending)`);
  };

  return (
    <div className="App">
      <div className="upload-container">
        <div className="upload-square">
          <h2>Upload Archive</h2>
          <input
            type="file"
            id="file-upload"
            className="file-input"
            onChange={handleFileUpload}
            accept=".gridcal" // change only accepted file types
          />
          <label htmlFor="file-upload" className="upload-button">
            Choose File
          </label>
          {selectedFileName && (
          <div className="file-actions">
            <div className="selected-file-name">
              {selectedFileName}
            </div>
            <div className="action-buttons">
              <button onClick={handleDeleteFile} className="delete-button">
                Delete
              </button>
              <button onClick={handleAcceptFile} className="accept-button">
                Accept
              </button>
            </div>
          </div>
        )}
        </div>
      </div>
    </div>
  );
}

export default App
