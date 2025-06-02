const Footer = () => {
  return (
    <>
      {/* Footer Start */}
      <div
        className="container-fluid bg-dark text-light footer  pt-5 wow fadeIn"
        data-wow-delay="0.1s"
      >
        <div className="container py-5">
          <div className="row g-5">
            <div className="col-lg-3 col-md-6">
              <h5 className="text-light mb-4">Follow Us </h5>
              <p className="mb-2">
                <i className="fa fa-map-marker-alt me-3" />
                123 Maadi , Cairo, Egypt
              </p>
              <p className="mb-2">
                <i className="fa fa-phone-alt me-3" />
                31335
              </p>
              <p className="mb-2">
                <i className="fa fa-envelope me-3" />
                info@calmsphere.com
              </p>
              <div className="d-flex pt-2">
                <a
                  className="btn btn-outline-light btn-social rounded-circle"
                  href=""
                >
                  <i className="fab fa-twitter" />
                </a>
                <a
                  className="btn btn-outline-light btn-social rounded-circle"
                  href=""
                >
                  <i className="fab fa-facebook-f" />
                </a>
                <a
                  className="btn btn-outline-light btn-social rounded-circle"
                  href=""
                >
                  <i className="fab fa-youtube" />
                </a>
                <a
                  className="btn btn-outline-light btn-social rounded-circle"
                  href=""
                >
                  <i className="fab fa-linkedin-in" />
                </a>
              </div>
            </div>
            <div className="col-lg-3 col-md-6">
              <h5 className="text-light mb-4">Services</h5>
              <a className="btn btn-link" href="http://localhost:3000/appointment/null">
                AI Appointment Booking
              </a>
              <a className="btn btn-link" href="http://localhost:3000/meditation">
                Guided Meditations
              </a>
              <a className="btn btn-link" href="http://localhost:3000/article">
                Mental Health Articles
              </a>
              <a className="btn btn-link" href="http://localhost:3000/chatbot">
                LSTM Chatbot Diagnosis
              </a>
              
            </div>
            <div className="col-lg-3 col-md-6">
              <h5 className="text-light mb-4">Quick Links</h5>
              <a className="btn btn-link" href="http://localhost:3000/about">
                About Us
              </a>
              <a className="btn btn-link" href="http://localhost:3000/">
                Contact Us
              </a>
              <a className="btn btn-link" href="http://localhost:3000/services">
                Our Services
              </a>
            </div>
            <div className="col-lg-3 col-md-6">
              <h5 className="text-light mb-4">Calm Sphere</h5>
              <p>Your Journey to Inner Peace Startes Here</p>
              Book Now and start Your Peace of Mind, Just a Click Away!
              <div
                className="position-relative mx-auto"
                style={{ maxWidth: 400 }}
              >
                
              </div>
            </div>
          </div>
        </div>
        
      </div>
      {/* Footer End */}
      {/* Back to Top */}
      <a href="#" className="btn btn-lg btn-primary rounded-circle back-to-top">
        <i className="bi bi-arrow-up" />
      </a>
    </>
  );
};

export default Footer;
