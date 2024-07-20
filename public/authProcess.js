import { login, logout, getUser, createClient } from './auth.js'

await createClient()

document.getElementById('login').addEventListener('click', async () => {
  await login()
  const user = await getUser()
  if (user) {
    document.getElementById('username').innerText = `Logged in as ${user.name}`
  }
})

document.getElementById('logout').addEventListener('click', async () => {
  await logout()
  document.getElementById('username').innerText = ''
})
