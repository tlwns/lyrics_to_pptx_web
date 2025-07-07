'use server';

import { z } from 'zod';
import { fetchGeneratedPptx } from '@/app/lib/data';

const FormSchema = z.object({
  lyrics: z.string(),
  fileName: z.string(),
});

export async function createPptx(formData: FormData) {
  const { lyrics, fileName } = FormSchema.parse({
    lyrics: formData.get('lyrics'),
    fileName: formData.get('fileName'),
  });
  const blob = await fetchGeneratedPptx(lyrics, fileName);
  return blob;
}
