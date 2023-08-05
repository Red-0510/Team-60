import React, { useState } from 'react';
import './reset.css'
import { resetPassword } from '../../services/authService';
import { toast } from 'react-toastify';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const Reset = () => {

  const dispatch = useDispatch()
  const navigate = useNavigate()

  const [password, setPassword] = useState();
  const [confirmPassword, setConfirmPassword] = useState();
  const [disable,setDisable] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!password || !confirmPassword) {
      return toast.error("Please enter password and confirm password.")
    }

    if(password!==confirmPassword){
      return toast.error("Passwords do not match")
    }

    const userData = {
      password
    }
    try{
      setDisable(true)
      const data = await resetPassword(userData,dispatch);
      if(!data){
        setDisable(false)
        return
      }
      navigate("/");
    }catch(err){
      setDisable(false)
      console.log(err)
    }

  };


  return (
    <div className='container'>
      <h2 >Reset Password</h2>
      <form className='form'>
        <label htmlFor="password"></label>
        <input
          type="password"
          id="password"
          value={password}
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <label htmlFor="confirm-password"></label>
        <input
          type="password"
          id="confirm-password"
          value={confirmPassword}
          placeholder="Confirm Password"
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
        />
        <button className="btn inside" disabled={disable} onClick={handleSubmit} type="submit">Reset Password</button>
      </form>
    </div>
  );
};

export default Reset;