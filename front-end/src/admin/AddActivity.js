
import React, { useState } from 'react'
import Layout from './layout/Layout'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import Swal from 'sweetalert2'

const AddActivity = () => {

    const navigate = useNavigate()
    const [loadingAddActivity, setLoadingAddActivity] = useState(false)
    const [activitiesData, setActivitiesData] = useState({})
    const handleActivity = (e) => {
        setActivitiesData({ ...activitiesData, [e.target.name]: e.target.value })
    }

    const addActivity = async (e) => {
        e.preventDefault()
        setLoadingAddActivity(true)
        try {
            const response = await axios.post('http://127.0.0.1:8000/api/activities', activitiesData)
            setLoadingAddActivity(false)
            navigate('/admin/activities')
            Swal.fire({
                position: "top-end",
                icon: "success",
                title: "Add activity With Success",
                showConfirmButton: false,
                timer: 1500
            });
        } catch (error) {
            console.log(error)
            setLoadingAddActivity(false)
        }
    }

    return (
        <Layout activities="active" header="activities" content={
            <>
                <div class="formAdmin">
                    <h2>Add Activity</h2>
                    <form onSubmit={addActivity}>
                        <div>
                            <p>nom</p>
                            <input onChange={handleActivity} name='nom' type="text" placeholder="Nom" required />
                        </div>

                        {
                            !loadingAddActivity &&
                            <button>Add Activity</button>
                        }
                    </form>
                    {loadingAddActivity && <center><div class="loader2"></div></center>}
                </div>
            </>
        } />
    )
}

export default AddActivity

