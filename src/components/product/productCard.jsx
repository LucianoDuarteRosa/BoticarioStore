import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faWhatsapp } from "@fortawesome/free-brands-svg-icons";
import { DialogContentText, DialogContent, DialogActions, Button, Dialog, CardMedia, IconButton } from "@mui/material";
import dataJson from "../../data.json";
import "./productCard.css";

// Componente separado para exibir imagens
const ImageDialog = ({ open, handleClose, product, clothingSizes }) => (
    <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth >
        <DialogContent className="dialog-full">
            <DialogContentText>
                {product.Promotion && <div className="promotion-banner-dialog">Promoção</div>}
                {product.Category?.SuperCategory?.IdSuperCategory === 2 && clothingSizes.length > 0 && (
                    <div className="product-size">{clothingSizes}</div>
                )}
                <div className="product-card-content">
                    <CardMedia
                        className="img-product-dialog"
                        component="img"
                        image={product.ImagePath}
                        alt="Imagem de Divulgação"
                        sx={{ width: "100%", maxHeight: "60vh", objectFit: "contain" }}
                    ></CardMedia>

                    <div className="product-info">
                        <h3 className="product-name">{product.ProductName}</h3>
                        <p className="product-price-dialog">R$ {Number.parseFloat(product.PriceSale).toFixed(2).replace(".", ",")}</p>
                    </div>
                </div>
            </DialogContentText>
        </DialogContent>
        <DialogActions className="dialog-full">
            <Button onClick={handleClose} className="btn-dialog" variant="contained">
                Fechar
            </Button>
        </DialogActions>
    </Dialog>
);

const ProductCard = ({ product }) => {
    const [openDialog, setOpenDialog] = useState(false);
    const handleOpenDialog = () => setOpenDialog(true);
    const handleCloseDialog = () => setOpenDialog(false);

    // Definir a URL do WhatsApp
    const whatsappMessage = `Olá! Gostaria de saber mais sobre o produto: ${product.ProductName} - Valor: R$${Number.parseFloat(product.PriceSale).toFixed(2).replace('.', ',')}.`;
    const whatsappUrl = `https://wa.me/${dataJson.config.WhatsApp}?text=${encodeURIComponent(whatsappMessage)}`;

    // Exibir tamanhos disponíveis (se aplicável)
    const clothingSizes = Object.entries(product)
        .filter(([key, value]) => ["P", "M", "G", "GG", "XG"].includes(key) && value)
        .map(([key]) => <span key={key}>{key}</span>);

    return (
        <div className="product-card">
            <div className="product-card-content">
                {product.Promotion && <div className="promotion-banner">Promoção</div>}
                {product.Category?.SuperCategory?.IdSuperCategory === 2 && clothingSizes.length > 0 && (
                    <div className="clothing-banner">{clothingSizes}</div>
                )}

                <IconButton className="img-product-icon" onClick={handleOpenDialog}>
                    <CardMedia className="img-product" component="img" image={product.ImagePath} alt="imagem do produto" />
                </IconButton>

                <div className="product-info">
                    <h3 className="product-name">{product.ProductName}</h3>
                    <p className="product-price">R$ {Number.parseFloat(product.PriceSale).toFixed(2).replace(".", ",")}</p>
                </div>

                <div className="sale-info">
                    <h3 className="product-sale">Gostou? Compre agora</h3>
                    <a href={whatsappUrl} target="_blank" rel="noopener noreferrer">
                        <FontAwesomeIcon icon={faWhatsapp} className="whatsapp-icon" />
                    </a>
                </div>

                <ImageDialog open={openDialog} handleClose={handleCloseDialog} product={product} clothingSizes={clothingSizes} />
            </div>
        </div>
    );
};

export default ProductCard;
