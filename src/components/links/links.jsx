import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFacebook, faInstagram, faWhatsapp } from "@fortawesome/free-brands-svg-icons";
import './links.css';

const Links = () => {
    return (
        <div className="social-links">
            <div>
                <h3 className="title-links">Conecte-se</h3>
                <p className="information">Siga-nos nas redes sociais para ficar por dentro de todas as novidades, promoções exclusivas e para entrar em contato diretamente conosco!</p>
            </div>

            <div className="social-icons">
                <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer">
                    <FontAwesomeIcon icon={faFacebook} size="2x" className="social-icon" />
                </a>
                <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer">
                    <FontAwesomeIcon icon={faInstagram} size="2x" className="social-icon" />
                </a>
                <a href="https://wa.me/5532988996771" target="_blank" rel="noopener noreferrer">
                    <FontAwesomeIcon icon={faWhatsapp} size="2x" className="social-icon" />
                </a>
            </div>
        </div>
    );
};

export default Links;
