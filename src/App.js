import './App.css'
import React, { useState } from 'react';

function App() {
  const [details, setDetails] = useState('Want to intern at KNIT AI');
  const [purpose, setPurpose] = useState('job application')
  const [sender, setSender] = useState('John Adams')
  const [receiver, setReceiver] = useState('Michael Bloomberg')
  const [loading, setLoading] = useState(false);

  const [result, setResult] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch(process.env.REACT_APP_BACKEND_URL || 'http://localhost:5000/fetch', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*'
        },
        body: JSON.stringify({ purpose: purpose, sender: sender, receiver: receiver, details: details }),
      });

      const data = await response.json();
      // console.log(data.responseText);
      // console.log(typeof (data.responseText));
      setResult(data.responseText);
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ display: "block" }} className="App">
      <h1>KNIT AI EMAIL GENERATOR </h1>
      <form onSubmit={handleSubmit}>
        <label>
          Enter Details:

        </label>
        <br />
        <textarea value={details} onChange={(e) => setDetails(e.target.value)} cols="30" ></textarea>

        <br />
        <label>
          Select Purpose:
          <select value={purpose} onChange={(e) => setPurpose(e.target.value)}>
            <option value="job application">Job</option>
            <option value="marketing">Marketing</option>
            <option value="leave application">Leave</option>

          </select>
        </label>
        <br />
        <label>
          Enter Sender Name:
          <input
            type="text"
            value={sender}
            onChange={(e) => setSender(e.target.value)}
          />
        </label>
        <br />
        <label>
          Enter Receiver Name:
          <input
            type="text"
            value={receiver}
            onChange={(e) => setReceiver(e.target.value)}
          />
        </label>
        <br />
        <button type="submit">Submit</button>
      </form>
      <hr />
      {loading && <p>Loading...</p>}
      {result && <div style={{ whiteSpace: "pre-line" }} className='display-linebreak'>{result}</div>}
    </div>
  );
}

export default App;
