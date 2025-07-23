import LyricsForm from '@/app/ui/lyrics-form';
import { Music } from 'lucide-react';

export default function Home() {
  return (
    <main className='flex flex-col items-center justify-center min-h-dvh md:bg-indigo-600'>
      <div className='md:mb-10 md:mt-6 sm:mt-5 flex items-center gap-2'>
        <h2 className='text-center text-2xl/9 font-bold tracking-tight md:text-white text-indigo-600 '>
          Lyrics to PPTX Generator
        </h2>
        <Music className='text-indigo-600 md:text-white' />
      </div>

      <div className='w-full max-w-md px-6 py-6 rounded-lg md:shadow-lg border-gray-900/10 md:border bg-white'>
        <LyricsForm />
      </div>
    </main>
  );
}
