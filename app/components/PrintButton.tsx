"use client";

import React from 'react';

export function PrintButton() {
    return (
        <button
            className="btn-print"
            onClick={() => {
                if (typeof window !== 'undefined') {
                    window.print();
                }
            }}
        >
            Imprimer
        </button>
    );
}
