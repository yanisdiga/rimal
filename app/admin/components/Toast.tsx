'use client';

import { useEffect, useState } from 'react';

export type ToastType = 'success' | 'error' | 'info';

interface ToastProps {
    message: string;
    type: ToastType;
    onClose: () => void;
}

export function Toast({ message, type, onClose }: ToastProps) {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        setIsVisible(true);
        const timer = setTimeout(() => {
            setIsVisible(false);
            setTimeout(onClose, 300); // Wait for fade out animation
        }, 3000);

        return () => clearTimeout(timer);
    }, [onClose]);

    const getBackgroundColor = () => {
        switch (type) {
            case 'success': return '#28a745';
            case 'error': return '#dc3545';
            case 'info': return '#17a2b8';
            default: return '#333';
        }
    };

    return (
        <div
            style={{
                position: 'fixed',
                bottom: '20px',
                right: '20px',
                backgroundColor: getBackgroundColor(),
                color: 'white',
                padding: '15px 25px',
                borderRadius: '8px',
                boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
                zIndex: 9999,
                transition: 'opacity 0.3s ease, transform 0.3s ease',
                opacity: isVisible ? 1 : 0,
                transform: isVisible ? 'translateY(0)' : 'translateY(20px)',
                display: 'flex',
                alignItems: 'center',
                gap: '10px',
                fontFamily: "'Oswald', sans-serif",
            }}
        >
            {type === 'success' && <i className="fas fa-check-circle"></i>}
            {type === 'error' && <i className="fas fa-exclamation-circle"></i>}
            {type === 'info' && <i className="fas fa-info-circle"></i>}
            <span>{message}</span>
        </div>
    );
}
