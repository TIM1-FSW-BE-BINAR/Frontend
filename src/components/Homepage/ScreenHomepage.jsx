import { Container } from "react-bootstrap";
const ScreenHomepage = () => {
  return <Hero />;
};
const Hero = () => {
  return (
    <>
      <section id="hero">
        <Container className="hero">
          <h3> INI HERO SECTION DI HOMEPAGE</h3>
        </Container>
      </section>
    </>
  );
};



export default ScreenHomepage;
