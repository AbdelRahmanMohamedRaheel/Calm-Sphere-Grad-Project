import Appointment from "../Components/Appointment";
import PageHeader from "../Components/PageHeader";
import Testimonial from "../Components/Testimonial";

const Services = () => {
  return (
    <>
      <PageHeader pageName={`Services`} />

      {/* Service Start */}
      <div className="container-xxl py-5">
        <div className="container">
          <div
            className="text-center mx-auto mb-5 wow fadeInUp"
            data-wow-delay="0.1s"
            style={{ maxWidth: 600 }}
          >
            <p className="d-inline-block border rounded-pill py-1 px-4">
              Services
            </p>
            <h1>Mental Health Solutions</h1>
          </div>
          <div className="row g-4">
            <div
              className="col-lg-4 col-md-6 wow fadeInUp"
              data-wow-delay="0.1s"
            >
              <div className="service-item bg-light rounded h-100 p-5">
                <div
                  className="d-inline-flex align-items-center justify-content-center bg-white rounded-circle mb-4"
                  style={{ width: 65, height: 65 }}
                >
                  <i className="fa fa-calendar-check text-primary fs-4" />
                </div>
                <h4 className="mb-3">AI Appointment Booking</h4>
                <p className="mb-4">
                  Schedule therapy sessions seamlessly with our AI Gemini chatbot, designed for quick and easy booking.
                </p>
                
              </div>
            </div>
            <div
              className="col-lg-4 col-md-6 wow fadeInUp"
              data-wow-delay="0.3s"
            >
              <div className="service-item bg-light rounded h-100 p-5">
                <div
                  className="d-inline-flex align-items-center justify-content-center bg-white rounded-circle mb-4"
                  style={{ width: 65, height: 65 }}
                >
                  <i className="fa fa-spa text-primary fs-4" />
                </div>
                <h4 className="mb-3">Guided Meditations</h4>
                <p className="mb-4">
                  Access calming meditation sessions to reduce stress and improve mental clarity, anytime you need.
                </p>
                
              </div>
            </div>
            <div
              className="col-lg-4 col-md-6 wow fadeInUp"
              data-wow-delay="0.5s"
            >
              <div className="service-item bg-light rounded h-100 p-5">
                <div
                  className="d-inline-flex align-items-center justify-content-center bg-white rounded-circle mb-4"
                  style={{ width: 65, height: 65 }}
                >
                  <i className="fa fa-book-open text-primary fs-4" />
                </div>
                <h4 className="mb-3">Mental Health Articles</h4>
                <p className="mb-4">
                  Explore expert-written articles on mental wellness, coping strategies, and self-care techniques.
                </p>
                
              </div>
            </div>
            <div
              className="col-lg-4 col-md-6 wow fadeInUp"
              data-wow-delay="0.1s"
            >
              <div className="service-item bg-light rounded h-100 p-5">
                <div
                  className="d-inline-flex align-items-center justify-content-center bg-white rounded-circle mb-4"
                  style={{ width: 65, height: 65 }}
                >
                  <i className="fa fa-robot text-primary fs-4" />
                </div>
                <h4 className="mb-3">LSTM Chatbot Diagnosis</h4>
                <p className="mb-4">
                  Our AI chatbot assesses anxiety, depression, or normal states and offers personalized insights.
                </p>
                
              </div>
            </div>
            <div
              className="col-lg-4 col-md-6 wow fadeInUp"
              data-wow-delay="0.3s"
            >
              <div className="service-item bg-light rounded h-100 p-5">
                <div
                  className="d-inline-flex align-items-center justify-content-center bg-white rounded-circle mb-4"
                  style={{ width: 65, height: 65 }}
                >
                  <i className="fa fa-graduation-cap text-primary fs-4" />
                </div>
                <h4 className="mb-3">Study Tips</h4>
                <p className="mb-4">
                  Get tailored study tips to boost focus and productivity while managing mental health challenges.
                </p>

              </div>
            </div>
            <div
              className="col-lg-4 col-md-6 wow fadeInUp"
              data-wow-delay="0.5s"
            >
              <div className="service-item bg-light rounded h-100 p-5">
                <div
                  className="d-inline-flex align-items-center justify-content-center bg-white rounded-circle mb-4"
                  style={{ width: 65, height: 65 }}
                >
                  <i className="fa fa-user-md text-primary fs-4" />
                </div>
                <h4 className="mb-3">Expert Doctor Referrals</h4>
                <p className="mb-4">
                  Connect with trusted, professional therapists and doctors for specialized mental health care.
                </p>
                
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Service End */}

      <Appointment />

      <Testimonial />
    </>
  );
};

export default Services;
