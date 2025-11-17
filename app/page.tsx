import React from 'react';

// Importation des polices et bibliothèques
import { prisma } from '../lib/prisma'; // Connexion à la BDD
import { ImageSlider } from './components/ImageSlider';
import { BackgroundImage, ModeleVoiture } from '@prisma/client';
import { NavbarAndMenu } from './components/Menu';
import { VehiclesSection } from './components/VehiclesSection';
import { ReservationForm } from './components/ReservationForm';

const timeSlots = [
  "08:00", "08:30", "09:00", "09:30", "10:00", "10:30", "11:00", "11:30",
  "12:00", "12:30", "13:00", "13:30", "14:00", "14:30", "15:00", "15:30",
  "16:00", "16:30", "17:00", "17:30", "18:00"
];

export default async function Home() {
    // 2. RÉCUPÉRER LES IMAGES DU SLIDER DEPUIS LA BDD
    // Je suppose que votre modèle s'appelle 'backgroundImage'
    const sliderImagesFromDb = await prisma.backgroundImage.findMany({
        // Vous pouvez ajouter un 'orderBy' si vous voulez
        orderBy: {
            createdAt: 'asc', // Par exemple, pour les avoir dans l'ordre de création
        },
    });

    // 3. TRANSFORMER les données de la BDD
    // Le slider attend { src, title, subtitle }
    // La BDD donne { url, name, ... } (je suppose 'name' pour le titre)
    const sliderData = sliderImagesFromDb.map((image: BackgroundImage) => ({
        src: image.url,
        title: image.name, // ou 'image.title' si vous avez ce champ
        subtitle: image.subtitle || '', // Ajoutez un champ subtitle à votre BDD ou mettez une valeur par défaut
    }));


    const voitures = await prisma.modeleVoiture.findMany();
    const locations = await prisma.location.findMany();
    return (
        <>
            <NavbarAndMenu voitures={voitures} />
            <ImageSlider images={sliderData} interval={5000} />
            <ReservationForm locations={locations} hours={timeSlots} />
            <VehiclesSection voitures={voitures} />
            <div className="footer">
                <div className="first-cat">
                    <span>MJCars</span>
                    <a href="#">Réservations</a>
                    <a href="#">Nos Véhicules</a>
                    <a href="#">Nos Localisations</a>
                    <a href="#">Notre Agence</a>
                    <a href="#">Nous Contacter</a>
                </div>
                <div className="second-cat">
                    <a href="#">Conditions Générales de Location</a>
                    <a href="#">Politique de Confidentialité</a>
                    <a href="#">Mentions Légales</a>
                    <a href="#">Plan du Site</a>
                </div>
                <div className="third-cat">
                    <a href="#"><i className="fab fa-facebook-f"></i>Facebook</a>
                    <a href="#"><i className="fab fa-instagram"></i>Instagram</a>
                    <a href="#"><i className="fab fa-linkedin-in"></i>Linkedin</a>
                </div>
                <span>© 2024 MJ Cars. Tous droits réservés.</span>
            </div>
        </>
    );
}