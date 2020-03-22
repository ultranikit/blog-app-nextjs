import React, {useState} from 'react';
import {Layout, InputField, ErrorMessage, SuccessMessage} from "../../components";
import {connect} from 'react-redux';
import {addNewPost, onFail, onSuccess, responseMessage} from "../../libs";
import styled from "styled-components";
import {useRouter} from "next/router";


const mapStateToProps = (state) => ({
    onSuccessStatus: state.post_data.onSuccessStatus,
    onFailStatus: state.post_data.onFailStatus,
    response_message: state.post_data.response_message
});

const actionCreators = {
    addNewPost,
    onFail,
    onSuccess,
    responseMessage,
};

const Post = connect(mapStateToProps, actionCreators)(props => {
   const {responseMessage, addNewPost, onFail, onSuccess, onSuccessStatus, onFailStatus, response_message} = props;

    interface NewPost {
        title: string,
        body: string,
    }

    const router = useRouter();
    const [newPost, setNewPost] = useState<NewPost>({title: '', body: ''});

    const onChange = (event) => {
        const value = event.target.value;
        const key = event.target.name;
        setNewPost({
            ...newPost,
            [key]: value
        })

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
        responseMessage('Some fields is empty, try again');
        return onFail();
    };

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

    const displayInputs = () => {
        const arrayKeys: Array<string> = Object.keys(newPost);
        const arrayValues: Array<any> = Object.values(newPost);

        const fields: Array<object> = arrayKeys.map((item: string, index: number) => {
            const obj = {};
            obj[item] = arrayValues[index];
            return obj;
        });

        return (
            fields.map((item, index: number) =>
                <label className={'label'} key={index} htmlFor={arrayKeys[index]}> {arrayKeys[index]}:
                   <InputField style={(arrayKeys[index] === 'body') ? 'description-input' : 'default-input'}
                               field={item} onChange={onChange}/>
                </label>
            )
        )
    };

  const successCreated = () => {
      onSuccess();
      return router.push('/');
  };

    return (
        <Layout>
            {displayInputs()}
            <BtnWrap>
                <StyledBtn type="submit" onClick={(event) => onSubmit(event, newPost)}>add new post</StyledBtn>
            </BtnWrap>

            {onFailStatus ? <ErrorMessage message={response_message} callback={onFail}/> : null}
            {onSuccessStatus ? <SuccessMessage message={response_message} callback={successCreated}/> : null}

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
                    height:400px;
                    font-size: 18px;
                    max-height: 400px;
                }
            `}</style>
        </Layout>
    )
});

export default Post;