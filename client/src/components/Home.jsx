import { Link } from "react-router-dom";

function Home() {
  return (
    <div>
      <Link to="/patient">Patient&rsquo;s Home</Link>
      <br />
      <Link to="/admin">Admin&rsquo;s Home</Link>
      <br />
      <Link to="/pharmacist">Pharmacist&rsquo;s Home</Link>
      <br />
      <Link to="/signup/patient">Register</Link>
    </div>
  );
}

export default Home;
