'use client';

import React from 'react';

export function SocialButton() {
    const phoneNumber = "212600000000"; // REPLACE WITH ACTUAL NUMBER
    const message = encodeURIComponent("Bonjour, je suis intéressé par la location d'une voiture.");

    return (
        <div className="social-float">
            <a
                href="https://www.instagram.com/rimal"
                className="instagram-float"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Contacter sur Instagram"
            >
                <i className="fab fa-instagram"></i>
            </a>
            <a
                href={`https://wa.me/${phoneNumber}?text=${message}`}
                className="whatsapp-float"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Contacter sur WhatsApp"
            >
                <i className="fab fa-whatsapp"></i>
            </a>
        </div>
    );
}
