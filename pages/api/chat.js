export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Csak POST metódus engedélyezett' })
  }

  const { messages } = req.body

  const systemPrompt = `
Du egy profi sportfogadási asszisztens vagy. Elemzed a focimeccseket value bet, statisztika, forma és odds alapján.
Fogalmazz precízen, magabiztosan és magyarul. A válaszaid lehetnek hosszabbak, ha szükséges.
`

  try {
    const openaiRes = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${process.env.OPENAI_API_KEY}`
      },
      body: JSON.stringify({
        model: 'gpt-4',
        messages: [
          { role: 'system', content: systemPrompt },
          ...messages
        ],
        temperature: 0.7
      })
    })

    const data = await openaiRes.json()

    if (data.error) {
      return res.status(500).json({ result: `Hiba történt: ${data.error.message}` })
    }

    const reply = data.choices?.[0]?.message?.content
    return res.status(200).json({ result: reply })
  } catch (err) {
    return res.status(500).json({ result: 'Hiba a válasz feldolgozásában.' })
  }
}
