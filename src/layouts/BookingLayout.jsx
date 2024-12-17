import NavigationBar from "../components/Navbar";
import NavbarBooking from "../components/NavbarBooking";
import Footer from "../components/Footer"
import PropTypes from "prop-types";

export default function BookingLayout({ children, isSaved, isPayment }) {
  return (
    <>
      <NavigationBar />
      <NavbarBooking isSaved={isSaved} isPayment={isPayment} />
      {children}
      <Footer />
    </>
  );
}
BookingLayout.propTypes = {
  children: PropTypes.node.isRequired,
  isSaved: PropTypes.bool.isRequired,
  isPayment: PropTypes.bool.isRequired,
};