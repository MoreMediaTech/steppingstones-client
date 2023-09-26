import {
  Body,
  Container,
  Head,
  Heading,
  Html,
  Button,
  Img,
  Link,
  Preview,
  Text,
  Hr,
  Section,
  Row,
  Column,
} from "@react-email/components";

interface KoalaWelcomeEmailProps {
  userFirstname: string;
}

const baseUrl = process.env.NEXT_PUBLIC_API_URL || "";
const year = new Date().getFullYear();

export const WelcomeEmail = ({ userFirstname = "Zeno" }: KoalaWelcomeEmailProps) => (
  <Html>
    <Head />
    <Preview>
      The business support app to help you take the right step on your business
      journey.
    </Preview>
    <Body style={main}>
      <Container style={container}>
        <Section style={logoContainer}>
          <Img
            src={`https://res.cloudinary.com/dhdcepksp/image/upload/e_sharpen:100/v1695671618/SS_Color_logo_with-background2_b2zdqb.webp`}
            width="200"
            height="40"
            alt="SteppingStones"
          />
        </Section>
        <Text style={paragraph}>Hi {userFirstname},</Text>
        <Text style={paragraph}>
          Welcome to Stepping Stones, the business support app to help you take
          the right step on your business journey.
        </Text>
        <Text style={paragraph}>Click the button below to access the app.</Text>
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
          Best Regards,
          <br />
          <br />
          Customer Care Team
          <br />
          Stepping Stones
        </Text>
        <Hr style={hr} />
        <Section>
          <Row style={footerLogos}>
            <Column style={{ width: "66%" }}>
              <Img
                src={`https://res.cloudinary.com/dhdcepksp/image/upload/e_sharpen:100/v1695671618/SS_Color_logo_with-background2_b2zdqb.webp`}
                width="200"
                height="40"
                alt="SteppingStones"
              />
            </Column>
            <Column>
              <Row>
                <Column>
                  <Link href="https://twitter.com">
                    <Img
                      src={`https://res.cloudinary.com/dhdcepksp/image/upload/e_sharpen:100/v1695671970/logo-black_ajf4q7.webp`}
                      width="24"
                      height="24"
                      alt="Twitter"
                      style={socialMediaIcon}
                    />
                  </Link>
                </Column>
              </Row>
            </Column>
          </Row>
        </Section>

        <Section>
          <Link
            style={footerLink}
            href="https://steppingstonesapp.com/about"
            target="_blank"
            rel="noopener noreferrer"
          >
            About
          </Link>
          &nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
          <Link
            style={footerLink}
            href="https://steppingstonesapp.com/#features"
            target="_blank"
            rel="noopener noreferrer"
          >
            Features
          </Link>
          &nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
          <Link
            style={footerLink}
            href="https://steppingstonesapp.com/#faqs"
            target="_blank"
            rel="noopener noreferrer"
          >
            FAQs
          </Link>
          <Text style={footerText}>
            Stepping Stones App<sup>&copy;</sup> is the copyright and product of{" "}
            <Link
              href="https://www.buildwithequilibrium.com"
              style={{ color: "#8898aa" }}
              target="_blank"
            >
              Equilibrium Startup Lab LLC
            </Link>{" "}
            {year}
            <br />
            All rights reserved.
          </Text>
        </Section>
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

const hr = {
  borderColor: "#cccccc",
  margin: "20px 0",
};

const footer = {
  color: "#8898aa",
  fontSize: "12px",
};

const footerText = {
  fontSize: "12px",
  color: "#b7b7b7",
  lineHeight: "15px",
  textAlign: "left" as const,
  marginBottom: "50px",
};

const footerLink = {
  color: "#b7b7b7",
  textDecoration: "underline",
};

const footerLogos = {
  marginBottom: "32px",
  paddingLeft: "8px",
  paddingRight: "8px",
  width: "100%",
};

const footerLogosContainer = {};

const socialMediaIcon = {
  display: "inline",
  marginLeft: "62px",
};

const logoContainer = {
  marginTop: "32px",
};

const h1 = {
  color: "#1d1c1d",
  fontSize: "36px",
  fontWeight: "700",
  margin: "30px 0",
  padding: "0",
  lineHeight: "42px",
};

const heroText = {
  fontSize: "20px",
  lineHeight: "28px",
  marginBottom: "30px",
};

const review = {
  ...paragraph,
  padding: "24px",
  backgroundColor: "#f2f3f3",
  borderRadius: "4px",
};

const codeBox = {
  background: "rgb(245, 244, 245)",
  borderRadius: "4px",
  marginRight: "50px",
  marginBottom: "30px",
  padding: "43px 23px",
};

const confirmationCodeText = {
  fontSize: "30px",
  textAlign: "center" as const,
  verticalAlign: "middle",
};

const text = {
  color: "#000",
  fontSize: "14px",
  lineHeight: "24px",
};

const buttonContainer = {
  padding: "27px 0 27px",
};

const button = {
  backgroundColor: "#293531",
  borderRadius: "3px",
  fontWeight: "600",
  color: "#fff",
  fontSize: "15px",
  textDecoration: "none",
  textAlign: "center" as const,
  display: "block",
};
