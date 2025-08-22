import type { Context } from "hono";
import { supabase } from "../lib/client.js";

export const addProduct = async (c: Context) => {
    try {
        const body = await c.req.json();
        const {
            name,
            sku,
            description,
            category,
            brand,
            price,
            stock,
            image_url
        } = body;

        const { data, error } = await supabase
            .from('products')
            .insert([
                {
                    name,
                    sku,
                    description,
                    category,
                    brand,
                    price,
                    stock,
                    image_url
                }
            ]).select();

            if (error) {
                console.error(error);
                return c.json({ error: 'Failed to add product' }, 400);
            }

            return c.json({
                message: 'Product added successfully',
                product: data[0]
            }, 201);
    } catch (error) {
        console.error(error);
        return c.json({ error: 'Failed to add product' }, 500);
    }
}