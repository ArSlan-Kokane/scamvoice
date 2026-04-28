/**
 * Utilities for audio transcription processing.
 */

/**
 * Converts a File or Blob object to a base64 string.
 * @param file The audio file to convert
 * @returns Promise resolving to base64 string
 */
export async function audioToBase64(file: File | Blob): Promise<string> {
  const arrayBuffer = await file.arrayBuffer();
  const buffer = Buffer.from(arrayBuffer);
  return buffer.toString('base64');
}

/**
 * Validates an audio file for size and type.
 * @param file The file to validate
 * @returns { valid: boolean, error?: string }
 */
export function validateAudioFile(file: File | null): { valid: boolean; error?: string } {
  if (!file) {
    return { valid: false, error: 'No file provided' };
  }

  // Max file size: 10MB
  const MAX_SIZE = 10 * 1024 * 1024;
  if (file.size > MAX_SIZE) {
    return { valid: false, error: 'File size exceeds 10MB limit' };
  }

  // Supported types: webm, wav, mp3, ogg
  const supportedTypes = ['audio/webm', 'audio/wav', 'audio/mpeg', 'audio/ogg', 'audio/x-wav', 'audio/mp3'];
  if (!supportedTypes.includes(file.type) && !file.name.match(/\.(webm|wav|mp3|ogg)$/i)) {
    return { valid: false, error: 'Unsupported audio format. Use webm, wav, mp3, or ogg.' };
  }

  return { valid: true };
}
