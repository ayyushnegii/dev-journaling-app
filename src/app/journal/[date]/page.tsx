import Link from 'next/link';
import Image from 'next/image';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { Button } from '@/components/ui/button';
import {
  ChevronLeft,
  Delete,
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
    <div className="bg-neutral-950 flex justify-center items-center min-h-screen p-0 sm:p-4">
      <div className="relative w-full max-w-[430px] h-screen sm:h-[884px] bg-background border-x-0 sm:border-x border-border shadow-2xl overflow-hidden flex flex-col sm:rounded-[3rem]">
        <div className="absolute top-0 left-0 w-full h-64 bg-gradient-to-b from-primary/10 to-transparent pointer-events-none z-0"></div>

        <header className="flex-shrink-0 pt-8 px-4 flex items-center justify-between relative z-10">
          <Link href="/">
            <Button variant="ghost" size="icon" className="glass-card">
              <ChevronLeft className="size-5" />
            </Button>
          </Link>
          <div className="flex flex-col items-center text-center">
            <span className="text-xs font-bold text-primary tracking-widest uppercase">
              {formattedDate}
            </span>
            <h1 className="text-xl font-semibold tracking-tight mt-0.5">
              Morning Reflection
            </h1>
          </div>
          <Button variant="ghost" size="icon">
            <MoreHorizontal className="text-muted-foreground" />
          </Button>
        </header>

        <main className="flex-1 overflow-y-auto px-6 pt-6 pb-32 relative z-0">
          <div className="flex flex-wrap gap-2 justify-center mb-8">
            <span className="px-3 py-1 bg-white/5 border border-white/10 rounded-full text-[10px] font-medium text-muted-foreground uppercase tracking-wider">
              Personal
            </span>
            <span className="px-3 py-1 bg-white/5 border border-white/10 rounded-full text-[10px] font-medium text-muted-foreground uppercase tracking-wider">
              Calm
            </span>
            <span className="px-3 py-1 bg-white/5 border border-white/10 rounded-full text-[10px] font-medium text-muted-foreground uppercase tracking-wider">
              Motivation
            </span>
          </div>

          {heroImage && (
            <div className="relative w-full aspect-[16/10] rounded-3xl overflow-hidden mb-8 shadow-lg">
              <Image
                src={heroImage.imageUrl}
                alt="Hero entry image"
                fill
                className="object-cover"
                data-ai-hint={heroImage.imageHint}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent"></div>
            </div>
          )}

          <div className="glass-card rounded-full p-2 pr-6 flex items-center gap-3 mb-10">
            <Button
              size="icon"
              className="w-10 h-10 bg-primary rounded-full shadow-lg neon-glow-primary flex-shrink-0"
            >
              <Play className="text-primary-foreground fill-current" />
            </Button>
            <div className="flex-1 flex items-center h-4 gap-px overflow-hidden">
              {Array.from({ length: 30 }).map((_, i) => (
                <div
                  key={i}
                  className={`w-1 rounded-full ${i < 15 ? 'bg-primary' : 'bg-muted/50'}`}
                  style={{ height: `${Math.random() * 80 + 20}%` }}
                />
              ))}
            </div>
            <span className="text-xs font-mono font-medium text-primary">
              00:32
            </span>
          </div>

          <div className="space-y-6 text-base font-light leading-relaxed text-foreground/90">
            <p>
              I woke up to the soft light filtering through my window, and for
              the first time in a while, I didn't rush to check my phone.
              Instead, I took a deep breath and stretched, feeling my body wake
              up slowly.
            </p>
            <ul className="space-y-4">
              <li className="flex gap-4 items-start">
                <span className="text-primary mt-2.5 w-1.5 h-1.5 rounded-full bg-primary shrink-0 shadow-[0_0_8px_hsl(var(--primary)/0.6)]"></span>
                <span>The warmth of my morning tea</span>
              </li>
              <li className="flex gap-4 items-start">
                <span className="text-primary mt-2.5 w-1.5 h-1.5 rounded-full bg-primary shrink-0 shadow-[0_0_8px_hsl(var(--primary)/0.6)]"></span>
                <span>A quiet moment to myself before the day starts</span>
              </li>
            </ul>
            <blockquote className="text-muted-foreground italic font-light border-l-2 border-border pl-4 py-1">
              The journey of a thousand miles begins with a single step.
            </blockquote>
             <p>
             This simple act of being present set a peaceful tone for the rest of the day. It's a small change, but it feels significant.
            </p>
          </div>
        </main>

        <div className="absolute bottom-8 left-0 right-0 flex justify-center px-6 z-20">
          <div className="glass-card shadow-2xl rounded-full px-3 py-2 flex items-center gap-4">
            <Button
              variant="ghost"
              size="icon"
              className="w-12 h-12 rounded-full text-muted-foreground hover:text-primary transition-colors"
            >
              <FilePenLine className="size-5" />
            </Button>
            <div className="w-px h-6 bg-border"></div>
            <Button
              variant="ghost"
              size="icon"
              className="w-12 h-12 rounded-full text-muted-foreground hover:text-primary transition-colors"
            >
              <Share className="size-5" />
            </Button>
            <div className="w-px h-6 bg-border"></div>
            <Button
              variant="ghost"
              size="icon"
              className="w-12 h-12 rounded-full text-destructive/70 hover:text-destructive transition-colors"
            >
              <Delete className="size-5" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
