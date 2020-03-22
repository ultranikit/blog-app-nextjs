import React from 'react';
import styled from "styled-components";

export const Footer = () => {
    const Footer = styled.footer`
    padding: 10px 0;
    text-align: center;
    background-color: #333;
    `;
    const Link = styled.a`
    color: #fff;
    font-size: 24px;
    `;

    return (
        <Footer>
            <Link
                href="https://github.com/ultranikit"
                target="_blank"
                rel="noopener noreferrer"
            >
                Powered by ultranikit
            </Link>
        </Footer>
    )
};