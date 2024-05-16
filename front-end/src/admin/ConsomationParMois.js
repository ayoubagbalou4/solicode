import React, { useEffect, useState } from 'react'
import Layout from './layout/Layout'
import axios from 'axios'

const ConsomationParMois = () => {

    const [userActivities, setUserActivities] = useState([])
    const [loadingUserActivities, setLoadingUserActivities] = useState([])
    const getUserActivities = async () => {
        setLoadingUserActivities(true)
        try {
            const response = await axios.get('http://127.0.0.1:8000/api/consomationParMois')
            setUserActivities(response.data)
            setLoadingUserActivities(false)
        } catch (error) {
            console.log(error)
            setLoadingUserActivities(false)
        }
    }
    useEffect(() => {
        getUserActivities()
    }, [])

    return (
    <Layout consomationParMois="active" header="consomation Par Mois" content={
        <>
            <div class="searchAdd">
                <span></span>
            </div>
            {
                loadingUserActivities ?
                    <div className="loader1"></div>
                    :
                    <table className='table'>
                        <tr>
                            <th>Mois</th>
                            <th>Consomation Total</th>
                        </tr>
                        {
                            userActivities.map((userActivity, index) => (
                                <tr key={index}>
                                    <td>{userActivity.month}</td>
                                    <td>{userActivity.consomation} L</td>
                                </tr>
                            ))
                        }
                    </table>
            }
        </>
    } />
)
}

export default ConsomationParMois
