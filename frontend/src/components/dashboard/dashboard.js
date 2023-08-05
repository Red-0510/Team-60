import React, { useEffect } from 'react'
import { useSelector } from 'react-redux';
import { selectIsLoggedIn } from '../../redux/authSlice';
import { useNavigate } from 'react-router-dom';
import "./dashboard.css"

const Dashboard = () => {

    const isLoggedIn = useSelector(selectIsLoggedIn)
    const navigate = useNavigate()

    useEffect(()=>{
        if(!isLoggedIn) navigate("/login")
    },[])

  return (
    <div>
      <br/> <br/> <br/> <br/> <br/>
    <h1><center>Hello</center></h1>
    <h3><center><a href="https://drive.google.com/file/d/14vxUaMTWUc5YSJSRxVuAi82iLQWr0SAD/view?usp=sharing">Helloplease get look into extecutable</a></center></h3>
    <div className="container">
      <div className="box">
        <h1>Arogya</h1>
        <p>Mainly focuses about both physical and emotional health of students and involves periodical
                            health checkups, Health camps and organize eye surgeries
                            and teaching higene practices.</p>
      </div>
      <div className="box">
        <h1>Aahladha</h1>
        <p>Organize festivals, birthday celebrations and Encourage in activities such as Sports, Music,
 singing, dance etc.</p>
      </div>
      <div className="box">
        <h1>Akshara</h1>
        <p> Educating the students and empower them by providing Spoken english,
 Computer and technical training classes and various other programs.</p>
      </div>
    </div>

    </div>


  )
}

export default Dashboard