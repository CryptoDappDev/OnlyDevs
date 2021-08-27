import Document, { DocumentContext, Html, Head, Main, NextScript } from 'next/document'

class MyDocument extends Document {

    render () {
        return (
            <Html>
            <Head>
                <link
                href="https://fonts.googleapis.com/css2?family=Poppins"
                rel="stylesheet"
                />
            </Head>
            <body>
                <Main />
                <NextScript />
            </body>
            </Html>
        )
    }
}

export default MyDocument