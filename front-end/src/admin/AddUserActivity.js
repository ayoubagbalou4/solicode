
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
        const data = {
            activity_id: userActivitiesData.activity_id,
            duree_par_min: userActivitiesData.duree_par_min,
            nbr_fois: userActivitiesData.nbr_fois,
            consomation: userActivitiesData.duree_par_min * 0.2 * userActivitiesData.nbr_fois,
            points: 10 - userActivitiesData.duree_par_min * 0.2 * userActivitiesData.nbr_fois,
            ideal_rate: '10',
        }
        try {
            const response = await axios.post('http://127.0.0.1:8000/api/userActivities', data)
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
                            <input value={userActivitiesData.duree_par_min * 0.2 * userActivitiesData.nbr_fois} onChange={handleUserActivity} name='consomation' placeholder='consomation' required  />
                        </div>
                        <div>
                            <p>points</p>
                            <input value={ 10 - (userActivitiesData.duree_par_min * 0.2) * userActivitiesData.nbr_fois } name='points' placeholder='points' disabled readOnly  />
                        </div>
                        <div>
                            <p>ideal_rate</p>
                            <input value={'10 L'} onChange={handleUserActivity} name='ideal_rate' placeholder='ideal_rate'  disabled readOnly/>
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

