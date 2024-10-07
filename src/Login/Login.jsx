// import logodark from "../assets/logo-dark.svg";
import logolight from "../assets/logo-light.svg";
import { useNavigate, Link } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";
import AlertModal from "../AlertModel/AlertModel";

// import { ThemeContext } from '../contexts/ThemeContext';

export default function Login() {
  const [visible, setVisible] = useState(false);
  const [usrEmail, setusrEmail] = useState("");
  const [usrPass, setusrPass] = useState("");
  const [name, setname] = useState("");
  const [classs, setclasss] = useState("");
  const [rollno, setrollno] = useState("");
  const [subject, setsubject] = useState("");
  const [semester, setsemester] = useState("");
  const [loading, setLoading] = useState(false); // Loading state for button
  const [modalOpen, setModalOpen] = useState(false); // Modal open state
  const [modalMessage, setModalMessage] = useState(""); // Modal message
  const [isError, setIsError] = useState(false); // Modal error state
  const [shouldNavigate] = useState(false);

  const navigate = useNavigate();
  // const handleLogout = () => {
  //   localStorage.removeItem("sessionId"); // Remove session ID from local storage
  //   navigate("/login"); // Redirect back to login page
  // };

  // useEffect(() => {
  //   // Check if session ID exists in local storage and is still valid
  //   const sessionId = localStorage.getItem("sessionId");
  //   if (sessionId) {
  //     // Verify the session ID with the backend
  //     axios
  //       .post("http://localhost:5000/teacher/verify-session", { sessionId })
  //       .then((response) => {
  //         if (response.data.valid) {
  //           navigate("/dashboard"); // Navigate to dashboard if session is valid
  //         } else {
  //           handleLogout();
  //         }
  //       })
  //       .catch(() => handleLogout());
  //   }
  // }, [navigate]);

  const closeModal = () => {
    setModalOpen(false);
    if (shouldNavigate) {
      navigate("/dashboard");
    }
  };

  const handleLogin = (e) => {
    e.preventDefault();
    setLoading(true);

    // Send login request to get OTP
    axios
      .post("http://localhost:5000/student/login", {
        email: usrEmail,
        password: usrPass,
        name: name,
        class: classs,
        rollno: rollno,
        subject: subject,
        semester: semester,
      })
      .then((response) => {
        setModalMessage(response.data.message);
        setModalOpen(true); // Open modal
        setIsError(false); // Show OTP input field
      })
      .catch((error) => {
        console.error(error);
        setModalMessage("please check your email or password");
        setIsError(true); // It's an error
        setModalOpen(true); // Open modal
      })
      .finally(() => {
        setLoading(false); // Set loading to false to enable the button
      });
  };

  return (
    <div
      className={`flex items-center justify-center min-h-screen bg-gray-100 dark:bg-background-dark bg-background-light`}
    >
      <div className="w-full max-w-lg shadow-[0px_0px_10px_#00000059;] dark:shadow-[0px_0px_10px_#ffffff7a;] p-8 space-y-6 rounded-lg shadow-md bg-container-light dark:bg-container-dark">
        <div className="flex flex-col items-center space-y-2">
          <img src={logolight} className={`${open && "w-20"} `} alt="" />
          <h1 className="text-2xl font-bold text-center text-black dark:text-white">
            Sign In to EduWiz
          </h1>
          <p className="text-gray-500 text-center text-black dark:text-white">
            Welcome back! Please sign in to continue.
          </p>
        </div>
        <form onSubmit={handleLogin} className="space-y-4 flex flex-col w-full">
          <div className="Name space-y-2 flex flex-col">
            <label
              htmlFor="Name"
              className="text-sm font-medium text-black dark:text-white"
            >
              Name
            </label>

            <div className="input relative w-full">
              <input
                type="text"
                placeholder="Enter Your Name"
                required
                value={name}
                onChange={(e) => setname(e.target.value)}
                className="w-full border p-2 pr-10 rounded-md border-gray text-black dark:bg-[#374151] dark:text-white bg-[#f8f9fa] outline-none" // Adjusted padding-right (pr-10) for icon spacing
              />
            </div>
            <div className="flex gap-4 w-full">
              <div className="space-y-2 flex flex-col">
                <label
                  htmlFor="email"
                  className="text-sm font-medium text-black dark:text-white"
                >
                  Email
                </label>
                <input
                  type="text"
                  placeholder="abc@xyz.pqr"
                  required
                  value={usrEmail}
                  onChange={(e) => setusrEmail(e.target.value)}
                  className="w-full border p-2 pr-10 rounded-md border-gray text-black dark:bg-[#374151] dark:text-white bg-[#f8f9fa] outline-none"
                />
              </div>
              <div className="space-y-2 flex flex-col">
                <label
                  htmlFor="password"
                  className="text-sm font-medium text-black dark:text-white"
                >
                  Password
                </label>

                <div className="relative w-full">
                  <input
                    type={visible ? "text" : "password"}
                    placeholder="Enter Your Password"
                    required
                    value={usrPass}
                    onChange={(e) => setusrPass(e.target.value)}
                    className="w-full border p-2 pr-10 rounded-md border-gray text-black dark:bg-[#374151] dark:text-white bg-[#f8f9fa] outline-none" // Adjusted padding-right (pr-10) for icon spacing
                  />
                  <span
                    onClick={() => setVisible(!visible)}
                    className="absolute right-2 top-2 cursor-pointer text-gray-500 dark:text-white mt-1"
                  >
                    {visible ? <FaEyeSlash /> : <FaEye />}
                  </span>
                </div>
              </div>
            </div>
            <div className="flex gap-4 w-full">
              <div className="space-y-2 flex flex-col">
                <label
                  htmlFor="class"
                  className="text-sm font-medium text-black dark:text-white"
                >
                  Class
                </label>
                <input
                  type="text"
                  placeholder="Enter Class"
                  required
                  value={classs}
                  onChange={(e) => setclasss(e.target.value)}
                  className="w-full border p-2 pr-10 rounded-md border-gray text-black dark:bg-[#374151] dark:text-white bg-[#f8f9fa] outline-none"
                />
              </div>
              <div className="space-y-2 flex flex-col">
                <label
                  htmlFor="Rollno"
                  className="text-sm font-medium text-black dark:text-white"
                >
                  RollNumber
                </label>

                <div className="relative w-full">
                  <input
                    type="text"
                    placeholder="IT-BATCH-ROLLNO"
                    required
                    value={rollno}
                    onChange={(e) => setrollno(e.target.value)}
                    className="w-full border p-2 pr-10 rounded-md border-gray text-black dark:bg-[#374151] dark:text-white bg-[#f8f9fa] outline-none" // Adjusted padding-right (pr-10) for icon spacing
                  />
                </div>
              </div>
            </div>
            <div className="flex gap-4 w-full">
              <div className="space-y-2 flex flex-col">
                <label
                  htmlFor="subject"
                  className="text-sm font-medium text-black dark:text-white"
                >
                  Subject
                </label>
                <input
                  type="text"
                  placeholder="Enter Subject"
                  required
                  value={subject}
                  onChange={(e) => setsubject(e.target.value)}
                  className="w-full border p-2 pr-10 rounded-md border-gray text-black dark:bg-[#374151] dark:text-white bg-[#f8f9fa] outline-none"
                />
              </div>
              <div className="space-y-2 flex flex-col">
                <label
                  htmlFor="Semester"
                  className="text-sm font-medium text-black dark:text-white"
                >
                  Semester
                </label>

                <div className="relative w-full">
                  <input
                    type="text"
                    placeholder="Enter current semester"
                    required
                    value={semester}
                    onChange={(e) => setsemester(e.target.value)}
                    className="w-full border p-2 pr-10 rounded-md border-gray text-black dark:bg-[#374151] dark:text-white bg-[#f8f9fa] outline-none" // Adjusted padding-right (pr-10) for icon spacing
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="w-full ">
            <div className="flex items-center justify-evenly">
              <Link
                to="/signup"
                className="text-sm text-primary-light dark:text-white font-bold hover:underline"
              >
                Create account
              </Link>
              <Link
                to="/forget_password"
                className="text-sm text-primary-light dark:text-white font-bold hover:underline"
              >
                Forgot password?
              </Link>
            </div>
            <div className="">
              <button
                disabled={loading}
                className="w-full bg-primary-light hover:bg-hover-light dark:bg-primary-dark dark:hover:bg-hover-dark text-white rounded-md p-2"
                type="submit"
              >
                {loading ? "Please wait..." : "Login"}
              </button>
            </div>
          </div>
        </form>
      </div>
      {/* Alert Modal */}
      <AlertModal
        isOpen={modalOpen}
        onClose={closeModal}
        message={modalMessage}
        isError={isError}
      />
    </div>
  );
}
