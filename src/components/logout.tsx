import { LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { Logout } from "@/actions/auth";

export function LogoutButton() {
    const navigate = useNavigate();

    const handleLogout = async () => {
        await Logout();
        navigate("/login");
    }

    return (
        <Button
            variant="ghost"
            className="w-full justify-start text-red-500 hover:text-red-600 hover:bg-red-200 cursor-pointer"
            onClick={handleLogout}
        >
            <LogOut className="mr-2 h-4 w-4" />
            Logout
        </Button>
    )
}