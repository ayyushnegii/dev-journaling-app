import Link from 'next/link';
import Image from 'next/image';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { Button } from '@/components/ui/button';
import { AppShell } from '@/components/app-shell';
import {
  ChevronLeft,
  Trash2,
  FilePenLine,
  MoreHorizontal,
  Play,
  Share,
} from 'lucide-react';

type JournalEntryPageProps = {
  params: {
    date: string;
  };
};

export default function JournalEntryPage({ params }: JournalEntryPageProps) {
  const { date } = params;
  const entryDate = new Date(date);
  const heroImage = PlaceHolderImages.find((img) => img.id === 'journalHero');

  const formattedDate = entryDate.toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  });

  return (
    <AppShell activeTab="dashboard">
      <div className="relative flex-1 flex flex-col">
        <div className="absolute top-0 left-0 w-full h-64 bg-gradient-to-b from-primary/10 to-transparent pointer-events-none z-0"></div>

        <header className="flex-shrink-0 pt-8 lg:pt-12 px-4 flex items-center justify-between relative z-10">
          <Link href="/">
            <Button variant="ghost" size="icon" className="glass-card hover:bg-primary/10 transition-colors">
              <ChevronLeft className="size-5" />
            </Button>
          </Link>
          <div className="flex flex-col items-center text-center">
            <span className="text-xs font-bold text-primary tracking-widest uppercase">
              {formattedDate}
            </span>
            <h1 className="text-xl lg:text-3xl font-bold tracking-tight mt-0.5">
              Morning Reflection
            </h1>
          </div>
          <Button variant="ghost" size="icon" className="hover:bg-primary/10">
            <MoreHorizontal className="text-muted-foreground" />
          </Button>
        </header>

        <main className="flex-1 px-6 pt-10 pb-32 relative z-0 max-w-2xl mx-auto w-full">
          <div className="flex flex-wrap gap-2 justify-center mb-10">
            <span className="px-4 py-1.5 bg-primary/5 border border-primary/20 rounded-full text-[10px] font-bold text-primary uppercase tracking-wider">
              Personal
            </span>
            <span className="px-4 py-1.5 bg-accent/5 border border-accent/20 rounded-full text-[10px] font-bold text-accent uppercase tracking-wider">
              Calm
            </span>
            <span className="px-4 py-1.5 bg-muted/20 border border-white/5 rounded-full text-[10px] font-bold text-muted-foreground uppercase tracking-wider">
              Motivation
            </span>
          </div>

          {heroImage && (
            <div className="relative w-full aspect-[16/10] rounded-[2.5rem] overflow-hidden mb-12 shadow-2xl border border-white/5">
              <Image
                src={heroImage.imageUrl}
                alt="Hero entry image"
                fill
                className="object-cover"
                data-ai-hint={heroImage.imageHint}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent"></div>
            </div>
          )}

          <div className="glass-card rounded-[2rem] p-3 pr-8 flex items-center gap-4 mb-12 border-primary/10 shadow-lg">
            <Button
              size="icon"
              className="w-12 h-12 bg-primary rounded-full shadow-lg neon-glow-primary flex-shrink-0 hover:scale-105 transition-transform"
            >
              <Play className="text-primary-foreground fill-current size-5" />
            </Button>
            <div className="flex-1 flex items-center h-6 gap-1 overflow-hidden">
              {Array.from({ length: 40 }).map((_, i) => (
                <div
                  key={i}
                  className={`w-1 rounded-full ${i < 18 ? 'bg-primary' : 'bg-muted/50'}`}
                  style={{ height: `${Math.random() * 80 + 20}%` }}
                />
              ))}
            </div>
            <span className="text-[10px] font-black font-mono text-primary bg-primary/10 px-2 py-1 rounded">
              00:32
            </span>
          </div>

          <div className="space-y-8 text-lg font-light leading-relaxed text-foreground/90 pb-20">
            <p>
              I woke up to the soft light filtering through my window, and for
              the first time in a while, I didn't rush to check my phone.
              Instead, I took a deep breath and stretched, feeling my body wake
              up slowly.
            </p>
            <ul className="space-y-6 ml-4">
              <li className="flex gap-5 items-start">
                <span className="text-primary mt-3 w-2 h-2 rounded-full bg-primary shrink-0 shadow-[0_0_10px_hsl(var(--primary)/0.6)]"></span>
                <span className="font-medium">The warmth of my morning tea</span>
              </li>
              <li className="flex gap-5 items-start">
                <span className="text-primary mt-3 w-2 h-2 rounded-full bg-primary shrink-0 shadow-[0_0_10px_hsl(var(--primary)/0.6)]"></span>
                <span className="font-medium">A quiet moment to myself before the day starts</span>
              </li>
            </ul>
            <blockquote className="text-muted-foreground italic font-medium border-l-4 border-primary/30 pl-6 py-2 bg-muted/10 rounded-r-xl">
              "The journey of a thousand miles begins with a single step."
            </blockquote>
             <p>
              This simple act of being present set a peaceful tone for the rest of the day. It's a small change, but it feels significant.
            </p>
          </div>
        </main>

        <div className="fixed bottom-8 left-1/2 lg:left-auto lg:right-12 -translate-x-1/2 lg:translate-x-0 flex justify-center z-30">
          <div className="glass-card shadow-2xl rounded-full px-4 py-3 flex items-center gap-5 border border-white/10 backdrop-blur-2xl">
            <Button
              variant="ghost"
              size="icon"
              className="w-12 h-12 rounded-full text-muted-foreground hover:text-primary transition-colors hover:bg-primary/5"
            >
              <FilePenLine className="size-5" />
            </Button>
            <div className="w-px h-6 bg-border"></div>
            <Button
              variant="ghost"
              size="icon"
              className="w-12 h-12 rounded-full text-muted-foreground hover:text-primary transition-colors hover:bg-primary/5"
            >
              <Share className="size-5" />
            </Button>
            <div className="w-px h-6 bg-border"></div>
            <Button
              variant="ghost"
              size="icon"
              className="w-12 h-12 rounded-full text-destructive/70 hover:text-destructive transition-colors hover:bg-destructive/5"
            >
              <Trash2 className="size-5" />
            </Button>
          </div>
        </div>
      </div>
    </AppShell>
  );
}
