import { useState, useEffect } from "react";
import {
  Eye,
  EyeOff,
  ArrowLeft,
  User,
  Phone,
  Mail,
  Lock,
  Building,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import ThemeBtn from "../components/ThemeBtn";

const Register = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [isAgency, setIsAgency] = useState(true);
  const navigate = useNavigate();

  // Form state
  const [formData, setFormData] = useState({
    fullName: "",
    phoneNumber: "",
    email: "",
    password: "",
    companyName: "",
  });

  // Focus states for animations
  const [focusedField, setFocusedField] = useState("");

  useEffect(() => {
    // Trigger animations on mount with staggered delays
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 100);
    return () => clearTimeout(timer);
  }, []);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleFocus = (field) => {
    setFocusedField(field);
  };

  const handleBlur = () => {
    setFocusedField("");
  };

  // Check if form is valid
  const isFormValid =
    formData.fullName &&
    formData.phoneNumber &&
    formData.email &&
    formData.password;

  // Form field configuration
  const formFields = [
    {
      key: "fullName",
      label: "Full Name",
      type: "text",
      placeholder: "Marry Doe",
      icon: User,
      required: true,
    },
    {
      key: "phoneNumber",
      label: "Phone number",
      type: "tel",
      placeholder: "Marry Doe",
      icon: Phone,
      required: true,
    },
    {
      key: "email",
      label: "Email address",
      type: "email",
      placeholder: "Marry Doe",
      icon: Mail,
      required: true,
    },
    {
      key: "password",
      label: "Password",
      type: showPassword ? "text" : "password",
      placeholder: "Marry Doe",
      icon: Lock,
      required: true,
      hasToggle: true,
    },
    {
      key: "companyName",
      label: "Company name",
      type: "text",
      placeholder: "Marry Doe",
      icon: Building,
      required: false,
    },
  ];

  const handleRegister = () => {
    navigate("/profile", {
      state: {
        ...formData,
        isAgency,
      },
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-tr from-gray-50 via-blue-50 to-purple-50 dark:from-gray-900 dark:via-blue-900/10 dark:to-purple-900/10 transition-all duration-700 ease-in-out">
      {/* Theme Toggle Button */}
      <ThemeBtn isVisible={isVisible} />

      {/* Back Button */}
      <div className="fixed top-6 left-6 z-50">
        <button
          className={`p-3 rounded-full bg-white dark:bg-gray-800 shadow-lg hover:shadow-xl transform transition-all duration-300 hover:scale-110 hover:-translate-x-1 ${
            isVisible ? "translate-y-0 opacity-100" : "-translate-y-4 opacity-0"
          }`}
          style={{ transitionDelay: "900ms" }}
          onClick={() => navigate(-1)}
        >
          <ArrowLeft className="w-6 h-6 text-gray-700 dark:text-gray-300" />
        </button>
      </div>

      {/* Main Container */}
      <div className="flex items-start justify-center min-h-screen px-4 py-8">
        <div className="w-full max-w-lg mx-auto pt-16">
          {/* Header Section */}
          <div
            className={`text-left mb-8 transform transition-all duration-1000 ease-out ${
              isVisible
                ? "translate-y-0 opacity-100"
                : "translate-y-8 opacity-0"
            }`}
          >
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4 leading-tight">
              Create your <br />
              <span className="bg-gradient-to-r from-purple-600 to-blue-600 dark:from-purple-400 dark:to-blue-400 bg-clip-text text-transparent">
                PopX account
              </span>
            </h1>
          </div>

          {/* Registration Form */}
          <div className="space-y-6">
            {/* Form Fields */}
            {formFields.map((field, index) => (
              <div
                key={field.key}
                className={`transform transition-all duration-700 ease-out ${
                  isVisible
                    ? "translate-x-0 opacity-100"
                    : "translate-x-8 opacity-0"
                }`}
                style={{ transitionDelay: `${200 + index * 100}ms` }}
              >
                <label className="block text-purple-600 dark:text-purple-400 text-sm font-semibold mb-2">
                  {field.label}
                  {field.required && <span className="text-purple-500">*</span>}
                </label>
                <div className="relative group">
                  {/* Field Icon */}
                  <div className="absolute left-4 top-1/2 transform -translate-y-1/2 z-10">
                    <field.icon
                      className={`w-5 h-5 transition-colors duration-300 ${
                        focusedField === field.key || formData[field.key]
                          ? "text-purple-500 dark:text-purple-400"
                          : "text-gray-400 dark:text-gray-500"
                      }`}
                    />
                  </div>

                  <input
                    type={field.type}
                    value={formData[field.key]}
                    onChange={(e) =>
                      handleInputChange(field.key, e.target.value)
                    }
                    onFocus={() => handleFocus(field.key)}
                    onBlur={handleBlur}
                    placeholder={field.placeholder}
                    className={`w-full pl-12 pr-${
                      field.hasToggle ? "12" : "4"
                    } py-4 bg-white dark:bg-gray-800 border-2 rounded-2xl text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 transition-all duration-300 focus:outline-none ${
                      focusedField === field.key || formData[field.key]
                        ? "border-purple-500 dark:border-purple-400 shadow-lg transform scale-105 bg-purple-50/50 dark:bg-purple-900/20"
                        : "border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600"
                    }`}
                  />

                  {/* Password Toggle */}
                  {field.hasToggle && (
                    <button
                      type="button"
                      onClick={togglePasswordVisibility}
                      className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-purple-600 dark:hover:text-purple-400 transition-colors duration-200"
                    >
                      {showPassword ? (
                        <EyeOff className="w-5 h-5" />
                      ) : (
                        <Eye className="w-5 h-5" />
                      )}
                    </button>
                  )}

                  {/* Active Field Indicator */}
                  {(focusedField === field.key || formData[field.key]) && (
                    <div className="absolute -top-1 -right-1 w-3 h-3 bg-purple-500 rounded-full animate-ping opacity-75"></div>
                  )}
                </div>
              </div>
            ))}

            {/* Agency Selection */}
            <div
              className={`transform transition-all duration-700 ease-out ${
                isVisible
                  ? "translate-x-0 opacity-100"
                  : "translate-x-8 opacity-0"
              }`}
              style={{ transitionDelay: "700ms" }}
            >
              <label className="block text-gray-700 dark:text-gray-300 text-base font-medium mb-4">
                Are you an Agency?<span className="text-purple-500">*</span>
              </label>
              <div className="flex space-x-6">
                {/* Yes Option */}
                <label className="flex items-center cursor-pointer group">
                  <div className="relative">
                    <input
                      type="radio"
                      name="agency"
                      checked={isAgency}
                      onChange={() => setIsAgency(true)}
                      className="sr-only"
                    />
                    <div
                      className={`w-6 h-6 rounded-full border-2 transition-all duration-300 ${
                        isAgency
                          ? "border-purple-500 bg-purple-500"
                          : "border-gray-300 dark:border-gray-600 group-hover:border-purple-400"
                      }`}
                    >
                      {isAgency && (
                        <div className="absolute inset-0 flex items-center justify-center">
                          <div className="w-2 h-2 bg-white rounded-full animate-scale-in"></div>
                        </div>
                      )}
                    </div>
                  </div>
                  <span
                    className={`ml-3 font-medium transition-colors duration-200 ${
                      isAgency
                        ? "text-purple-600 dark:text-purple-400"
                        : "text-gray-700 dark:text-gray-300"
                    }`}
                  >
                    Yes
                  </span>
                </label>

                {/* No Option */}
                <label className="flex items-center cursor-pointer group">
                  <div className="relative">
                    <input
                      type="radio"
                      name="agency"
                      checked={!isAgency}
                      onChange={() => setIsAgency(false)}
                      className="sr-only"
                    />
                    <div
                      className={`w-6 h-6 rounded-full border-2 transition-all duration-300 ${
                        !isAgency
                          ? "border-purple-500 bg-purple-500"
                          : "border-gray-300 dark:border-gray-600 group-hover:border-purple-400"
                      }`}
                    >
                      {!isAgency && (
                        <div className="absolute inset-0 flex items-center justify-center">
                          <div className="w-2 h-2 bg-white rounded-full animate-scale-in"></div>
                        </div>
                      )}
                    </div>
                  </div>
                  <span
                    className={`ml-3 font-medium transition-colors duration-200 ${
                      !isAgency
                        ? "text-purple-600 dark:text-purple-400"
                        : "text-gray-700 dark:text-gray-300"
                    }`}
                  >
                    No
                  </span>
                </label>
              </div>
            </div>

            {/* Create Account Button */}
            <div
              className={`pt-8 transform transition-all duration-1000 ease-out ${
                isVisible
                  ? "translate-y-0 opacity-100"
                  : "translate-y-6 opacity-0"
              }`}
              style={{ transitionDelay: "800ms" }}
            >
              <button
                className={`w-full font-semibold py-4 px-6 rounded-2xl shadow-lg hover:shadow-xl transform transition-all duration-500 hover:scale-105 hover:-translate-y-1 active:scale-95 ${
                  isFormValid
                    ? "bg-gradient-to-r from-purple-600 to-blue-600 dark:from-purple-500 dark:to-blue-500 hover:from-purple-700 hover:to-blue-700 text-white"
                    : "bg-gray-300 dark:bg-gray-700 text-gray-500 dark:text-gray-400 cursor-not-allowed"
                }`}
                disabled={!isFormValid}
                onClick={handleRegister}
              >
                <span className="relative z-10 flex items-center justify-center">
                  Create Account
                  {isFormValid && (
                    <div className="ml-2 w-2 h-2 bg-white rounded-full animate-pulse"></div>
                  )}
                </span>
                {isFormValid && (
                  <div className="absolute inset-0 bg-gradient-to-r from-purple-400 to-blue-400 rounded-2xl opacity-0 hover:opacity-20 transition-opacity duration-300"></div>
                )}
              </button>
            </div>

            {/* Footer Links */}
            <div
              className={`pt-4 text-center transform transition-all duration-1000 ease-out ${
                isVisible
                  ? "translate-y-0 opacity-100"
                  : "translate-y-4 opacity-0"
              }`}
              style={{ transitionDelay: "900ms" }}
            >
              <button
                className="text-gray-600 dark:text-gray-400 hover:text-purple-600 dark:hover:text-purple-400 font-medium transition-colors duration-200"
                onClick={() => navigate("/login")}
              >
                Already have an account? Sign in
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Background Decorative Elements - Different pattern for registration */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-40 left-12 w-32 h-32 bg-blue-200 dark:bg-blue-800 rounded-full mix-blend-multiply dark:mix-blend-overlay filter blur-xl opacity-30 animate-pulse"></div>
        <div
          className="absolute bottom-32 right-20 w-28 h-28 bg-purple-200 dark:bg-purple-800 rounded-full mix-blend-multiply dark:mix-blend-overlay filter blur-xl opacity-30 animate-pulse"
          style={{ animationDelay: "2s" }}
        ></div>
        <div
          className="absolute top-1/3 right-8 w-20 h-20 bg-blue-100 dark:bg-blue-700 rounded-full mix-blend-multiply dark:mix-blend-overlay filter blur-xl opacity-30 animate-pulse"
          style={{ animationDelay: "4s" }}
        ></div>
      </div>

      {/* Animated Grid Pattern */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none opacity-10 dark:opacity-5">
        <div
          className="absolute top-20 left-20 w-8 h-8 border border-purple-300 dark:border-purple-600 animate-pulse"
          style={{ animationDelay: "1s" }}
        ></div>
        <div
          className="absolute top-32 right-32 w-6 h-6 border border-blue-300 dark:border-blue-600 rotate-45 animate-pulse"
          style={{ animationDelay: "3s" }}
        ></div>
        <div
          className="absolute bottom-40 left-40 w-4 h-4 bg-purple-300 dark:bg-purple-600 rotate-45 animate-bounce"
          style={{ animationDelay: "2s", animationDuration: "3s" }}
        ></div>
      </div>

      {/* Custom Styles for Scale Animation */}
      <style jsx>{`
        @keyframes scale-in {
          from {
            transform: scale(0);
          }
          to {
            transform: scale(1);
          }
        }
        .animate-scale-in {
          animation: scale-in 0.2s ease-out;
        }
      `}</style>
    </div>
  );
};

export default Register;
