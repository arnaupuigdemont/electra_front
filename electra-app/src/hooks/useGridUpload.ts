import { useState, useCallback } from 'react';
import { uploadGridFile, type UploadResult } from '../services/gridcalApi';

export function useGridUpload(onSuccess?: (r: UploadResult) => void) {
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const upload = useCallback(async (file: File) => {
    setIsUploading(true);
    setError(null);
    try {
      const res = await uploadGridFile(file);
      onSuccess && onSuccess(res);
      return res;
    } catch (e: any) {
      setError(e.message || 'Upload error');
      throw e;
    } finally {
      setIsUploading(false);
    }
  }, [onSuccess]);

  return { upload, isUploading, error };
}