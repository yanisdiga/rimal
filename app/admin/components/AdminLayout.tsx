"use client";

import React from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import '../admin.css'; // Ensure CSS is loaded

interface AdminLayoutProps {
    children: React.ReactNode;
    title: string;
}

export function AdminLayout({ children, title }: AdminLayoutProps) {
    const pathname = usePathname();
    const router = useRouter();

    const isActive = (path: string) => {
        return pathname === path ? 'active' : '';
    };

    return (
        <div className="admin-layout">
            <aside className="admin-sidebar">
                <div className="sidebar-header" onClick={() => router.push('/admin')}>
                    <h2>MJ Cars</h2>
                    <span>Admin Panel</span>
                </div>
                <nav className="sidebar-nav">
                    <Link href="/admin" className={`nav-item ${isActive('/admin')}`}>
                        Dashboard
                    </Link>
                    <Link href="/admin/vehicles" className={`nav-item ${isActive('/admin/vehicles')}`}>
                        Véhicules
                    </Link>
                    <Link href="/admin/locations" className={`nav-item ${isActive('/admin/locations')}`}>
                        Lieux
                    </Link>
                    <Link href="/" className="nav-item return-site">
                        Retour au site
                    </Link>
                </nav>
            </aside>
            <main className="admin-content">
                <header className="admin-header">
                    <h1>{title}</h1>
                </header>
                <div className="admin-page-content">
                    {children}
                </div>
            </main>
        </div>
    );
}
