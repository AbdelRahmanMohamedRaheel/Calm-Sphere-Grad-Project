import Feature from "../Components/Feature";
import PageHeader from "../Components/PageHeader";
import Team from "../Components/Team";

const About = () => {
  return (
    <>
      <PageHeader pageName={`About Us`} />

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
              <a
                className="btn btn-primary rounded-pill py-3 px-5 mt-3"
                href=""
              >
                Read More
              </a>
            </div>
          </div>
        </div>
      </div>
      

      <Feature />

      <Team />
    </>
  );
};

export default About;
