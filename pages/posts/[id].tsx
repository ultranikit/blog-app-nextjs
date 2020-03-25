import React, { useEffect, Fragment } from 'react';
import { Layout, ErrorMessage, SuccessMessage } from '../../components/';
import { getSinglePost, onFail, deletePost, onSuccess } from '../../libs';
import { connect } from 'react-redux';
import { useRouter } from 'next/router';
import styled from 'styled-components';

const mapStateToProps = (state) => ({
    singlePost: state.postData.singlePost,
    onFailStatus: state.postData.onFailStatus,
    onSuccessStatus: state.postData.onSuccessStatus,
    responseMessage: state.postData.responseMessage,
});

const actionCreators = {
    getSinglePost,
    onFail,
    deletePost,
    onSuccess,
};

interface DescrText {
    className?: string;
    children: string;
}

const SinglePost = connect(
    mapStateToProps,
    actionCreators,
)((props) => {
    const {
        id,
        deletePost,
        singlePost,
        getSinglePost,
        onFailStatus,
        onSuccessStatus,
        onFail,
        onSuccess,
        responseMessage,
    } = props;

    const router = useRouter();

    useEffect(() => {
        getSinglePost(id);
    }, []);

    const ErrorBtn = () => {
        onFail();
        return router.push('/');
    };

    const SuccessBtn = () => {
        onSuccess();
        return router.push('/');
    };

    return (
        <Layout>
            {onFailStatus ? (
                <ErrorMessage message={responseMessage} callback={ErrorBtn} />
            ) : (
                <Fragment>
                    <BtnWrapper>
                        <GoBack onClick={() => router.back()}>go back</GoBack>
                        <DeleteCard onClick={() => deletePost(id)}>Delete post</DeleteCard>
                    </BtnWrapper>
                    <PostWrap>
                        <h1>{singlePost.title}</h1>
                        <Description>{singlePost.body}</Description>
                    </PostWrap>
                </Fragment>
            )}
            {onSuccessStatus ? <SuccessMessage message={responseMessage} callback={SuccessBtn} /> : null}
        </Layout>
    );
});

SinglePost.getInitialProps = (props) => {
    const { query } = props.ctx;
    return { id: query.id };
};

const PostWrap = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
`;

const description = (descr: DescrText) => <p className={descr.className}>{descr.children}</p>;

const Description = styled(description)`
    margin-top: 30px;
    text-align: justify;
    font-size: 22px;
`;

const DeleteCard = styled.button`
    cursor: pointer;
    border: none;
    border-radius: 10px;
    padding: 10px 40px;
    text-transform: uppercase;
    color: #fff;
    background-color: #f08080;
`;

const GoBack = styled.button`
    cursor: pointer;
    border: none;
    border-radius: 10px;
    padding: 10px 40px;
    text-transform: uppercase;
    color: #fff;
    background-color: #333;
`;

const BtnWrapper = styled.div`
    display: flex;
    justify-content: space-between;
    margin-bottom: 20px;
`;

export default SinglePost;
