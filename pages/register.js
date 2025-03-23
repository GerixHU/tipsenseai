import { useState } from 'react'
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
)

const MEGHIVOKOD = 'TIPSENSEAIVIP2025'

export default function Register() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [code, setCode] = useState('')
  const [message, setMessage] = useState('')

  const handleRegister = async (e) => {
    e.preventDefault()
    if (code !== MEGHIVOKOD) {
      setMessage('Hibás meghívókód!')
      return
    }

    const { error } = await supabase.auth.signUp({ email, password })
    if (error) {
      setMessage('Hiba a regisztrációnál!')
    } else {
      setMessage('Sikeres regisztráció! 🎉 Ellenőrizd az emailed.')
    }
  }

  return (
    <div style={{ backgroundColor: '#121212', color: '#fff', height: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
      <h1>Regisztráció</h1>
      <form onSubmit={handleRegister} style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginTop: '2rem' }}>
        <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
        <input type="password" placeholder="Jelszó" value={password} onChange={(e) => setPassword(e.target.value)} />
        <input type="text" placeholder="Meghívókód" value={code} onChange={(e) => setCode(e.target.value)} />
        <button type="submit">Regisztráció</button>
      </form>
      {message && <p style={{ marginTop: '1rem' }}>{message}</p>}
    </div>
  )
}
