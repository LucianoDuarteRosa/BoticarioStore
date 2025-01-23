import React from "react";
import { Card, CardContent, Typography } from "@mui/material";
//sobe kraii
const ProductCard = ({ product }) => (
    <Card style={{ margin: "10px" }}>
        <CardContent>
            <Typography variant="h6">{product.ProductName}</Typography>
            <Typography variant="body2">Categoria: {product.Category.CategoryName}</Typography>
            <Typography variant="body2">Valor: R${Number.parseFloat(product.PriceSale).toFixed("2")}</Typography>
        </CardContent>
    </Card>
);

export default ProductCard;
