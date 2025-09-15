import React, { useState } from 'react';
import './App.css'

function App() {
  const [selectedFileName, setSelectedFileName] = useState<string>('');
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      console.log('File selected:', file.name);
      setSelectedFileName(file.name);
      setSelectedFile(file);
    } else {
      setSelectedFileName('');
      setSelectedFile(null);
    }
  };

  const handleDeleteFile = () => {
    setSelectedFileName('');
    setSelectedFile(null);
    // Reset the file input
    const fileInput = document.getElementById('file-upload') as HTMLInputElement;
    if (fileInput) {
      fileInput.value = '';
    }
    console.log('File deleted');
  };

  const handleAcceptFile = async () => {
    if (!selectedFile) return;
    const formData = new FormData();
    formData.append('file', selectedFile);
    try {
      const response = await fetch('http://127.0.0.1:8000/gridcal/files/upload', {
        method: 'POST',
        body: formData,
      });
      if (response.ok) {
        const responseBody = await response.text();
        alert(responseBody);
        handleDeleteFile();
      } else {
        alert('Failed to upload file.');
      }
    } catch (error) {
      alert('Error uploading file.');
    }
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
          {!selectedFileName && (
            <label htmlFor="file-upload" className="upload-button">
              Choose File
            </label>
          )}
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
