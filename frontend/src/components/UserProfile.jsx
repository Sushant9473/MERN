import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import ProfilePhoto from "../assets/ProfilePhoto.png";
import {
  useUpdateUserMutation,
  useGetUserDetailsQuery,
  useLogoutMutation,
} from "../redux/api/usersApiSlice";
import { logout as logoutAction } from "../redux/features/auth/authSlice";
import { RxExit } from "react-icons/rx";
import { IoIosNotificationsOutline } from "react-icons/io";

function UserProfile() {
  const [userName, setUserName] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [updateUser, { isLoading: isUpdating }] = useUpdateUserMutation();
  const [logout] = useLogoutMutation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const {
    data: userDetails,
    isLoading: isLoadingDetails,
    refetch,
  } = useGetUserDetailsQuery();

  useEffect(() => {
    if (userDetails) {
      setUserName(userDetails.username || "");
      setUserEmail(userDetails.email || "");
    }
  }, [userDetails]);

  const handleUserNameChange = (text) => {
    setUserName(text);
  };

  const handleSave = async () => {
    try {
      await updateUser({ username: userName }).unwrap();
      alert("Username updated successfully!");
      refetch();
    } catch (err) {
      console.error("Failed to update username:", err);
      alert("Failed to update username. Please try again.");
    }
  };

  const handleLogout = async () => {
    try {
      await logout().unwrap();
      // Dispatch the logout action to clear userInfo from the Redux store
      dispatch(logoutAction());
      // Clear any authentication tokens from local storage
      localStorage.removeItem("userToken"); // Adjust this key based on your actual token storage
      // Use replace instead of navigate to prevent going back
      navigate("/", { replace: true });
      // Optionally, you can reload the page to ensure a fresh state
      window.location.reload();
    } catch (err) {
      console.error("Failed to logout:", err);
      alert("Failed to logout. Please try again.");
    }
  };

  if (isLoadingDetails) {
    return <div>Loading user details...</div>;
  }
  return (
    <>
      <RxExit
        size={45}
        color="red"
        className="absolute right-[3rem] top-[6.5rem] cursor-pointer"
        onClick={handleLogout}
      />
      <IoIosNotificationsOutline
        size={50}
        className="absolute right-[8rem] top-[6.5rem]"
      />
      <div className="mr-20">
        <div className="nav flex mt-10 items-center justify-between">
          <div className="flex items-center ">
            <p className="text-[4vh] font-semibold ">Account Settings</p>
          </div>
        </div>
        <div className="profile flex items-center gap-10 mt-16">
          <img
            src={ProfilePhoto}
            alt=""
            className="rounded-full h-[151px] w-[151px]"
          />
          <div className="flex w-[60%] gap-20">
            <div>
              <label
                htmlFor="userName"
                className="block text-gray-700 font-semibold mb-2"
              >
                User Name
              </label>
              <input
                type="text"
                id="userName"
                value={userName}
                onChange={(e) => handleUserNameChange(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
              />
            </div>
            <div>
              <label
                htmlFor="userEmail"
                className="block text-gray-700 font-semibold mb-2"
              >
                User Email
              </label>
              <input
                disabled
                type="text"
                id="userEmail"
                value={userEmail}
                readOnly
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
              />
            </div>
          </div>
        </div>
        <div className="mt-4">
          <button
            onClick={handleSave}
            disabled={isUpdating}
            className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
          >
            {isUpdating ? "Saving..." : "Save Changes"}
          </button>
        </div>
        <p className="text-[4vh] font-semibold mt-20">Subscriptions</p>
        <div className="w-[full] mt-20">
          <div className="flex justify-between bg-red-400 px-20 py-3  bg-gradient-to-r from-white to-[#edd9ff] rounded-[13.42px] shadow border border-purple-700">
            <p className="text-[4vh]">
              Oops! You don't have any active plans. Upgrade now!
            </p>
            <button className="border px-10 bg-[#7e22ce] text-white font-semibold rounded-xl">
              Upgrade
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default UserProfile;
