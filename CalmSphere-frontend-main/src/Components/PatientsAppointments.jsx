import { useContext, useEffect, useState } from "react";
import AxiosInstance from "../utils/AxiosInstance";
import Spinner from "./Spinner";
import AuthContext from "../Context/AuthContext";
import { Link, useLocation, useParams } from "react-router-dom";
import { FaEye } from "react-icons/fa6";

const PatientsAppointments = () => {
  const { user } = useContext(AuthContext);
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [doctor, setDoctor] = useState(null);

  const [questions, setQuestions] = useState([]);

  const [responses, setResponses] = useState({});

  const location = useLocation();
  const isDoctorPage = location.pathname.startsWith("/doctor/");

  const getAppointments = async () => {
    let response = await AxiosInstance.get(`appointments/`);
    setAppointments(response.data);
    setLoading(false);
  };

  const getQuestions = async () => {
    let response = await AxiosInstance.get(`previsitquestions/`);
    setQuestions(response.data);
  };

  const { id: doctorIdFromUrl } = useParams();
  const getDoctor = async () => {
    const res = await AxiosInstance.get(`doctors/${doctorIdFromUrl}/`);
    setDoctor(res.data);
  };

  const fetchResponses = async (appointmentId) => {
    try {
      const res = await AxiosInstance.get(`previsitreports/${appointmentId}/`);
      const report = res.data; // assuming only one report per appointment
      setResponses((prev) => ({
        ...prev,
        [appointmentId]: report?.conversation || [],
      }));
    } catch (error) {
      console.error("Failed to load pre-visit report", error);
      setResponses((prev) => ({
        ...prev,
        [appointmentId]: null,
      }));
    }
  };

  useEffect(() => {
    getAppointments();
    getDoctor();
    getQuestions();
  }, [doctorIdFromUrl]);

  return (
    <div className="card mb-4 mb-md-0">
      <div className="card-body">
        {loading ? (
          <Spinner />
        ) : (
          <table className="table table-hover">
            <thead className="thead-dark">
              <tr>
                <th scope="col">#</th>
                {user.role !== "PATIENT" && <th>Patient</th>}
                {user.role !== "DOCTOR" && <th>Doctor</th>}
                <th scope="col">Department</th>
                <th scope="col">Date</th>
                <th scope="col">Status</th>
                {user.role !== "PATIENT" && <th>Survey</th>}
              </tr>
            </thead>
            <tbody>
              {isDoctorPage
                ? appointments.map((appointment, index) =>
                    doctor && appointment.doctor_id == doctor.id ? (
                      <tr key={appointment.id}>
                        <th scope="row">{index + 1}</th>
                        {user.role !== "PATIENT" && (
                          <td>{appointment.patient_name}</td>
                        )}
                        {user.role !== "DOCTOR" && (
                          <td>{appointment.doctor_name}</td>
                        )}
                        <td>{appointment.department}</td>
                        <td>{new Date(appointment.time).toLocaleString()}</td>
                        <td>{appointment.status}</td>
                        {user.role !== "PATIENT" && (
                          <td>
                            <button
                              className="btn btn-sm btn-outline-primary"
                              data-bs-toggle="modal"
                              data-bs-target={`#responsesModal${appointment.id}`}
                              onClick={() => fetchResponses(appointment.id)}
                            >
                              <FaEye className="text-primary" />
                            </button>

                            {/* Responses Modal  */}
                            <div
                              className="modal fade"
                              id={`responsesModal${appointment.id}`}
                              tabIndex={-1}
                              aria-labelledby="responsesModalLabel"
                              aria-hidden="true"
                            >
                              <div className="modal-dialog modal-lg">
                                <div className="modal-content">
                                  <div className="modal-header">
                                    <h5
                                      className="modal-title"
                                      id="responsesModalLabel"
                                    >
                                      Patient Responses
                                    </h5>
                                    <button
                                      type="button"
                                      className="btn-close"
                                      data-bs-dismiss="modal"
                                      aria-label="Close"
                                    />
                                  </div>

                                  <div className="modal-body">
                                    {responses[appointment.id]?.length > 0 ? (
                                      <div className="chat-box">
                                        {responses[appointment.id].map(
                                          (msg, idx) => (
                                            <div
                                              key={idx}
                                              className={`alert ${
                                                msg.role === "user"
                                                  ? "alert-primary text-start"
                                                  : "alert-secondary text-start"
                                              }`}
                                            >
                                              <strong>
                                                {msg.role === "user"
                                                  ? "Patient:"
                                                  : "System:"}
                                              </strong>
                                              <div
                                                dangerouslySetInnerHTML={{
                                                  __html: msg.text.replace(
                                                    /\n/g,
                                                    "<br/>"
                                                  ),
                                                }}
                                              />
                                            </div>
                                          )
                                        )}
                                      </div>
                                    ) : (
                                      <p className="text-muted">
                                        No responses found for this appointment.
                                      </p>
                                    )}
                                  </div>

                                  <div className="modal-footer">
                                    <button
                                      type="button"
                                      className="btn btn-secondary"
                                      data-bs-dismiss="modal"
                                    >
                                      Close
                                    </button>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </td>
                        )}
                      </tr>
                    ) : (
                      <></>
                    )
                  )
                : appointments.map((appointment, index) => (
                    <tr key={appointment.id}>
                      <th scope="row">{index + 1}</th>
                      {user.role !== "PATIENT" && (
                        <td>{appointment.patient_name}</td>
                      )}
                      {user.role !== "DOCTOR" && (
                        <td>
                          <Link to={`/doctor/${appointment.doctor_id}`}>
                            {appointment.doctor_name}
                          </Link>
                        </td>
                      )}
                      <td>{appointment.department}</td>
                      <td>{new Date(appointment.time).toLocaleString()}</td>
                      <td>{appointment.status}</td>
                      {user.role !== 'PATIENT' && (

                      <td>
                        <button
                          className="btn btn-sm btn-outline-primary"
                          data-bs-toggle="modal"
                          data-bs-target={`#responsesModal${appointment.id}`}
                          onClick={() => fetchResponses(appointment.id)}
                        >
                          <FaEye className="text-primary" />
                        </button>

                        {/* Responses Modal  */}
                        <div
                          className="modal fade"
                          id={`responsesModal${appointment.id}`}
                          tabIndex={-1}
                          aria-labelledby="responsesModalLabel"
                          aria-hidden="true"
                        >
                          <div className="modal-dialog modal-lg">
                            <div className="modal-content">
                              <div className="modal-header">
                                <h5
                                  className="modal-title"
                                  id="responsesModalLabel"
                                >
                                  Patient Responses
                                </h5>
                                <button
                                  type="button"
                                  className="btn-close"
                                  data-bs-dismiss="modal"
                                  aria-label="Close"
                                />
                              </div>

                              <div className="modal-body">
                                {responses[appointment.id]?.length > 0 ? (
                                  <div className="chat-box">
                                    {responses[appointment.id].map(
                                      (msg, idx) => (
                                        <div
                                          key={idx}
                                          className={`alert ${
                                            msg.role === "user"
                                              ? "alert-primary text-start"
                                              : "alert-secondary text-start"
                                          }`}
                                        >
                                          <strong>
                                            {msg.role === "user"
                                              ? "Patient:"
                                              : "System:"}
                                          </strong>
                                          <div
                                            dangerouslySetInnerHTML={{
                                              __html: msg.text.replace(
                                                /\n/g,
                                                "<br/>"
                                              ),
                                            }}
                                          />
                                        </div>
                                      )
                                    )}
                                  </div>
                                ) : (
                                  <p className="text-muted">
                                    No responses found for this appointment.
                                  </p>
                                )}
                              </div>

                              <div className="modal-footer">
                                <button
                                  type="button"
                                  className="btn btn-secondary"
                                  data-bs-dismiss="modal"
                                >
                                  Close
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                      </td>
                      )}
                    </tr>
                  ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default PatientsAppointments;
