import logo from "@/assets/Shoe__1_-removebg-preview.png";
import { cn } from "@/lib/utils";

function Logo({ className }: { className?: string }) {
  return <img className={cn("object-contain w-auto", className)} src={logo} alt="logo" />;
}

export default Logo;
