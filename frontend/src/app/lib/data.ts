export async function fetchGeneratedPptx(
  lyrics: string,
  fileName: string,
  backgroundOption: 'GIFT' | 'NONE'
) {
  try {
    const response = await fetch('http://0.0.0.0:8000/generate', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        lyrics,
        filename: fileName,
        background_option: backgroundOption,
      }),
    });

    if (!response.ok) {
      throw new Error(`
            Failed to fetch data: ${response.statusText}
            `);
    }

    const blob = await response.blob();
    return blob;
  } catch (e) {
    throw new Error(`Failed to fetch generated pptx: ${(e as Error).message}`);
  }
}
