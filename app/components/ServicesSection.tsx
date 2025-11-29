"use client";

import React from 'react';

export function ServicesSection() {
    const services = [
        {
            icon: "fa-road",
            title: "Kilométrage Illimité",
            description: "Profitez de la route sans compter. Nos offres incluent le kilométrage illimité pour une liberté totale."
        },
        {
            icon: "fa-shield-alt",
            title: "Assurance Incluse",
            description: "Roulez en toute sérénité avec notre couverture d'assurance tous risques incluse dans chaque location."
        },
        {
            icon: "fa-car-side",
            title: "Livraison Premium",
            description: "Nous livrons votre véhicule de prestige directement à votre hôtel, aéroport ou domicile."
        },
        {
            icon: "fa-headset",
            title: "Support 24/7",
            description: "Une équipe dédiée à votre écoute à tout moment pour garantir une expérience sans faille."
        }
    ];

    return (
        <section className="services-section">
            <h2>Nos Services Exclusifs</h2>
            <div className="services-grid">
                {services.map((service, index) => (
                    <div key={index} className="service-card">
                        <i className={`fas ${service.icon} service-icon`}></i>
                        <h3>{service.title}</h3>
                        <p>{service.description}</p>
                    </div>
                ))}
            </div>
        </section>
    );
}
