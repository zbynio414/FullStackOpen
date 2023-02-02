
const Filter = ({newSearch, handleNewSearch}) => {
  console.log(newSearch);
  console.log(handleNewSearch);
  return (
    <div>
      filter shown with:  
       <input value={newSearch} onChange={handleNewSearch} />
    </div>
  )
}
export default Filter