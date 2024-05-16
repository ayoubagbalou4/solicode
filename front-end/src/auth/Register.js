import React, { useState } from 'react'
// import Navbar from '../components/Navbar'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import Swal from 'sweetalert2'
import Nav from '../components/Nav'

const Register = () => {


    const navigate = useNavigate()
    const [usersData, setUsersData] = useState({})
    const [loadingAddUser, setLoadingAddUser] = useState(false)
    const handleUser = (e) => {
        setUsersData({ ...usersData, [e.target.name]: e.target.value })
    }

    const addUser = async (e) => {
        e.preventDefault()
        setLoadingAddUser(true)
        const data = {
            nom: usersData.nom,
            prenom: usersData.prenom,
            address: usersData.address,
            phone: usersData.phone,
            email: usersData.email,
            password: usersData.password,
        }
        try {
            const response = await axios.post('http://127.0.0.1:8000/api/signup', data)
            setLoadingAddUser(false)
            navigate('/login')
            window.location.reload()
        } catch (error) {
            console.log(error)
            setLoadingAddUser(false)
        }
    }


    return (
        <>
            <Nav />
            <div className="containerForm">
                <form onSubmit={addUser} >
                    <h2>Signup</h2>
                    <input onChange={handleUser} name='nom' type="text" placeholder="nom" required />
                    <input onChange={handleUser} name='prenom' type="text" placeholder="prenom" required />
                    <input onChange={handleUser} name='address' type="text" placeholder="address" required />
                    <input onChange={handleUser} name='phone' type="text" placeholder="phone" required />
                    <input onChange={handleUser} name='email' type="email" placeholder="Email" required />
                    <input onChange={handleUser} name='password' type="password" placeholder="Password" required />
                    {loadingAddUser ? <center><div class="loader2"></div></center> :
                        <>
                            <button>Signup</button>
                            <p>Already Have An Account ? <Link to="/login">Login</Link></p>
                        </>
                    }
                </form>
            </div>
        </>
    )
}

export default Register
