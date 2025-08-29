import { Search, Bell, Settings, Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { SidebarTrigger } from "@/components/ui/sidebar";

interface AppHeaderProps {
  title?: string;
  showSearch?: boolean;
}

export function AppHeader({ title = "Dashboard", showSearch = true }: AppHeaderProps) {
  return (
    <header className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-40">
      <div className="flex h-14 items-center gap-4 px-4 lg:px-6">
        <SidebarTrigger className="lg:hidden" />
        
        <div className="flex-1 flex items-center gap-4">
          <h1 className="font-semibold text-lg hidden sm:block">{title}</h1>
          
          {showSearch && (
            <div className="flex-1 max-w-md relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder="Search matters, clients, documents..."
                className="pl-10 h-9"
              />
            </div>
          )}
        </div>

        <div className="flex items-center gap-2">
          <Button variant="ghost" size="sm" className="relative">
            <Bell className="w-4 h-4" />
            <Badge 
              variant="destructive" 
              className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center text-xs p-0"
            >
              3
            </Badge>
          </Button>
          <Button variant="ghost" size="sm">
            <Settings className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </header>
  );
}