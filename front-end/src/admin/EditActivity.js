
import React, { useEffect, useState } from 'react'
import Layout from './layout/Layout'
import { useNavigate, useParams } from 'react-router-dom'
import axios from 'axios'
import Swal from 'sweetalert2'

const EditActivity = () => {

    const { id } = useParams()
    const navigate = useNavigate()

    const [loadingGetSingleActivity, setLoadingGetSingleActivity] = useState(false)
    const [activitiesData, setActivitiesData] = useState({})
    const handleActivity = (e) => {
        setActivitiesData({ ...activitiesData, [e.target.name]: e.target.value })
    }

    const getSingleActivity = async () => {
        setLoadingGetSingleActivity(true)
        try {
            const response = await axios.get(`http://127.0.0.1:8000/api/activities/${id}`)
            setActivitiesData(response.data.activity)
            setLoadingGetSingleActivity(false)
        } catch (error) {
            console.log(error)
            setLoadingGetSingleActivity(false)
        }
    }
    useEffect(() => {
        getSingleActivity()
    }, [])

    const [loadingEditActivity, setLoadingEditActivity] = useState(false)
    const editActivity = async (e) => {
        e.preventDefault()
        setLoadingEditActivity(true)
        try {
            const response = await axios.put(`http://127.0.0.1:8000/api/activities/${id}`, activitiesData)
            setLoadingEditActivity(false)
            navigate('/admin/activities')
            Swal.fire({
                position: "top-end",
                icon: "success",
                title: "Edit activity With Success",
                showConfirmButton: false,
                timer: 1500
            });
        } catch (error) {
            console.log(error)
            setLoadingEditActivity(false)
        }
    }

    return (
        <Layout activities="active" header="activities" content={
            <>
                <div class="formAdmin">
                    <h2>Edit Activity</h2>
                    {loadingGetSingleActivity ? <div className="loader1"></div> :
                        <form onSubmit={editActivity}>
                            <div>
                                <p>nom</p>
                                <input value={activitiesData.nom} onChange={handleActivity} name='nom' type="text" placeholder="Nom" required />
                            </div>
                            {
                                !loadingEditActivity &&
                                <button>Edit Activity</button>
                            }
                        </form>
                    }
                    {loadingEditActivity && <center><div class="loader2"></div></center>}
                </div>
            </>
        } />
    )
}

export default EditActivity

