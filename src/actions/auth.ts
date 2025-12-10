import { supabase } from "@/lib/client";
import { AuthError } from "@supabase/supabase-js";
import { toast } from "sonner";

export async function loginWithAdminCode(adminCode: string, password: string) {
  try {
    const { data: adminData, error: adminError } = await supabase
        .from("admins")
        .select("email, user_id, admin_code")
        .eq("admin_code", adminCode)
        .single();

    if (adminError || !adminData) {
        throw new Error("Invalid User ID, please try again.");
    }

    const { data, error } = await supabase.auth.signInWithPassword({
        email: adminData.email,
        password: password,
    });

    if (error) throw error;

    return data;
  } catch (error) {
    const err = error as AuthError;
    toast.error(err.message);
    throw err;
  }
}

export async function Logout() {
    try {
        const { error } = await supabase.auth.signOut();

        if (error) throw error;
        
        toast.success("Logged out successfully");
    } catch (error) {
        const err = error as AuthError;
        toast.error(err.message);
        throw err;
    }
}