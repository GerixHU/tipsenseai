export default function Register() {
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
      <h1>Regisztráció</h1>
      <form style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginTop: '2rem' }}>
        <input type="text" placeholder="Név" style={{ padding: '0.5rem' }} />
        <input type="email" placeholder="Email" style={{ padding: '0.5rem' }} />
        <input type="password" placeholder="Jelszó" style={{ padding: '0.5rem' }} />
        <input type="text" placeholder="Meghívókód" style={{ padding: '0.5rem' }} />
        <button type="submit" style={{ padding: '0.5rem', backgroundColor: '#ff6600', color: '#fff', border: 'none' }}>
          Regisztráció
        </button>
      </form>
    </div>
  );
}
