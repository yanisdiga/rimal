"use client";

import React from 'react';

export function ServicesSection({ services }: { services: any[] }) {
    if (!services || services.length === 0) return null;

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
