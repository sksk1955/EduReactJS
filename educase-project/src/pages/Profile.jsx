import React, { useState, useEffect } from "react";
import {
  Settings,
  Edit3,
  Camera,
  Bell,
  Shield,
  LogOut,
  ChevronRight,
  User,
  Mail,
  Phone,
  Building,
  MapPin,
  Calendar,
  ArrowLeft,
} from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";
import ThemeBtn from "../components/ThemeBtn";

const Profile = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [hoveredSetting, setHoveredSetting] = useState("");
  const navigate = useNavigate();
  const location = useLocation();
  // Profile data
  const [profileData, setProfileData] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    location: "New York, USA",
    joinDate: "January 2024",
    bio: "Lorem Ipsum Dolor Sit Amet, Consectetur Sadipscing Elitr, Sed Diam Nonumy Eirmod Tempor Invidunt Ut Labore Et Dolore Magna Aliquyam Erat, Sed Diam",
  });

  useEffect(() => {
    const { state } = location;

    if (state) {
      setProfileData((prev) => ({
        ...prev,
        email: state.email || "",
        name: state.fullName || state.email || "",
        phone: state.phoneNumber || "+1 (555) 123-4567",
        company: state.companyName || "PopX Digital Agency",
      }));
    }

    window.history.replaceState({}, document.title);
  }, [location]);

  useEffect(() => {
    // Trigger animations on mount
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 100);
    return () => clearTimeout(timer);
  }, []);

  // Settings menu items
  const settingsItems = [
    {
      id: "notifications",
      icon: Bell,
      title: "Notifications",
      subtitle: "Manage your notification preferences",
      color: "text-blue-500",
    },
    {
      id: "privacy",
      icon: Shield,
      title: "Privacy & Security",
      subtitle: "Control your privacy settings",
      color: "text-green-500",
    },
    {
      id: "account",
      icon: User,
      title: "Account Settings",
      subtitle: "Update your account information",
      color: "text-purple-500",
    },
    {
      id: "logout",
      icon: LogOut,
      title: "Sign Out",
      subtitle: "Logout from your account",
      color: "text-red-500",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 via-white to-gray-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 transition-all duration-700 ease-in-out">
      {/* Back Button */}
      <div className="fixed top-6 left-6 z-50">
        <button
          className={`p-3 rounded-full bg-white dark:bg-gray-800 shadow-lg hover:shadow-xl transform transition-all duration-300 hover:scale-110 hover:-translate-x-1 ${
            isVisible ? "translate-y-0 opacity-100" : "-translate-y-4 opacity-0"
          }`}
          style={{ transitionDelay: "900ms" }}
          onClick={() => navigate("/")}
        >
          <ArrowLeft className="w-6 h-6 text-gray-700 dark:text-gray-300" />
        </button>
      </div>

      {/* Theme Toggle Button */}
      <ThemeBtn isVisible={isVisible} />

      {/* Header */}
      <div className="relative pt-8 pb-6">
        <div className="max-w-4xl mx-auto px-4">
          <div
            className={`flex items-center justify-between transform transition-all duration-1000 ease-out ${
              isVisible
                ? "translate-y-0 opacity-100"
                : "translate-y-6 opacity-0"
            }`}
          >
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
              Account Settings
            </h1>
            <button className="p-2 rounded-full bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors duration-200">
              <Settings className="w-5 h-5 text-gray-600 dark:text-gray-300" />
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-4 pb-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Profile Card - Left Column */}
          <div className="lg:col-span-1">
            <div
              className={`bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm rounded-3xl shadow-xl p-8 border border-white/20 dark:border-gray-700/30 transform transition-all duration-1000 ease-out ${
                isVisible
                  ? "translate-y-0 opacity-100 scale-100"
                  : "translate-y-8 opacity-0 scale-95"
              }`}
              style={{ transitionDelay: "200ms" }}
            >
              {/* Profile Image */}
              <div className="relative mb-6 group">
                <div className="relative w-24 h-24 mx-auto">
                  {/* Avatar */}
                  {profileData.email ? (
                    // Show letter avatar
                    <div className="w-full h-full rounded-full bg-purple-600 flex items-center justify-center text-white text-3xl font-bold shadow-lg ring-4 ring-white dark:ring-gray-700 transition-transform duration-300 group-hover:scale-105 select-none">
                      {profileData.email.charAt(0).toUpperCase()}
                    </div>
                  ) : (
                    // Fallback: user icon
                    <div className="w-full h-full rounded-full bg-gray-300 dark:bg-gray-700 flex items-center justify-center shadow-lg ring-4 ring-white dark:ring-gray-700 transition-transform duration-300 group-hover:scale-105">
                      <User className="w-10 h-10 text-gray-600 dark:text-gray-200" />
                    </div>
                  )}

                  {/* Online Status Indicator */}
                  <div className="absolute bottom-0 right-0 w-8 h-8 bg-purple-500 rounded-full flex items-center justify-center shadow-lg ring-4 ring-white dark:ring-gray-800 animate-pulse">
                    <div className="w-3 h-3 bg-white rounded-full"></div>
                  </div>

                  {/* Camera Overlay */}
                  <div className="absolute inset-0 bg-black/50 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 cursor-pointer">
                    <Camera className="w-6 h-6 text-white" />
                  </div>
                </div>
              </div>

              {/* Profile Info */}
              <div className="text-center mb-6">
                <div className="flex items-center justify-center mb-2">
                  <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                    {profileData.name}
                  </h2>
                  <button className="ml-2 p-1 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-200">
                    <Edit3 className="w-4 h-4 text-gray-500 dark:text-gray-400" />
                  </button>
                </div>
                <p className="text-gray-600 dark:text-gray-300 mb-4">
                  {profileData.email}
                </p>
              </div>

              {/* Quick Stats */}
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="text-center p-3 bg-purple-50 dark:bg-purple-900/20 rounded-2xl">
                  <div className="text-lg font-bold text-purple-600 dark:text-purple-400">
                    142
                  </div>
                  <div className="text-xs text-gray-600 dark:text-gray-400">
                    Projects
                  </div>
                </div>
                <div className="text-center p-3 bg-blue-50 dark:bg-blue-900/20 rounded-2xl">
                  <div className="text-lg font-bold text-blue-600 dark:text-blue-400">
                    28
                  </div>
                  <div className="text-xs text-gray-600 dark:text-gray-400">
                    Clients
                  </div>
                </div>
              </div>

              {/* Contact Info */}
              <div className="space-y-3">
                <div className="flex items-center text-sm text-gray-600 dark:text-gray-300">
                  <Phone className="w-4 h-4 mr-3 text-purple-500" />
                  {profileData.phone}
                </div>
                <div className="flex items-center text-sm text-gray-600 dark:text-gray-300">
                  <Building className="w-4 h-4 mr-3 text-purple-500" />
                  {profileData.company}
                </div>
                <div className="flex items-center text-sm text-gray-600 dark:text-gray-300">
                  <MapPin className="w-4 h-4 mr-3 text-purple-500" />
                  {profileData.location}
                </div>
                <div className="flex items-center text-sm text-gray-600 dark:text-gray-300">
                  <Calendar className="w-4 h-4 mr-3 text-purple-500" />
                  Joined {profileData.joinDate}
                </div>
              </div>
            </div>
          </div>

          {/* Main Content - Right Column */}
          <div className="lg:col-span-2 space-y-6">
            {/* About Section */}
            <div
              className={`bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm rounded-3xl shadow-xl p-8 border border-white/20 dark:border-gray-700/30 transform transition-all duration-1000 ease-out ${
                isVisible
                  ? "translate-y-0 opacity-100"
                  : "translate-y-8 opacity-0"
              }`}
              style={{ transitionDelay: "400ms" }}
            >
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                  About
                </h3>
                <button className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-200">
                  <Edit3 className="w-4 h-4 text-gray-500 dark:text-gray-400" />
                </button>
              </div>
              <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                {profileData.bio}
              </p>
            </div>

            {/* Settings Menu */}
            <div
              className={`bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm rounded-3xl shadow-xl p-8 border border-white/20 dark:border-gray-700/30 transform transition-all duration-1000 ease-out ${
                isVisible
                  ? "translate-y-0 opacity-100"
                  : "translate-y-8 opacity-0"
              }`}
              style={{ transitionDelay: "600ms" }}
            >
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-6">
                Settings
              </h3>

              <div className="space-y-2">
                {settingsItems.map((item, index) => (
                  <button
                    key={item.id}
                    onMouseEnter={() => setHoveredSetting(item.id)}
                    onMouseLeave={() => setHoveredSetting("")}
                    className={`group w-full flex items-center justify-between p-4 rounded-2xl transition-all duration-300 transform ${
                      hoveredSetting === item.id
                        ? "bg-gray-50 dark:bg-gray-700/50 scale-105 shadow-lg"
                        : "hover:bg-gray-50 dark:hover:bg-gray-700/50"
                    } ${
                      isVisible
                        ? "translate-x-0 opacity-100"
                        : "translate-x-4 opacity-0"
                    }`}
                    style={{ transitionDelay: `${700 + index * 100}ms` }}
                  >
                    <div className="flex items-center">
                      <div
                        className={`p-3 rounded-2xl mr-4 transition-colors duration-300 ${
                          hoveredSetting === item.id
                            ? "bg-white dark:bg-gray-600 shadow-md"
                            : "bg-gray-100 dark:bg-gray-700"
                        }`}
                      >
                        <item.icon
                          className={`w-5 h-5 ${
                            item.color
                          } transition-transform duration-300 ${
                            hoveredSetting === item.id ? "scale-110" : ""
                          }`}
                        />
                      </div>
                      <div className="text-left">
                        <div className="font-medium text-gray-900 dark:text-white">
                          {item.title}
                        </div>
                        <div className="text-sm text-gray-500 dark:text-gray-400">
                          {item.subtitle}
                        </div>
                      </div>
                    </div>
                    <ChevronRight
                      className={`w-5 h-5 text-gray-400 transition-transform duration-300 ${
                        hoveredSetting === item.id
                          ? "translate-x-1 text-purple-500"
                          : ""
                      }`}
                    />
                  </button>
                ))}
              </div>
            </div>

            {/* Activity Stats */}
            <div
              className={`bg-gradient-to-r from-purple-500 to-blue-500 dark:from-purple-600 dark:to-blue-600 rounded-3xl shadow-xl p-8 text-white transform transition-all duration-1000 ease-out ${
                isVisible
                  ? "translate-y-0 opacity-100"
                  : "translate-y-8 opacity-0"
              }`}
              style={{ transitionDelay: "800ms" }}
            >
              <h3 className="text-lg font-semibold mb-6">Activity Overview</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="text-center">
                  <div className="text-2xl font-bold mb-1">89%</div>
                  <div className="text-sm opacity-80">Completion Rate</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold mb-1">4.9</div>
                  <div className="text-sm opacity-80">Rating</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold mb-1">156</div>
                  <div className="text-sm opacity-80">Total Tasks</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold mb-1">12</div>
                  <div className="text-sm opacity-80">This Month</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Background Decorative Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 right-16 w-40 h-40 bg-purple-200 dark:bg-purple-800 rounded-full mix-blend-multiply dark:mix-blend-overlay filter blur-xl opacity-20 animate-pulse"></div>
        <div
          className="absolute bottom-32 left-20 w-32 h-32 bg-blue-200 dark:bg-blue-800 rounded-full mix-blend-multiply dark:mix-blend-overlay filter blur-xl opacity-20 animate-pulse"
          style={{ animationDelay: "2s" }}
        ></div>
        <div
          className="absolute top-1/2 right-8 w-24 h-24 bg-purple-100 dark:bg-purple-700 rounded-full mix-blend-multiply dark:mix-blend-overlay filter blur-xl opacity-20 animate-pulse"
          style={{ animationDelay: "4s" }}
        ></div>
      </div>

      {/* Floating Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div
          className="absolute top-32 left-16 w-3 h-3 bg-purple-400 rounded-full animate-bounce"
          style={{ animationDelay: "1s", animationDuration: "3s" }}
        ></div>
        <div
          className="absolute bottom-48 right-24 w-2 h-2 bg-blue-400 rounded-full animate-bounce"
          style={{ animationDelay: "2s", animationDuration: "4s" }}
        ></div>
        <div
          className="absolute top-2/3 left-8 w-4 h-4 border border-purple-300 dark:border-purple-600 rotate-45 animate-spin"
          style={{ animationDuration: "15s" }}
        ></div>
      </div>
    </div>
  );
};

export default Profile;
