const Testimonial = () => {
  return (
    <>
      {/* Testimonial Start */}
      <div className="container-xxl py-5">
        <div className="container">
          <div
            className="text-center mx-auto mb-5 wow fadeInUp"
            data-wow-delay="0.1s"
            style={{ maxWidth: 600 }}
          >
            <p className="d-inline-block border rounded-pill py-1 px-4">
              Testimonial
            </p>
            <h1>What Say Our Patients!</h1>
          </div>
          <div
            className="owl-carousel testimonial-carousel wow fadeInUp"
            data-wow-delay="0.1s"
          >
            <div className="testimonial-item text-center">
              
              <div className="testimonial-text rounded text-center p-4">
                <p>
                  The AI appointment booking at Calm Sphere made scheduling my therapy so easy! The meditations have really helped me unwind, and the study tips are a game-changer for managing my stress as a student. Highly recommend!
                </p>
                <h5 className="mb-1">Raheel</h5>
                <span className="fst-italic">Profession</span>
              </div>
            </div>
            <div className="testimonial-item text-center">
              
              <div className="testimonial-text rounded text-center p-4">
                <p>
                  I was skeptical about the LSTM chatbot at first, but it accurately identified my anxiety and gave me helpful insights. The articles are insightful, and connecting with a professional doctor through the service was seamless. Thank you, Calm Sphere!
                </p>
                <h5 className="mb-1">Sadek</h5>
                <span className="fst-italic">Profession</span>
              </div>
            </div>
            <div className="testimonial-item text-center">
              
              <div className="testimonial-text rounded text-center p-4">
                <p>
                  Calm Sphere has transformed my daily routine. The guided meditations are soothing, and the chatbot’s diagnosis helped me understand my depression better. The support from the expert doctors is top-notch!
                </p>
                <h5 className="mb-1">Ahmed</h5>
                <span className="fst-italic">Profession</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Testimonial End */}
    </>
  );
};

export default Testimonial;
