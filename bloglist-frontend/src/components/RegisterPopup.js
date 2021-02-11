import React, { useState } from 'react'
import registerService from '../services/register'

const RegisterPopup =({ handleClose,setErrorMessage,setMessage }) => {
  const [username,setUsername]=useState('')
  const [name,setName]=useState('')
  const [password,setPassword]=useState('')
  const [confirmPassword,setConfirmPassword]=useState('')

  const handleRegister = async (event) => {
    event.preventDefault()
    if (password!==confirmPassword){
      setErrorMessage('The passwords does not match')
    } else {
      try {
        await registerService.register({
          username,
          name,
          password,
        })
        setUsername('')
        setName('')
        setPassword('')
        setConfirmPassword('')
        setMessage('You have successfully registered')
        setTimeout(() => {
          setMessage(null)
        }, 5000)
      } catch (error) {
        setErrorMessage('Failed registered!')
        setTimeout(() => {
          setErrorMessage(null)
        }, 5000)
      }
    }

    handleClose()
  }

  return (
    <div className="popup-box">
      <div className="box">
        <form onSubmit={handleRegister}>
          <div>
          username
            <input
              id='username'
              value={username}
              onChange={({ target }) => setUsername(target.value)}
            />
          </div>
          <div>
          name
            <input
              id='name'
              value={name}
              onChange={({ target }) => setName(target.value)}
            />
          </div>
          <div>
          password
            <input
              id='password'
              type='password'
              value={password}
              onChange={({ target }) => setPassword(target.value)}
            />
          </div>
          <div>
          confirm password
            <input
              id='password'
              type='password'
              value={confirmPassword}
              onChange={({ target }) => setConfirmPassword(target.value)}
            />
          </div>
          <button id='register-button' type='submit'>
          register
          </button>
          <button className="close-icon" onClick={handleClose}>cancel</button>
        </form>
      </div>
    </div>
  )
}

export default RegisterPopup