import { supabase } from "@/lib/client";
import type { Product, Order, Categories } from "@/type";
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

  // count customers
  const { count: totalCustomers, error: customerError } = await supabase
    .from("customers")
    .select("*", { count: "exact", head: true });

  if (customerError) throw customerError;

  // sum revenue (completed orders only)
  const { data: revenueData, error: revenueError } = await supabase
    .from("orders")
    .select("total_amount, status");

  if (revenueError) throw revenueError;

  const totalRevenue =
    revenueData
      ?.filter((order) => order.status === "completed")
      .reduce((sum, order) => sum + Number(order.total_amount), 0) || 0;

  // active orders
  const activeOrders =
    revenueData?.filter((order) => order.status === "pending").length || 0;

  return [
    {
      title: "Total Products",
      value: totalProducts || 0,
      description: "Number of products in stock",
      icon: Package,
      color: "bg-blue-500",
    },
    {
      title: "Total Customers",
      value: totalCustomers || 0,
      description: "Number of registered customers",
      icon: Users,
      color: "bg-green-500",
    },
    {
      title: "Revenue",
      value: `₱${totalRevenue.toLocaleString()}`,
      description:
        totalRevenue > 0 ? "Total sales revenue" : "No orders yet",
      icon: DollarSign,
      color: "bg-purple-500",
    },
    {
      title: "Active Orders",
      value: activeOrders,
      description: "Orders currently pending",
      icon: TrendingUp,
      color: "bg-orange-500",
    },
  ];
}


const categoryMeta: Record<string, { description: string; color: string }> = {
  running: {
    description: "Shoes designed for running and performance.",
    color: "bg-blue-500",
  },
  casual: {
    description: "Everyday casual shoes for comfort and style.",
    color: "bg-green-500",
  },
  lifestyle: {
    description: "Trendy lifestyle footwear for daily use.",
    color: "bg-purple-500",
  },
  sneakers: {
    description: "Sporty sneakers suitable for all occasions.",
    color: "bg-yellow-500",
  },
  formal: {
    description: "Elegant formal shoes for events and office wear.",
    color: "bg-red-500",
  },
};

export async function getCategories(): Promise<Categories[]> {
  try {
    const { data, error } = await supabase
      .from("products")
      .select("category");

    if (error) throw new Error(error.message);
    if (!data) return [];

    // count products by category
    const categoryMap: Record<string, number> = {};
    data.forEach((item) => {
      const name = item.category?.toLowerCase() || "uncategorized";
      categoryMap[name] = (categoryMap[name] || 0) + 1;
    });

    // merge counts
    return Object.entries(categoryMap).map(([name, productCount]) => {
      const meta = categoryMeta[name] ?? {
        description: "No description available",
        color: "bg-gray-500",
      };

      return {
        name: name.charAt(0).toUpperCase() + name.slice(1),
        productCount,
        description: meta.description,
        color: meta.color,
      };
    });
  } catch (error) {
    const err = error as Error;
    toast.error(err.message);
    throw error;
  }
}