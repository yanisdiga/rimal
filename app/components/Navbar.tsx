// rimal/app/components/Navbar.tsx

"use client"; // OBLIGATOIRE pour utiliser useState et les clics

import React, { useState } from 'react';
// Importez le type 'Voiture' généré par Prisma.
// Cela garantit que vos données sont correctes.
import { Voiture } from '@prisma/client';

// Définit les "props" que ce composant s'attend à recevoir.
// Il a besoin d'une liste de voitures.
interface NavbarProps {
  voitures: Voiture[];
  // Si vous avez aussi des localisations de la BDD, ajoutez-les ici.
  // localisations: Localisation[]; 
}

// C'est votre composant. Il reçoit 'voitures' en paramètre.
export function NavbarAndMenu({ voitures }: NavbarProps) {
  
  // 1. GESTION DE L'ÉTAT (remplace les querySelector/event listeners)
  // -----------------------------------------------------------------

  // État pour savoir si le menu est ouvert ou fermé
  // 'false' par défaut.
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // État pour savoir quel onglet est actif
  // 'vehicules' par défaut.
  const [activeTab, setActiveTab] = useState('vehicules');

  // Fonctions pour changer l'état (remplace les addEventListener)
  const openMenu = () => setIsMenuOpen(true);
  const closeMenu = () => setIsMenuOpen(false);

  // Gère le clic sur un onglet
  const selectTab = (tabName: string) => {
    setActiveTab(tabName);
    // On pourrait aussi ajouter une logique pour fermer le menu sur mobile ici
  };

  // 2. LE RENDU JSX (votre HTML converti)
  // -----------------------------------------------------------------
  return (
    <>
      {/* La Navbar.
        onClick appelle directement la fonction openMenu.
      */}
      <nav className="navbar">
        <div className="hamburger" onClick={openMenu}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" stroke="#000000">
            <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
            <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g>
            <g id="SVGRepo_iconCarrier">
              <path d="M4 18L20 18" stroke="#FFFFFF" strokeWidth="1" strokeLinecap="round"></path>
              <path d="M4 12L20 12" stroke="#FFFFFF" strokeWidth="1" strokeLinecap="round"></path>
              <path d="M4 6L20 6" stroke="#FFFFFF" strokeWidth="1" strokeLinecap="round"></path>
            </g>
          </svg>
          <span>Menu</span>
        </div>
        <div className="logo">MJ Cars</div>
      </nav>

      {/* Le Menu.
        La classe 'active' est ajoutée CONDITIONNELLEMENT
        en fonction de l'état 'isMenuOpen'.
      */}
      <div className={`menu ${isMenuOpen ? 'active' : ''}`}>
        <div className="menu-overlay">
          <div className="menu-overlay-left" id="menu">
            <div className="items">
              
              {/* Onglet Véhicules */}
              <a 
                href="#"
                // Applique 'selected' si activeTab est 'vehicules'
                className={activeTab === 'vehicules' ? 'selected' : ''}
                // Au clic, change l'état pour 'vehicules'
                onClick={(e) => { e.preventDefault(); selectTab('vehicules'); }}
              >
                <span>Nos véhicules</span>
                <svg xmlns="http://www.w3.org/2000/svg" fill="#000000" width="18px" height="18px" viewBox="0 0 32 32" version="1.1">
                  <path d="M8.489 31.975c-0.271 0-0.549-0.107-0.757-0.316-0.417-0.417-0.417-1.098 0-1.515l14.258-14.264-14.050-14.050c-0.417-0.417-0.417-1.098 0-1.515s1.098-0.417 1.515 0l14.807 14.807c0.417 0.417 0.417 1.098 0 1.515l-15.015 15.022c-0.208 0.208-0.486 0.316-0.757 0.316z" />
                </svg>
              </a>

              {/* Onglet Localisations */}
              <a 
                href="#"
                className={activeTab === 'localisations' ? 'selected' : ''}
                onClick={(e) => { e.preventDefault(); selectTab('localisations'); }}
              >
                <span>Nos localisations</span>
                <svg xmlns="http://www.w3.org/2000/svg" fill="#000000" width="18px" height="18px" viewBox="0 0 32 32" version="1.1">
                  <path d="M8.489 31.975c-0.271 0-0.549-0.107-0.757-0.316-0.417-0.417-0.417-1.098 0-1.515l14.258-14.264-14.050-14.050c-0.417-0.417-0.417-1.098 0-1.515s1.098-0.417 1.515 0l14.807 14.807c0.417 0.417 0.417 1.098 0 1.515l-15.015 15.022c-0.208 0.208-0.486 0.316-0.757 0.316z" />
                </svg>
              </a>
              {/* ... autres liens ... */}
            </div>
          </div>

          <div className="menu-overlay-right">
            
            {/* Contenu de l'onglet Véhicules
              Remplace votre 'fetch' et 'innerHTML'.
              Nous utilisons .map() pour boucler sur les 'voitures' reçues en props.
            */}
            <div className={`vehicules-items right-menu-items ${activeTab === 'vehicules' ? 'active' : ''}`}>
              {voitures.map((voiture) => (
                <div key={voiture.id} className="vehicule-item item">
                  <span className="carName">{voiture.nom}</span>
                  {/* Utilise les champs de votre BDD (schema Prisma) */}
                  <img src={voiture.imageUrl || '/images/default-car.png'} alt={voiture.nom} />
                  <div className="carInfo">
                    {/* NOTE: 'transmission' et 'fuelType' n'existent pas dans votre 
                      schema Prisma. Je les remplace par 'description' et 'prixParJour'.
                      Vous devrez adapter votre schema si vous voulez ces champs.
                    */}
                    <span>{voiture.description || 'Description non disponible'}</span>
                    <span>{voiture.prixParJour} €/jour</span>
                  </div>
                </div>
              ))}
            </div>

            {/* Contenu de l'onglet Localisations */}
            <div className={`localisations-items right-menu-items ${activeTab === 'localisations' ? 'active' : ''}`}>
              {/* Ce contenu était statique dans votre HTML.
                Vous pouvez le laisser, ou le charger depuis la BDD comme les voitures.
              */}
              <div className="localisation-item item">
                <span className="locName">Aéroport Marrakech-Menara</span>
                <img className="locImg" src="https://aeroport-marrakech.com/wp-content/uploads/2018/12/25.jpg" alt="Car1" />
                <div className="locInfo">
                  <span>50DH</span>
                </div>
              </div>
              {/* ... autres localisations statiques ... */}
            </div>
          </div>

          {/* Le bouton Fermer.
            onClick appelle directement la fonction closeMenu.
          */}
          <button className="close-button" onClick={closeMenu}><span>X</span></button>
        </div>
      </div>
    </>
  );
}