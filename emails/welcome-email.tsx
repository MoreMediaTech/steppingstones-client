import {
  Body,
  Button,
  Container,
  Head,
  Hr,
  Html,
  Img,
  Preview,
  Section,
  Text,
  Link,
} from "@react-email/components";
import * as React from "react";

interface KoalaWelcomeEmailProps {
  userFirstname: string;
}

const baseUrl = process.env.NEXT_PUBLIC_API_URL ||"";
const year = new Date().getFullYear();

export const WelcomeEmail = ({
  userFirstname = "Zeno",
}: KoalaWelcomeEmailProps) => (
  <Html>
    <Head />
    <Preview>
      The business support app that helps you find the right support information
    </Preview>
    <Body style={main}>
      <Container style={container}>
        <Img
          src={`${baseUrl}/static/koala-logo.png`}
          width="170"
          height="50"
          alt="Koala"
          style={logo}
        />
        <Text style={paragraph}>Hi {userFirstname},</Text>
        <Text style={paragraph}>
          Welcome to Stepping Stones,the business support app that helps you
          find the right support information.
        </Text>
        <Section style={btnContainer}>
          <Button
            pX={12}
            pY={12}
            style={button}
            href="https://steppingstonesapp.com"
          >
            Get started
          </Button>
        </Section>
        <Text style={paragraph}>
          Best,
          <br />
          The Stepping Stones team
        </Text>
        <Hr style={hr} />
        <Text style={footer}>
          Stepping Stones App<sup>&copy;</sup> is the copyright and product of <Link
            href="https://www.buildwithequilibrium.com"
            style={{ color: "#8898aa" }}
            target="_blank"
            >Equilibrium Startup Lab LLC</Link> {year}
        </Text>
      </Container>
    </Body>
  </Html>
);

export default WelcomeEmail;

const main = {
  backgroundColor: "#ffffff",
  fontFamily:
    '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Oxygen-Sans,Ubuntu,Cantarell,"Helvetica Neue",sans-serif',
};

const container = {
  margin: "0 auto",
  padding: "20px 0 48px",
};

const logo = {
  margin: "0 auto",
};

const paragraph = {
  fontSize: "16px",
  lineHeight: "26px",
};

const btnContainer = {
  textAlign: "center" as const,
};

const button = {
  backgroundColor: "#5F51E8",
  borderRadius: "3px",
  color: "#fff",
  fontSize: "16px",
  textDecoration: "none",
  textAlign: "center" as const,
  display: "block",
};

const hr = {
  borderColor: "#cccccc",
  margin: "20px 0",
};

const footer = {
  color: "#8898aa",
  fontSize: "12px",
};
