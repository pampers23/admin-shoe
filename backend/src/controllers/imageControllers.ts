import { supabase } from "../lib/client.js";
import type { Context } from "hono";

export const uploadProductImage = async (c: Context) => {
    const formData = await c.req.formData();
    const file = formData.get('file') as File;

    if (!file) {
        return c.json({ error: 'No file uploaded' }, 400);
    }

    const filePath = `products/${Date.now()}_${file.name}`;

    const { data, error } = await supabase.storage
        .from('product-images')
        .upload(filePath, file, {
            cacheControl: '3600',
            upsert: false
        });

    if (error) return c.json({ error: error.message }, 400);

    const { data: publicUrl } = supabase.storage
        .from('product-images')
        .getPublicUrl(filePath);

    return c.json({ url: publicUrl.publicUrl })
}