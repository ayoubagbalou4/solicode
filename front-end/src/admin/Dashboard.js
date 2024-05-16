import React, { useEffect, useState } from 'react'
import axios from 'axios'
import Layout from './layout/Layout'
import { Chart as chartjs } from 'chart.js/auto';
import { Bar, Line } from 'react-chartjs-2'
import dateFormat, { masks } from "dateformat";


const Dashboard = () => {


    const [getcounts, setGetcounts] = useState([])
    const [loadingGetcounts, setLoadingGetcounts] = useState([])
    const getGetcounts = async () => {
        setLoadingGetcounts(true)
        try {
            const response = await axios.get('http://127.0.0.1:8000/api/getcounts')
            setGetcounts(response.data)
            setLoadingGetcounts(false)
        } catch (error) {
            console.log(error)
            setLoadingGetcounts(false)
        }
    }
    useEffect(() => {
        getGetcounts()
    }, [])

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




    return (
        <Layout dashboard="active" header="dashboard" content={
            <>
                <div className="boxs">
                    <div className="box">
                        <i className="fa-solid fa-users"></i>
                        <h3>Activities</h3>
                        <h3>{getcounts.activities}</h3>
                    </div>
                    <div className="box">
                        <i class="fa-brands fa-product-hunt"></i>
                        <h3>Points</h3>
                        <h3>{getcounts.points}</h3>
                    </div>
                    <div className="box">
                        <i class="fa-solid fa-layer-group"></i>
                        <h3>User Acticities</h3>
                        <h3>{getcounts.user_activities}</h3>
                    </div>
                    <div className="box">
                        <i class="fa-solid fa-layer-group"></i>
                        <h3>Total Consomation</h3>
                        <h3>{getcounts.consomation} L</h3>
                    </div>
                </div>
                <div className='chart'>
                    <Line data={
                        {
                            labels: getcounts.stats?.map((data) => data.date),
                            datasets: [
                                {
                                    label: "Consomation De L'Eau Par Date",
                                    data: getcounts.stats?.map((data) => data.consomation),
                                    backgroundColor: "#D667D8",
                                    borderColor: "#D667D8"
                                },
                            ]
                        }
                    } />
                </div>
            </>
        } />
    )
}

export default Dashboard



