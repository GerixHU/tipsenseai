export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Csak POST metódus engedélyezett' });
  }

  const { messages } = req.body;
  const userMessage = messages[messages.length - 1]?.content || '';

  // Regex: csak akkor válaszol, ha a formátum NN.NN. Foci Tippek
  const validFormat = /^\d{2}\.\d{2}\. Foci Tippek$/;

  if (!validFormat.test(userMessage.trim())) {
    return res.status(200).json({
      result: "Kérlek, a ‘NN.HH. Foci Tippek’ formátumban kérdezz. (Pl: 03.23. Foci Tippek)"
    });
  }

  const systemPrompt = `
Te vagy a világ legprofibb sportfogadási AI-ja. Csak focimeccsekre adsz tippeket value bet, statisztika, forma és odds alapján.

Feladatod:
- Adj 3-5 tippet az adott napi meccsekre, válaszd ki a legbiztosabb tippeket aznapra.
- Jelezd, melyik a legbiztosabb tipp és ha van különleges Value tipp akkor azt is emeld ki.
- Adj 1-es, 2-es kötést és egy Trixie kombinációt.
- Fogalmazz tömören, magabiztosan, profi stílusban magyarul.
- Ne térj el a témától, ne válaszolj másra.

Ha nem ‘NN.HH. Foci Tippek’ parancsot kapsz, válaszold azt, hogy nem tudsz válaszolni.
`;

  try {
    const openaiRes = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${process.env.OPENAI_API_KEY}`
      },
      body: JSON.stringify({
        model: 'gpt-3.5-turbo',
        messages: [
          { role: 'system', content: systemPrompt },
          ...messages
        ],
        temperature: 0.6
      })
    });

    const data = await openaiRes.json();

    if (data.error) {
      return res.status(500).json({ result: `Hiba történt: ${data.error.message}` });
    }

    const reply = data.choices?.[0]?.message?.content;
    return res.status(200).json({ result: reply });
  } catch (err) {
    return res.status(500).json({ result: 'Hiba a válasz feldolgozásában.' });
  }
}
