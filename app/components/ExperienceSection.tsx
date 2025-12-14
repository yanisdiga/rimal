"use client";

import React from 'react';

export function ExperienceSection({ experiences }: { experiences: any[] }) {
    if (!experiences || experiences.length === 0) return null;

    return (
        <>
            {experiences.map((exp: any, index: number) => (
                <section key={exp.id || index} className="experience-section">
                    <div className="experience-content">
                        <h2>{exp.title}</h2>
                        <p style={{ whiteSpace: 'pre-line' }}>
                            {exp.description}
                        </p>
                        {exp.buttonText && <button>{exp.buttonText}</button>}
                    </div>
                    <div className="experience-image">
                        <img
                            src={exp.imageUrl}
                            alt={exp.title}
                        />
                    </div>
                </section>
            ))}
        </>
    );
}
