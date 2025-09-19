import { Link } from 'react-router-dom';
import './Home.css'; // Import the CSS file

function Home() {
  return (
    <div className="home-container">
      <div className="home-card">
        <h1>Welcome to My MERN App</h1>
        <p>Please log in or sign up to continue.</p>
        <div className="button-group">
          <Link to="/login"><button className="btn primary">Login</button></Link>
          <Link to="/signup"><button className="btn secondary">Sign Up</button></Link>
        </div>
      </div>
    </div>
  );
}

export default Home;