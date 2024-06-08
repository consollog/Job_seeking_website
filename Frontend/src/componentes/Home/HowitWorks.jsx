import React from 'react'
import { FaUserPlus } from 'react-icons/fa'
import { MdFindInPage } from 'react-icons/md'
import { IoMdSend } from 'react-icons/io'

function HowitWorks() {
  return (
    <div className='howitworks'>
      <div className="container">
        <h3>How JobZee Works</h3>
        <div className="banner">
          <div className="card">
            <FaUserPlus />
            <p>Create Account</p>
            <p>
              Join JobZee & Sign up, complete your profile, and unlock endless career opportunities today!
            </p>
          </div>
          <div className="card">
            <MdFindInPage />
            <p>Find Job/Post a Job</p>
            <p>
              Discover your dream job or post opportunities seamlessly on JobZee, where talent meets opportunity.
            </p>
          </div>
          <div className="card">
            <IoMdSend />
            <p>Find Job/Post a Job</p>
            <p>
              Discover your dream job or post opportunities seamlessly on JobZee, where talent meets opportunity.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default HowitWorks
