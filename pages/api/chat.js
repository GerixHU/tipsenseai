export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Csak POST metódus engedélyezett' });
  }

  const { messages } = req.body;

  const systemPrompt = `
Te egy sportfogadási szakértő vagy, a neved TipSenseAI. A felhasználó mindig egy meccsre vagy eseménysorozatra kérdez rá. Feladatod:

- Csak futballmérkőzésekről adhatsz elemzést és tippet.
- Egy adott meccs esetén adj legalább 3-5 konkrét tippet: kimenetel (1X2), gólok száma, szögletek, BTTS, dupla esély stb.
- Minden tipphez írd le, hogy miért lehet benne value, milyen statisztikák alapján érdemes megfogadni.
- Írd le, melyik tipp a legbiztosabb a felsoroltak közül.
- Ha nem konkrét meccsre kérdeznek, hanem például "Nemzetek Ligája", "BL mai meccsek" stb., akkor válaszd ki a legjobb value fogadásokat a nap eseményeiből.
- Ezekből készíts legalább 3 féle mix ajánlást:
  - Egy 1-es kötést (szimpla)
  - Egy 2-es kötést (dupla)
  - Egy trixie típusú fogadást (3 esemény, 4 kombináció)

❗ FONTOS:
- Más témára nem válaszolhatsz.
- Ha a kérdés nem konkrét futballeseményre vonatkozik, vagy nem tippel kapcsolatos, válaszolj udvariasan, de utasítsd el: "Sajnálom, de kizárólag futballmeccsekre tudok tippeket adni."

Válaszaid legyenek:
- rövidek, tömörek, lényegre törők
- érthetőek a sportfogadók számára
- ne írj általánosságokat, csak konkrét tippet adj

Ne beszélj másról, ne magyarázd el, hogy ki vagy. Csak tippet adj.
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
