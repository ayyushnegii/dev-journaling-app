import { BottomNav, type ActiveTab } from '@/components/bottom-nav';
import { Sidebar } from '@/components/sidebar';
import { Navbar } from '@/components/navbar';
import { cn } from '@/lib/utils';

type AppShellProps = {
  children: React.ReactNode;
  activeTab: ActiveTab;
};

export function AppShell({ children, activeTab }: AppShellProps) {
  return (
    <div className="bg-neutral-950 min-h-screen flex flex-col lg:flex-row font-body">
      <Sidebar activeTab={activeTab} />
      
      {/* Main Container */}
      <div className={cn(
        "flex-1 flex flex-col transition-all duration-300 ease-in-out",
        "lg:pl-[var(--sidebar-width)]"
      )}>
        {/* Desktop Top Nav */}
        <Navbar />

        {/* Global Content Area */}
        <main className={cn(
          "flex-1 flex flex-col items-center p-0 lg:p-8 overflow-hidden",
        )}>
          {/* Mobile-first centered-column layout (simulated device on small screens, full bleed on large) */}
          <div className={cn(
            "relative w-full h-full bg-background border-border shadow-2xl overflow-hidden flex flex-col",
            "max-w-[430px] mx-auto sm:h-[884px] sm:rounded-[3rem] sm:border", // Mobile/Tablet mimicry
            "lg:max-w-none lg:h-full lg:rounded-[2rem] lg:border lg:bg-background/20 lg:backdrop-blur-sm" // Desktop expansion
          )}>
            <div className="flex-1 flex flex-col overflow-y-auto w-full scrollbar-hide">
              <div className="w-full max-w-[1200px] mx-auto min-h-full flex flex-col pb-24 lg:pb-12 px-4 lg:px-8">
                {children}
              </div>
            </div>
            
            <div className="lg:hidden">
              <BottomNav activeTab={activeTab} />
            </div>
          </div>
        </main>
      </div>
      
      {/* Search Keyboard Shortcut Hint (Global) */}
      <div className="hidden lg:flex fixed bottom-6 right-8 glass-morphism px-3 py-1.5 rounded-full items-center gap-2 text-[10px] font-bold text-muted-foreground z-50">
        <span className="flex items-center gap-1 opacity-60">
          <kbd className="font-mono">⌘</kbd>
          <kbd className="font-mono">P</kbd>
        </span>
        <span className="w-px h-3 bg-white/10" />
        <span>Quick Command</span>
      </div>
    </div>
  );
}
