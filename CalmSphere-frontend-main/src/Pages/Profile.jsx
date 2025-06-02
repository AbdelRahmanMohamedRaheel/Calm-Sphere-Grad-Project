import { useContext, useEffect, useState } from "react";
import AxiosInstance from "../utils/AxiosInstance";
import { useForm } from "react-hook-form";
import Spinner from "../Components/Spinner";
import AuthContext from "../Context/AuthContext";
import { Link, useParams } from "react-router-dom";
import PatientsAppointments from "../Components/PatientsAppointments";
import { toast } from "react-toastify";

const Profile = () => {
  const { id } = useParams();
  let { user, logoutUser } = useContext(AuthContext);
  let [profile, setProfile] = useState([]);
  let [loading, setLoading] = useState(true);

  // manage controlled and uncontrolled data
  const defaultValues = {
    weight: "",
    height: "",
    bmi: "",
  };

  // Use Form hook
  const {
    handleSubmit,
    register,
    setValue,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues: defaultValues,
  });

  const [bmi, setBmi] = useState(null);

  const weight = watch("weight");
  const height = watch("height");

  let getProfile = async () => {
    let response = await AxiosInstance.get(`patients/${id}/`);
    setProfile(response.data);
    setValue("first_name", response.data.user.first_name);
    setValue("last_name", response.data.user.last_name);
    setValue("email", response.data.user.email);
    setValue("phone", response.data.user.phone);
    setValue("dob", response.data.user.dob);
    setValue("height", response.data.height);
    setValue("weight", response.data.weight);
    setLoading(false);
  };

  useEffect(() => {
    getProfile();
    if (weight && height) {
      const bmiValue = (weight / (height * height)).toFixed(2); // BMI formula
      setBmi(bmiValue);
    }
  }, []);

  // Function to handle form submission
  const update = async (data) => {
    const updatedUser = {
      first_name: data.first_name,
      last_name: data.last_name,
      email: data.email,
      phone: data.phone,
      dob: data.dob,
    };

    const updatedProfile = {
      weight: data.weight,
      height: data.height,
    };

    try {
      // Update user fields
      await AxiosInstance.patch(`users/${user.user_id}/`, updatedUser);

      // Update profile fields
      const res = await AxiosInstance.patch(
        `patients/${profile.id}/`,
        updatedProfile
      );

      if (res.status === 200) {
        toast.success("Profile updated successfully!");
        getProfile(); // refresh
      } else {
        toast.error("Failed to update profile.");
      }
    } catch (error) {
      console.error(error);
      toast.error("Error occurred while updating profile.");
    }
  };

  return (
    <>
      <section className="vh-100" style={{ backgroundColor: "#5f59f7" }}>
        <div className="container py-5 h-50">
          <div className="row d-flex justify-content-center align-items-center h-100">
            <div className="col col-xl-10">
              <div className="card mb-5" style={{ borderRadius: 15 }}>
                <div className="card-body p-4">
                  {loading ? (
                    <Spinner />
                  ) : (
                    <>
                      <div className="row">
                        <div className="col-8">
                          <h3 className="mb-3">
                            {profile.user && profile.user.first_name}{" "}
                            {profile.user && profile.user.last_name}
                          </h3>
                        </div>
                        <div className="col-4">
                          {user.role == "PATIENT" && (
                            <button
                              onClick={logoutUser}
                              className="btn btn-outline-dark"
                              style={{ float: "right" }}
                            >
                              Logout
                            </button>
                          )}
                        </div>
                      </div>
                      <PatientsAppointments />
                      <hr className="my-4" />
                      <div className="d-flex justify-content-start align-items-center">
                        <p className="mb-0 text-uppercase">
                          <i className="fas fa-cog me-2" />{" "}
                          {/* Button trigger modal */}
                          <span
                            className="text-muted small"
                            data-bs-toggle="modal"
                            data-bs-target="#editProfileModal"
                          >
                            Edit Profile
                          </span>
                        </p>
                        
                        <p className="mb-0 text-uppercase">
                          <i className="fas fa-ellipsis-h ms-4 me-2" />{" "}
                          <span className="text-muted small">
                            My Appointments
                          </span>
                          <span className="ms-3 me-4">|</span>
                        </p>
                        <a href="#!">
                          <img
                            src="https://mdbcdn.b-cdn.net/img/Photos/Avatars/avatar-2.webp"
                            alt="avatar"
                            className="img-fluid rounded-circle me-3"
                            width={35}
                          />
                        </a>
                        <Link
                          to={`/appointment/${user.profile_id}`}
                          data-mdb-button-init=""
                          data-mdb-ripple-init=""
                          className="btn btn-outline-dark btn-sm btn-floating"
                        >
                          <i className="fas fa-plus text-body" />
                        </Link>
                      </div>
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <>
        {/* Edit Profile Modal */}
        <div
          className="modal fade"
          id="editProfileModal"
          tabIndex={-1}
          aria-labelledby="editProfileModalLabel"
          aria-hidden="true"
        >
          <div className="modal-dialog modal-lg">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="editProfileModalLabel">
                  Edit Personal Profile
                </h5>
                <button
                  type="button"
                  className="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                />
              </div>
              <form>
                <div className="modal-body">
                  <div className="row">
                    <div className="col-md-6">
                      <label htmlFor="first_name" className="text-muted">
                        Fisrt Name
                      </label>
                      <input
                        type="text"
                        name="first_name"
                        id="first_name"
                        className="form-control"
                        {...register("first_name", { required: true })}
                      />
                    </div>
                    <div className="col-md-6">
                      <label htmlFor="last_name" className="text-muted">
                        Last Name
                      </label>
                      <input
                        type="text"
                        name="last_name"
                        id="last_name"
                        className="form-control"
                        {...register("last_name", { required: true })}
                      />
                    </div>
                    <div className="col-md-6">
                      <label htmlFor="email" className="text-muted">
                        Email
                      </label>
                      <input
                        type="email"
                        name="email"
                        id="email"
                        className="form-control"
                        {...register("email", { required: true })}
                      />
                    </div>
                    <div className="col-md-6">
                      <label htmlFor="phone" className="text-muted">
                        Phone
                      </label>
                      <input
                        type="text"
                        name="phone"
                        id="phone"
                        className="form-control"
                        {...register("phone", { required: true })}
                      />
                    </div>
                    <div className="col-md-12 my-2">
                      <label htmlFor="dob" className="text-muted">
                        Date of Birth
                      </label>
                      <input
                        type="date"
                        name="dob"
                        id="dob"
                        className="form-control"
                        {...register("dob", { required: true })}
                      />
                    </div>

                    <div className="col-md-4 my-2">
                      <label htmlFor="last_name" className="text-muted">
                        Height (cm)
                      </label>
                      <input
                        type="number"
                        name="height"
                        id="height"
                        {...register("height", {
                          required: true,
                          valueAsNumber: true,
                        })}
                        className="form-control"
                      />
                    </div>
                    <div className="col-md-4 my-2">
                      <label htmlFor="last_name" className="text-muted">
                        Weight (kgs)
                      </label>
                      <input
                        type="number"
                        name="weight"
                        id="weight"
                        {...register("weight", {
                          required: true,
                          valueAsNumber: true,
                        })}
                        className="form-control"
                      />
                    </div>
                    <div className="col-md-4 my-2">
                      {/* {bmi && (
                        <div>
                          <p>
                            <strong>BMI: </strong>
                            {bmi}
                          </p>
                        </div>
                      )} */}
                    </div>
                  </div>
                </div>
                <div className="modal-footer">
                  <button
                    type="button"
                    className="btn btn-secondary"
                    data-bs-dismiss="modal"
                  >
                    Close
                  </button>
                  <button
                    type="button"
                    onClick={handleSubmit(update)}
                    className="btn btn-primary"
                  >
                    Save changes
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </>
      <>
      </>
    </>
  );
};

export default Profile;
