'use client'

import { useState } from 'react'
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState('')

  const signUp = async () => {
    setLoading(true)
    setMessage('')
    const { error } = await supabase.auth.signUp({ email, password })
    setLoading(false)
    setMessage(error ? error.message : 'Signup successful. You can now login.')
  }

  const login = async () => {
    setLoading(true)
    setMessage('')
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    })
    setLoading(false)
    setMessage(error ? error.message : 'Logged in successfully ✅')
  }

  return (
    <main style={{ minHeight: '100vh', display: 'grid', placeItems: 'center', background: '#0B0F1A', color: 'white' }}>
      <div style={{ background: '#121826', padding: 24, borderRadius: 12, width: 320 }}>
        <h2 style={{ marginBottom: 16 }}>Login</h2>

        <input
          placeholder="Email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          style={{ width: '100%', marginBottom: 10, padding: 8 }}
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          style={{ width: '100%', marginBottom: 10, padding: 8 }}
        />

        <button onClick={login} disabled={loading} style={{ width: '100%', marginBottom: 8 }}>
          {loading ? 'Loading…' : 'Login'}
        </button>

        <button onClick={signUp} disabled={loading} style={{ width: '100%' }}>
          Sign Up
        </button>

        {message && <p style={{ marginTop: 12, fontSize: 12 }}>{message}</p>}
      </div>
    </main>
  )
}
