export default function Login() {
  return (
    <div style={{
      backgroundColor: '#121212',
      color: '#fff',
      height: '100vh',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center'
    }}>
      <h1>Bejelentkezés</h1>
      <form style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginTop: '2rem' }}>
        <input type="email" placeholder="Email" style={{ padding: '0.5rem' }} />
        <input type="password" placeholder="Jelszó" style={{ padding: '0.5rem' }} />
        <button type="submit" style={{ padding: '0.5rem', backgroundColor: '#1db954', color: '#fff', border: 'none' }}>
          Belépés
        </button>
      </form>
    </div>
  );
}
