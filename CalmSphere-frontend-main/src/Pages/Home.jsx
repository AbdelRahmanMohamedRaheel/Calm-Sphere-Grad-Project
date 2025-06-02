import Feature from "../Components/Feature";
import Team from "../Components/Team";
import Appointment from "../Components/Appointment";
import Testimonial from "../Components/Testimonial";
import { useEffect } from "react";

const Home = () => {
  useEffect(() => {
    $(document).ready(function () {
      $(".owl-carousel").owlCarousel({
        loop: true,
        margin: 10,
        nav: true,
        dots: true,
        autoplay: true,
        autoplayTimeout: 3000,
        responsive: {
          0: { items: 1 },
          // 600: { items: 2 },
          // 1000: { items: 3 },
        },
      });
    });
  }, []);
  return (
    <>
      {/* Header Start Carousel */}
      <div className="container-fluid header bg-primary p-0 mb-5">
        <div className="row g-0 align-items-center flex-column-reverse flex-lg-row">
          <div className="col-lg-6 p-5 wow fadeIn" data-wow-delay="0.1s">
            <h1 className="display-4 text-white mb-5">
              Good Health Is The Root Of All Happiness 
            </h1>
            <div className="row g-4">
              <div className="col-sm-4">
                <div className="border-start border-light ps-4">
                  <h2 className="text-white mb-1" data-toggle="counter-up">
                    80
                  </h2>
                  <p className="text-light mb-0">Expert Doctors</p>
                </div>
              </div>
              <div className="col-sm-4">
                <div className="border-start border-light ps-4">
                  <h2 className="text-white mb-1" data-toggle="counter-up">
                    130
                  </h2>
                  <p className="text-light mb-0">Medical Stuff</p>
                </div>
              </div>
              <div className="col-sm-4">
                <div className="border-start border-light ps-4">
                  <h2 className="text-white mb-1" data-toggle="counter-up">
                    31335
                  </h2>
                  <p className="text-light mb-0">Total Patients</p>
                </div>
              </div>
            </div>
          </div>
          <div className="col-lg-6 wow fadeIn" data-wow-delay="0.5s">
            <div className="owl-carousel header-carousel">
              <div className="owl-carousel-item position-relative">
                <img
                  className="img-fluid"
                  src="../src/assets/img/carousel-1.jpg"
                  alt="carousel-1"
                />
                <div className="owl-carousel-text">
                  <h1 className="display-1 text-white mb-0">AI Appointment Booking</h1>
                </div>
              </div>
              <div className="owl-carousel-item position-relative">
                <img
                  className="img-fluid"
                  src="../src/assets/img/carousel-2.jpg"
                  alt=""
                />
                <div className="owl-carousel-text">
                  <h1 className="display-1 text-white mb-0">Guided Meditations</h1>
                </div>
              </div>
              <div className="owl-carousel-item position-relative">
                <img
                  className="img-fluid"
                  src="../src/assets/img/carousel-3.jpg"
                  alt=""
                />
                <div className="owl-carousel-text">
                  <h1 className="display-1 text-white mb-0">Mental Health Articles</h1>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Header End */}

      {/* About Start */}
      <div className="container-xxl py-5">
        <div className="container">
          <div className="row g-5">
            <div className="col-lg-6 wow fadeIn" data-wow-delay="0.1s">
              <div className="d-flex flex-column">
                <img
                  className="img-fluid rounded w-75 align-self-end"
                  src="../src/assets/img/about-1.jpg"
                  alt=""
                />
                <img
                  className="img-fluid rounded w-50 bg-white pt-3 pe-3"
                  src="../src/assets/img/about-2.jpg"
                  alt=""
                  style={{ marginTop: "-25%" }}
                />
              </div>
            </div>
            <div className="col-lg-6 wow fadeIn" data-wow-delay="0.5s">
              <p className="d-inline-block border rounded-pill py-1 px-4">
                About Us
              </p>
              <h1 className="mb-4">
                Why You Should Trust Us? Get Know About Us!
              </h1>
              <p>
                At Calm Sphere, we are committed to fostering mental wellness with compassion and innovation. Our experienced therapists provide personalized, evidence-based care in a safe, supportive environment, while our cutting-edge mental health chatbot offers accessible, 24/7 support to guide you through life’s challenges. With a focus on trust, empathy, and professional excellence, we empower our clients to achieve emotional balance and resilience. Discover why so many trust us as their partner in mental health care.
              </p>
              <p className="mb-4">
                At Calm Sphere, we blend heartfelt therapy with innovative technology to support your mental health journey. Our skilled therapists offer compassionate, tailored care, while our mental health chatbot provides instant, confidential support anytime, anywhere. Rooted in trust and dedication, we’re here to help you navigate life’s challenges with confidence and care.
              </p>
              <p>
                <i className="far fa-check-circle text-primary me-3" />
                Quality health care
              </p>
              <p>
                <i className="far fa-check-circle text-primary me-3" />
                Only Qualified Doctors
              </p>
              <p>
                <i className="far fa-check-circle text-primary me-3" />
                Medical Research Professionals
              </p>
              
            </div>
          </div>
        </div>
      </div>
      {/* About End */}

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

      <Feature />

      <Team />

      <Appointment />

      <Testimonial />
    </>
  );
};

export default Home;
