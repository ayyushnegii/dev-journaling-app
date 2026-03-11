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
import { cn } from '@/lib/utils';

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

        <main className="flex-1 px-8 pt-10 pb-32 relative z-0 max-w-4xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Main Reading Area */}
          <div className="lg:col-span-8 flex flex-col">
            <div className="flex flex-wrap gap-2 mb-10">
              <span className="px-5 py-2 bg-primary/5 border border-primary/20 rounded-full text-[10px] font-black text-primary uppercase tracking-[0.2em] shadow-sm">
                Personal
              </span>
              <span className="px-5 py-2 bg-accent/5 border border-accent/20 rounded-full text-[10px] font-black text-accent uppercase tracking-[0.2em] shadow-sm">
                Calm
              </span>
              <span className="px-5 py-2 bg-muted/20 border border-white/5 rounded-full text-[10px] font-black text-muted-foreground uppercase tracking-[0.2em] shadow-sm">
                Motivation
              </span>
            </div>

            {heroImage && (
              <div className="relative w-full aspect-[21/9] rounded-[3rem] overflow-hidden mb-12 shadow-2xl border border-white/5 group/hero">
                <Image
                  src={heroImage.imageUrl}
                  alt="Hero entry image"
                  fill
                  className="object-cover transition-transform duration-1000 group-hover/hero:scale-110"
                  data-ai-hint={heroImage.imageHint}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background via-background/20 to-transparent"></div>
                <div className="absolute bottom-6 left-8 flex items-center gap-3 glass-morphism px-4 py-2 rounded-2xl border-white/10 opacity-0 group-hover/hero:opacity-100 transition-opacity">
                   <span className="text-[10px] font-black uppercase tracking-widest">AI Context Active</span>
                </div>
              </div>
            )}

            <div className="glass-card rounded-[2.5rem] p-4 pr-10 flex items-center gap-6 mb-12 border-primary/10 shadow-2xl group/audio">
              <Button
                size="icon"
                className="w-14 h-14 bg-primary rounded-full shadow-lg neon-glow-primary flex-shrink-0 hover:scale-110 transition-transform active:scale-95"
              >
                <Play className="text-primary-foreground fill-current size-6" />
              </Button>
              <div className="flex-1 flex items-center h-8 gap-1.5 overflow-hidden">
                {Array.from({ length: 60 }).map((_, i) => (
                  <div
                    key={i}
                    className={cn(
                      "w-1 rounded-full transition-all duration-300 group-hover/audio:bg-primary/60",
                      i < 24 ? 'bg-primary' : 'bg-muted/50'
                    )}
                    style={{ height: `${Math.random() * 80 + 20}%` }}
                  />
                ))}
              </div>
              <div className="flex flex-col items-end">
                <span className="text-[10px] font-black font-mono text-primary bg-primary/10 px-3 py-1 rounded-lg border border-primary/20">
                  00:32 / 04:12
                </span>
                <span className="text-[9px] font-bold text-muted-foreground mt-1 uppercase tracking-widest opacity-40">Transcription Syncing</span>
              </div>
            </div>

            <article className="prose prose-invert prose-lg max-w-none space-y-10 text-foreground/80 leading-[1.8] font-body pb-20">
              <p className="text-xl lg:text-2xl font-light text-foreground leading-relaxed first-letter:text-5xl first-letter:font-black first-letter:text-primary first-letter:mr-3 first-letter:float-left first-letter:leading-none">
                I woke up to the soft light filtering through my window, and for
                the first time in a while, I didn't rush to check my phone.
                Instead, I took a deep breath and stretched, feeling my body wake
                up slowly.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 my-12">
                <div className="glass-card p-8 rounded-[2rem] border-white/5 space-y-4 desktop-hover">
                   <h4 className="text-xs font-black uppercase tracking-widest text-primary">Core Observations</h4>
                   <ul className="space-y-4">
                    <li className="flex gap-4 items-start group">
                      <span className="text-primary mt-2.5 w-2 h-2 rounded-full bg-primary shrink-0 shadow-[0_0_10px_hsl(var(--primary)/0.6)] group-hover:scale-150 transition-transform"></span>
                      <span className="font-bold text-sm lg:text-base">The warmth of my morning tea</span>
                    </li>
                    <li className="flex gap-4 items-start group">
                      <span className="text-primary mt-2.5 w-2 h-2 rounded-full bg-primary shrink-0 shadow-[0_0_10px_hsl(var(--primary)/0.6)] group-hover:scale-150 transition-transform"></span>
                      <span className="font-bold text-sm lg:text-base">A quiet moment to myself</span>
                    </li>
                  </ul>
                </div>
                <blockquote className="m-0 glass-card p-8 rounded-[2rem] border-accent/20 bg-accent/5 italic font-medium relative desktop-hover">
                   <span className="absolute -top-4 -left-2 text-6xl text-accent/20 font-serif leading-none">"</span>
                   <p className="text-foreground relative z-10 leading-relaxed text-base lg:text-lg">
                      "The journey of a thousand miles begins with a single step."
                   </p>
                </blockquote>
              </div>
               <p className="text-lg">
                This simple act of being present set a peaceful tone for the rest of the day. It's a small change, but it feels significant in the context of my current engineering sprint.
              </p>
            </article>
          </div>

          {/* Desktop Sidebar Tools */}
          <aside className="hidden lg:flex lg:col-span-4 flex-col space-y-8 sticky top-24 h-fit">
             <section className="glass-card p-8 rounded-[2.5rem] border-white/5 shadow-2xl">
                <h3 className="text-[10px] font-black uppercase tracking-widest text-muted-foreground mb-6">System Metadata</h3>
                <div className="space-y-6">
                   {[
                     { label: 'Words', val: '432' },
                     { label: 'Cognitive Load', val: 'Low', color: 'text-green-500' },
                     { label: 'Sync Status', val: 'Encrypted', color: 'text-primary' },
                   ].map((item) => (
                      <div key={item.label} className="flex justify-between items-center border-b border-white/5 pb-4">
                         <span className="text-xs font-bold text-muted-foreground">{item.label}</span>
                         <span className={cn("text-sm font-black uppercase tracking-tight", item.color || "text-foreground")}>{item.val}</span>
                      </div>
                   ))}
                </div>
             </section>

             <section className="glass-card p-8 rounded-[2.5rem] border-white/5 shadow-2xl">
                <h3 className="text-[10px] font-black uppercase tracking-widest text-muted-foreground mb-6">Deep Actions</h3>
                <div className="grid grid-cols-2 gap-4">
                   <Button variant="ghost" className="flex flex-col gap-2 h-auto py-6 rounded-2xl glass-morphism hover:bg-primary/10 hover:text-primary border-white/5">
                      <Share className="size-5" />
                      <span className="text-[10px] font-black uppercase tracking-widest">Mesh Link</span>
                   </Button>
                   <Button variant="ghost" className="flex flex-col gap-2 h-auto py-6 rounded-2xl glass-morphism hover:bg-primary/10 hover:text-primary border-white/5">
                      <FilePenLine className="size-5" />
                      <span className="text-[10px] font-black uppercase tracking-widest">Re-Factor</span>
                   </Button>
                   <Button variant="ghost" className="flex flex-col gap-2 h-auto py-6 rounded-2xl glass-morphism hover:bg-red-500/10 hover:text-red-500 border-white/5 col-span-2">
                      <Trash2 className="size-5" />
                      <span className="text-[10px] font-black uppercase tracking-widest">Delete Cluster</span>
                   </Button>
                </div>
             </section>
          </aside>
        </main>

        <div className="lg:hidden fixed bottom-8 left-1/2 -translate-x-1/2 flex justify-center z-30">
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
