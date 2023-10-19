export default function Search({ query, setQuery }) {
  /*
      1. Not a convention with React - like its not in Declarative way of React
      2. Not in line with rest of code
      3. Not want to add event listeners manaually like this
      4. Having to add classes or ids just for the purpose of selecting - Not ideal
      4. If the code re-runs then we are selecting the element over and over again - Not Ideal
   */
  /* useEffect(function () {
    const el = document.querySelector('.search')
    el.focus()
  }, []) */

  return (
    <input
      className='search'
      type='text'
      placeholder='Search movies...'
      value={query}
      onChange={(e) => setQuery(e.target.value)}
    />
  )
}
