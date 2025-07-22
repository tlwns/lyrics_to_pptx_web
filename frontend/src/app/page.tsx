import LyricsForm from '@/app/ui/lyrics-form';

export default function Home() {
  return (
    <main
      className='flex flex-col items-center justify-center min-h-screen bg-neutral-50
'
    >
      <div className='w-full max-w-md px-6 py-6 rounded-lg shadow-lg border-gray-900/10 border bg-white'>
        <LyricsForm />
      </div>
    </main>
  );
}
