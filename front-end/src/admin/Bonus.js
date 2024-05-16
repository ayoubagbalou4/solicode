import axios from 'axios'
import React, { useEffect, useState } from 'react'
import Layout from './layout/Layout'

const Bonus = () => {

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

    return (
        <Layout Bonus="active" header="Bonus" content={
            <>
            <div id="projects" class="projects">
                <h3>Ton Points {getcounts.points}  = {getcounts.points / 2} <i class="fa-solid fa-circle-dollar-to-slot"></i></h3>
                <h3>10 points = 5 bonus</h3>
                <h1>recents projects</h1>
                <div class="projectsCards">
                    <div class="projectCard">
                        <img src="http://localhost:3000/images/img1.jpg" alt="" />
                        <p className='para'>15 <i class="fa-solid fa-circle-dollar-to-slot"></i></p>
                    </div>
                    <div class="projectCard">
                        <img src="http://localhost:3000/images/img2.webp" alt="" />
                        <p className='para'>25 <i class="fa-solid fa-circle-dollar-to-slot"></i></p>

                    </div>
                    <div class="projectCard">
                        <img src="http://localhost:3000/images/img3.jpg" alt="" />
                        <p className='para'>30 <i class="fa-solid fa-circle-dollar-to-slot"></i></p>

                    </div>
                    <div class="projectCard">
                        <img src="http://localhost:3000/images/img4.jpg" alt="" />
                        <p className='para'>10 <i class="fa-solid fa-circle-dollar-to-slot"></i></p>

                    </div>
                    <div class="projectCard">
                        <img src="http://localhost:3000/images/img5.jpg" alt="" />
                        <p className='para'>20 <i class="fa-solid fa-circle-dollar-to-slot"></i></p>

                    </div>
                    <div class="projectCard">
                        <img src="http://localhost:3000/images/img6.jpg" alt="" />
                        <p className='para'>25 <i class="fa-solid fa-circle-dollar-to-slot"></i></p>

                    </div>
                </div>
            </div>
            </>
        } />
    )
}

export default Bonus
