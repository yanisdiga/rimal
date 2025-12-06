import { PrismaClient } from '@prisma/client';
import { AdminLayout } from '@/app/admin/components/AdminLayout';
import { StyleModal } from './StyleModal';
import { deleteBackgroundImage } from '@/app/actions/style';
import './style.css';

const prisma = new PrismaClient();

export default async function StylePage() {
    const images = await prisma.backgroundImage.findMany({
        orderBy: {
            createdAt: 'desc',
        },
    });

    return (
        <AdminLayout title="Gestion du Style (Backgrounds)">
            <div className="data-grid">
                <div className="style-page-header">
                    <h2 className="style-page-title">
                        Images d'arrière-plan ({images.length})
                    </h2>
                    <StyleModal />
                </div>

                {images.length === 0 ? (
                    <p className="style-empty-message">Aucune image configurée.</p>
                ) : (
                    <div className="style-grid">
                        {images.map((img) => (
                            <div key={img.id} className="style-card">
                                <div className="style-card-image-container">
                                    <img
                                        src={img.url}
                                        alt={img.name}
                                        className="style-card-image"
                                    />
                                </div>

                                <div className="style-card-content">
                                    <h3 className="style-card-title">{img.name}</h3>
                                    {img.title && <p className="style-card-text"><strong>Titre:</strong> {img.title}</p>}
                                    {img.subtitle && <p className="style-card-text"><strong>Sous-titre:</strong> {img.subtitle}</p>}
                                </div>

                                <div className="style-card-actions">
                                    <StyleModal
                                        image={img}
                                        trigger={
                                            <button className="btn-icon" title="Modifier">
                                                <i className="fas fa-edit"></i>
                                            </button>
                                        }
                                    />
                                    <form action={deleteBackgroundImage.bind(null, img.id)}>
                                        <button className="btn-icon delete" title="Supprimer" type="submit">
                                            <i className="fas fa-trash"></i>
                                        </button>
                                    </form>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </AdminLayout>
    );
}
