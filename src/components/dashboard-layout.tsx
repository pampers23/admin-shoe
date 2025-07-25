import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { Bell, Search, User } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { AppSidebar } from "./app-sidebar"

interface DashboardLayoutProps {
    children: React.ReactNode
}

export function DashboardLayout({ children }: DashboardLayoutProps) {
  return (
    <SidebarProvider>
        <div className="min-h-screen flex w-full bg-background">
            <AppSidebar />

            <div className="flex-1 flex flex-col">
                {/* header */}
                <header className="h-16 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 
                top-0 z-40">
                    <div className="container flex items-center justify-between h-full px-6">
                        <div className="flex items-center gap-4">
                            <SidebarTrigger className="p-2 hover:bg-muted rounded-lg transition-colors" />
                            <div className="hidden md:flex items-center gap-2 max-w-sm">
                                <div className="relative flex-1">
                                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 
                                    text-muted-foreground w-4 h-4" />
                                    <Input
                                        placeholder="Searh products..."
                                        className="pl-10 bg-muted/50 border-0 focus-visible:ring-primary/20"
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="flex items-center gap-3">
                            <Button variant="ghost" size="icon" className="relative">
                                <Bell className="w-4 h-4"/>
                                <span className="absolute -top-1 -right-1 w-2 h-2 bg-primary rounded-full"></span>
                            </Button>
                            <Button variant="ghost" size="icon">
                                <User className="w-4 h-4" />
                            </Button>
                        </div>
                    </div>
                </header>

                {/* main content */}
                <main className="flex-1 overflow-auto">
                    <div className="container mx-auto px-6 py-6">
                        {children}
                    </div>
                </main>
            </div>
        </div>
    </SidebarProvider>
  )
}
