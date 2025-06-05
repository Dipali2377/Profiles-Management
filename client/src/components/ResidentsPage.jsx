import React, { useEffect, useState } from "react";
import axios from "axios";
import "./ResidentsPage.css";
// import { toast } from "react-toastify";

const baseURL =
  import.meta.env.VITE_API_BASE_URL ||
  "https://profiles-management.onrender.com";

const ResidentsPage = () => {
  const [profiles, setProfiles] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [imageFile, setImageFile] = useState(null);
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
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleImageChange = (e) => {
    setImageFile(e.target.files[0]);
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
      let profileData = { ...formData };

      if (imageFile) {
        const uploadFormData = new FormData();
        uploadFormData.append("profile", imageFile);

        const uploadResponse = await axios.post(
          `${baseURL}/upload`,
          uploadFormData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );

        if (uploadResponse.data.success) {
          profileData.image = uploadResponse.data.image_url;
        } else {
          toast.error("Image upload failed");
          return;
        }
      }

      await axios.post(`${baseURL}/profiles/addprofile`, profileData);
      toast.success("Profile added successfully");
      setShowModal(false);
      setFormData({
        firstname: "",
        lastname: "",
        role: "",
        image: "",
        linkedin: "",
        twitter: "",
      });
      setImageFile(null);
      fetchProfiles();
    } catch (error) {
      console.error("Error adding profile:", error);
      toast.error("Failed to add profile. Please try again.");
    }
  };

  return (
    <div className="residents-container">
      <div className={`profiles-list ${showModal ? "blur" : ""}`}>
        {profiles.length === 0 && <p>No profiles found. Add some residents!</p>}

        {profiles.map((profile) => (
          <div key={profile._id} className="profile-card">
            <img
              src={
                profile.image
                  ? profile.image
                  : "https://via.placeholder.com/150?text=No+Image"
              }
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
                    src="https://cdn-icons-png.flaticon.com/512/174/174857.png"
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
                    src="https://cdn-icons-png.flaticon.com/512/733/733579.png"
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
            {/* Replace text input with file input */}
            <input type="file" accept="image/*" onChange={handleImageChange} />
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
              <button type="submit" className="modal-btn submit-btn">
                Add
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default ResidentsPage;
