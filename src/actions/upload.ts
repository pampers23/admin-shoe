import { supabase } from '@/lib/client';

export async function uploadImage(file: File) {
    const filePath = `${Date.now()}-${file.name}`;

    const { error } = await supabase.storage
        .from('product-images')
        .upload(filePath, file);

    if (error) throw new Error(error.message);

    const { data: publicUrl } = 
        supabase.storage.from('product-images').getPublicUrl(filePath);

    return publicUrl.publicUrl;
}