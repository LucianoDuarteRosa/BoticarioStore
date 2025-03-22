import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faWhatsapp } from "@fortawesome/free-brands-svg-icons";
import dataJson from "../../data.json";
import './productCard.css';

const ProductCard = ({ product }) => {
    // Ajuste: Definir a URL do WhatsApp
    const whatsappMessage = `Olá! Gostaria de saber mais sobre o produto: ${product.ProductName} - Valor: R$${Number.parseFloat(product.PriceSale).toFixed(2).replace('.', ',')}.`;
    const whatsappUrl = `https://wa.me/${dataJson.config.WhatsApp}?text=${encodeURIComponent(whatsappMessage)}`;

    const handleClothing = () => {
        const sizes = [];

        if (product.P) sizes.push(<span key="P">P</span>);
        if (product.M) sizes.push(<span key="M">M</span>);
        if (product.G) sizes.push(<span key="G">G</span>);
        if (product.GG) sizes.push(<span key="GG">GG</span>);

        return sizes;
    };

    return (
        <div className="product-card">
            <div className="product-card-content">
                {product.Promotion && <div className="promotion-banner">Promoção</div>}
                {product.Category.SuperCategory.IdSuperCategory === 2 && <div className="clothing-banner">{handleClothing()}</div>}
                <img className="img-product" src={`/${product.ImagePath}`} alt="imagem do produto" />
                <div className="product-info">
                    <h3 className="product-name">{product.ProductName}</h3>
                    <p className="product-price">R$ {Number.parseFloat(product.PriceSale).toFixed(2).replace('.', ',')}</p>
                </div>
                <div className="sale-info">
                    <h3 className="product-sale">Gostou? Compre agora</h3>
                    <a href={whatsappUrl} target="_blank" rel="noopener noreferrer">
                        <FontAwesomeIcon icon={faWhatsapp} className="whatsapp-icon" />
                    </a>
                </div>
            </div>
        </div>
    );
}

export default ProductCard;
