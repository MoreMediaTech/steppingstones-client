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
  Column
} from "@react-email/components";

type EnquiryEmailProps = {
  from: string;
  message: string;
};

const baseUrl = process.env.NEXT_PUBLIC_API_URL || "";
const year = new Date().getFullYear();

export function EnquiryEmail({
  from = "admin@steppingstonesapp.com",
  message = "Hello",
}: EnquiryEmailProps) {
  return (
    <Html>
      <Head />
      <Preview>New Enquiry</Preview>
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
          <Heading style={h1}>New Enquiry</Heading>

          <Section style={{ paddingBottom: "20px" }}>
            <Row>
              <Text style={heroText}>You have a new enquiry from {from} .</Text>
              <Text style={review}>{message}</Text>
            </Row>
          </Section>

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
              Stepping Stones App<sup>&copy;</sup> is the copyright and product
              of{" "}
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
}

export default EnquiryEmail;

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

const main = {
  backgroundColor: "#ffffff",
  margin: "0 auto",
  fontFamily:
    "-apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif",
};

const container = {
  maxWidth: "600px",
  margin: "0 auto",
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

const paragraph = {
  fontSize: "18px",
  lineHeight: "1.4",
  color: "#484848",
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

const hr = {
  borderColor: "#cccccc",
  margin: "20px 0",
};


