import React from 'react';

// Importation des polices et bibliothèques
import Head from 'next/head';

export default function Home() {
  return (
    <>
      <Head>
        <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/flatpickr/dist/flatpickr.min.css" />
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css" />
        <script src="https://cdn.jsdelivr.net/npm/flatpickr" defer></script>
      </Head>
      <nav className="navbar">
        <div className="hamburger">
          <svg width='24' height='24' viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" stroke="#000000">
          <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
          <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g>
          <g id="SVGRepo_iconCarrier">
            <path d="M4 18L20 18" stroke="#FFFFFF" stroke-width="1" stroke-linecap="round"></path>
            <path d="M4 12L20 12" stroke="#FFFFFF" stroke-width="1" stroke-linecap="round"></path>
            <path d="M4 6L20 6" stroke="#FFFFFF" stroke-width="1" stroke-linecap="round"></path>
          </g>
        </svg>
        <span>Menu</span>
      </div>
      <div className="logo">
        MJ Cars
      </div>
    </nav >
    <div className="menu">
        <div className="menu-overlay">
            <div className="menu-overlay-left" id="menu">
                <div className="items">
                    <a href="#" className="selected">
                        <span>Nos véhicules</span>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="#000000" width="18px" height="18px"
                            viewBox="0 0 32 32" version="1.1">
                            <path
                                d="M8.489 31.975c-0.271 0-0.549-0.107-0.757-0.316-0.417-0.417-0.417-1.098 0-1.515l14.258-14.264-14.050-14.050c-0.417-0.417-0.417-1.098 0-1.515s1.098-0.417 1.515 0l14.807 14.807c0.417 0.417 0.417 1.098 0 1.515l-15.015 15.022c-0.208 0.208-0.486 0.316-0.757 0.316z" />
                        </svg>
                    </a>
                    <a href="#">
                        <span>Nos localisations</span>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="#000000" width="18px" height="18px"
                            viewBox="0 0 32 32" version="1.1">
                            <path
                                d="M8.489 31.975c-0.271 0-0.549-0.107-0.757-0.316-0.417-0.417-0.417-1.098 0-1.515l14.258-14.264-14.050-14.050c-0.417-0.417-0.417-1.098 0-1.515s1.098-0.417 1.515 0l14.807 14.807c0.417 0.417 0.417 1.098 0 1.515l-15.015 15.022c-0.208 0.208-0.486 0.316-0.757 0.316z" />
                        </svg>
                    </a>
                    <a href="#">
                        <span>Réserver</span>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="#000000" width="18px" height="18px"
                            viewBox="0 0 32 32" version="1.1">
                            <path
                                d="M8.489 31.975c-0.271 0-0.549-0.107-0.757-0.316-0.417-0.417-0.417-1.098 0-1.515l14.258-14.264-14.050-14.050c-0.417-0.417-0.417-1.098 0-1.515s1.098-0.417 1.515 0l14.807 14.807c0.417 0.417 0.417 1.098 0 1.515l-15.015 15.022c-0.208 0.208-0.486 0.316-0.757 0.316z" />
                        </svg>
                    </a>
                    <a href="#">
                        <span>Notre agence</span>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="#000000" width="18px" height="18px"
                            viewBox="0 0 32 32" version="1.1">
                            <path
                                d="M8.489 31.975c-0.271 0-0.549-0.107-0.757-0.316-0.417-0.417-0.417-1.098 0-1.515l14.258-14.264-14.050-14.050c-0.417-0.417-0.417-1.098 0-1.515s1.098-0.417 1.515 0l14.807 14.807c0.417 0.417 0.417 1.098 0 1.515l-15.015 15.022c-0.208 0.208-0.486 0.316-0.757 0.316z" />
                        </svg>
                    </a>
                    <a href="#">
                        <span>Nous contacter</span>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="#000000" width="18px" height="18px"
                            viewBox="0 0 32 32" version="1.1">
                            <path
                                d="M8.489 31.975c-0.271 0-0.549-0.107-0.757-0.316-0.417-0.417-0.417-1.098 0-1.515l14.258-14.264-14.050-14.050c-0.417-0.417-0.417-1.098 0-1.515s1.098-0.417 1.515 0l14.807 14.807c0.417 0.417 0.417 1.098 0 1.515l-15.015 15.022c-0.208 0.208-0.486 0.316-0.757 0.316z" />
                        </svg>
                    </a>
                </div>
            </div>
            <div className="menu-overlay-right">
                <div className="vehicules-items right-menu-items active">
                    {/*Implémentation JS*/}
                </div>
                <div className="localisations-items right-menu-items">
                    <div className="localisation-item item">
                        <span className="locName">Aéroport Marrakech-Menara</span>
                        <img className="locImg" src="https://aeroport-marrakech.com/wp-content/uploads/2018/12/25.jpg"
                            alt="Car1"/>
                        <div className="locInfo">
                            <span>50DH</span>
                        </div>
                    </div>
                    <div className="localisation-item item">
                        <span className="locName">Place Jamaa el Fna</span>
                        <img className="locImg" src="https://dunesdeserts.com/wp-content/uploads/2019/01/Jmaalefna.jpg"
                            alt="Car1"/>
                        <div className="locInfo">
                            <span>Sans frais</span>
                        </div>
                    </div>
                    <div className="localisation-item item">
                        <span className="locName">Palmeraie</span>
                        <img className="locImg"
                            src="https://media.istockphoto.com/id/137855633/fr/photo/hauts-palmiers-marocaine-flags-ligne-approche-et-dun-minaret-de-la-mosqu%C3%A9e.jpg?s=612x612&w=0&k=20&c=utuIlJWtL8_6D8V-FKRvy8NWXa7YiWHjcbfieCRrI3k="
                            alt="Car1"/>
                        <div className="locInfo">
                            <span>Sans frais</span>
                        </div>
                    </div>
                </div>
            </div>
            <button className="close-button"><span>X</span></button>
        </div>
    </div>
    <div className="imageSlider">
        <div className="overlay"></div>
        <div className="slider-text">
            <h1>Votre confort est notre priorité</h1>
            <p>Louez votre véhicule dès aujourd'hui avec MJ Cars</p>
        </div>
        <div className="slider-indicators"></div>
    </div>
    <div className="reservations">
        <div className="pickup-container">
            <span>Retrait et retour</span>
            <div className="locations-container">
                <div className="choose-location">
                    <i className="fas fa-map-marker-alt"></i>
                    <div className="choose-location-select">
                        <div className="selected">
                            <span>Marrakech</span>
                            <svg viewBox="-19.04 0 75.804 75.804" xmlns="http://www.w3.org/2000/svg" fill="#000000">
                                <g id="SVGRepo_bgCarrier" stroke-width="0" />
                                <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round" />
                                <g id="SVGRepo_iconCarrier">
                                    <g id="Group_65" data-name="Group 65" transform="translate(-831.568 -384.448)">
                                        <path id="Path_57" data-name="Path 57"
                                            d="M833.068,460.252a1.5,1.5,0,0,1-1.061-2.561l33.557-33.56a2.53,2.53,0,0,0,0-3.564l-33.557-33.558a1.5,1.5,0,0,1,2.122-2.121l33.556,33.558a5.53,5.53,0,0,1,0,7.807l-33.557,33.56A1.5,1.5,0,0,1,833.068,460.252Z"
                                            fill="#000000" />
                                    </g>
                                </g>
                            </svg>
                        </div>
                    </div>
                    <ul className="options">{/*Implémentation JS*/}</ul>
                    <input type="hidden" name="location" id="location-select-retrait" value="marrakech"/>
                </div>
                <div className="choose-location return-location">
                    <i className="fa-solid fa-plus"></i>
                    <div className="choose-location-select">
                        <div className="selected">
                            <span>Lieu de retour différent</span>
                        </div>
                    </div>
                    <ul className="options"></ul>
                    <input type="hidden" name="return-location" id="return-location-input" value=""/>
                </div>
            </div>

        </div>
        <div className="dates-validation-container">
            <div className="dates-container">
                <div className="start-date-container">
                    <span>Date et heure de départ</span>
                    <div className="button-start">
                        <button id="start-date" className="choose-date">
                            <i className="fas fa-calendar-alt"></i>
                            <span>Date de départ</span>
                        </button>
                        <div className="choose-hour">
                            <div className="choose-hour-select">
                                <div className="selected">
                                    <span>12:00</span>
                                    <svg viewBox="-19.04 0 75.804 75.804" xmlns="http://www.w3.org/2000/svg"
                                        fill="#000000">
                                        <g transform="translate(-831.568 -384.448)">
                                            <path
                                                d="M833.068,460.252a1.5,1.5,0,0,1-1.061-2.561l33.557-33.56a2.53,2.53,0,0,0,0-3.564l-33.557-33.558a1.5,1.5,0,0,1,2.122-2.121l33.556,33.558a5.53,5.53,0,0,1,0,7.807l-33.557,33.56A1.5,1.5,0,0,1,833.068,460.252Z" />
                                        </g>
                                    </svg>
                                </div>
                            </div>
                            <ul className="options"></ul>
                            <input type="hidden" name="start-time" id="start-time-input" value="12:00"/>
                        </div>
                    </div>
                </div>
                <div className="end-date-container">
                    <span>Date et heure de retour</span>
                    <div className="button-end">
                        <button id="end-date" className="choose-date">
                            <i className="fas fa-calendar-alt"></i>
                            <span>Date de retour</span>
                        </button>
                        <div className="choose-hour return-hour">
                            <div className="choose-hour-select">
                                <div className="selected">
                                    <span>12:00</span>
                                    <svg viewBox="-19.04 0 75.804 75.804" xmlns="http://www.w3.org/2000/svg"
                                        fill="#000000">
                                        <g transform="translate(-831.568 -384.448)">
                                            <path
                                                d="M833.068,460.252a1.5,1.5,0,0,1-1.061-2.561l33.557-33.56a2.53,2.53,0,0,0,0-3.564l-33.557-33.558a1.5,1.5,0,0,1,2.122-2.121l33.556,33.558a5.53,5.53,0,0,1,0,7.807l-33.557,33.56A1.5,1.5,0,0,1,833.068,460.252Z" />
                                        </g>
                                    </svg>
                                </div>
                            </div>
                            <ul className="options"></ul>
                            <input type="hidden" name="return-time" id="return-time-input" value="12:00"/>
                        </div>
                    </div>
                </div>
            </div>
            {/*input caché unique pour Flatpickr*/}
            <input id="flatpickr-hidden" type="text"/>
            <button className="validate-button">Rechercher</button>
        </div>
    </div>
    <div className="vehicules">
        <h1>Nos Véhicules</h1>
        <div className="vehicules-container">
            {/*Implémentation JS*/}
        </div>
    </div>
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