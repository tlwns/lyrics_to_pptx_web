'use client';
import { createPptx, State } from '@/app/lib/actions';
import { useActionState, useEffect, useState } from 'react';
import { ChevronsUpDown, Download } from 'lucide-react';
import {
  Label,
  Listbox,
  ListboxButton,
  ListboxOption,
  ListboxOptions,
} from '@headlessui/react';

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

const backgroundOptions = ['GIFT', 'NONE'] as const;

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

  const [backgroundOption, setBackgroundOption] = useState(
    backgroundOptions[0]
  );

  return (
    <form action={formAction} className='space-y-4 w-full text-gray-900'>
      <div className='mb-4'>
        <label htmlFor='lyrics' className='block mb-2 text-sm font-medium'>
          Paste in song lyrics
        </label>
        <textarea
          id='lyrics'
          name='lyrics'
          aria-describedby='lyrics-error'
          defaultValue={(state.payload?.get('lyrics') as string) || ''}
          className='w-full outline-1 -outline-offset-1 outline-gray-300 rounded-md focus-within:outline-2 focus-within:-outline-offset-2 focus-within:outline-indigo-600 px-3 py-1.5 text-base sm:text-sm/6 '
          rows={12}
          placeholder={placeHolderLyrics}
        />
        <div id='lyrics-error' aria-live='polite' aria-atomic='true'>
          {state.errors?.lyrics &&
            state.errors.lyrics.map((error) => (
              <p
                key={error}
                id='lyrics-error'
                className='text-sm text-red-500 mt-2'
              >
                {error}
              </p>
            ))}
        </div>
      </div>
      <Listbox
        name='backgroundOption'
        value={backgroundOption}
        onChange={setBackgroundOption}
      >
        <Label className='block text-sm font-medium text-gray-900 mb-2'>
          Background
        </Label>
        <ListboxButton className='block w-full cursor-default rounded-md bg-white py-1.5 pr-2 pl-3 text-left text-gray-900 outline-1 -outline-offset-1 outline-gray-300 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6 inline-flex items-center'>
          <span className='block truncate flex-1'>{backgroundOption}</span>
          <ChevronsUpDown size={15} />
        </ListboxButton>
        <ListboxOptions
          transition
          anchor='bottom'
          className='mt-1 w-(--button-width) rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black/5 focus:outline-hidden data-leave:transition data-leave:duration-100 data-leave:ease-in data-closed:data-leave:opacity-0 sm:text-sm/6 '
        >
          {backgroundOptions.map((option) => (
            <ListboxOption
              key={option}
              value={option}
              className='group relative cursor-default py-2 pr-9 pl-3 text-gray-900 select-none data-focus:bg-indigo-600 data-focus:text-white data-focus:outline-hidden'
            >
              <span>{option}</span>
            </ListboxOption>
          ))}
        </ListboxOptions>
      </Listbox>
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
            className=' w-full px-3 py-1.5 sm:text-sm/6  text-base grow py-1.5 pr-1 pl-3 focus:outline-none placeholder:text-gray-400 block min-w-0 '
          />
          <div className='shrink-0 text-base text-gray-500 select-none sm:text-sm/6 '>
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
