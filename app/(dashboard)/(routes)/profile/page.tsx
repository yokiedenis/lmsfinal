"use client";

import React, { useEffect, useState } from "react";
import { useUser } from "@clerk/clerk-react";

// Define the props for the UserProfile component
type UserProfileProps = {
  name: string;
  email: string;
  dob?: string;
  occupation?: string;
  bio?: string;
  imageUrl?: string;
  role: string; // Role of the user
};

// Component to display user profile
const UserProfile: React.FC<UserProfileProps> = ({
  name,
  email,
  dob,
  occupation,
  bio,
  imageUrl,
  role,
}) => (
  <div className="max-w-4xl mx-auto bg-gray-900 text-white shadow-lg rounded-lg p-8 mt-10">
    <div className="text-center">
      <img
        src={imageUrl || "/default-avatar.png"}
        alt="Profile"
        className="w-32 h-32 mx-auto rounded-full border-4 border-teal-500 shadow-md"
      />
      <h1 className="text-2xl font-bold mt-4">{name}</h1>
      <p className="text-sm text-gray-400">{email}</p>
      <p className="text-sm text-gray-400 mt-2">Role: {role}</p>
    </div>
    <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
      {dob && (
        <div className="bg-gray-800 p-4 rounded-md shadow">
          <p className="text-sm text-gray-400">Date of Birth</p>
          <p className="text-lg font-semibold">{dob}</p>
        </div>
      )}
      {occupation && (
        <div className="bg-gray-800 p-4 rounded-md shadow">
          <p className="text-sm text-gray-400">Occupation</p>
          <p className="text-lg font-semibold">{occupation}</p>
        </div>
      )}
      {bio && (
        <div className="bg-gray-800 p-4 rounded-md shadow col-span-full">
          <p className="text-sm text-gray-400">Bio</p>
          <p className="text-lg font-semibold">{bio}</p>
        </div>
      )}
    </div>
  </div>
);

// Main Profile Page component
const ProfilePage = () => {
  const { user } = useUser();
  const [loading, setLoading] = useState(true);
  const [profileData, setProfileData] = useState<any>(null);
  const [saveMessage, setSaveMessage] = useState<string | null>(null);
  const [showProfile, setShowProfile] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    dob: "",
    occupation: "",
    bio: "",
    role: "STUDENT",
    email: "",
    imageUrl: "",
  });

  // Effect to fetch profile data when user is available
  useEffect(() => {
    if (!user) return;

    const fetchProfile = async () => {
      try {
        const res = await fetch(`/api/profile?userId=${user.id}`);
        if (res.ok) {
          const data = await res.json();
          if (data) {
            setProfileData(data);
            setFormData({
              name: data.name || "",
              dob: data.dob ? new Date(data.dob).toISOString().split("T")[0] : "",
              occupation: data.occupation || "",
              bio: data.bio || "",
              role: data.role || "STUDENT",
              email: data.email || user.primaryEmailAddress?.emailAddress || "",
              imageUrl: data.imageUrl || user.imageUrl || "/default-avatar.png",
            });
            setShowProfile(true); // Show profile if data exists
          } else {
            setShowProfile(false); // No profile data, show form to create one
          }
        } else {
          setShowProfile(false);
        }
      } catch (error) {
        console.error("Error fetching profile:", error);
        setShowProfile(false); // In case of an error, show form
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [user]);

  // Handle changes in form inputs
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle image file change
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData({ ...formData, imageUrl: reader.result as string });
      };
      reader.readAsDataURL(file);
    }
  };

  // Handle role change in select input
  const handleRoleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setFormData({ ...formData, role: e.target.value });
  };

  // Save user profile data
  const handleSave = async () => {
    if (!user) return;

    try {
      const response = await fetch(`/api/profile`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userId: user.id,
          ...formData,
        }),
      });

      if (response.ok) {
        const savedData = await response.json();
        setProfileData(savedData);
        setSaveMessage("Your profile information has been saved successfully!");
        setTimeout(() => setSaveMessage(null), 3000);
        setShowProfile(true); // Show the profile after saving
      } else {
        const errorText = await response.text();
        console.error("Error saving profile:", errorText);
      }
    } catch (error) {
      console.error("Error saving profile:", error);
    }
  };

  // Render based on user login and data loading state
  if (!user) {
    return <p className="text-center text-gray-500 mt-20">User not logged in.</p>;
  }

  if (loading) {
    return <p className="text-center text-gray-500 mt-20">Loading...</p>;
  }

  // Conditional rendering based on whether profile data exists and if user wants to see or edit profile
  return (
    <div className="min-h-screen bg-gray-900 text-white p-6">
      {saveMessage && (
        <div className="bg-green-500 text-white p-2 mb-4 rounded-md text-center">
          {saveMessage}
        </div>
      )}
      {showProfile ? (
        <>
          <UserProfile
            name={formData.name}
            email={formData.email}
            dob={formData.dob}
            occupation={formData.occupation}
            bio={formData.bio}
            imageUrl={formData.imageUrl}
            role={formData.role}
          />
          {/* Button to toggle back to edit mode */}
          <button 
            onClick={() => setShowProfile(false)} 
            className="bg-teal-500 text-white px-4 py-2 rounded-md hover:bg-teal-600 mt-4"
          >
            Edit Profile
          </button>
        </>
      ) : (
        <div className="max-w-4xl mx-auto bg-gray-900 shadow-lg rounded-lg p-8 mt-10">
          <h1 className="text-2xl font-bold mb-6">
            {profileData ? "Edit Your Profile" : "Complete Your Profile"}
          </h1>
          <form className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Form inputs for user profile */}
            <div>
              <label className="block text-gray-400 text-sm">Name</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                className="w-full p-2 bg-gray-800 text-white rounded-md border border-gray-700"
              />
            </div>
            <div>
              <label className="block text-gray-400 text-sm">Email</label>
              <input
                type="text"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                className="w-full p-2 bg-gray-800 text-white rounded-md border border-gray-700"
               // readOnly
              />
            </div>
            <div>
              <label className="block text-gray-400 text-sm">Date of Birth</label>
              <input
                type="date"
                name="dob"
                value={formData.dob}
                onChange={handleInputChange}
                className="w-full p-2 bg-gray-800 text-white rounded-md border border-gray-700"
              />
            </div>
            <div>
              <label className="block text-gray-400 text-sm">Occupation</label>
              <input
                type="text"
                name="occupation"
                value={formData.occupation}
                onChange={handleInputChange}
                className="w-full p-2 bg-gray-800 text-white rounded-md border border-gray-700"
              />
            </div>
            <div className="col-span-full">
              <label className="block text-gray-400 text-sm">Bio</label>
              <textarea
                name="bio"
                value={formData.bio}
                onChange={handleInputChange}
                className="w-full p-2 bg-gray-800 text-white rounded-md border border-gray-700"
                rows={4}
              />
            </div>
            <div className="col-span-full">
              <label className="block text-gray-400 text-sm">Profile Image</label>
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="w-full p-2 bg-gray-800 text-white rounded-md border border-gray-700"
              />
            </div>
            <div>
              <label className="block text-gray-400 text-sm">Role</label>
              <select
                name="role"
                value={formData.role}
                onChange={handleRoleChange}
                className="w-full p-2 bg-gray-800 text-white rounded-md border border-gray-700"
              >
                <option value="ADMIN">Admin</option>
                <option value="TEACHER">Teacher</option>
                <option value="STUDENT">Student</option>
              </select>
            </div>
          </form>
          <div className="col-span-full flex space-x-4 justify-center mt-4">
            <button
              type="button"
              onClick={handleSave}
              className="bg-teal-500 text-white px-4 py-2 rounded-md hover:bg-teal-600"
            >
              Save
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProfilePage;