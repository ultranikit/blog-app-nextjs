import React, {useEffect, Fragment} from 'react';
import {Layout, ErrorMessage, SuccessMessage} from "../../components/";
import {getSinglePost, onFail, deletePost, onSuccess} from '../../libs'
import {connect} from 'react-redux'
import {useRouter} from 'next/router';
import styled from "styled-components";

const mapStateToProps = (state) => ({
    single_post: state.post_data.single_post,
    onFailStatus: state.post_data.onFailStatus,
    onSuccessStatus: state.post_data.onSuccessStatus,
    response_message: state.post_data.response_message,
});

const actionCreators = {
    getSinglePost,
    onFail,
    deletePost,
    onSuccess,
};


const SinglePost = connect(mapStateToProps, actionCreators)(props => {
    const {id, deletePost, single_post, getSinglePost, onFailStatus, onSuccessStatus, onFail, onSuccess, response_message} = props;
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

    const PostWrap = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
`;

    interface descrText {
        className?: string,
        children: string,
    }

    const description = (descr: descrText) => (
        <p className={descr.className}>
            {descr.children}
        </p>
    );

    const Description = styled(description)`
    margin-top: 30px;
    text-align: justify;
    font-size: 22px;
`;

    const DeleteCard = styled.button`
    cursor: pointer;
    border:none;
    border-radius: 10px;
    padding: 10px 40px;
    text-transform: uppercase;
    color: #fff;
    background-color: #f08080;
    `;

    const GoBack = styled.button`
    cursor: pointer;
    border:none;
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

    return (
        <Layout>
            {onFailStatus ?
                <ErrorMessage message={response_message} callback={ErrorBtn}/>
                : (
                    <Fragment>
                        <BtnWrapper>
                            <GoBack onClick={() => router.back()}>go back</GoBack>
                            <DeleteCard onClick={() => deletePost(id)}>Delete post</DeleteCard>
                        </BtnWrapper>
                        <PostWrap>
                            <h1>{single_post.title}</h1>
                            <Description>{single_post.body}</Description>
                        </PostWrap>
                    </Fragment>
                )
            }
            {onSuccessStatus ? <SuccessMessage message={response_message} callback={SuccessBtn}/> : null}
        </Layout>
    );
});

SinglePost.getInitialProps = (props) => {
    const {query} = props.ctx;
    return {id: query.id};
};

export default SinglePost;