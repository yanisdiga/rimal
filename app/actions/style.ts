'use server';

import { prisma } from '@/lib/prisma';
import { revalidatePath } from 'next/cache';

export async function createBackgroundImage(formData: FormData) {
    const name = formData.get('name') as string;
    const url = formData.get('url') as string;
    const title = formData.get('title') as string;
    const subtitle = formData.get('subtitle') as string;

    await prisma.backgroundImage.create({
        data: {
            name,
            url,
            title,
            subtitle,
        },
    });

    revalidatePath('/admin/style');
    revalidatePath('/'); // Update homepage slider
}

export async function updateBackgroundImage(id: number, formData: FormData) {
    const name = formData.get('name') as string;
    const url = formData.get('url') as string;
    const title = formData.get('title') as string;
    const subtitle = formData.get('subtitle') as string;

    await prisma.backgroundImage.update({
        where: { id },
        data: {
            name,
            url,
            title,
            subtitle,
        },
    });

    revalidatePath('/admin/style');
    revalidatePath('/');
}

export async function deleteBackgroundImage(id: number) {
    await prisma.backgroundImage.delete({
        where: { id },
    });

    revalidatePath('/admin/style');
    revalidatePath('/');
}
