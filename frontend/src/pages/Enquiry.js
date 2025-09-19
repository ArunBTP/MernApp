import axios from 'axios';
import { useState } from 'react';
import './Enquiry.css'; // ✅ Import the CSS file

function EnquiryForm() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');

    if (!token) {
      setMessage('❌ You must be logged in to submit an enquiry.');
      return;
    }

    try {
      const res = await axios.post(`${process.env.REACT_APP_API_URL}/api/enquiry/user`, {
        name,
        email
      }, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      setMessage('✅ Enquiry submitted successfully!');
    } catch (err) {
      console.error('Enquiry error:', err.response?.data || err.message);
      setMessage('❌ Failed to submit enquiry.');
    }
  };

  return (
    <div className="enquiry-wrapper">
      <div className="enquiry-card">
        <h2>Submit Your Enquiry</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Your Name"
            value={name}
            onChange={e => setName(e.target.value)}
            required
          />
          <input
            type="email"
            placeholder="Your Email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            required
          />
          <button type="submit">Submit</button>
        </form>
        {message && <p className="status-message">{message}</p>}
      </div>
    </div>
  );
}

export default EnquiryForm;