import { useEffect, useState } from 'react'
import './App.css'

const url = 'https://api.adviceslip.com/advice'
const errorMessage = "Knock, knock. Who's there? Not the advice right now, but don't worry, it'll be back soon!";

function App() {
  const [advice, setAdvice] = useState('')
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(false)

  async function fetchAdvice() {
    setLoading(true)
    const randomId = Math.floor(Math.random() * 224) + 1
    try {
      console.log(randomId);
      const response = await fetch(`${url}/${randomId}`)
      if (!response.ok) throw error

      const data = await response.json()
      const { advice } = data.slip
      setAdvice(advice)
    } catch (error) {
      setError(errorMessage)
    }
    finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchAdvice()
  }, [])

  return (
    <div className='app'>
      <div className='card'>
        {error ? (
          <h2 className='error heading'>{error}</h2>
        ) : (
          <>
            {loading ? <h2 className='heading'>Loading...</h2> : <h1 className='heading'>{advice}</h1>}
            <button className='button' onClick={fetchAdvice}>
              <span>Give me advice</span>
            </button>
          </>
        )}
      </div>
    </div>
  )
}

export default App
