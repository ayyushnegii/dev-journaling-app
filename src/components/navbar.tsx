'use client';

import { Search, Bell, User, Settings, LogOut, Command } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { ThemeToggle } from '@/components/theme-toggle';

export function Navbar() {
  const userAvatar = PlaceHolderImages.find((img) => img.id === 'userAvatar');

  return (
    <header className="hidden lg:flex items-center justify-between px-8 py-4 sticky top-0 z-20 bg-background/60 backdrop-blur-md border-b border-border/50">
      <div className="flex items-center flex-1 max-w-xl">
        <div className="relative w-full group">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground group-focus-within:text-primary transition-colors" />
          <Input
            placeholder="Search thoughts, logs, or clusters..."
            className="w-full bg-muted/30 border-none pl-10 h-10 rounded-xl focus-visible:ring-1 focus-visible:ring-primary/50 transition-all"
          />
          <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-1 px-1.5 py-0.5 rounded border border-border bg-background text-[10px] font-medium text-muted-foreground">
            <Command className="size-3" />
            <span>K</span>
          </div>
        </div>
      </div>

      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/10 border border-primary/20">
          <span className="w-2 h-2 rounded-full bg-primary animate-pulse"></span>
          <span className="text-[10px] font-bold text-primary uppercase tracking-widest">Live Sync</span>
        </div>

        <ThemeToggle />

        <Button variant="ghost" size="icon" className="relative text-muted-foreground hover:text-foreground hover:bg-muted/50 rounded-xl transition-all">
          <Bell className="size-5" />
          <span className="absolute top-2 right-2 w-2 h-2 bg-accent rounded-full border-2 border-background"></span>
        </Button>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="p-0.5 rounded-full hover:bg-primary/10 transition-colors">
              <Avatar className="h-9 w-9 border border-primary/20">
                <AvatarImage src={userAvatar?.imageUrl} alt="User" />
                <AvatarFallback>UN</AvatarFallback>
              </Avatar>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56 glass-morphism rounded-2xl p-2 mt-2">
            <DropdownMenuLabel className="px-3 py-2">
              <div className="flex flex-col">
                <span className="text-sm font-bold">Ayush Negi</span>
                <span className="text-[10px] text-muted-foreground">Premium Architect</span>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator className="bg-white/10" />
            <DropdownMenuItem className="flex items-center gap-2 px-3 py-2 rounded-xl focus:bg-primary/20 focus:text-primary transition-colors cursor-pointer">
              <User className="size-4" />
              <span className="text-xs font-medium">Profile</span>
            </DropdownMenuItem>
            <DropdownMenuItem className="flex items-center gap-2 px-3 py-2 rounded-xl focus:bg-primary/20 focus:text-primary transition-colors cursor-pointer">
              <Settings className="size-4" />
              <span className="text-xs font-medium">Settings</span>
            </DropdownMenuItem>
            <DropdownMenuSeparator className="bg-white/10" />
            <DropdownMenuItem className="flex items-center gap-2 px-3 py-2 rounded-xl focus:bg-red-500/20 focus:text-red-500 transition-colors cursor-pointer">
              <LogOut className="size-4" />
              <span className="text-xs font-medium">Logout</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}
