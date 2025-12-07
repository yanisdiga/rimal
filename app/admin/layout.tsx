import Link from 'next/link';
import '../globals.css';
import "../../styles/home/reservations.css";
import "./admin.css";

export default function AdminLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="admin-main">
            {/* Main Content */}
            <main>
                {children}
            </main>
        </div>
    );
}
