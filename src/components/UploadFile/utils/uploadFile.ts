export default async function uploadFile(file: File): Promise<void> {
  const formData = new FormData();
  formData.append('file', file);

  try {
    const res = await fetch('http://localhost:3000/upload', {
      method: 'POST',
      body: formData,
    });

    const result = await res.json();

    if (!res.ok) {
      throw new Error(result.message || 'Upload failed');
    }
  } catch (err) {
    console.error('❌ Upload error:', err);
  }
}
