import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faWhatsapp } from "@fortawesome/free-brands-svg-icons";
import { DialogContentText, DialogContent, DialogActions, Button, Dialog, CardMedia, IconButton, Box } from "@mui/material";
import dataJson from "../../data.json";
import "./productCard.css";

// Componente separado para exibir imagens
const ImageDialog = ({ open, handleClose, imageUrl }) => (
    <Dialog open={open} onClose={handleClose} maxWidth="md" fullWidth >
        <DialogContent className="dialog-full">
            <DialogContentText>
                <CardMedia
                    className="img-product-dialog"
                    component="img"
                    image={imageUrl}
                    alt="Imagem de Divulgação"
                    sx={{ width: "100%", maxHeight: "80vh", objectFit: "contain" }}
                />
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
        .filter(([key, value]) => ["P", "M", "G", "GG"].includes(key) && value)
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

                <ImageDialog open={openDialog} handleClose={handleCloseDialog} imageUrl={product.ImagePath} />
            </div>
        </div>
    );
};

export default ProductCard;
