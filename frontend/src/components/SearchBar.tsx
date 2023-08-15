import React, { useState } from "react";

interface SearchBarProps {
  onSearch: (query: string) => void;
}

function SearchBar({ onSearch }: SearchBarProps) {
  const [query, setQuery] = useState("");

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newQuery = event.target.value;
    setQuery(newQuery);
  };

  return (
    <div className="input-group mb-3">
      <input
        type="text"
        className="form-control"
        placeholder="Search movies..."
        value={query}
        onChange={handleInputChange}
      />
      <button
        className="btn btn-primary"
        type="button"
        onClick={() => onSearch(query)}
      >
        Search
      </button>
    </div>
  );
}

export default SearchBar;
