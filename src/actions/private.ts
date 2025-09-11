import { supabase } from "@/lib/client";
import type { Product } from "@/type";
import type { AuthError } from "@supabase/supabase-js";
import { toast } from "sonner";

export async function addProducts(product: Product) {
    console.log("Called with:", product);
    
    try {
        const { data, error } = await supabase
            .from("products")
            .insert([{
                name: product.name, 
                price: product.price,
                image_url: product.image_url,
                category: product.category,
                stock: product.stock,
                sku: product.sku,
                description: product.description,
                brand: product.brand,
            }])
            .select()

        console.log("Inserted product:", data);
        console.log("Insert error:", error);
        if (error) {
            throw new Error(error.message)
        }

        return data;
    } catch (error) {
        console.error("Error adding product:", error);
        const err = error as AuthError;
        toast.error(err.message)
        throw error;
    }
}

export async function getProducts() {
    try{
        const { data, error } = await supabase
            .from("products")
            .select("id, name, category, brand, price, stock")

        if (error) throw new Error(error.message)
        
        return data;
    } catch (error) {
        const err = error as AuthError;
        toast.error(err.message)
        throw error;
    }
}