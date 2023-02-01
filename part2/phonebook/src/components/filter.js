const Filter = ({newSearch, handleNewSearch}) => {
 // console.log(value);
  console.log(onChange);
  return (
    <div>
      filter shown with
       <input value={newSearch} onChange={handleNewSearch} />
    </div>
  )
}
export default Filter