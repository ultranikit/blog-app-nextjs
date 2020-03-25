import React from 'react';
import Link from 'next/link';
import styled from 'styled-components';

interface LinkProps {
    className?: string;
    children: string;
    href: string;
}

export const Navbar = () => {
    return (
        <Header>
            <StyledList>
                <li>
                    <StyledLink href="/"> blog-img </StyledLink>
                </li>
                <li>
                    <StyledLink href="/"> home </StyledLink>
                </li>
            </StyledList>
            <StyledLink href="/posts/new"> Create new post </StyledLink>
        </Header>
    );
};

const navLink = (link: LinkProps) => (
    <Link href={link.href}>
        <a className={link.className}>{link.children}</a>
    </Link>
);

const StyledList = styled.ul`
    display: flex;
    list-style: none;
`;

const StyledLink = styled(navLink)`
    display: block;
    padding: 10px 15px;
    text-transform: uppercase;
    color: #fff;
    font-weight: bold;
`;

const Header = styled.div`
    display: flex;
    justify-content: space-between;
    background-color: #333;
    padding: 0 30px;
`;
