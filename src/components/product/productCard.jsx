import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faWhatsapp } from "@fortawesome/free-brands-svg-icons";
import paramsData from "../../params.json";
import './productCard.css';

const ProductCard = ({ product }) => {
    // Ajuste: Definir a URL do WhatsApp
    const whatsappMessage = `Olá! Gostaria de saber mais sobre o produto: ${product.ProductName} - Valor: R$${Number.parseFloat(product.PriceSale).toFixed(2).replace('.', ',')}.`;
    const whatsappUrl = `https://wa.me/${paramsData[0].WhatsApp}?text=${encodeURIComponent(whatsappMessage)}`;

    return (
        <div className="product-card">
            <div className="product-card-content">
                {product.Promotion && <div className="promotion-banner">Promoção</div>}
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
