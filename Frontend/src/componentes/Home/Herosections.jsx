import React, { useContext } from 'react'
import { FaBuilding, FaSuitcase, FaUsers, FaUserPlus } from 'react-icons/fa';
import { Context } from '../../main';

function Herosections() {
  const { jobb, jobseeker, employer } = useContext(Context)
  console.log(jobseeker)
  // console.log("employer:", employer)
  const details = [
    {
      id: 1,
      title: jobb,
      subTitle: "Live Job",
      icon: <FaSuitcase />,
    },

    {
      id: 2,
      title: "91220",
      subTitle: "Companies",
      icon: <FaBuilding />,
    },
    {
      id: 3,
      title: jobseeker,
      subTitle: "Job Seekers",
      icon: <FaUsers />,
    },
    {
      id: 4,
      title: employer,
      subTitle: "Employers",
      icon: <FaUserPlus />,
    },
    // console.log(jobb)
  ];
  return (
    <div className='heroSection'>
      <div className='container'>
        <div className='title'>
          <h1>Find <span>Job</span> that <span>Suits</span></h1>
          <h2>Welcome to <span>JobZee</span></h2>
          <p>Discover Your Future with JobZee, where opportunities meet talent.
            Navigate a sea of careers, connect with top employers, and elevate
            your professional journey. With JobZee, your dream job is just a click away.
            Join us and step into a world of endless possibilities.</p>
        </div>
        <div className='image'>
          <img src="/heroS.jpg" alt="hero" />
        </div>
      </div>
      {/* <div>{jobb}</div> */}
      <div className='details'>{
        details.map(Element => {
          return (
            <div className='card' key={Element.id}>
              <div className='icon'>
                {Element.icon}
              </div>
              <div className='content'>
                <p>{Element.title}</p>
                <p>{Element.subTitle}</p>
              </div>
            </div>
          )
        })}</div>
    </div>
  )
}

export default Herosections
