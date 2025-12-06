const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function seedImages() {
    const images = [
        {
            name: "Bienvenue chez MJ Cars",
            url: "https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?auto=format&fit=crop&q=80&w=1920",
            title: "L'EXCELLENCE DE LA LOCATION",
            subtitle: "Découvrez notre flotte de véhicules premium"
        },
        {
            name: "Voyagez en confort",
            url: "https://plus.unsplash.com/premium_photo-1683120817808-67aedb7bfea3?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
            title: "CONFORT & SÉCURITÉ",
            subtitle: "Des véhicules entretenus pour votre sérénité"
        },
        {
            name: "Service Premium",
            url: "https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?auto=format&fit=crop&q=80&w=1920",
            title: "SERVICE CLIENT 24/7",
            subtitle: "Une équipe à votre écoute pour chaque trajet"
        }
    ];

    for (const img of images) {
        await prisma.backgroundImage.create({
            data: img
        });
    }
    console.log('Seeded 3 background images.');
}

seedImages()
    .catch(e => console.error(e))
    .finally(async () => {
        await prisma.$disconnect();
    });
