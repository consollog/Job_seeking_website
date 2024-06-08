import React from 'react'
import { FaMicrosoft, FaApple } from "react-icons/fa"
import { SiTesla } from "react-icons/si"

function PopularCompnies() {
  const companies = [
    {
      id: 1,
      title: "Tata Consultancy Services (TCS)",
      location: "Gandhinagar",
      openPositions: 10,
      icon: <FaMicrosoft />,
    },
    {
      id: 2,
      title: "Cybage Software",
      location: "Gandhinagar",
      openPositions: 5,
      icon: <SiTesla />,
    },
    {
      id: 3,
      title: "Gateway Technolabs",
      location: "Ahmedabad",
      openPositions: 20,
      icon: <FaApple />,
    },
  ];
  return (
    <div className='companies'>
      <div className="container">
        <h3>POPULAR COMPANIES</h3>
        <div className='banner'>
          {
            companies.map((Element) => {
              return (
                <div className='card' key={Element.id}>
                  <div className="content">
                    <div className='icon'>{Element.icon}</div>
                    <div className='text'>
                      <p>{Element.title}</p>
                      <p>{Element.location}</p>
                    </div>
                  </div>
                  <button>Open Positions :{Element.openPositions}</button>
                </div>
              )
            })
          }
        </div>
      </div>
    </div>
  )
}

export default PopularCompnies
