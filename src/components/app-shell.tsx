import { BottomNav, type ActiveTab } from '@/components/bottom-nav';
import { Sidebar } from '@/components/sidebar';
import { cn } from '@/lib/utils';

type AppShellProps = {
  children: React.ReactNode;
  activeTab: ActiveTab;
};

export function AppShell({ children, activeTab }: AppShellProps) {
  return (
    <div className="bg-neutral-950 lg:bg-background min-h-screen flex flex-col lg:flex-row">
      <Sidebar activeTab={activeTab} />
      
      {/* Mobile-first centered-column layout, transitions to wide layout for desktop */}
      <div className={cn(
        "flex-1 flex justify-center items-center p-0 sm:p-4 lg:p-0",
        "lg:pl-[220px]" // Sidebar offset
      )}>
        <div className={cn(
          "relative w-full h-screen bg-background border-x-0 sm:border-x border-border shadow-2xl overflow-hidden flex flex-col sm:rounded-[3rem]",
          "max-w-[430px] sm:h-[884px]", // Mobile constraints
          "lg:max-w-[1280px] lg:h-screen lg:rounded-none lg:border-none lg:shadow-none" // Desktop expansion
        )}>
          {/* Main Content Area with its own max-width for readability */}
          <div className="flex-1 flex flex-col overflow-y-auto w-full">
            <div className="w-full max-w-[860px] mx-auto min-h-full flex flex-col pb-24 lg:pb-8">
              {children}
            </div>
          </div>
          
          <div className="lg:hidden">
            <BottomNav activeTab={activeTab} />
          </div>
        </div>
      </div>
    </div>
  );
}
