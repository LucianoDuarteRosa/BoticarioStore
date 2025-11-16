import './sidebar.css';

const Sidebar = ({ categories, selectedCategories, onCategoryChange }) => (
    <div className="sidebar">
        <h1 className="title-category">Categorias</h1>
        <h1 className="title-super-category">Ofertas</h1>
        <div>
            <label className="category-item">
                <input
                    type="checkbox"
                    checked={selectedCategories.includes("Promotion")}
                    onChange={() => onCategoryChange("Promotion")}
                />
                Promoção
            </label>
            <label className="category-item">
                <input
                    type="checkbox"
                    checked={selectedCategories.includes("Launch")}
                    onChange={() => onCategoryChange("Launch")}
                />
                Lançamento
            </label>
        </div>
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
        </div>
    </div>
);

export default Sidebar;
