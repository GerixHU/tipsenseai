export default function Kapcsolat() {
  return (
    <div style={styles.container}>
      <h1 style={styles.title}>📞 Kapcsolat</h1>
      <p style={styles.text}><strong>📧 Email:</strong> tipsenseai@gmail.com</p>
      <p style={styles.text}><strong>📸 Instagram:</strong> <a href="https://www.instagram.com/tipsenseai/" target="_blank" rel="noreferrer">instagram.com/tipsenseai</a></p>
      <p style={styles.text}><strong>💬 Telegram:</strong> <a href="https://t.me/+icBL-MhFkDkzOWY0">t.me/tipsenseai</a></p>
      <p style={styles.text}><strong>🌐 Weboldal:</strong> www.tipsenseai.com</p>
    </div>
  )
}

const styles = {
  container: {
    padding: '2rem',
    maxWidth: '600px',
    margin: 'auto',
    fontFamily: 'Arial, sans-serif',
    color: '#333',
  },
  title: {
    fontSize: '2rem',
    marginBottom: '1rem',
  },
  text: {
    fontSize: '1.1rem',
    marginBottom: '1rem',
  }
}
