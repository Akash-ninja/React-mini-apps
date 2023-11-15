import { useSearchParams } from 'react-router-dom'
import styles from './Map.module.css'

function Map() {
  /* to access query strings from the URL */
  const [searchParams, setSearchParams] = useSearchParams()
  const lat = searchParams.get('lat')
  const lng = searchParams.get('lng')

  return (
    <div className={styles.mapContainer}>
      <h1>Map</h1>
      <h1>
        Position: {lat}, {lng}
      </h1>
      <button onClick={() => setSearchParams({ lat: 23, lng: 52 })}>
        Change pos
      </button>
    </div>
  )
}

export default Map
