import { Skeleton, Box } from "@mui/material";
import "./productCard.css";

const skeletonBg = "rgba(255,255,255,0.07)";

const ProductCardSkeleton = () => (
    <div className="product-card">
        <div className="product-card-content">
            {/* Imagem */}
            <Skeleton
                variant="rectangular"
                width="100%"
                height={190}
                sx={{ borderRadius: "12px 12px 0 0", bgcolor: skeletonBg }}
            />

            {/* Nome e preço */}
            <Box sx={{ px: 1, pt: 1, pb: 0.5 }}>
                <Skeleton variant="text" width="85%" sx={{ bgcolor: skeletonBg, fontSize: "1rem" }} />
                <Skeleton variant="text" width="45%" sx={{ bgcolor: skeletonBg, fontSize: "1rem", mt: 0.5 }} />
            </Box>

            {/* Botão de compra */}
            <Box sx={{ px: 1, pb: 1, mt: 0.5 }}>
                <Skeleton
                    variant="rectangular"
                    width="55%"
                    height={24}
                    sx={{ borderRadius: "6px", bgcolor: skeletonBg }}
                />
            </Box>
        </div>
    </div>
);

export default ProductCardSkeleton;
