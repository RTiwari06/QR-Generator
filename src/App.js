import React, { useState } from 'react';
import QRCode from 'qrcode';
import './App.css';

function App() {
  const [url, setUrl] = useState('');
  const [qrCode, setQrCode] = useState('');
  const [error, setError] = useState('');

  const handleGenerate = async () => {
    if (!url) {
      setError('Enter The Url');
      setTimeout(() => setError(''), 5000);
      return;
    }

    try {
      const qrCodeUrl = await QRCode.toDataURL(url);
      setQrCode(qrCodeUrl);
    } catch (err) {
      setError('Invalid URL');
      setTimeout(() => setError(''), 5000);
    }
  };

  const handleClear = () => {
    setUrl('');
    setQrCode('');
    setError('');
  };

  const handleDownload = () => {
    if (!qrCode) return;

    const a = document.createElement('a');
    a.href = qrCode;
    a.download = 'qrCode.png';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleGenerate();
    }
  };

  return (
    <div className="app">
      <h1>QR Code Generator</h1>
      <input
        type="url"
        value={url}
        onChange={(e) => setUrl(e.target.value)}
        placeholder="Enter URL"
        onKeyPress={handleKeyPress}
      />
      <button onClick={handleGenerate}>Generate</button>
      <button onClick={handleClear}>Clear</button>
      <button onClick={handleDownload}>Download</button>
      {error && <div className="mt-2 mb-1">{error}</div>}
      {qrCode && <img src={qrCode} alt="qr-code" />}
    </div>
  );
}

export default App;
