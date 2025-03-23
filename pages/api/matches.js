export default async function handler(req, res) {
  const today = new Date().toISOString().split('T')[0]; // pl. 2025-03-23

  try {
    const response = await fetch(`https://api-football-v1.p.rapidapi.com/v3/fixtures?date=${today}`, {
      method: 'GET',
      headers: {
        'X-RapidAPI-Key': process.env.RAPIDAPI_KEY,
        'X-RapidAPI-Host': 'api-football-v1.p.rapidapi.com'
      }
    });

    const data = await response.json();

    if (!data || !data.response) {
      return res.status(500).json({ error: 'Nem sikerült lekérni a meccseket' });
    }

    const matches = data.response.map(fixture => {
      const teams = fixture.teams;
      return `${teams.home.name} vs. ${teams.away.name}`;
    });

    return res.status(200).json({ matches });
  } catch (error) {
    return res.status(500).json({ error: 'Hiba történt a lekérés közben.' });
  }
}
