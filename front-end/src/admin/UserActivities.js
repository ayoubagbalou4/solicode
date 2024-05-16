import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import Layout from './layout/Layout'
import Swal from 'sweetalert2'

const UserActivities = () => {

    const [userActivities, setUserActivities] = useState([])
    const [loadingUserActivities, setLoadingUserActivities] = useState([])
    const getUserActivities = async () => {
        setLoadingUserActivities(true)
        try {
            const response = await axios.get('http://127.0.0.1:8000/api/userActivities')
            setUserActivities(response.data.userActivities)
            setLoadingUserActivities(false)
        } catch (error) {
            console.log(error)
            setLoadingUserActivities(false)
        }
    }
    useEffect(() => {
        getUserActivities()
    }, [])


    const deleteUserActivity = async (id) => {
        try {
            const response = await axios.delete(`http://127.0.0.1:8000/api/userActivities/${id}`)
            getUserActivities()
        } catch (error) {
            console.log(error)
        }
    }

    const deleteUserActivityConfirm = (id) => {
        Swal.fire({
            title: "Do you want to delete This UserActivity?",
            showDenyButton: true,
            confirmButtonText: "delete",
            denyButtonText: "Don't delete"
        }).then((result) => {
            if (result.isConfirmed) {
                Swal.fire("Deleted!", "", "success");
                deleteUserActivity(id)
            }
        });
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
                    <input type="text" placeholder="Search For Any Item" />
                    <Link to={'/admin/add-userActivity'}><button>Add UserActivity</button></Link>
                </div>

                {
                    loadingUserActivities ?
                        <div className="loader1"></div>
                        :
                        <table className='table'>
                            <tr>
                                <th>user_id</th>
                                <th>activity_id</th>
                                <th>etat</th>
                                <th>actions</th>
                            </tr>
                            {
                                userActivities.map((userActivity, index) => (
                                    <tr key={index}>
                                        <td>{userActivity.user_id}</td>
                                        <td>{userActivity.activity_id}</td>
                                        <td>{userActivity.etat}</td>
                                        <td>
                                            <button onClick={() => deleteUserActivityConfirm(userActivity.id)} className='delete'>Delete</button>
                                            <Link to={`/admin/edit-userActivity/${userActivity.id}`}><button className='update'>Update</button></Link>
                                        </td>
                                    </tr>
                                ))
                            }
                        </table>
                }
            </>
        } />
    )
}

export default UserActivities
