import React from 'react';
import styled from 'styled-components';

export const ErrorMessage = ({ message, callback }) => {
    return (
        <Wrap>
            <ErrorWrap>
                <MessageWrap>{message}</MessageWrap>
                <Button onClick={callback}>ok</Button>
            </ErrorWrap>
        </Wrap>
    );
};

const Wrap = styled.div`
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    z-index: 1;
    background-color: rgba(0, 0, 0, 0.5);
`;

const ErrorWrap = styled.div`
    position: fixed;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    width: 300px;
    height: 250px;
    background-color: #eaeaea;
    border-radius: 10px;
    padding: 30px;
    z-index: 2;
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.19), 0 6px 6px rgba(0, 0, 0, 0.23);
`;

const MessageWrap = styled.p`
    text-align: center;
    color: red;
    font-size: 18px;
`;

const Button = styled.a`
    cursor: pointer;
    padding: 10px 40px;
    margin-top: 30px;
    background-color: #333;
    color: #fff;
    text-transform: uppercase;
`;
