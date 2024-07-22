async function getFirebaseConfig() {
    const response = await fetch('/config');
    if (!response.ok) {
        throw new Error('Failed to fetch Firebase configuration');
    }
    return await response.json();
}

export default getFirebaseConfig;
