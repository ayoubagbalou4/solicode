import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import Layout from './layout/Layout'
import Swal from 'sweetalert2'
import dateFormat, { masks } from "dateformat";

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

    const [selectedMonth, setSelectedMonth] = useState('');

    const months = [
        { value: '', label: 'Select Month' },
        { value: '01', label: 'January' },
        { value: '02', label: 'February' },
        { value: '03', label: 'March' },
        { value: '04', label: 'April' },
        { value: '05', label: 'May' },
        { value: '06', label: 'June' },
        { value: '07', label: 'July' },
        { value: '08', label: 'August' },
        { value: '09', label: 'September' },
        { value: '10', label: 'October' },
        { value: '11', label: 'November' },
        { value: '12', label: 'December' },
    ];

    const handleChange = (e) => {
        setSelectedMonth(e.target.value);
    };



    return (
        <Layout userActivities="active" header="userActivities" content={
            <>
                <div class="searchAdd">
                    <select value={selectedMonth} onChange={handleChange}>
                        {months.map(month => (
                            <option key={month.value} value={month.value}>{month.label}</option>
                        ))}
                    </select>
                    <Link to={'/admin/add-userActivity'}><button>Add UserActivity</button></Link>
                </div>

                {
                    loadingUserActivities ?
                        <div className="loader1"></div>
                        :
                        <table className='table'>
                            <tr>
                                <th>activity</th>
                                <th>duree par min</th>
                                <th>nbr fois</th>
                                <th>consomation</th>
                                <th>points</th>
                                <th>ideal rate</th>
                                <th>Date</th>
                                <th>actions</th>
                            </tr>
                            {
                                selectedMonth == '' ?
                                userActivities.map((userActivity, index) => (
                                    <tr key={index}>
                                        <td>{userActivity.activity?.nom}</td>
                                        <td>{userActivity.duree_par_min} min</td>
                                        <td>{userActivity.nbr_fois} fois</td>
                                        <td>{userActivity.consomation} L</td>
                                        <td>{userActivity.points}</td>
                                        <td>{userActivity.ideal_rate} L</td>
                                        <td>{dateFormat(userActivity.created_at, 'yyyy-mm-dd')}</td>
                                        <td>
                                            <button onClick={() => deleteUserActivityConfirm(userActivity.id)} className='delete'>Delete</button>
                                            <Link to={`/admin/edit-userActivity/${userActivity.id}`}><button className='update'>Update</button></Link>
                                        </td>
                                    </tr>
                                ))
                                :
                                userActivities.filter((e) => dateFormat(e.created_at, 'mm') == selectedMonth)
                                .map((userActivity, index) => (
                                    <tr key={index}>
                                        <td>{userActivity.activity?.nom}</td>
                                        <td>{userActivity.duree_par_min} min</td>
                                        <td>{userActivity.nbr_fois} fois</td>
                                        <td>{userActivity.consomation} L</td>
                                        <td>{userActivity.points}</td>
                                        <td>{userActivity.ideal_rate} L</td>
                                        <td>{dateFormat(userActivity.created_at, 'yyyy-mm-dd')}</td>
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
