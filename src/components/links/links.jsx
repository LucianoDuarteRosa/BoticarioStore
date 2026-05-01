import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFacebook, faInstagram, faWhatsapp } from "@fortawesome/free-brands-svg-icons";
import './links.css';

const Links = () => {
    const whatsappMessage = `Olá! Gostaria de saber mais sobre os produtos. Poderia me ajudar?`;
    const whatsappUrl = `https://wa.me/${import.meta.env.VITE_WHATSAPP}?text=${encodeURIComponent(whatsappMessage)}`;
    return (
        <div className="social-links">
            <div>
                <h3 className="title-links">Conecte-se</h3>
                <p className="information">Siga-nos nas redes sociais para ficar por dentro de todas as novidades, promoções exclusivas e para entrar em contato diretamente conosco!</p>
            </div>

            <div className="social-icons">
                {import.meta.env.VITE_FACEBOOK ? (
                    <a href={import.meta.env.VITE_FACEBOOK} target="_blank" rel="noopener noreferrer">
                        <FontAwesomeIcon icon={faFacebook} className="social-icon" />
                    </a>
                ) : null}
                {import.meta.env.VITE_INSTAGRAM ? (
                    <a href={import.meta.env.VITE_INSTAGRAM} target="_blank" rel="noopener noreferrer">
                        <FontAwesomeIcon icon={faInstagram} className="social-icon" />
                    </a>
                ) : null}
                <a href={whatsappUrl} target="_blank" rel="noopener noreferrer">
                    <FontAwesomeIcon icon={faWhatsapp} className="social-icon" />
                </a>
            </div>
        </div>
    );
};

export default Links;
