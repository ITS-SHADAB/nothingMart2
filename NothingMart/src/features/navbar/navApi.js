export async function fetchCategoryApi() {
  return new Promise(async (resolve) => {
    const res = await fetch(`${window.location.origin}/category`);

    if (!res.ok) {
      throw new Error('Failed to fetch categories');
    }

    const data = await res.json();
    resolve(data);
  });
}
