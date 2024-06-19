import { styled } from "styled-components";
import Procedures from "../procedures/Procedures";

const Container = styled.div`
  text-align: center;
  padding: 48px 16px;
  max-width: 1200px;
  margin: 0 auto;
`;

const HeroSection = styled.section`
  text-align: center;
  margin-bottom: 40px;
`;

const Title = styled.h1`
  font-size: 2.5rem;
  font-weight: 700;
  margin-bottom: 20px;
`;

const Subtitle = styled.h2`
  padding: 25px 50px;
  font-size: 1.5rem;
  font-weight: 600;
  color: #666666;
`;

const Intro = styled.p`
  font-size: 1.25rem;
  line-height: 1.6;
  color: #333333;
  max-width: 800px;
  margin: 0 auto;
`;

const ImageContainer = styled.div`
  margin-top: 40px;
`;

const Image = styled.img`
  max-width: 100%;
  height: auto;
  border-radius: 8px;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
`;

const Home = () => {
  return (
    <Container>
      <HeroSection>
        <Title>Welcome to Pretty Bookings!</Title>
        <Subtitle>Your Gateway to Effortless Beauty Treatments</Subtitle>
        <Intro>
          Experience the ultimate in relaxation and convenience with Pretty
          Bookings. Booking your favorite beauty treatments is now easier than
          ever. Simply browse our selection of services, choose your preferred
          time slot, and effortlessly secure your appointment—all from the
          comfort of your home or on the go. Discover a stress-free way to
          indulge in the treatments you love with Pretty Bookings.
        </Intro>
      </HeroSection>
      <ImageContainer>
        <Image
          src="https://img.freepik.com/free-photo/beauty-spa_144627-46213.jpg?t=st=1718790270~exp=1718793870~hmac=226542f1807c7067a81c8183f2f3ad1f2e147afff3c4f06ef4827128fca13484&w=1800"
          alt="Book a treatment"
        />
      </ImageContainer>
    </Container>
  );
};

export default Home;
