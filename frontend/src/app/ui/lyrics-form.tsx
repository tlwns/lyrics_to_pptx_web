'use client';
import { createPptx, State } from '@/app/lib/actions';
import { useActionState, useEffect } from 'react';

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
    <form action={formAction} className='space-y-4'>
      <div className='mb-4'>
        <label htmlFor='lyrics' className='block mb-2'>
          Paste in song lyrics
        </label>
        <textarea
          id='lyrics'
          name='lyrics'
          required
          defaultValue={(state.payload?.get('lyrics') as string) || ''}
        ></textarea>
      </div>
      <div className='mb-4'>
        <label htmlFor='fileName' className='block mb-2'>
          Name the file
        </label>
        <input
          id='fileName'
          name='fileName'
          type='text'
          defaultValue={(state.payload?.get('fileName') as string) || 'lyrics'}
        />
      </div>
      <button>Create</button>
    </form>
  );
}
