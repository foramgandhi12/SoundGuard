import { login, logout, getUser, createClient } from './auth.js';

await createClient();

async function updateNavbar() {
    const user = await getUser();
    if (user) {
        document.getElementById("username").innerText = `Logged in as ${user.name}`;
        document.getElementById("login").style.display = 'none';
        document.getElementById("logout").style.display = 'block';
    } else {
        document.getElementById("username").innerText = "";
        document.getElementById("login").style.display = 'block';
        document.getElementById("logout").style.display = 'none';
    }
}

document.getElementById("login").addEventListener("click", async () => {
    await login();
    updateNavbar();
});

document.getElementById("logout").addEventListener("click", async () => {
    await logout();
    updateNavbar();
});

updateNavbar();
