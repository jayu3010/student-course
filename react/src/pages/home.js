import React from 'react'
import { Link } from 'react-router-dom'

const Home = () => {
  return (
    <div className='container'>
      <div className='form-group form-wrapper'>
  
      <Link className='form-title' to='student-form'>Student</Link>
      <Link className='form-title' to='fees'>Fees</Link>
      <Link className='form-title' to='report'>Report</Link>
      </div>
    </div>
  )
}

export default Home