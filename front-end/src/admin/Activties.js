import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import Layout from './layout/Layout'
import Swal from 'sweetalert2'

const Activities = () => {

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


    const deleteActivity = async (id) => {
        try {
            const response = await axios.delete(`http://127.0.0.1:8000/api/activities/${id}`)
            getActivities()
        } catch (error) {
            console.log(error)
        }
    }

    const deleteActivityConfirm = (id) => {
        Swal.fire({
            title: "Do you want to delete This Activity?",
            showDenyButton: true,
            confirmButtonText: "delete",
            denyButtonText: "Don't delete"
        }).then((result) => {
            if (result.isConfirmed) {
                Swal.fire("Deleted!", "", "success");
                deleteActivity(id)
            }
        });
    }


    return (
        <Layout activities="active" header="activities" content={
            <>
                <div class="searchAdd">
                    <input type="text" placeholder="Search For Any Item" />
                    <Link to={'/admin/add-activity'}><button>Add Activity</button></Link>
                </div>

                {
                    loadingActivities ?
                        <div className="loader1"></div>
                        :
                        <table className='table'>
                            <tr>
                                <th>nom</th>
                                <th>actions</th>
                            </tr>
                            {
                                activities.map((activity, index) => (
                                    <tr key={index}>
                                        <td>{activity.nom}</td>
                                        <td>
                                            <button onClick={() => deleteActivityConfirm(activity.id)} className='delete'>Delete</button>
                                            <Link to={`/admin/edit-activity/${activity.id}`}><button className='update'>Update</button></Link>
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

export default Activities
