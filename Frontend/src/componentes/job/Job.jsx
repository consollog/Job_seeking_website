import React, { useContext, useEffect, useState } from 'react'
import { Context } from "../../main"
import { Link, Navigate } from 'react-router-dom'
import axios from 'axios'

function Job() {
  const [job, setJob] = useState([])
  const { isAuthorized } = useContext(Context)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:3000/api/v1/job/getalljob", { withCredentials: true });
        setJob(response.data);
        // setJobb(response.data.AllJob.length)
      } catch (error) {
        console.error('Error fetching jobs:', error);
      }
    };

    fetchData();
  }, []);
  if (!isAuthorized) {
    <Navigate to={"/login"} />
  }
  return (
    <section className='jobs page'>
      <div className='container'>
        <h1>ALL AVAILABLE JOBS</h1>
        <div className='banner'>
          {job.AllJob && job.AllJob.map((element) => {
            return (
              <div className='card' key={element._id}>
                <p>{element.title}</p>
                <p>{element.category}</p>
                <p>{element.conntry}</p>
                <Link to={`/job/${element._id}`}>Job Details</Link>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

export default Job
