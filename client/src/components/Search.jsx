import { useState } from 'react'

const Search = ({searchTerm, setSearchTerm}) => {

    const onSearchTermChange = (e) => {
        const searchString = e.target.value.replace(/[^a-z\s]/gi, "");
        setSearchTerm(searchString);
      };
    

    return (
        <div className='search-bar'>
            <input
                type='text'
                placeholder='Search by name...'
                value={searchTerm}
                onChange={onSearchTermChange}
            />
        </div>
    )
}

export default Search