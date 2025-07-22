'use client';
import { createPptx, State } from '@/app/lib/actions';
import { useActionState, useEffect } from 'react';
import { Download } from 'lucide-react';

const placeHolderLyrics = `[Verse 1]
We're no strangers to love
You know the rules and so do I (Do I)
A full commitment's what I'm thinking of
You wouldn't get this from any other guy

[Pre-Chorus]
I just wanna tell you how I'm feeling
Gotta make you understand

[Chorus]
Never gonna give you up
Never gonna let you down
Never gonna run around and desert you
Never gonna make you cry
Never gonna say goodbye
Never gonna tell a lie and hurt you
`;

export default function LyricsForm() {
  const initialState: State = {
    message: null,
    errors: {},
    blob: null,
    payload: null,
  };
  const [state, formAction, isPending] = useActionState(
    createPptx,
    initialState
  );

  useEffect(() => {
    if (state.blob && !isPending) {
      const url = URL.createObjectURL(state.blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = (state.payload?.get('fileName') as string) || 'lyrics.pptx';

      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    }
  }, [isPending, state]);

  return (
    <form action={formAction} className='space-y-4 w-full text-gray-900'>
      <div className='mb-4'>
        <label htmlFor='lyrics' className='block mb-2 text-sm font-medium'>
          Paste in song lyrics
        </label>
        <textarea
          id='lyrics'
          name='lyrics'
          defaultValue={(state.payload?.get('lyrics') as string) || ''}
          className='w-full outline-1 -outline-offset-1 outline-gray-300 rounded-md focus-within:outline-2 focus-within:-outline-offset-2 focus-within:outline-indigo-600 px-3 py-1.5 text-base sm:text-sm'
          rows={12}
          placeholder={placeHolderLyrics}
        ></textarea>
      </div>
      <div className='mb-4'>
        <label htmlFor='fileName' className='block mb-2 text-sm font-medium'>
          File name
        </label>
        <div className='flex items-center outline-1 -outline-offset-1 outline-gray-300 rounded-md focus-within:outline-2 focus-within:-outline-offset-2 focus-within:outline-indigo-600 pr-3'>
          <input
            id='fileName'
            name='fileName'
            type='text'
            placeholder='lyrics'
            defaultValue={(state.payload?.get('fileName') as string) || ''}
            className=' w-full px-3 py-1.5 sm:text-sm text-base grow py-1.5 pr-1 pl-3 focus:outline-none placeholder:text-gray-400 block min-w-0 '
          />
          <div className='shrink-0 text-base text-gray-500 select-none sm:text-sm'>
            .pptx
          </div>
        </div>
      </div>
      <button className='rounded-md bg-indigo-600 px-5 py-2.5 text-sm font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 inline-flex items-center'>
        <Download size={15} />
        <span className='ml-2'>Download</span>
      </button>
    </form>
  );
}
