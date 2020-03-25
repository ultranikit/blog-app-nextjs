import React, { useState } from 'react';
import { Layout, InputField, ErrorMessage, SuccessMessage } from '../../components';
import { connect } from 'react-redux';
import { addNewPost, onFail, onSuccess, onResponseMessage } from '../../libs';
import styled from 'styled-components';
import { useRouter } from 'next/router';

const mapStateToProps = (state) => ({
    onSuccessStatus: state.postData.onSuccessStatus,
    onFailStatus: state.postData.onFailStatus,
    responseMessage: state.postData.responseMessage,
});

const actionCreators = {
    addNewPost,
    onFail,
    onSuccess,
    onResponseMessage,
};

interface NewPost {
    title: string;
    body: string;
}

const Post = connect(
    mapStateToProps,
    actionCreators,
)((props) => {
    const { onResponseMessage, addNewPost, onFail, onSuccess, onSuccessStatus, onFailStatus, responseMessage } = props;

    const router = useRouter();
    const [newPost, setNewPost] = useState<NewPost>({ title: '', body: '' });

    const onChange = (event) => {
        const value = event.target.value;
        const key = event.target.name;
        setNewPost({
            ...newPost,
            [key]: value,
        });
    };

    const checkFields = (newPost) => {
        const arrayValues: Array<any> = Object.values(newPost);
        const isEmpty = arrayValues.includes('');
        return !isEmpty;
    };

    const onSubmit = (event, newPost) => {
        event.preventDefault();
        const checked = checkFields(newPost);
        if (checked) {
            return addNewPost(newPost);
        }
        onResponseMessage('Some fields is empty, try again');
        return onFail();
    };

    const successCreated = () => {
        onSuccess();
        return router.push('/');
    };

    const displayInputs = () => {
        const arrayKeys: Array<string> = Object.keys(newPost);
        const arrayValues: Array<any> = Object.values(newPost);

        const fields: Array<object> = arrayKeys.map((item: string, index: number) => {
            const obj = {};
            obj[item] = arrayValues[index];
            return obj;
        });

        return fields.map((item, index: number) => (
            <label className={'label'} key={index} htmlFor={arrayKeys[index]}>
                {arrayKeys[index]}:
                <InputField
                    style={arrayKeys[index] === 'body' ? 'description-input' : 'default-input'}
                    field={item}
                    onChange={onChange}
                />
            </label>
        ));
    };

    return (
        <Layout>
            {displayInputs()}
            <BtnWrap>
                <StyledBtn type="submit" onClick={(event) => onSubmit(event, newPost)}>
                    add new post
                </StyledBtn>
            </BtnWrap>

            {onFailStatus ? <ErrorMessage message={responseMessage} callback={onFail} /> : null}
            {onSuccessStatus ? <SuccessMessage message={responseMessage} callback={successCreated} /> : null}

            <style jsx global>{`
                .default-input {
                    padding: 20px;
                    width: 90%;
                    height: 50px;
                    font-size: 18px;
                }

                .label {
                    display: flex;
                    margin: 20px auto;
                    align-items: center;
                    justify-content: space-between;
                    text-align: center;
                    font-size: 22px;
                    text-transform: uppercase;
                }
                .description-input {
                    padding: 20px;
                    width: 90% !important;
                    height: 400px;
                    font-size: 18px;
                    max-height: 400px;
                }
            `}</style>
        </Layout>
    );
});

const BtnWrap = styled.div`
    text-align: center;
`;

const StyledBtn = styled.button`
    cursor: pointer;
    padding: 15px 40px;
    border: none;
    color: #fff;
    text-transform: uppercase;
    background-color: #333;
`;

export default Post;
