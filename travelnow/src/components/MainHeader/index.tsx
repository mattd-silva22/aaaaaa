import { Container, Content } from "./styles";
import logoImg from  "../../assets/Travelnow.svg"
export function MainHeader(){

    return( 
        <>

        <Container>
            <Content>
                <img src={logoImg } alt="" />
                
                <nav>
                    <ul>
                        <li>Discover</li>
                        <li>Destination</li>
                        <li>About us</li>
                    </ul>
                </nav>

                <button>Book a tour</button>
            </Content>
            
        </Container>
        </>
    )


}