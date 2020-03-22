import React from 'react';
import {Provider} from 'react-redux';
import App from 'next/app';
import withReduxSaga from 'next-redux-saga';
import withRedux from 'next-redux-wrapper';
import configureStore from '../libs/';

class MyApp extends App {
    static async getInitialProps({Component, ctx}) {
        let pageProps = {};

        if (Component.getInitialProps) {
            pageProps = await Component.getInitialProps({ctx})
        }

        return {pageProps}
    }

    render() {
        const {Component, pageProps, store} = this.props
        return (
            <Provider store={store}>
                <Component {...pageProps} />
            </Provider>
        )
    }
}

export default withRedux(configureStore)(withReduxSaga(MyApp));