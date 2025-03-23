import { useState } from 'react'

export default function Chat() {
  const [messages, setMessages] = useState([])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSend = async (e) => {
    e.preventDefault()
    if (!input.trim()) return

    const newMessage = { role: 'user', content: input }
    const updatedMessages = [...messages, newMessage]
    setMessages(updatedMessages)
    setInput('')
    setLoading(true)

    const res = await fetch('/api/chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ messages: updatedMessages }),
    })

    const data = await res.json()
    setMessages([...updatedMessages, { role: 'assistant', content: data.result }])
    setLoading(false)
  }

  return (
    <div style={{ padding: '2rem', backgroundColor: '#111', color: '#fff', minHeight: '100vh' }}>
      <h1>🤖 TipSenseAI Chat</h1>
      <div style={{ marginTop: '2rem', marginBottom: '1rem' }}>
        {messages.map((msg, i) => (
          <div key={i} style={{ marginBottom: '1rem' }}>
            <strong>{msg.role === 'user' ? 'Te' : 'AI'}:</strong> {msg.content}
          </div>
        ))}
        {loading && <p>Válasz készül...</p>}
      </div>
      <form onSubmit={handleSend} style={{ display: 'flex', gap: '1rem' }}>
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Kérdezz valamit a meccsekről, value betekről..."
          style={{ flex: 1, padding: '0.5rem' }}
        />
        <button type="submit" disabled={loading}>Küldés</button>
      </form>
    </div>
  )
}
