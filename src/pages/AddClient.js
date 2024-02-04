import { auth, db, storage } from "@/db/firebase";
import { ref, getDownloadURL, uploadBytes } from "@firebase/storage";
import {
  createUserWithEmailAndPassword,
  sendPasswordResetEmail,
} from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AddClient = () => {
  const [companyName, setCompanyName] = useState("");
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [password, setPassword] = useState("");
  const [country, setCountry] = useState("");
  const [countryCurrency, setCountryCurrency] = useState("");
  const [genre, setGenre] = useState("");

  const isFormValid = () => {
    return (
      companyName &&
      userName &&
      email &&
      phoneNumber &&
      password &&
      country &&
      countryCurrency &&
      genre
    );
  };

  const handleResetPassword = async () => {
    try {
      await sendPasswordResetEmail(auth, email);
      toast.success("successfully send recovery email");
    } catch (error) {
      console.error("Error sending password reset email", error.message);
      toast.error(`Error: ${error.message}`, {
        position: toast.POSITION.TOP_CENTER,
      });
    }
  };
  // things updated
  const handleSignup = async () => {
    try {
      // 1. Create user in Firebase Authentication
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;

      // 2. Create user document in Firestore
      const userDocRef = doc(db, "users", user.uid);

      function getCurrentDate() {
        const today = new Date();
        const day = String(today.getDate()).padStart(2, "0"); // Get the day and pad with leading zero if needed
        const month = String(today.getMonth() + 1).padStart(2, "0"); // Get the month (months are zero-based) and pad with leading zero
        const year = today.getFullYear(); // Get the full year

        const formattedDate = `${day}/${month}/${year}`;
        return formattedDate;
      }

      const currentDate = getCurrentDate();

      await setDoc(userDocRef, {
        companyName,
        userName,
        email,
        phoneNumber,
        country,
        countryCurrency,
        genre,
        status: "Active",
        date: currentDate,
        id: user.uid,
      });

      // Clear form data
      toast.success("successfully uploaded");
      await handleResetPassword();
      setCompanyName("");
      setUserName("");
      setEmail("");
      setPhoneNumber("");
      setPassword("");
      setCountry("");
      setCountryCurrency("");
      setGenre("");
    } catch (error) {
      // Show error toast
      toast.error(`Error: ${error.message}`, {
        position: toast.POSITION.TOP_CENTER,
      });
      console.error("Error creating user:", error.message);
    }
  };

  return (
    <div className=" mt-8 p-6 bg-white rounded-lg shadow-lg">
      <h2 className="text-3xl font-semibold mb-4 text-center">Signup</h2>
      <form>
        <div className="mb-4">
          <label
            className="block text-gray-800 text-sm font-bold mb-2"
            htmlFor="name"
          >
            Company Name:
          </label>
          <input
            className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
            type="text"
            id="companyName"
            value={companyName}
            onChange={(e) => setCompanyName(e.target.value)}
          />
        </div>
        <div className="mb-4">
          <label
            className="block text-gray-800 text-sm font-bold mb-2"
            htmlFor="name"
          >
            User Name:
          </label>
          <input
            className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
            type="text"
            id="userName"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
          />
        </div>
        <div className="mb-4">
          <label
            className="block text-gray-800 text-sm font-bold mb-2"
            htmlFor="email"
          >
            Email:
          </label>
          <input
            className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="mb-4">
          <label
            className="block text-gray-800 text-sm font-bold mb-2"
            htmlFor="phoneNumber"
          >
            Phone Number:
          </label>
          <input
            className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
            type="tel"
            id="phoneNumber"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
          />
        </div>
        <div className="mb-4">
          <label
            className="block text-gray-800 text-sm font-bold mb-2"
            htmlFor="password"
          >
            Password:
          </label>
          <input
            className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div className="mb-4">
          <label
            className="block text-gray-800 text-sm font-bold mb-2"
            htmlFor="country"
          >
            Country:
          </label>
          <input
            className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
            type="text"
            id="country"
            value={country}
            onChange={(e) => setCountry(e.target.value)}
          />
        </div>
        <div className="mb-4">
          <label
            className="block text-gray-800 text-sm font-bold mb-2"
            htmlFor="country"
          >
            Country Currency:
          </label>
          <input
            className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
            type="text"
            id="country"
            placeholder="NPR, INR, etc."
            value={countryCurrency} // Use the original value here
            onChange={(e) => setCountryCurrency(e.target.value.toUpperCase())} // Apply toUpperCase in the onChange handler
          />
        </div>
        <div className="mb-4">
          <label
            className="block text-gray-800 text-sm font-bold mb-2"
            htmlFor="genre"
          >
            Genre/Category:
          </label>
          <input
            className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
            type="text"
            id="genre"
            value={genre}
            onChange={(e) => setGenre(e.target.value)}
          />
        </div>
        <button
          className={`${
            isFormValid()
              ? "bg-blue-500 hover:bg-blue-700 cursor-pointer"
              : "bg-gray-300 cursor-not-allowed"
          } text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline-blue w-full`}
          type="button"
          onClick={handleSignup}
          disabled={!isFormValid()}
        >
          Add a Business
        </button>
      </form>
      <ToastContainer />
    </div>
  );
};

export default AddClient;
