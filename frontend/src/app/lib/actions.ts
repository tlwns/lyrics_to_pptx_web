'use server';

import { z } from 'zod';
import { fetchGeneratedPptx } from '@/app/lib/data';

const FormSchema = z.object({
  lyrics: z.string({
    required_error: 'Please paste in song lyrics',
  }),
  fileName: z.string().default('lyrics'),
});

export type State = {
  errors?: {
    lyrics?: string[];
    fileName?: string[];
  };
  message?: string | null;
  blob?: Blob | null;
  payload?: FormData | null;
};

export async function createPptx(prevState: State, formData: FormData) {
  const validatedFields = FormSchema.safeParse({
    lyrics: formData.get('lyrics'),
    fileName: formData.get('fileName'),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Please fill in all required fields.',
      payload: formData,
    };
  }

  const { lyrics, fileName } = validatedFields.data;
  try {
    const blob = await fetchGeneratedPptx(lyrics, fileName);
    return {
      message: 'PPTX file generated successfully.',
      blob,
      fileName: fileName,
      payload: formData,
    };
  } catch (error) {
    throw new Error((error as Error).message);
  }
}
