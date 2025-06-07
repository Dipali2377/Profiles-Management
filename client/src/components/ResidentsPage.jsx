import React, { useEffect, useState } from "react";
import axios from "axios";
import "./ResidentsPage.css";
import { toast } from "react-toastify";
import dummyImg from "../assets/dummyimg.webp";

const baseURL =
  import.meta.env.VITE_API_BASE_URL ||
  "https://profiles-management.onrender.com";

const ResidentsPage = () => {
  const [profiles, setProfiles] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [dataLoaded, setDataLoading] = useState(false);
  const [formData, setFormData] = useState({
    firstname: "",
    lastname: "",
    role: "",
    image: "",
    linkedin: "",
    twitter: "",
  });

  useEffect(() => {
    fetchProfiles();
  }, []);

  const fetchProfiles = async () => {
    try {
      const response = await axios.get(`${baseURL}/profiles/allprofiles`);
      setProfiles(response.data);
    } catch (error) {
      console.error("Error fetching profiles:", error);
    }
    setDataLoading(true);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      !formData.firstname.trim() ||
      !formData.lastname.trim() ||
      !formData.role.trim()
    ) {
      toast.error("Please fill in all required fields.");
      return;
    }

    try {
      setLoading(true);

      await axios.post(`${baseURL}/profiles/addprofile`, formData);
      toast.success("Profile added successfully");
      setLoading(false);
      setShowModal(false);
      setFormData({
        firstname: "",
        lastname: "",
        role: "",
        image: "",
        linkedin: "",
        twitter: "",
      });
      fetchProfiles();
    } catch (error) {
      console.error("Error adding profile:", error);
      toast.error("Failed to add profile. Please try again.");
      setLoading(false);
    }
  };

  if (!dataLoaded) {
    return (
      <div className="loading-container">
        <div className="spinner"></div>
        <p className="loading-text">Fetching profiles...</p>
      </div>
    );
  }

  return (
    <div className="residents-container">
      <div className={`profiles-list ${showModal ? "blur" : ""}`}>
        {profiles.length === 0 && <p>No profiles found. Add some residents!</p>}

        {profiles.map((profile) => (
          <div key={profile._id} className="profile-card">
            <img
              src={profile.image ? profile.image : dummyImg}
              alt={`${profile.firstname} ${profile.lastname}`}
              className="profile-image"
            />
            <h3 className="profile-name">
              {profile.firstname} {profile.lastname}
            </h3>
            <p className="profile-role">{profile.role}</p>
            <div className="social-icons">
              {profile.linkedin && (
                <a
                  href={profile.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="LinkedIn"
                >
                  <img
                    src="data:image/png;base64,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"
                    alt="LinkedIn"
                  />
                </a>
              )}
              {profile.twitter && (
                <a
                  href={profile.twitter}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Twitter"
                >
                  <img
                    src="data:image/png;base64,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"
                    alt="Twitter"
                  />
                </a>
              )}
            </div>
          </div>
        ))}
      </div>

      <button
        className="add-profile-btn"
        onClick={() => setShowModal(true)}
        aria-label="Add Profile"
      >
        + Add Profile
      </button>

      {showModal && (
        <div className="modal-overlay" onClick={() => setShowModal(false)}>
          <form
            className="modal-form"
            onClick={(e) => e.stopPropagation()}
            onSubmit={handleSubmit}
          >
            <h2>Add New Resident</h2>

            <input
              type="text"
              name="firstname"
              placeholder="First Name *"
              value={formData.firstname}
              onChange={handleInputChange}
              required
            />
            <input
              type="text"
              name="lastname"
              placeholder="Last Name *"
              value={formData.lastname}
              onChange={handleInputChange}
              required
            />
            <input
              type="text"
              name="role"
              placeholder="Title / Role *"
              value={formData.role}
              onChange={handleInputChange}
              required
            />

            <input
              type="url"
              name="image"
              placeholder="Image URL"
              value={formData.image}
              onChange={handleInputChange}
            />
            <input
              type="url"
              name="linkedin"
              placeholder="LinkedIn URL"
              value={formData.linkedin}
              onChange={handleInputChange}
            />
            <input
              type="url"
              name="twitter"
              placeholder="Twitter URL"
              value={formData.twitter}
              onChange={handleInputChange}
            />

            <div className="modal-actions">
              <button
                type="button"
                className="modal-btn cancel-btn"
                onClick={() => setShowModal(false)}
              >
                Cancel
              </button>
              <button
                type="submit"
                className="modal-btn submit-btn"
                disabled={!!loading}
              >
                {loading ? (
                  <>
                    <span className="add-btn-spinner"></span> Adding Profile
                  </>
                ) : (
                  "Add"
                )}
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default ResidentsPage;
