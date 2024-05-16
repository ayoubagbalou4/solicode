
import React, { useEffect, useState } from 'react'
import Layout from './layout/Layout'
import { useNavigate, useParams } from 'react-router-dom'
import axios from 'axios'
import Swal from 'sweetalert2'

const EditUserActivity = () => {

    const { id } = useParams()
    const navigate = useNavigate()

    const [loadingGetSingleUserActivity, setLoadingGetSingleUserActivity] = useState(false)
    const [userActivitiesData, setUserActivitiesData] = useState({})
    const handleUserActivity = (e) => {
        setUserActivitiesData({ ...userActivitiesData, [e.target.name]: e.target.value })
    }

    const getSingleUserActivity = async () => {
        setLoadingGetSingleUserActivity(true)
        try {
            const response = await axios.get(`http://127.0.0.1:8000/api/userActivities/${id}`)
            setUserActivitiesData(response.data.userActivity)
            setLoadingGetSingleUserActivity(false)
        } catch (error) {
            console.log(error)
            setLoadingGetSingleUserActivity(false)
        }
    }
    useEffect(() => {
        getSingleUserActivity()
    }, [])

    const [loadingEditUserActivity, setLoadingEditUserActivity] = useState(false)
    const editUserActivity = async (e) => {
        e.preventDefault()
        setLoadingEditUserActivity(true)
        try {
            const response = await axios.put(`http://127.0.0.1:8000/api/userActivities/${id}`, userActivitiesData)
            setLoadingEditUserActivity(false)
            navigate('/admin/userActivities')
            Swal.fire({
                position: "top-end",
                icon: "success",
                title: "Edit userActivity With Success",
                showConfirmButton: false,
                timer: 1500
            });
        } catch (error) {
            console.log(error)
            setLoadingEditUserActivity(false)
        }
    }

    return (
        <Layout userActivities="active" header="userActivities" content={
            <>
                <div class="formAdmin">
                    <h2>Edit UserActivity</h2>
                    {loadingGetSingleUserActivity ? <div className="loader1"></div> :
                        <form onSubmit={editUserActivity}>
                            <div>
                                <p>user_id</p>
                                <input value={userActivitiesData.user_id} onChange={handleUserActivity} name='user_id' type="text" placeholder="User_id" required />
                            </div>
                            <div>
                                <p>activity_id</p>
                                <input value={userActivitiesData.activity_id} onChange={handleUserActivity} name='activity_id' type="text" placeholder="Activity_id" required />
                            </div>
                            <div>
                                <p>etat</p>
                                <input value={userActivitiesData.etat} onChange={handleUserActivity} name='etat' type="text" placeholder="Etat" required />
                            </div>
                            {
                                !loadingEditUserActivity &&
                                <button>Edit UserActivity</button>
                            }
                        </form>
                    }
                    {loadingEditUserActivity && <center><div class="loader2"></div></center>}
                </div>
            </>
        } />
    )
}

export default EditUserActivity

