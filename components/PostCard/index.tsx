import React from 'react';
import Link from "next/link";

import styled from "styled-components";

export const PostCard = (props) => {
    const {id, title, body} = props.card;

    const CardWrapper = styled.a`
    display: flex;
    position: relative;
    flex-direction: column;
    flex-basis: 30%;
    flex-grow: 1;
    padding: 10px;
    border: none;
    background-color: #eaeaea;
    margin: 15px;
    cursor: pointer;
    box-shadow: 0 10px 20px rgba(0,0,0,.19), 0 6px 6px rgba(0,0,0,.23);
    transition: 1s;

        &:hover {
           background-color: #4E4DDB;
           color: #fff;
        }
    
        &:nth-child(4n) {
            flex-basis: 100%;
        }
        &:nth-child(6n) {
            flex-basis: 60%;
        }
        @media (max-width: 668px) {
    flex-basis: 50%;
  }
    `;

    const ImageWrap = styled.div`
    display: flex;
    width: 100%;
    height: 300px;
    align-items: center;
    justify-content: center;
    font-size: 24px;
    color: #fff;
    background: linear-gradient(90deg,#f7bb97,#dd5e89);
    `;


    const Title = styled.h1`
    font-size: 22px;
    font-weight:bold;
    `;

    const Description = styled.p`
    font-size: 18px
    `;




    return (
        <Link href={`/posts/${id}`}>
            <CardWrapper>
                <ImageWrap>
                    {id}
                </ImageWrap>

                <Title>
                    {title}
                </Title>

                <Description>
                    {body && body.slice(0, 24)}
                </Description>
            </CardWrapper>
        </Link>
    );

};