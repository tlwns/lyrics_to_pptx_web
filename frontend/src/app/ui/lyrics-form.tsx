'use client';
import { createPptx } from '@/app/lib/actions';
import { useRef } from 'react';

export default function LyricsForm() {
  const formRef = useRef<HTMLFormElement>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData(formRef.current!);
    const blob = await createPptx(formData);

    if (!blob) {
      alert('Failed to generate PPTX');
      return;
    }

    const fileName = formData.get('fileName') as string;
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = fileName || 'lyrics.pptx';
    document.body.appendChild(link);
    link.click();
    link.remove();
    window.URL.revokeObjectURL(url);
  };

  return (
    <form ref={formRef} className='w-full max-w-sm' onSubmit={handleSubmit}>
      <div className='mb-4'>
        <label htmlFor='lyrics'>Paste in song lyrics</label>
        <textarea id='lyrics' name='lyrics'></textarea>
      </div>
      <div>
        <label htmlFor='fileName'>Name the file</label>
        <input id='fileName' name='fileName' />
      </div>
      <button>Create</button>
    </form>
  );
}
