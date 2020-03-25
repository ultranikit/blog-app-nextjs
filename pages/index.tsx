import React, { useEffect } from 'react';
import { Layout, PostCard } from '../components';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { getPostsData } from '../libs';

const mapStateToProps = (state: { postData: { posts: any } }) => ({
    posts: state.postData.posts,
});

const actionCreators = {
    getPostsData,
};

interface Card {
    id?: number;
    title: string;
    body: string;
}

const Home = connect(
    mapStateToProps,
    actionCreators,
)((props: { getPostsData: any; posts: any }) => {
    const { getPostsData, posts } = props;
    useEffect(() => {
        getPostsData();
    }, []);
    const postList = () => posts && posts.map((item: Card) => <PostCard key={item.id} card={item} />);

    return (
        <Layout>
            <PostsWrapper>{postList()}</PostsWrapper>
        </Layout>
    );
});

const PostsWrapper = styled.div`
    display: flex;
    flex-wrap: wrap;
`;

export default Home;
