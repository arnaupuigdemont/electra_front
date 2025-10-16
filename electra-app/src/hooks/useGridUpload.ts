import { useState, useCallback } from 'react';
import { uploadGridFile, type GridModel } from '../services/gridcalApi';

export function useGridUpload(onSuccess?: (m: GridModel) => void) {
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const upload = useCallback(async (file: File) => {
    setIsUploading(true);
    setError(null);
    try {
      const model = await uploadGridFile(file);
      onSuccess && onSuccess(model);
      return model;
    } catch (e: any) {
      setError(e.message || 'Upload error');
      throw e;
    } finally {
      setIsUploading(false);
    }
  }, [onSuccess]);

  return { upload, isUploading, error };
}