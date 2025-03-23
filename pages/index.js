import Link from 'next/link'

export default function Home() {
  return (
    <div style={styles.container}>
      <div style={styles.overlay}>
        <nav style={styles.navbar}>
          <Link href="/" style={styles.navLink}>Főoldal</Link>
          <Link href="/login" style={styles.navLink}>Bejelentkezés</Link>
          <Link href="/kapcsolat" style={styles.navLink}>Kapcsolat</Link>
          <Link href="/chat" style={styles.chatButton}>TipSenseAi</Link>
        </nav>

        <main style={styles.main}>
          <h1 style={styles.title}>🎯 TipSenseAI</h1>
          <p style={styles.subtitle}>A világ legprofibb sportfogadási asszisztense.</p>
          <Link href="/login" style={styles.ctaButton}>Kezdjük el</Link>
        </main>
      </div>
    </div>
  )
}

const styles = {
  container: {
    backgroundImage: 'url(https://images.unsplash.com/photo-1609766857431-d371f4c2cf96?auto=format&fit=crop&w=1470&q=80)',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    height: '100vh',
    color: '#fff',
    fontFamily: 'Arial, sans-serif',
    position: 'relative'
  },
  overlay: {
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    height: '100%',
    width: '100%',
    padding: '1rem',
  },
  navbar: {
    display: 'flex',
    justifyContent: 'flex-end',
    gap: '1.5rem',
    paddingRight: '2rem',
  },
  navLink: {
    color: 'white',
    textDecoration: 'none',
    fontSize: '1rem',
  },
  chatButton: {
    backgroundColor: '#1e90ff',
    padding: '0.4rem 1rem',
    borderRadius: '5px',
    textDecoration: 'none',
    color: 'white',
    fontWeight: 'bold'
  },
  main: {
    textAlign: 'center',
    marginTop: '20vh',
  },
  title: {
    fontSize: '3rem',
    marginBottom: '1rem'
  },
  subtitle: {
    fontSize: '1.5rem',
    marginBottom: '2rem'
  },
  ctaButton: {
    backgroundColor: '#1e90ff',
    padding: '0.75rem 2rem',
    borderRadius: '8px',
    textDecoration: 'none',
    color: 'white',
    fontSize: '1rem',
    fontWeight: 'bold'
  }
}
