import { BottomNav, type ActiveTab } from '@/components/bottom-nav';

type AppShellProps = {
  children: React.ReactNode;
  activeTab: ActiveTab;
};

export function AppShell({ children, activeTab }: AppShellProps) {
  return (
    <div className="bg-neutral-950 flex justify-center items-center min-h-screen p-0 sm:p-4">
      <div className="relative w-full max-w-[430px] h-screen sm:h-[884px] bg-background border-x-0 sm:border-x border-border shadow-2xl overflow-hidden flex flex-col sm:rounded-[3rem]">
        <div className="flex-1 flex flex-col overflow-hidden">{children}</div>
        <BottomNav activeTab={activeTab} />
      </div>
    </div>
  );
}
