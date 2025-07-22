'use server';

import { z } from 'zod';
import { fetchGeneratedPptx } from '@/app/lib/data';

const FormSchema = z.object({
  lyrics: z
    .string({
      invalid_type_error: 'Please paste in song lyrics',
    })
    .trim()
    .min(1, {
      message: 'Lyrics cannot be empty',
    }),
  fileName: z.string().default('lyrics'),
  backgroundOption: z.enum(['GIFT', 'NONE'], {
    invalid_type_error: 'Please select a background option',
  }),
});

export type State = {
  errors?: {
    lyrics?: string[];
    fileName?: string[];
    backgroundOption?: string[];
  };
  message?: string | null;
  blob?: Blob | null;
  payload?: FormData | null;
};

export async function createPptx(prevState: State, formData: FormData) {
  const validatedFields = FormSchema.safeParse({
    lyrics: formData.get('lyrics'),
    fileName: formData.get('fileName'),
    backgroundOption: formData.get('backgroundOption'),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Please fill in all required fields.',
      payload: formData,
    };
  }

  const { lyrics, fileName, backgroundOption } = validatedFields.data;
  try {
    const blob = await fetchGeneratedPptx(lyrics, fileName, backgroundOption);
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
