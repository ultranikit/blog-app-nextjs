import React from 'react';
// @ts-ignore
import {Navbar, Footer} from "../";
import Head from "next/head";

export const Layout = (props) => {
    return (
        <div className="main">
            <Head>
                <title>Blog app</title>
            </Head>

            <Navbar/>

            <div className="content">
                {props.children}
            </div>

            <Footer/>

            <style jsx global>{`
      html,
      body {
        padding: 0;
        margin: 0;
        font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen,
          Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue, sans-serif;
      }
      a {
        text-decoration: none;
      }
      * {
        margin:0;
        padding: 0;
        box-sizing: border-box;
      }
      .content {
      padding: 30px;
      min-height: 90vh;
      }
    `}</style>
        </div>
    )
};