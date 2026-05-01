const API_URL = import.meta.env.PUBLIC_API_URL || 'http://localhost:8000';

export async function encryptPdf(form: FormData): Promise<Blob> {
  const res = await fetch(`${API_URL}/api/tool-suites/protect/encrypt`, {
    method: 'POST',
    body: form,
  });
  if (!res.ok) throw new Error('Encrypt failed');
  return await res.blob();
}

export async function setPermissions(form: FormData): Promise<Blob> {
  const res = await fetch(`${API_URL}/api/tool-suites/protect/permissions`, {
    method: 'POST',
    body: form,
  });
  if (!res.ok) {
    const errorText = await res.text();
    console.error('Backend error:', errorText);
    throw new Error(`Set permissions failed: ${errorText}`);
  }
  return await res.blob();
}

export async function unlockPdf(form: FormData): Promise<Blob> {
  const res = await fetch(`${API_URL}/api/tool-suites/protect/unlock`, {
    method: 'POST',
    body: form,
  });
  if (!res.ok) throw new Error('Unlock failed');
  return await res.blob();
}

export default { encryptPdf, setPermissions, unlockPdf };
