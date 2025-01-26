import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import './searchbar.css';

const SearchBar = ({ searchValue, onSearchChange }) => {
    return (
        <div className="search-bar">
            <FontAwesomeIcon icon={faSearch}  className="icon-standart"/>
            <input
                type="text"
                placeholder="Pesquise pelo nome"
                value={searchValue}
                onChange={(e) => onSearchChange(e.target.value)}
            />
        </div>
    );
}

export default SearchBar;
