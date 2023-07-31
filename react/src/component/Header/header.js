import React from "react";
import { Link } from "react-router-dom";
const Header = () => {
  return (
    <div>
        <Link to='student-form'>Student</Link>
        <Link to='report'>Report</Link>
        <Link to='fees'>Fees</Link>

    </div>
  )
}



export default Header