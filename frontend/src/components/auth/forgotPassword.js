import React, { useState } from 'react';
// import './reset.css'
import { forgotPassword } from '../../services/authService';
import { toast } from 'react-toastify';
import { useDispatch } from 'react-redux';

const ForgotPassword = () => {

  const dispatch = useDispatch()

  const [email,setEmail] = useState();
  const [disable,setDisable] = useState(false)
  

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email) {
      return toast.error("Please enter an email.")
    }

    const userData = {
      email
    }
    try{
      setDisable(true)
      const data = await forgotPassword(userData,dispatch);
      if(!data){
        setDisable(false)
        return
      }
    }catch(err){
      setDisable(false)
      console.log(err)
    }

  };


  return (
    <div className='container'>
      <h2 >Reset Password</h2>
      <form className='form'>
        <label htmlFor="email"></label>
        <input
          type="email"
          id="email"
          value={email}
          placeholder="Your E-Mail Address"
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <button className="btn inside" type="submit" disabled={disable} onClick={handleSubmit}>Reset Password</button>
      </form>
    </div>
  );
};

export default ForgotPassword;