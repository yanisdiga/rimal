import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Oswald } from "next/font/google";
import "./globals.css";

import "../styles/home/reservations.css";
import "../styles/home/slider.css";
import "../styles/home/vehicules.css";
import "../styles/home/services.css";
import "../styles/home/experience.css";
import "../styles/home/reviews.css";
import "../styles/home/footer.css";
import "../styles/navbar.css";
import "../styles/style.css";

import { prisma } from '../lib/prisma';
import NavbarWrapper from "./components/NavbarWrapper";
import { Footer } from "./components/Footer";

import { checkExpiredReservations } from "./actions/checkExpiredReservations";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const oswald = Oswald({
  subsets: ['latin'],
  weight: ['200', '300', '400', '500', '600', '700'],
});

export const metadata: Metadata = {
  title: "Rimal",
  description: "Car rental service",
};

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  // Vérification automatique des réservations expirées à chaque chargement de page
  await checkExpiredReservations();

  const voitures = await prisma.modeleVoiture.findMany();

  return (
    <html lang="fr">
      {/* Ajouts dans le <head> */}
      <head>
        <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/flatpickr/dist/flatpickr.min.css" />
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css" />
        <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/flatpickr/dist/flatpickr.min.css" />
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css" />
        <script src="https://cdn.jsdelivr.net/npm/flatpickr" defer></script>
      </head>

      {/* Appliquez la police Oswald au body */}
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <main>{children}</main>
        <Footer />

        {/* Mettez les scripts globaux à la fin du body */}
        <script src="https://cdn.jsdelivr.net/npm/flatpickr" defer></script>
      </body>
    </html>
  );
}
