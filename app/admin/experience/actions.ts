'use server';

import fs from 'fs/promises';
import path from 'path';
import { revalidatePath } from 'next/cache';

const DATA_FILE = path.join(process.cwd(), 'data', 'experience.json');

interface ExperienceItem {
    id: number;
    title: string;
    description: string;
    imageUrl: string;
    buttonText: string;
}

async function getExperience(): Promise<ExperienceItem[]> {
    try {
        const data = await fs.readFile(DATA_FILE, 'utf-8');
        return JSON.parse(data);
    } catch (error) {
        return [];
    }
}

async function saveExperience(items: ExperienceItem[]) {
    await fs.writeFile(DATA_FILE, JSON.stringify(items, null, 2), 'utf-8');
}

export async function createExperience(formData: FormData) {
    const title = formData.get('title') as string;
    const description = formData.get('description') as string;
    const imageUrl = formData.get('imageUrl') as string;
    const buttonText = formData.get('buttonText') as string;

    const items = await getExperience();
    const newId = items.length > 0 ? Math.max(...items.map(i => i.id)) + 1 : 1;

    const newItem: ExperienceItem = {
        id: newId,
        title,
        description,
        imageUrl,
        buttonText,
    };

    items.push(newItem);
    await saveExperience(items);

    revalidatePath('/admin/style');
    revalidatePath('/');
}

export async function updateExperience(id: number, formData: FormData) {
    const title = formData.get('title') as string;
    const description = formData.get('description') as string;
    const imageUrl = formData.get('imageUrl') as string;
    const buttonText = formData.get('buttonText') as string;

    let items = await getExperience();
    const index = items.findIndex(i => i.id === id);

    if (index !== -1) {
        items[index] = { ...items[index], title, description, imageUrl, buttonText };
        await saveExperience(items);

        revalidatePath('/admin/style');
        revalidatePath('/');
    }
}

export async function deleteExperience(id: number) {
    let items = await getExperience();
    items = items.filter(i => i.id !== id);
    await saveExperience(items);

    revalidatePath('/admin/style');
    revalidatePath('/');
}
