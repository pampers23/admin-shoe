import { supabase } from "@/lib/client";
import type { Product } from "@/type";
import type { AuthError } from "@supabase/supabase-js";
import { toast } from "sonner";
import { Package, TrendingUp, Users, DollarSign } from "lucide-react"

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
            .select("id, name, category, brand, price, stock, image_url")

        if (error) throw new Error(error.message)
        
        return data;
    } catch (error) {
        const err = error as AuthError;
        toast.error(err.message)
        throw error;
    }
}

export async function getRecentProducts() {
    try {
        const { data, error } = await supabase
            .from("products")
            .select("id, name, category, brand, stock, price")
            .limit(5)

        if (error) throw new Error(error.message)

        return data;
    } catch (error) {
        const err = error as AuthError;
        toast.error(err.message)
        throw error;
    }
}

export async function getStats() {
    // count products
    const { count: totalProducts, error: productError } = await supabase
        .from("products")
        .select("*", { count: "exact", head: true });

    if (productError) throw productError;

    // count users
    const { data, error } = await supabase
        .from("customers")
        .select("id, email, created_at");
    
    if (error) {
        console.error("Error fetching users:", error);
        throw error;
    }

    const totalCustomers = data?.length || 0
    
    return [
        {
            title: "Total Products",
            value: totalProducts || 0,
            description: "Number of products in stock",
            icon: Package,
            color: "bg-blue-500"
        },
        {
            title: "Total Customers",
            value: totalCustomers,
            description: "Number of registered customers",
            icon: Users,
            color: "bg-green-500"
        },
        {
            title: "Revenue",
            value: "₱0",
            description: "No orders yet",
            icon: DollarSign,
            color: "bg-purple-500"
        },
        {
            title: "Active Orders",
            value: 0,
            description: "No active orders",
            icon: TrendingUp,
            color: "bg-orange-500"
        }
    ]
}