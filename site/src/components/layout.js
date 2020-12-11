import React from "react";
import {Helmet} from "react-helmet";
import { useStaticQuery, graphql } from "gatsby";


const Layout = ({children, meta}) => {

    const data = useStaticQuery(graphql`
        query LayoutQuery {
            site {
                siteMetadata {
                    description
                    image
                    titleTemplate
                    title
                }
            }
        }
    `)
    let _meta = { ...data.site.siteMetadata, ...meta };
    _meta.title = _meta.titleTemplate.replace("%s", _meta.title);
    _meta.large_image = _meta.large_image || _meta.image;
    
    console.log("data", data);

    return <>
        <Helmet>
            <meta charSet="utf-8" />
            <title>{_meta.title}</title>
            <link rel="canonical" href={_meta.url} />
            
            <meta property="og:title" content={_meta.title} />
            <meta property="og:description" content={_meta.description} />
            <meta property="og:image" content={_meta.image} />
            <meta property="og:url" content={_meta.url} />
            <meta name="twitter:card" content={_meta.large_image} />

            <meta name="twitter:title" content={_meta.title} />
            <meta name="twitter:description" content={_meta.description} />
            <meta name="twitter:image" content={_meta.image} />
            <meta name="twitter:card" content={_meta.large_image} />



            <meta property="og:site_name" content={_meta.title} />
            <meta name="twitter:image:alt" content="Alt text for image" />

            {/*  Non-Essential, But Required for Analytics -->*/}

            <meta name="twitter:site" content="@4geeksacademy" />
        </Helmet>
        {children}
    </>
}

export default Layout;