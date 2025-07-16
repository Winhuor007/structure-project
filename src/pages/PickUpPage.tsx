import React from "react";
import { User } from "lucide-react";
import { useAuthStore } from "@/store";
import BanerI from "@/assets/card/image.png";
import { MainTabs } from "@/components/helper/CreateMainTab";

const getGreeting = () => {
  const hour = new Date().getHours();
  let greeting = "";

  switch (true) {
    case hour < 12:
      greeting = "Good Morning";
      break;
    case hour < 18:
      greeting = "Good Afternoon";
      break;
    default:
      greeting = "Good Evening";
  }

  return greeting;
};

const PickUpPage: React.FC = () => {
  const { name } = useAuthStore();
  const greeting = getGreeting();

  return (
    <>
      <div className="w-[70%] m-auto">
        <div className="relative rounded-2xl overflow-hidden shadow-md bg-white min-h-[200px]">
          {/* Background gradient */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#AAC936] to-[#034EA2]/90 backdrop-blur-sm" />

          {/* Content */}
          <div className="relative z-10 px-4 py-6 md:p-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 text-white">
            {/* Left (Text Content) */}
            <div className="w-full md:w-3/5 flex flex-col gap-4">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
                  <User size={24} className="text-white" />
                </div>
                <div>
                  <p className="text-sm opacity-80">{greeting},</p>
                  <p className="text-xl font-semibold">{name}</p>
                </div>
              </div>

              <div>
                <h2 className="text-lg sm:text-xl md:text-2xl font-bold leading-snug">
                  World Transfer
                </h2>
                <p className="text-sm text-white/80 mt-2">
                  You can transfer your money across banks with Wing Bank.
                </p>
              </div>
            </div>
            {/* Right-side SVG Illustration */}
            <div className="absolute right-6 bottom-0 hidden md:block h-full">
              <img
                src={BanerI}
                alt="Illustration"
                className="h-full object-contain rounded-2xl"
              />
            </div>
          </div>
        </div>
        <MainTabs />
      </div>
    </>
  );
};

export default PickUpPage;
