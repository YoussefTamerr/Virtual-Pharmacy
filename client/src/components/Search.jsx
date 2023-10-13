const Search = ({ searchTerm, setSearchTerm }) => {
  const onSearchTermChange = (e) => {
    const searchString = e.target.value.replace(/[^a-z\s]/gi, "");
    setSearchTerm(searchString);
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Search medicines by name"
        value={searchTerm}
        onChange={onSearchTermChange}
      />
    </div>
  );
};

export default Search;
