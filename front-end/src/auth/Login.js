import React, { useState } from 'react'
// import Navbar from '../components/Navbar'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import Nav from '../components/Nav'

const Login = () => {

    const [signinData, setSigninData] = useState({})
    const [erroSigninData, setErroSigninData] = useState('')
    const [loadingSignin, setLoadingSignin] = useState(false)
    const navigate = useNavigate()

    const handleSigninData = (e) => {
        setSigninData({ ...signinData, [e.target.name]: e.target.value })
    }
    const handleSignin = async (e) => {
        e.preventDefault()
        setLoadingSignin(true)
        try {
            const response = await axios.post('http://127.0.0.1:8000/api/signin', signinData)
            console.log(response.data)
            localStorage.setItem('tokenDoubleaBlog', response.data.token)
            localStorage.setItem('userDoubleaBlog', JSON.stringify(response.data.user))
            setLoadingSignin(false)
            navigate('/admin/dashboard')
        } catch (error) {
            setLoadingSignin(false)
            if (error.response.data.status === 404) {
                setErroSigninData(error.response.data.message)
            }
            console.log(error)
        }
    }

    return (
        <>
            <Nav />
            <div className="containerForm">
                <form onSubmit={handleSignin}>
                    <h2>Login</h2>
                    {erroSigninData && <p className='errorInput'>{erroSigninData}</p>}
                    <input onChange={handleSigninData} name='email' type="text" placeholder="Email" required />
                    <input onChange={handleSigninData} name='password' type="password" placeholder="Password" required />
                    {loadingSignin ? <center><div class="loader2"></div></center> :
                        <>
                            <button>Login</button>
                            <p>Does Not Have An Account <Link to="/register">Register</Link></p>
                        </>
                    }
                </form>
            </div>
        </>
    )
}

export default Login
