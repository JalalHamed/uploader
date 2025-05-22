export default async function deleteFile(filename: string): Promise<void> {
  try {
    const res = await fetch('http://localhost:3000/upload', {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ filename }),
    });

    const result = await res.json();

    if (!res.ok) {
      throw new Error(result.message || 'Delete failed');
    }
  } catch (err) {
    console.error('❌ Delete error:', err);
  }
}
