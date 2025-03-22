import React from "react";
import './sidebar.css';

const Sidebar = ({ categories, selectedCategories, onCategoryChange }) => (
    <div className="sidebar">
        <h1 className="title-category">Categorias</h1>
        <div className="category-list">
            {Object.entries(categories).map(([superCategory, categories]) => (
                <div key={superCategory}>
                    <h2 className="title-super-category">{superCategory}</h2>
                    {categories.map((category) => (
                        <label key={category} className="category-item">
                            <input
                                type="checkbox"
                                checked={selectedCategories.includes(category)}
                                onChange={() => onCategoryChange(category)}
                            />
                            {category}
                        </label>
                    ))}
                </div>
            ))}
            {/*{categories.map((category) => (
                <label key={category} className="category-item">
                    <input
                        type="checkbox"
                        checked={selectedCategories.includes(category)}
                        onChange={() => onCategoryChange(category)}
                    />
                    {category}
                </label>
            ))}*/}
        </div>
    </div>
);

export default Sidebar;
