import React, { useContext, useEffect, useState } from 'react'
import axios from "axios"
import toast from "react-hot-toast"
import { FaCheck } from "react-icons/fa6"
import { RxCross2 } from "react-icons/rx"
import { Context } from "../../main"
import { useNavigate } from 'react-router-dom'

function MyJob() {
  const [myJob, setMyJob] = useState([]);
  const [editing, setEditing] = useState();
  const { isAuthorized, user, setJobb, jobb } = useContext(Context)
  const NavigateTo = useNavigate();
  useEffect(() => {
    const fetchJob = async () => {
      try {
        const { data } = await axios.get("http://localhost:3000/api/v1/job/getmyjobs", { withCredentials: true })
        setMyJob(data.Myjobs)
      } catch (error) {
        toast.error(error.response.data.messages)
        setMyJob([])
      }
    }
    fetchJob();
  }, [])

  if (!isAuthorized || user && user.role != "Employer") {
    NavigateTo("/")
  }

  const handleEnableEditing = (jobId) => {
    setEditing(jobId)
  }

  const handleDisableEditing = (jobId) => {
    setEditing(jobId)
  }

  const handleUpdateJob = async (jobId) => {
    try {
      const UpdateJob = myJob.find((job) => job._id === jobId)
      await axios.put(`http://localhost:3000/api/v1/job/update/${UpdateJob._id}`, UpdateJob, { withCredentials: true })
        .then((res) => {
          toast.success(res.data.message)
          setEditing(null)
        })
    } catch (error) {
      toast.error(error.response.data.messages)
    }
  }

  const handleDeleteJob = async (jobId) => {
    await axios.delete(`http://localhost:3000/api/v1/job/deleteJob/${jobId}`, { withCredentials: true })
      .then((res) => {
        toast.success(res.data.message)
        setMyJob((preJob) => preJob.filter((job) => job._id != jobId))
        setJobb(jobb - 1)
      })
      .catch((error) => {
        toast.error(error.response.data.messages)
      })
  }

  const handleInputChange = (jobId, field, value) => {
    setMyJob((prejob) =>
      prejob.map((job) => job._id === jobId ? { ...job, [field]: value } : job)
    )
  }




  return (
    <>
      <div className='myJobs page'>
        <div className="container">
          <h3>Your Posted Job</h3>
          {
            myJob && myJob.length > 0
              ? (<>
                <div className="banner">
                  {
                    myJob.map(element => {
                      return (
                        <div className="card" key={element._id}>
                          <div className="content">
                            <div className="short_fields">
                              <div>
                                <span>Title:</span>
                                <input type="text" disabled={editing != element._id ? true : false}
                                  value={element.title}
                                  onChange={(e) => handleInputChange(element._id, "title", e.target.value)}
                                />
                              </div>
                              <div>
                                {" "}
                                <span>Country:</span>
                                <input type="text" disabled={editing != element._id ? true : false}
                                  value={element.country}
                                  onChange={(e) => handleInputChange(element._id, "country", e.target.value)}
                                />
                              </div>
                              <div>
                                <span>City:</span>
                                <input type="text" disabled={editing != element._id ? true : false}
                                  value={element.city}
                                  onChange={(e) => handleInputChange(element._id, "city", e.target.value)}
                                />
                              </div>
                              <div>
                                <span>Category:</span>
                                <select value={element.category}
                                  onChange={(e) => handleInputChange(element._id, "category", e.target.value)}
                                  disabled={editing != element._id ? true : false}>

                                  <option value="Graphics & Design">Graphics & Design</option>
                                  <option value="Mobile App Development">
                                    Mobile App Development
                                  </option>
                                  <option value="Frontend Web Development">
                                    Frontend Web Development
                                  </option>
                                  <option value="MERN Stack Development">
                                    MERN STACK Development
                                  </option>
                                  <option value="Account & Finance">Account & Finance</option>
                                  <option value="Artificial Intelligence">
                                    Artificial Intelligence
                                  </option>
                                  <option value="Video Animation">Video Animation</option>
                                  <option value="MEAN Stack Development">
                                    MEAN STACK Development
                                  </option>
                                  <option value="MEVN Stack Development">
                                    MEVN STACK Development
                                  </option>
                                  <option value="Data Entry Operator">Data Entry Operator</option>
                                </select>
                              </div>
                              <div>
                                <span>Salary:{" "}
                                  {element.fixedSalary ?
                                    <input value={element.fixedSalary}
                                      onChange={(e) => handleInputChange(element._id, "fixedSalary", e.target.value)}
                                      disabled={editing != element._id ? true : false} /> :
                                    <div>
                                      <input value={element.salaryFrom}
                                        onChange={(e) => handleInputChange(element._id, "salaryFrom", e.target.value)}
                                        disabled={editing != element._id ? true : false} />
                                      <input value={element.salaryTo}
                                        onChange={(e) => handleInputChange(element._id, "salaryTo", e.target.value)}
                                        disabled={editing != element._id ? true : false} />
                                    </div>}
                                </span>
                              </div>
                              <div>
                                <span>Expired:</span>
                                <select value={element.expire}
                                  onChange={(e) => handleInputChange(element._id, "expire", e.target.value)}
                                  disabled={editing != element._id ? true : false}>
                                  <option value={true}>True</option>
                                  <option value={false}>False</option>
                                </select>
                              </div>
                            </div>
                            <div className="long_field">
                              <div>
                                <span>Descriptions:</span>{" "}
                                <textarea rows="5" value={element.description}
                                  onChange={(e) => handleInputChange(element._id, "description", e.target.value)}
                                  disabled={editing != element._id ? true : false} />
                              </div>
                              <div>
                                <span>Locations:</span>
                                <textarea rows="5" value={element.location}
                                  onChange={(e) => handleInputChange(element._id, "location", e.target.value)}
                                  disabled={editing != element._id ? true : false} />
                              </div>
                            </div>
                          </div>
                          <div className="button_wrapper">
                            <div className="edit_btn_wrapper">
                              {
                                editing === element._id ? (<>
                                  <button onClick={() => handleUpdateJob(element._id)} className="check_btn"><FaCheck /></button>
                                  <button onClick={() => handleDisableEditing()} className="cross_btn"><RxCross2 /></button>
                                </>) :
                                  (<> <button onClick={() => handleEnableEditing(element._id)} className='edit_btn'>Edit</button></>)
                              }
                            </div>
                            <button onClick={() => handleDeleteJob(element._id)} className='delete_btn'>Delete</button>
                          </div>
                        </div>
                      )
                    })
                  }
                </div>
              </>)
              : (<p>
                You not posted any job yet or May be deleted your jobs
              </p>)
          }
        </div>
      </div>
    </>
  )
}

export default MyJob
