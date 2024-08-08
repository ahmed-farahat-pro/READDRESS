// components/Footer.tsx
import Link from 'next/link';
import styled from 'styled-components';

const FooterContainer = styled.footer`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 1rem 2rem;
  background-color: #fff;
  color: #fff;
`;

const FooterNav = styled.nav`
  display: flex;
  gap: 1rem;
  margin-bottom: 1rem;
`;

const FooterLink = styled.a`
  color: #000;
  text-decoration: none;
  &:hover {
    text-decoration: underline;
  }
`;

const Copyright = styled.div`
  font-size: 0.875rem;
`;

const Footer: React.FC = () => {
  return (
    <FooterContainer>
      <FooterNav>
        <Link href="/" passHref>
          <FooterLink>Home</FooterLink>
        </Link>
        <Link href="/about" passHref>
          <FooterLink>About</FooterLink>
        </Link>
        <Link href="/contact" passHref>
          <FooterLink>Contact</FooterLink>
        </Link>
        <Link href="/privacy" passHref>
          <FooterLink>Privacy Policy</FooterLink>
        </Link>
      </FooterNav>
      <Copyright>
        &copy; {new Date().getFullYear()} My Website. All rights reserved.
      </Copyright>
    </FooterContainer>
  );
};

export default Footer;
