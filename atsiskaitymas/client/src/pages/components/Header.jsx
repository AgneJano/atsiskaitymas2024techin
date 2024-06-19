import { styled } from "styled-components";
import { Link, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../../utils/AuthContext";

const HeaderWrapper = styled.header`
  background-color: #e9f6f7;
  padding: 20px 16px;
`;

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const LogoContainer = styled.div`
  display: flex;
`;

const Logo = styled.img`
width: 3rem;
height: auto;
`;

const Navigation = styled.nav`
font-size: 3 rem;
`;

const LinkItem = styled.li`
color: #2a4b42;
text-decoration: none;
padding: 10px 20px;
font-size: 1.5rem;
cursor: pointer;
transition: color 0.3s ease;
font-weight: 600;

&:hover {
  color: #ffffff;  
}
`;

const StyledLink = styled(Link)`
color: #2a4b42;
text-decoration: none;
padding: 10px 20px;
font-size: 1.5rem;
cursor: pointer;
transition: color 0.3s ease;
font-weight: 600;

&:hover {
  color: #ffffff;  
}
`;

const Links = styled.ul`
  display: flex;
  gap: 10px;
`;

const Title = styled.h2`
justify-content: flex-start;
`

const Header = () => {
  const { logoutUser, isAuthenticated, isAdmin } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logoutUser();
    navigate("/");
  };

  return (
    <HeaderWrapper>
      <Container>
        <LogoContainer>
          <Link to="/">
            <Logo src={'https://cdn-icons-png.freepik.com/512/1811/1811167.png'} alt="Logo" />
          </Link>
        </LogoContainer>
        <Title>Pretty Bookings
        </Title>
        <Navigation>
          <Links>
            <LinkItem>
              <StyledLink to="/">Home</StyledLink>
            </LinkItem>
            <LinkItem>
              <StyledLink to="/procedures">Procedures</StyledLink>
            </LinkItem>
            {isAdmin && (
              <LinkItem>
                <StyledLink to="/create-procedure">Create procedure</StyledLink>
              </LinkItem>
            )}
            {isAuthenticated ? (
              <LinkItem onClick={handleLogout}>Sign out</LinkItem>
            ) : (
              <>
                <LinkItem>
                  <StyledLink to="/sign-in">Sign in</StyledLink>
                </LinkItem>
                <LinkItem>
                  <StyledLink to="/register">Register</StyledLink>
                </LinkItem>
              </>
            )}
          </Links>
        </Navigation>
      </Container>
    </HeaderWrapper>
  );
};

export default Header;
