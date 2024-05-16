import React from 'react'
import Nav from '../components/Nav'
import Footer from '../components/Footer'
import Contact from '../components/Contact'

const Home = () => {
  return (
    <div>
        <Nav/>
        <div id="home" class="home">
        <div class="leftSide">
            <div class="homeIntro">
                Hii <br/>Welcome To <span>Aqua Smart</span> <br/> dédié à la rationalisation de l'utilisation de l'eau
            </div>
            <div class="homePreIntro">
                Ici, nous prônons des pratiques efficaces et conscientes pour optimiser la consommation d'eau. Explorez
                nos ressources pour découvrir des solutions innovantes en matière de gestion durable de l'eau.
            </div>
            <button>Let's Talk</button>
        </div>
        <div class="rightSide">
            <img src="images/Bottle of water-bro (3).svg" alt=""/>
        </div>
    </div>
    <Contact />
    <Footer/>
    </div>
  )
}

export default Home
