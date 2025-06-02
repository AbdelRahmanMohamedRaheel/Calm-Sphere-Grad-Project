import { useContext, useEffect, useState } from "react";
import AuthContext from "../Context/AuthContext";
import AxiosInstance from "../utils/AxiosInstance";
import { useNavigate, useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import Chatbot from "./Chatbot";

const Appointment = () => {
  let { user } = useContext(AuthContext);
  let { id } = useParams();
  const navigate = useNavigate();

  let [profile, setProfile] = useState([]);
  let [isVisible, setIsVisible] = useState(true);
  let [doctros, setDoctros] = useState([]);
  // const [questions, setQuestions] = useState([]);
  const [chatbotSpecialty, setChatbotSpecialty] = useState(null);
  const [doctor, setDoctor] = useState();
  const [answers, setAnswers] = useState([]);

  const getQuestions = async () => {
    let response = await AxiosInstance.get(`previsitquestions/`);
    // setQuestions(response.data);
  };

  const defaultValues = {
    patient: user,
    doctor: "",
    time: "",
    status: "pending",
    description: "",
  };

  const {
    handleSubmit,
    register,
    setValue,
    formState: { errors },
  } = useForm({ defaultValues: defaultValues });

  let getProfile = async () => {
    let response = await AxiosInstance.get(`patients/${id}/`);
    console.log(response.data);
    setProfile(response.data);
  };

  let getDoctors = async () => {
    let response = await AxiosInstance.get("doctors/");
    setDoctros(response.data);
  };

  useEffect(() => {
    getProfile();
    getDoctors();
    getQuestions();
    if (doctor && doctor.department) {
      setChatbotSpecialty(doctor.department);
    }
  }, [doctor, chatbotSpecialty]);

  const submit = async (data) => {
    console.log("submitting..");
    console.log("Answers before submitting:", answers);
    const appointmentData = {
      patient: user.user_id,
      doctor: data.doctor,
      description: data.description,
      time: data.time,
      status: "pending",
    };

    try {
      // Step 1: Create Appointment
      const res = await AxiosInstance.post(`appointments/`, appointmentData);

      if (res.status === 201 || res.status === 200) {
        const appointmentId = res.data.id;

        // Ensure chatbot responses exist before submitting
        if (!answers || answers.length === 0) {
          toast.warn("Appointment created, but no chatbot answers to submit.");
          navigate(-1);
          return;
        }

        // Step 2: Submit chatbot conversation as report
        const reportData = {
          appointment: appointmentId,
          conversation: answers.map((ans) => ({
            role: ans.role,
            text: ans.text,
          })),
        };

        const reportRes = await AxiosInstance.post(
          `previsitreports/`,
          reportData
        );

        if (reportRes.status === 201 || reportRes.status === 200) {
          toast.success(
            "Appointment and chatbot answers submitted successfully!"
          );
        } else {
          toast.warning(
            "Appointment saved, but failed to submit chatbot answers."
          );
        }

        navigate(-1);
      } else {
        toast.error("Failed to create appointment.");
      }
    } catch (error) {
      console.error("Submission error:", error);
      toast.error("Error occurred while submitting appointment or answers.");
    }
  };

  return (
    <>
      {/* Appointment Start */}
      <div className="container-xxl py-5">
        <div className="container">
          <div className="row g-5">
            <div className="col-lg-6 wow fadeInUp" data-wow-delay="0.1s">
              <p className="d-inline-block border rounded-pill py-1 px-4">
                Appointment
              </p>
              <h1 className="mb-4">Make An Appointment To Visit Our Doctor</h1>
              <p className="mb-4">
                Book Now and start Your Peace of Mind, Just a Click Away! 
              </p>
              <div className="bg-light rounded d-flex align-items-center p-5 mb-4">
                <div
                  className="d-flex flex-shrink-0 align-items-center justify-content-center rounded-circle bg-white"
                  style={{ width: 55, height: 55 }}
                >
                  <i className="fa fa-phone-alt text-primary" />
                </div>
                <div className="ms-4">
                  <p className="mb-2">Call Us Now</p>
                  <h5 className="mb-0">31335</h5>
                </div>
              </div>
              <div className="bg-light rounded d-flex align-items-center p-5">
                <div
                  className="d-flex flex-shrink-0 align-items-center justify-content-center rounded-circle bg-white"
                  style={{ width: 55, height: 55 }}
                >
                  <i className="fa fa-envelope-open text-primary" />
                </div>
                <div className="ms-4">
                  <p className="mb-2">Mail Us Now</p>
                  <h5 className="mb-0">info@calmsphere.com</h5>
                </div>
              </div>
            </div>
            <div className="col-lg-6 wow fadeInUp" data-wow-delay="0.5s">
              <div className="bg-light rounded h-100 d-flex align-items-center p-5">
                <div className="row g-3">
                  <div className="col-12 col-sm-6">
                    <h5 className="text-info">
                      {profile.user && profile.user.first_name}{" "}
                      {profile.user && profile.user.last_name}
                    </h5>
                  </div>
                  <div className="col-12 col-sm-6">
                    <h5 className="text-info">
                      {profile.user && profile.user.phone}
                    </h5>
                  </div>

                  <div className="col-12 col-sm-12">
                    <select
                      className="form-select border-0"
                      style={{ height: 55 }}
                      {...register("doctor", { required: true })}
                      onChange={(e) => {
                        const selectedDoctor = doctros.find(
                          (doc) => doc.user.id === parseInt(e.target.value)
                        );
                        setDoctor(selectedDoctor);
                        setValue("doctor", e.target.value); // Still update the doctor field for submission
                      }}
                    >
                      <option defaultValue="">Choose Doctor</option>
                      {doctros.map((doc) => (
                        <option key={doc.id} value={doc.user.id}>
                          {doc.user.first_name} {doc.user.last_name} |{" "}
                          {doc.department}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="col-12 col-sm-12">
                    <div className="date" id="date" data-target-input="nearest">
                      <input
                        type="datetime-local"
                        className="form-control"
                        placeholder="Choose Date"
                        style={{ height: 55 }}
                        {...register("time", {
                          required: true,
                          validate: (value) => {
                            const selected = new Date(value);
                            const now = new Date();
                            return (
                              selected > now ||
                              "Please select a future date/time"
                            );
                          },
                        })}
                      />
                    </div>
                  </div>
                  <div className="col-12">
                    <textarea
                      className="form-control border-0"
                      rows={5}
                      placeholder="Describe your problem"
                      defaultValue={""}
                      {...register("description", { required: true })}
                    />
                  </div>
                  <div className="col-12">
                    <button
                      className="btn btn-primary w-100 py-3"
                      type="button"
                      onClick={() => {
                        if (!doctor || !doctor.department) {
                          toast.error(
                            "Please select a doctor and department before proceeding."
                          );
                          return;
                        } else {
                          setChatbotSpecialty(doctor.department); // Pass specialty to chatbot
                          setIsVisible(false);
                        }
                      }}
                    >
                      Proceed to Book Appointment
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Appointment End */}
      <div id="chatbot" hidden={isVisible} className="card card-header">
        <Chatbot specialty={chatbotSpecialty} setAnswers={setAnswers} />
        <button
          type="button"
          onClick={(e) => {
            e.preventDefault(); // Prevent the button from closing the modal automatically
            handleSubmit(submit)(); // Call the handleSubmit function
          }}
          className="btn btn-success my-2 p-3 submit-btn"
          hidden={isVisible}
        >
          Submit Request
        </button>
      </div>
    </>
  );
};

export default Appointment;
