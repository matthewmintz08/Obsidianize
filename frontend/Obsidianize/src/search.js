import React, { useState } from 'react';

const WikipediaSearch = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [searchResults, setSearchResults] = useState([]);

    const handleInputChange = (event) => {
        setSearchTerm(event.target.value);
    };

    const handleSearch = async (event) => {
        event.preventDefault();
        try {
            const response = await fetch('/api/search', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ searchTerm })
            }); 
            if (!response.ok) {
                throw new Error('Failed to fetch data');
            }
            const data = await response.json();
            console.log(data);
            setSearchResults(data.query.search);
        } catch (error) {
            console.error('Error fetching data:', error);
            // Handle error
        }
    };

    return (
        <div>
            <form onSubmit={handleSearch}>
                <input
                    type="text"
                    value={searchTerm}
                    onChange={handleInputChange}
                    placeholder="Enter search term"
                />
                <button type="submit">Search</button>
            </form>
            <ul>
                {searchResults}
            </ul>
        </div>
    );
};

export default WikipediaSearch;