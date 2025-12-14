import React from 'react';
import fs from 'fs/promises';
import path from 'path';
import { AdminLayout } from '../components/AdminLayout';
import { createService, deleteService } from './actions';

export default async function ServicesAdminPage() {
    const filePath = path.join(process.cwd(), 'data', 'services.json');
    let services = [];
    try {
        const data = await fs.readFile(filePath, 'utf-8');
        services = JSON.parse(data);
    } catch (e) {
        services = [];
    }

    return (
        <AdminLayout title="Gestion des Services">
            <div className="admin-container">
                <style>{`
                    .services-split { display: flex; gap: 2rem; }
                    .service-form { flex: 1; background: white; padding: 1.5rem; border-radius: 8px; height: fit-content; }
                    .service-list { flex: 2; display: grid; grid-template-columns: repeat(auto-fill, minmax(250px, 1fr)); gap: 1rem; }
                    .service-card { background: white; padding: 1rem; border-radius: 8px; border: 1px solid #eee; position: relative; }
                    .delete-btn { position: absolute; top: 10px; right: 10px; color: red; background: none; border: none; cursor: pointer; }
                    .form-group { margin-bottom: 1rem; }
                    .form-group label { display: block; margin-bottom: 0.5rem; font-weight: bold; }
                    .form-group input, .form-group textarea { width: 100%; padding: 0.5rem; border: 1px solid #ddd; border-radius: 4px; }
                    .btn-submit { background: black; color: white; padding: 0.75rem 1.5rem; border: none; border-radius: 4px; cursor: pointer; width: 100%; }
                    .icon-preview { font-size: 1.5rem; margin-bottom: 1rem; color: #333; }
                `}</style>

                <div className="services-split">
                    {/* ADD FORM */}
                    <div className="service-form">
                        <h3>Ajouter un Service</h3>
                        <form action={createService}>
                            <div className="form-group">
                                <label>Titre</label>
                                <input type="text" name="title" placeholder="Ex: Kilométrage Illimité" required />
                            </div>
                            <div className="form-group">
                                <label>Icône (FontAwesome)</label>
                                <input type="text" name="icon" placeholder="Ex: fa-road" required />
                                <small>Utilisez des classes 'fa-' (ex: fa-wifi, fa-car)</small>
                            </div>
                            <div className="form-group">
                                <label>Description</label>
                                <textarea name="description" rows={4} placeholder="Description courte..." required></textarea>
                            </div>
                            <button type="submit" className="btn-submit">Ajouter</button>
                        </form>
                    </div>

                    {/* LIST */}
                    <div className="service-list">
                        {services.map((svc: any) => (
                            <div key={svc.id} className="service-card">
                                <form action={deleteService.bind(null, svc.id)}>
                                    <button className="delete-btn" title="Supprimer">
                                        <i className="fas fa-trash"></i>
                                    </button>
                                </form>
                                <i className={`fas ${svc.icon} icon-preview`} style={{ marginBottom: '10px', display: 'block' }}></i>
                                <h4>{svc.title}</h4>
                                <p style={{ color: '#666', fontSize: '0.9rem' }}>{svc.description}</p>
                            </div>
                        ))}
                        {services.length === 0 && <p>Aucun service configuré.</p>}
                    </div>
                </div>
            </div>
        </AdminLayout>
    );
}
