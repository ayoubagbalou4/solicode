
import React, { useEffect, useState } from 'react'
import Layout from './layout/Layout'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import Swal from 'sweetalert2'

const AddUserActivity = () => {

    const navigate = useNavigate()
    const [loadingAddUserActivity, setLoadingAddUserActivity] = useState(false)
    const [userActivitiesData, setUserActivitiesData] = useState({})
    const handleUserActivity = (e) => {
        setUserActivitiesData({ ...userActivitiesData, [e.target.name]: e.target.value })
    }

    const addUserActivity = async (e) => {
        e.preventDefault()
        setLoadingAddUserActivity(true)
        try {
            const response = await axios.post('http://127.0.0.1:8000/api/userActivities', userActivitiesData)
            setLoadingAddUserActivity(false)
            navigate('/admin/userActivities')
            Swal.fire({
                position: "top-end",
                icon: "success",
                title: "Add userActivity With Success",
                showConfirmButton: false,
                timer: 1500
            });
        } catch (error) {
            console.log(error)
            setLoadingAddUserActivity(false)
        }
    }

    const [activities, setActivities] = useState([])
    const [loadingActivities, setLoadingActivities] = useState([])
    const getActivities = async () => {
        setLoadingActivities(true)
        try {
            const response = await axios.get('http://127.0.0.1:8000/api/activities')
            setActivities(response.data.activities)
            setLoadingActivities(false)
        } catch (error) {
            console.log(error)
            setLoadingActivities(false)
        }
    }
    useEffect(() => {
        getActivities()
    }, [])

    return (
        <Layout userActivities="active" header="userActivities" content={
            <>
                <div class="searchAdd">
                    <span></span>
                    <Link to={'/admin/add-activity'}><button>Add Activity</button></Link>
                </div>
                <div class="formAdmin">
                    <h2>Add User Activity</h2>
                    <form onSubmit={addUserActivity}>
                        <div>
                            <p>activity_id</p>
                            <select onChange={handleUserActivity} name='activity_id' required>
                                <option value="" key="" selected>Selectionner L'activitie</option>
                                {
                                    activities.map((e) => (
                                        <option value={e.id} key="">{e.nom}</option>
                                    ))
                                }
                            </select>
                        </div>
                        <div>
                            <p>duree_par_min</p>
                            <input onChange={handleUserActivity} name='duree_par_min' placeholder='duree_par_min' required  />
                        </div>
                        <div>
                            <p>nbr_fois</p>
                            <input onChange={handleUserActivity} name='nbr_fois' placeholder='nbr_fois' required  />
                        </div>
                        <div>
                            <p>consomation</p>
                            <input onChange={handleUserActivity} name='consomation' placeholder='consomation' required  />
                        </div>
                        <div>
                            <p>points</p>
                            <input onChange={handleUserActivity} name='points' placeholder='points' required  />
                        </div>
                        <div>
                            <p>ideal_rate</p>
                            <input onChange={handleUserActivity} name='ideal_rate' placeholder='ideal_rate' required  />
                        </div>
                        {
                            !loadingAddUserActivity &&
                            <button>Add UserActivity</button>
                        }
                    </form>
                    {loadingAddUserActivity && <center><div class="loader2"></div></center>}
                </div>
            </>
        } />
    )
}

export default AddUserActivity

