import Hero from '../components/sections/Hero';
import Events from '../components/sections/Events';
import Program from "../components/sections/Program.jsx";
import {useLocation} from "react-router-dom";
import {useEffect} from "react";
import Intro from "../components/sections/Intro.jsx";
import AboutSection from "../components/sections/About.jsx";
import Contact from "../components/sections/Contact.jsx";
import History from "../components/sections/History.jsx";
import Insta from "../components/sections/Insta.jsx";
import ScrollingBanner from '../components/layout/ScrollingBanner'; // Import du composant

const Home = () => {
    const location = useLocation();

    useEffect(() => {
        // Vérifie s'il y a un hash dans l'URL
        if (location.hash) {
            // Supprime le # du début
            const elementId = location.hash.replace('#', '');
            const element = document.getElementById(elementId);
            if (element) {
                setTimeout(() => {
                    element.scrollIntoView({ behavior: 'smooth' });
                    window.history.replaceState({}, '', window.location.pathname);
                }, 100); // Petit délai pour s'assurer que la page est chargée
            }
        }
    }, [location]); // Se déclenche quand location change

    return (
        <main className="overflow-x-hidden">
            <Hero/>
            <Intro/>
            <Events/>
            <Program/>
            <History/>
            <AboutSection/>
            <Insta/>
            <ScrollingBanner/>
            <Contact/>
        </main>
    );
};

export default Home;