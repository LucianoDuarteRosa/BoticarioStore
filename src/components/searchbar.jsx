import React from "react";
import { TextField } from "@mui/material";

const SearchBar = ({ searchValue, onSearchChange }) => (
    <TextField
        fullWidth
        placeholder="Search by name"
        value={searchValue}
        onChange={(e) => onSearchChange(e.target.value)}
        variant="outlined"
        margin="normal"
    />
);

export default SearchBar;
