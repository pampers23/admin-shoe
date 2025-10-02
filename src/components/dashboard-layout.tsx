import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
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
                <header className="h-21 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 
                top-0 z-40">
                    <div className="container flex items-center justify-between h-full px-6">
                        <div className="flex items-center gap-4">
                            <SidebarTrigger className="p-2 hover:bg-muted rounded-lg transition-colors" />
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
