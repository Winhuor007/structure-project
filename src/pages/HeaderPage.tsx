import { useState, useRef } from "react";
import { Globe2, ChevronDown, ChevronUp, LogOut, User } from "lucide-react";
import { Logo } from "@/assets/card";
// import { useNavigate } from "react-router-dom";
import { useAuthStore } from "@/store";

export const HeaderPage = () => {
  const [langOpen, setLangOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const { name } = useAuthStore();

  const langRef = useRef(null);
  const profileRef = useRef(null);

  // const navigate = useNavigate();

  const handleLangChange = (lang: string) => {
    console.log("Language changed to", lang);
    setLangOpen(false);
  };

  return (
   <header className="fixed top-0 right-0 z-50 w-full h-16 flex items-center justify-between px-4 md:px-6 lg:px-[15%] text-blue-500 bg-white shadow">
      {/* Logo */}
      <div className="flex items-center gap-3">
        <img src={Logo} width={120} alt="Wingbank Logo" />
      </div>

      <div className="flex items-center gap-3 relative">

        {/* Language */}
        <div className="relative" ref={langRef}>
          <button
            onClick={() => {
              setLangOpen(!langOpen);
              setProfileOpen(false);
            }}
            title="Language"
            className="flex items-center gap-1 hover:text-gray-300"
          >
            <Globe2 className="w-5 h-5" />
          </button>
          {langOpen && (
            <div className="absolute right-0 mt-2 w-32 bg-white text-sm text-gray-800 rounded shadow-lg z-50">
              {["en", "km", "cn"].map((lang) => (
                <button
                  key={lang}
                  onClick={() => handleLangChange(lang)}
                  className="block w-full px-4 py-2 text-left hover:bg-gray-100"
                >
                  {lang === "en"
                    ? "English"
                    : lang === "km"
                    ? "ភាសាខ្មែរ"
                    : "中文"}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Profile */}
        <div className="relative border-l pl-4" ref={profileRef}>
          <button
            onClick={() => {
              setProfileOpen(!profileOpen);
              setLangOpen(false);
            }}
            className="flex items-center gap-2 hover:text-gray-300"
          >
            <User size={20} className="text-blue-500" />
            <div className="hidden md:block text-left">
              <p className=" text-blue-500">
                {name || "Guest"}
              </p>
            </div>
            {profileOpen ? (
              <ChevronUp className="w-4 h-4" />
            ) : (
              <ChevronDown className="w-4 h-4" />
            )}
          </button>

          {profileOpen && (
            <div className="absolute right-0 mt-2 w-52 bg-white text-gray-800 text-sm rounded-lg shadow-xl z-50">
              <div className="px-4 py-3 border-b">
                <div className="flex">
                 <User size={20} className="text-blue-500" />
                  <div className="ml-4">
                    <p color="primary">
                      {name || "Guest"}
                    </p>
                  </div>
                </div>
              </div>
              <button className="flex items-center w-full px-4 py-2 hover:bg-gray-100">
                <User className="w-4 h-4 mr-2" /> Profile
              </button>
              <button
                className="flex items-center w-full px-4 py-2 hover:bg-gray-100 text-red-600"
              >
                <LogOut className="w-4 h-4 mr-2" /> Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

 