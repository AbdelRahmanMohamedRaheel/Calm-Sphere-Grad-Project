import { useContext, useEffect, useState } from "react";
import AxiosInstance from "../utils/AxiosInstance";
import Spinner from "../Components/Spinner";
import AuthContext from "../Context/AuthContext";
import { Link } from "react-router-dom";

const EditProfile = () => {
  let { user, logoutUser } = useContext(AuthContext);
  let [profile, setProfile] = useState([]);
  let [loading, setLoading] = useState(true);

  const [countries, setCountries] = useState([]);
  const [cities, setCities] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState("");
  const [selectedCity, setSelectedCity] = useState("");
  const [loadingCities, setLoadingCities] = useState(false);

  let getProfile = async () => {
    let response = await AxiosInstance.get(`users/${user.user_id}/`);
    setProfile(response.data);
    setLoading(false);
  };

  let getCountries = async () => {
    let response = await AxiosInstance.get(`countries/`);
    setCountries(response.data);
    setLoading(false);
  };

  // Fetch Cities When Country Changes
  const handleCountryChange = (event) => {
    const countryId = event.target.value;
    setSelectedCountry(countryId);
    setSelectedCity(""); // Reset city selection
    setCities([]); // Clear cities

    if (!countryId) return; // If no country is selected, return

    setLoadingCities(true);
    let getCities = async () => {
      let response = await AxiosInstance.get(`cities?country_id=${countryId}`);
      setCities(response.data);
      setLoadingCities(false);
    };
    getCities();
  };

  useEffect(() => {
    getProfile();
    getCountries();
  }, []);

  return (
    <div className="container my-2">
      {loading ? (
        <Spinner />
      ) : (
        <section>
          <form>
            <div className="mb-3">
              <div className="row">
                {/* first name */}
                <div className="col-md-3">
                  <label htmlFor="first_name" className="form-label">
                    First Name
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="first_name"
                    value={profile.first_name}
                  />
                </div>

                {/* last name */}
                <div className="col-md-3">
                  <label htmlFor="last_name" className="form-label">
                    Last Name
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="last_name"
                    value={profile.last_name}
                  />
                </div>

                {/* Headline */}
                <div className="col-md-6">
                  <label htmlFor="headline" className="form-label">
                    Headline{" "}
                    <span className="text-muted">
                      (words about your professional background)
                    </span>
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="headline"
                    value={profile.headline}
                  />
                </div>

                {/* Email */}
                <div className="col-md-3">
                  <label htmlFor="email" className="form-label">
                    Email address
                  </label>
                  <input
                    type="email"
                    className="form-control"
                    id="email"
                    value={profile.email}
                  />
                </div>

                {/* Phone */}
                <div className="col-md-3">
                  <label htmlFor="phone" className="form-label">
                    Phone
                  </label>
                  <input
                    type="phone"
                    className="form-control"
                    id="phone"
                    value={profile.phone}
                  />
                </div>

                {/* Country */}
                <div className="col-md-3">
                  <label htmlFor="country" className="form-label">
                    Country
                  </label>
                  <select
                    name="country"
                    id="country"
                    className="form-select"
                    value={selectedCountry}
                    onChange={handleCountryChange}
                  >
                    <option value="">---</option>
                    {countries.map((country) => (
                      <option key={country.id} value={country.id}>
                        {country.name}
                      </option>
                    ))}
                  </select>
                </div>

                {/* City */}
                <div className="col-md-3">
                  <label htmlFor="city" className="form-label">
                    City
                  </label>
                  <select
                    value={selectedCity}
                    onChange={(e) => setSelectedCity(e.target.value)}
                    disabled={!selectedCountry}
                    className="form-control"
                  >
                    <option value="">---</option>
                    {loadingCities ? (
                      <option>Loading cities...</option>
                    ) : (
                      cities.map((city) => (
                        <option key={city.id} value={city.id}>
                          {city.name}
                        </option>
                      ))
                    )}
                  </select>
                </div>

                {/* Bio */}
                <div className="col-md-6">
                  <label htmlFor="bio" className="form-label">
                    Bio
                  </label>
                  <textarea name="bio" rows={3} className="form-control">
                    {profile.bio}
                  </textarea>
                </div>
                <div className="col-md-6 d-felx align-items-center text-center">
                  <div className="my-2">
                    {profile.profile_picture ? (
                      <img
                        src={profile.profile_picture}
                        alt=""
                        width={150}
                        height={150}
                        className="rounded-circle my-2"
                      />
                    ) : (
                      <img
                        src="../../src/assets/logo.jpg"
                        alt=""
                        width={150}
                        height={150}
                      />
                    )}
                    <input
                      type="file"
                      className="form-control"
                      id="customFile"
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="text-center">
              <button type="submit" className="btn btn-primary">
                Save
              </button>
            </div>
          </form>
        </section>
      )}
    </div>
  );
};

export default EditProfile;
