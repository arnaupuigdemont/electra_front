export interface GridModel {
  id: string;
  name: string;
  data: any[];
  [k: string]: any;
}

const BASE_URL = 'http://127.0.0.1:8000';

export async function uploadGridFile(file: File): Promise<GridModel> {
  const formData = new FormData();
  formData.append('file', file);
  const resp = await fetch(`${BASE_URL}/gridcal/files/upload`, {
    method: 'POST',
    body: formData
  });
  if (!resp.ok) {
    const txt = await resp.text();
    throw new Error(txt || `Upload failed (${resp.status})`);
  }
  return resp.json();
}