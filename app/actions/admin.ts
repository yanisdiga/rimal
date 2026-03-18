'use server';

import { PrismaClient, Transmission, FuelType, StatutVehicule } from '@prisma/client';
import { revalidatePath } from 'next/cache';

const prisma = new PrismaClient();

// --- MODEL ACTIONS ---

export async function createModel(formData: FormData) {
    const nom = formData.get('nom') as string;
    const description = formData.get('description') as string;
    const imageUrl = formData.get('imageUrl') as string;
    const prixParJour = parseInt(formData.get('prixParJour') as string);
    const nbPlaces = parseInt(formData.get('nbPlaces') as string);
    const transmission = formData.get('transmission') as Transmission;
    const fuelType = formData.get('fuelType') as FuelType;

    await prisma.modeleVoiture.create({
        data: {
            nom,
            description,
            imageUrl,
            prixParJour,
            nbPlaces,
            transmission,
            fuelType,
        },
    });

    revalidatePath('/admin/vehicles');
}

export async function deleteModel(id: number) {
    await prisma.modeleVoiture.delete({
        where: { id },
    });
    revalidatePath('/admin/vehicles');
}

export async function updateModel(id: number, formData: FormData) {
    const nom = formData.get('nom') as string;
    const description = formData.get('description') as string;
    const imageUrl = formData.get('imageUrl') as string;
    const prixParJour = parseInt(formData.get('prixParJour') as string);
    const nbPlaces = parseInt(formData.get('nbPlaces') as string);
    const transmission = formData.get('transmission') as Transmission;
    const fuelType = formData.get('fuelType') as FuelType;

    await prisma.modeleVoiture.update({
        where: { id },
        data: {
            nom,
            description,
            imageUrl,
            prixParJour,
            nbPlaces,
            transmission,
            fuelType,
        },
    });

    revalidatePath('/admin/vehicles');
}

// --- VEHICLE ACTIONS ---

export async function createVehicle(formData: FormData) {
    const plaque = formData.get('plaque') as string;
    const modeleId = parseInt(formData.get('modeleId') as string);
    const statut = formData.get('statut') as StatutVehicule;

    await prisma.vehicule.create({
        data: {
            plaque,
            modeleId,
            statut,
        },
    });

    revalidatePath('/admin/vehicles');
}

export async function updateVehicleStatus(id: number, statut: StatutVehicule) {
    await prisma.vehicule.update({
        where: { id },
        data: { statut },
    });
    revalidatePath('/admin/vehicles');
}

export async function deleteVehicle(id: number) {
    await prisma.vehicule.delete({
        where: { id },
    });
    revalidatePath('/admin/vehicles');
}

// --- LOCATION ACTIONS ---

export async function createLocation(formData: FormData) {
    const nom = formData.get('nom') as string;
    const adresse = formData.get('adresse') as string;
    const fraisSupplementaires = parseInt(formData.get('fraisSupplementaires') as string || '0');
    const imageUrl = formData.get('imageUrl') as string;

    await prisma.location.create({
        data: {
            nom,
            adresse,
            fraisSupplementaires,
            imageUrl,
        },
    });

    revalidatePath('/admin/locations');
}

export async function updateLocation(id: number, formData: FormData) {
    const nom = formData.get('nom') as string;
    const adresse = formData.get('adresse') as string;
    const fraisSupplementaires = parseInt(formData.get('fraisSupplementaires') as string || '0');
    const imageUrl = formData.get('imageUrl') as string;

    await prisma.location.update({
        where: { id },
        data: {
            nom,
            adresse,
            fraisSupplementaires,
            imageUrl,
        },
    });

    revalidatePath('/admin/locations');
}

export async function deleteLocation(id: number) {
    await prisma.location.delete({
        where: { id },
    });
    revalidatePath('/admin/locations');
}
