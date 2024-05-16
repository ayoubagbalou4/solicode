import React from 'react';
import Nav from '../components/Nav';
import Footer from '../components/Footer';
import { data } from '../components/data'

const Conseils = () => {
    return (
        <>
            <Nav />
            <div className="services">
                <h3>Conseils</h3>
                <h1>Conseils pour une utilisation efficace de l'eau</h1>
                <p>Voici quelques conseils pratiques pour réduire votre consommation d'eau et contribuer à la préservation de cette ressource précieuse dans votre maison :</p>
                <div className="cardsServices">
                    {data.map((e, index) => (
                        <div key={index} className="cardService">
                            <i className={e.icon}></i>
                            <div className="serviceTitle">{e.titre}</div>
                            <p>{e.conseil}</p>
                        </div>
                    ))}
                </div>
                <Footer />
            </div>
        </>
    );
}

export default Conseils;
