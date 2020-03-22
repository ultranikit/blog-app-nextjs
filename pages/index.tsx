import React, {useEffect} from 'react';
import {Layout, PostCard} from '../components';

import styled from "styled-components";

import {connect} from 'react-redux';
import {getPostsData} from "../libs";

const mapStateToProps = (state) => ({
    posts: state.post_data.posts
});

const actionCreators = {
    getPostsData,

};


const Home = connect(mapStateToProps, actionCreators)(props => {
    const {getPostsData, posts} = props;
    useEffect(() => {
        getPostsData();
    }, []);
    const postList = () => posts && posts.map(item => item.title ? <PostCard key={item.id} card={item} /> : null);

    const PostsWrapper = styled.div`
    display: flex;
    flex-wrap: wrap;
    `;

    return (
        <Layout>
            <PostsWrapper>
                {postList()}
            </PostsWrapper>
        </Layout>

    )
});

export default Home
