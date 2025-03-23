export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Csak POST metódus engedélyezett' });
  }

  const { messages } = req.body;
  const userMessage = messages?.[messages.length - 1]?.content || '';

  const today = new Date();
  const day = String(today.getDate()).padStart(2, '0');
  const month = String(today.getMonth() + 1).padStart(2, '0');
  const todayFormatted = `${month}.${day}`;

  const promptDateMatch = userMessage.toLowerCase().includes(`${month}.${day}`) && userMessage.toLowerCase().includes('foci tippek');

  if (!promptDateMatch) {
    return res.status(200).json({ result: "Csak az adott napi meccsekre tudok tippet adni. Írd be a dátumot így: ’03.23. Foci Tippek’." });
  }

  // 🔗 Húzzuk be az aznapi meccseket az API-FOOTBALL API-ból (RapidAPI kulcs kell!)
  const fixturesRes = await fetch('https://api-football-v1.p.rapidapi.com/v3/fixtures?date=' + today.toISOString().split('T')[0] + '&timezone=Europe/Budapest', {
    method: 'GET',
    headers: {
      'X-RapidAPI-Key': process.env.RAPIDAPI_KEY,
      'X-RapidAPI-Host': 'api-football-v1.p.rapidapi.com'
    }
  });

  const fixtureData = await fixturesRes.json();

  const matchList = fixtureData?.response
    ?.map(fix => `${fix.teams.home.name} vs. ${fix.teams.away.name}`)
    ?.join('\n') || 'Nincs elérhető meccs a mai napra.';

  const systemPrompt = `
Te vagy a világ legprofibb sportfogadási mesterséges intelligenciája. Csak labdarúgó mérkőzésekre adsz fogadási tippeket, kizárólag az aznapi, valódi meccsek alapján.

Elemzési módszered: value bet, statisztika, csapatforma, odds és sérülések figyelembevétele.

Feladatod:
- Adj 3-5 rövid, pontos tippet az aznapi meccsekre.
- Emeld ki a legbiztosabb tippet (“Legbiztosabb tipp”) és ha van, a legjobb értékarányos (“Value”) fogadást is.
- Adj egy 1-es kötésű, egy 2-es kötésű és egy Trixie kombinációt az ajánlott tippekből.
- Fogalmazz tömören, határozottan, magabiztos, profi stílusban. Ne magyarázkodj.
- Kizárólag magyarul kommunikálj.
- Csak a kapott meccslistából dolgozhatsz. Nem találhatsz ki meccseket.

❗ Ha a felhasználó nem a következő formátumban ír: “NN.HH. Foci Tippek”, akkor csak ennyit válaszolj:  
"Csak az adott napi meccsekre tudok tippet adni. Írd be a dátumot így: ’03.23. Foci Tippek’."

A mai meccsek listája:

${matchList}
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
        temperature: 0.7
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
