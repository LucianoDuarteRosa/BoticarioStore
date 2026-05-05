import './sidebar.css';

const Sidebar = ({ categories, selectedCategories, promotionFilterKey, onCategoryChange }) => (
    <div className="sidebar">
        <h1 className="title-category">Categorias</h1>
        <h1 className="title-super-category">Ofertas</h1>
        <div>
            <label className="category-item">
                <input
                    type="checkbox"
                    checked={selectedCategories.includes(promotionFilterKey)}
                    onChange={() => onCategoryChange(promotionFilterKey)}
                />
                Promoção
            </label>

        </div>
        <div className="category-list">
            {Object.entries(categories).map(([superCategory, categoriesList]) => (
                <div key={superCategory}>
                    <h2 className="title-super-category">{superCategory}</h2>
                    {categoriesList.map((category) => (
                        <label key={category.IdCategory} className="category-item">
                            <input
                                type="checkbox"
                                checked={selectedCategories.includes(category.IdCategory)}
                                onChange={() => onCategoryChange(category.IdCategory)}
                            />
                            {category.CategoryName}
                        </label>
                    ))}
                </div>
            ))}
        </div>
    </div>
);

export default Sidebar;
