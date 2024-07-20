async function getFirebaseConfig() {
    const response = await fetch('/api/config');
    if (!response.ok) {
        throw new Error('Failed to fetch Firebase configuration');
    }
    return await response.json();
}

export default getFirebaseConfig;
