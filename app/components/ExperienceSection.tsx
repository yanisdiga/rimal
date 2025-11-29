"use client";

import React from 'react';

export function ExperienceSection() {
    return (
        <section className="experience-section">
            <div className="experience-content">
                <h2>L'Excellence à Chaque Kilomètre</h2>
                <p>
                    Chez MJ Cars, nous ne louons pas seulement des voitures, nous offrons une expérience.
                    Que vous cherchiez l'élégance d'une berline de luxe ou la puissance d'un SUV sportif,
                    notre flotte est soigneusement sélectionnée pour répondre aux attentes les plus exigeantes.
                </p>
                <p>
                    Laissez-vous séduire par le confort absolu et la performance inégalée de nos véhicules.
                    Votre voyage mérite ce qu'il y a de meilleur.
                </p>
                <button>Découvrir l'agence</button>
            </div>
            <div className="experience-image">
                {/* Image d'illustration - intérieur de voiture de luxe ou paysage */}
                <img
                    src="https://images.unsplash.com/photo-1563720223185-11003d516935?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80"
                    alt="Expérience de Luxe"
                />
            </div>
        </section>
    );
}
