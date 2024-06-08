import React, { useContext, useEffect } from 'react'
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import { Context } from "./main"
import Login from "./componentes/auth/Login"
import Register from "./componentes/auth/Register"
import NavBar from "./componentes/layout/Navbar"
import Footer from "./componentes/layout/Footer"
import Home from "./componentes/Home/Home"
import Job from "./componentes/job/Job"
import JobDetails from "./componentes/job/JobDetails"
import MyJob from "./componentes/job/MyJob"
import PostJob from "./componentes/job/PostJob"
import Application from "./componentes/applications/Applications"
import MyApplication from "./componentes/applications/MyApplications"
import NotFound from "./componentes/notFound/NotFound"
import axios from "axios"
import { Toaster } from "react-hot-toast"

function App() {
  const { isAuthorized, setIsAuthorized, setUser, setEemail, setJobb, setEmployer, setJobseeker } = useContext(Context)

  useEffect(() => {
    const FetchUser = async () => {
      try {
        //This fetch data show live email and user
        const response = await axios.get("http://localhost:3000/api/v1/user/getuser", { withCredentials: true })
        setUser(response.data.user)
        setIsAuthorized(true)
        setEemail(response.data.user.email)

        // This Fetch data for job show live
        const responses = await axios.get("http://localhost:3000/api/v1/job/getalljob", { withCredentials: true });
        setJobb(responses.data.AllJob.length)

        //This fetch data show jobseeker live
        const jobseekerlive = await axios.get("http://localhost:3000/api/v1/user/getjobseeker", { withCredentials: true })
        setJobseeker(jobseekerlive.data.jobseeker.length)

        //This is for Live Employer 
        const Employerlive = await axios.get("http://localhost:3000/api/v1/user/getemployer", { withCredentials: true })
        setEmployer(Employerlive.data.employer.length)
      } catch (error) {
        setIsAuthorized(false)
        // console.error('Error fetching user data:', error);

      }
    }
    FetchUser()
  }, [isAuthorized])

  return (
    <>
      <Router>
        <NavBar />
        <Routes>
          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<Register />} />
          <Route path='/' element={<Home />} />
          <Route path='/job/getall' element={<Job />} />
          <Route path='/job/:id' element={<JobDetails />} />
          <Route path='/job/post' element={<PostJob />} />
          <Route path='/job/me' element={<MyJob />} />
          <Route path='/application/:id' element={<Application />} />
          <Route path='/application/me' element={<MyApplication />} />
          <Route path='*' element={<NotFound />} />
        </Routes>
        <Footer />
        <Toaster />
      </Router>
    </>
  )
}

export default App
