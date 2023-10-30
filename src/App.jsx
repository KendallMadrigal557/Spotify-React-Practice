import { useState } from 'react'
import './App.css'

const apiKey = import.meta.env.VITE_SPOTIFY_API_KEY

function App() {
  const [song, setSong] = useState('')
  const [songs, setSongs] = useState([])

  function handleSearch(e) {
    e.preventDefault();
    if (song.trim() === '') {
      alert('Please insert name of song')
      return
    }
    setSong('')
    getSong(song)
  }
  const options = {
    method: 'GET',
    headers: {
      'X-RapidAPI-Key': apiKey,
      'X-RapidAPI-Host': 'spotify23.p.rapidapi.com'
    }
  };

  async function getSong(song) {
    try {
      let url = `https://spotify23.p.rapidapi.com/search/?q=${song}&type=tracks&offset=0&limit=5&numberOfTopResults=5`;

      let data = await fetch(url, options);
      let res = await data.json();
      console.log(res.tracks.items);
      setSongs(res.tracks.items);
    } catch (error) {
      console.log(`ups... Error:  ${error}`);
    }
  }

  return (
    <div className='principal-container'>
      <div>
        <h1>Spotify Search</h1>
      </div>
      <form className='form-spotify' onSubmit={handleSearch}>
        <input type="text" value={song} placeholder='Name of the song' onChange={e => setSong(e.target.value)} />
        <button type='submit'>Search</button>
      </form>
      {
        songs.map((song, index) => ( 
          <>
            <div key={index}>
              <img src={song.data.albumOfTrack.coverArt.sources[0].url} alt="" />
              <h2>{song.data.name}</h2>
            </div>
          </>
        ))

      }
    </div>
  )
}

export default App
