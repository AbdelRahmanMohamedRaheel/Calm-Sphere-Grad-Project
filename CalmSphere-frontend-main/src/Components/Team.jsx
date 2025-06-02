import { useEffect, useState } from "react";
import AxiosInstance from "../utils/AxiosInstance";
import Spinner from "./Spinner";
import { Link } from "react-router-dom";

const Team = () => {
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(true);
  const getDoctors = async () => {
    try {
      const response = await AxiosInstance.get(`doctors/`);
      setDoctors(response.data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching Doctors:", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    getDoctors();
  }, []);

  return (
    <>
      {/* Team Start */}
      <div className="container-xxl py-5">
        <div className="container">
          <div
            className="text-center mx-auto mb-5 wow fadeInUp"
            data-wow-delay="0.1s"
            style={{ maxWidth: 600 }}
          >
            <p className="d-inline-block border rounded-pill py-1 px-4">
              Doctors
            </p>
            <h1>Our Experience Doctors</h1>
          </div>
          <div className="row g-4">
            {/* Single Doctor  */}
            {loading ? (
              <Spinner />
            ) : (
              doctors.map((doctor) => (
                <div
                  className="col-lg-3 col-md-6 wow fadeInUp"
                  data-wow-delay="0.1s"
                  key={doctor.id}
                >
                  <div className="team-item position-relative rounded overflow-hidden">
                    <Link to={`/doctor/${doctor.id}`} style={{textDecoration: 'none'}}>
                    <div className="overflow-hidden">
                      <img className="img-fluid" src={doctor.image} alt="" />
                    </div>
                    </Link>
                      <div className="team-text bg-light text-center p-4">
                        <h5>
                          {doctor.user.first_name} {doctor.user.last_name}
                        </h5>
                        <p className="text-primary">{doctor.department}</p>
                        <div className="team-social text-center">
                          <a className="btn btn-square" href="">
                            <i className="fab fa-facebook-f" />
                          </a>
                          <a className="btn btn-square" href="">
                            <i className="fab fa-twitter" />
                          </a>
                          <a className="btn btn-square" href="">
                            <i className="fab fa-instagram" />
                          </a>
                        </div>
                      </div>
                    
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
      {/* Team End */}
    </>
  );
};

export default Team;
