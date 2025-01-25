import React from "react";
import { Checkbox, FormControlLabel, FormGroup, Typography } from "@mui/material";

const Sidebar = ({ categories, selectedCategories, onCategoryChange }) => (
    <div>
        <Typography variant="h6">Categorias</Typography>
        <FormGroup>
            {categories.map((category) => (
                <FormControlLabel
                    key={category}
                    control={
                        <Checkbox
                            checked={selectedCategories.includes(category)}
                            onChange={() => onCategoryChange(category)}
                        />
                    }
                    label={category}
                />
            ))}
        </FormGroup>
    </div>
);

export default Sidebar;
