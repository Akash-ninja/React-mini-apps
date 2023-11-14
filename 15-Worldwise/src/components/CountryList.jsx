import Spinner from './Spinner'
import Message from './Message'
import CountryItem from './CountryItem'
import styles from './CountryList.module.css'

function CountryList({ cities, isLoading }) {
  if (isLoading) return <Spinner />

  if (!cities.length)
    return <Message message='Add your first city by clicking on the map' />

  // creates an array with object structure - [{country: 'xyz', emoji: 'symbol'}]
  // arr -> accumulator, city -> current value from the cities array
  const countries = cities.reduce((arr, city) => {
    if (!arr.map((el) => el.country).includes(city.country))
      return [...arr, { country: city.country, emoji: city.emoji }]
    else return arr
  }, [])

  return (
    <ul className={styles.countryList}>
      {countries.map((country) => (
        <CountryItem country={country} key={country.country} />
      ))}
    </ul>
  )
}

export default CountryList
