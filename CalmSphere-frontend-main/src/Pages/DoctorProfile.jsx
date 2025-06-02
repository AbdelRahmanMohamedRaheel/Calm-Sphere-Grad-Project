import { useContext, useEffect, useState } from "react";
import AxiosInstance from "../utils/AxiosInstance";
import { Link, useParams } from "react-router-dom";
import AuthContext from "../Context/AuthContext";
import PatientsAppointments from "../Components/PatientsAppointments";
import Spinner from "../Components/Spinner";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";

const DoctorProfile = () => {
  let { user, logoutUser } = useContext(AuthContext);
  const { id } = useParams();
  const [doctor, setDoctor] = useState([]);
  const [loading, setLoading] = useState(true);

  // manage controlled and uncontrolled data
  const defaultValues = {
    image: "",
    location: "",
    title: "",
    bio: "",
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

  const getDoctor = async () => {
    const response = await AxiosInstance.get(`doctors/${id}/`);
    setDoctor(response.data);
    setValue("first_name", response.data.user.first_name);
    setValue("last_name", response.data.user.last_name);
    setValue("email", response.data.user.email);
    setValue("phone", response.data.user.phone);
    setValue("dob", response.data.user.dob);
    setValue("location", response.data.location);
    setValue("title", response.data.title);
    setValue("bio", response.data.bio);
    setLoading(false);
  };

  useEffect(() => {
    getDoctor();
  }, [id]);

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
      // image: data.image,
      location: data.location,
      title: data.title,
      bio: data.bio,
    };

    try {
      // Update user fields
      await AxiosInstance.patch(`users/${user.user_id}/`, updatedUser);

      // Update profile fields
      const res = await AxiosInstance.patch(
        `doctors/${doctor.id}/`,
        updatedProfile
      );

      if (res.status === 200) {
        toast.success("Profile updated successfully!");
        getDoctor(); // refresh
      } else {
        toast.error("Failed to update profile.");
      }
    } catch (error) {
      console.error(error);
      toast.error("Error occurred while updating profile.");
    }
  };

  return (
    <section style={{ backgroundColor: "#eee" }}>
      <div className="container py-5">
        {loading ? (
          <Spinner />
        ) : (
          <div className="row">
            <div className="col-lg-4">
              <div className="card mb-4">
                <div className="card-body text-center">
                  <img
                    src={doctor.image}
                    alt="avatar"
                    className="rounded-circle img-fluid"
                    style={{ width: 150 }}
                  />
                  <h5 className="my-3">
                    {doctor.user.first_name} {doctor.user.last_name}
                  </h5>
                  <h6 className="text-primary">
                    {doctor.department}
                  </h6>
                  <p className="text-muted mb-4">{doctor.title}</p>
                  <div className="d-flex justify-content-center mb-2">
                    {user &&
                    user.role == "DOCTOR" &&
                    user.profile_id == doctor.id ? (
                      <>
                        <button
                          className="btn btn-outline-dark"
                          onClick={logoutUser}
                        >
                          Logout
                        </button>
                        <button
                          className="btn btn-outline-primary ms-1"
                          type="button"
                          data-bs-target="#editProfileModal"
                          data-bs-toggle="modal"
                        >
                          Edit Profile
                        </button>
                      </>
                    ) : (
                      <>
                        <button
                          type="button"
                          data-mdb-button-init=""
                          data-mdb-ripple-init=""
                          className="btn btn-primary"
                        >
                          Appoinemnt
                        </button>
                        
                      </>
                    )}
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-8">
              <div className="card mb-4">
                <div className="card-body">
                  <div className="row">
                    <div className="col-sm-3">
                      <p className="mb-0">Full Name</p>
                    </div>
                    <div className="col-sm-9">
                      <p className="text-muted mb-0">
                        {doctor.user.first_name} {doctor.user.last_name}
                      </p>
                    </div>
                  </div>
                  <hr />
                  <div className="row">
                    <div className="col-sm-3">
                      <p className="mb-0">Email</p>
                    </div>
                    <div className="col-sm-9">
                      <p className="text-muted mb-0">{doctor.user.email}</p>
                    </div>
                  </div>
                  <hr />
                  <div className="row">
                    <div className="col-sm-3">
                      <p className="mb-0">Bio</p>
                    </div>
                    <div className="col-sm-9">
                      <p className="text-muted mb-0">{doctor.bio}</p>
                    </div>
                  </div>
                  <hr />
                  <div className="row">
                    <div className="col-sm-3">
                      <p className="mb-0">Mobile</p>
                    </div>
                    <div className="col-sm-9">
                      <p className="text-muted mb-0">{doctor.user.phone}</p>
                    </div>
                  </div>
                  <hr />
                  <div className="row">
                    <div className="col-sm-3">
                      <p className="mb-0">Address</p>
                    </div>
                    <div className="col-sm-9">
                      <p className="text-muted mb-0">{doctor.location}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="col-lg-4">
              {/* Reviews & Social Links */}
              <div className="card mb-4 mb-lg-0">
                <div className="card-body p-0">
                  <ul className="list-group list-group-flush rounded-3">
                    <li className="list-group-item d-flex justify-content-between align-items-center p-3">
                      <i className="fas fa-star fa-lg text-warning" />
                      <p className="mb-0">4.9 (220 Reviews)</p>
                    </li>
                    <li className="list-group-item d-flex justify-content-between align-items-center p-3">
                      <i className="fa fa-users fa-lg text-body" />
                      <p className="mb-0">360 Patient</p>
                    </li>
                    <li className="list-group-item d-flex justify-content-between align-items-center p-3">
                      <i
                        className="fab fa-twitter fa-lg"
                        style={{ color: "#55acee" }}
                      />
                      <p className="mb-0">
                        <a target="_blank" href="https://www.x.com/">
                          https://www.x.com/
                        </a>
                      </p>
                    </li>
                    <li className="list-group-item d-flex justify-content-between align-items-center p-3">
                      <i
                        className="fab fa-instagram fa-lg"
                        style={{ color: "#ac2bac" }}
                      />
                      <p className="mb-0">
                        <a target="_blank" href="https://www.instagram.com/">
                          https://www.instagram.com/
                        </a>
                      </p>
                    </li>
                    <li className="list-group-item d-flex justify-content-between align-items-center p-3">
                      <i
                        className="fab fa-facebook-f fa-lg"
                        style={{ color: "#3b5998" }}
                      />
                      <p className="mb-0">
                        <a target="_blank" href="https://www.facebook.com/">
                          https://www.facebook.com/
                        </a>
                      </p>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            <div className="col-lg-8">
              {/* Doctor Personal Appointments  */}
              {user &&
                user.role == "DOCTOR" &&
                user.profile_id == doctor.id && (
                  <>
                    {/* Appointments  */}
                    <h4 className="text-center">Appointments</h4>
                    <div className="row my-2">
                      <div className="col-12">
                        <PatientsAppointments />
                      </div>
                    </div>
                  </>
                )}

              {/* Current Logged in pateint Appoinemnts */}
              {user && user.role == "PATIENT" && (
                <>
                  {/* Appointments  */}
                  <h4 className="text-center">
                    Your Appoinments With {doctor.user.first_name} {doctor.user.last_name}
                  </h4>
                  <div className="row my-2">
                    <div className="col-12">
                      <PatientsAppointments />
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
        )}
      </div>
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
                  Edit Profile
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
                        First Name
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
                      <label htmlFor="dob" className="text-muted">
                        Date of birth
                      </label>
                      <input
                        type="date"
                        name="dob"
                        id="dob"
                        className="form-control"
                        {...register("dob", { required: true })}
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
                    <div className="col-md-6">
                      <label htmlFor="location" className="text-muted">
                        Location
                      </label>
                      <input
                        type="text"
                        name="location"
                        id="location"
                        className="form-control"
                        {...register("location", { required: true })}
                      />
                    </div>
                    <div className="col-md-6">
                      <label htmlFor="title" className="text-muted">
                        Title
                      </label>
                      <input
                        type="text"
                        name="title"
                        id="title"
                        className="form-control"
                        {...register("title", { required: true })}
                      />
                    </div>
                    <div className="col-md-6">
                      <label htmlFor="bio" className="text-muted">
                        Bio
                      </label>
                      <input
                        type="text"
                        name="bio"
                        id="bio"
                        className="form-control"
                        {...register("bio", { required: true })}
                      />
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
                    type="submit"
                    className="btn btn-primary"
                    onClick={handleSubmit(update)}
                    data-bs-dismiss="modal"
                  >
                    Save changes
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </>
    </section>
  );
};

export default DoctorProfile;