import {createGlobalStyle} from "styled-components";


export const GlobalStyle = createGlobalStyle`

    :root {
        --orange: #FBB667;
        --grey-text:#B6B6B6 ;
        --default-text: #3D3D3D;
        --navy-blue: #0F214F;
    }

    * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
        
    }

    body {
        -webkit-font-smoothing : antialiased;

    }

    body, input , textarea , button {
        font-family: 'Open Sans', sans-serif;
        font-weight: 400;
    }

    

    html {
        @media(max-width: 1080px) {
            font-size: 93.75% // 15px
        }

        @media(max-width: 720px) {
            font-size: 87.5%; //14px
        }
    }

    button {
        cursor: pointer;
    }

    




`