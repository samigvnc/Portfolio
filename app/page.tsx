"use client";

import { navItems } from "@/data";
import SamiChat from "@/components/SamiChat"
import Hero from "@/components/Hero";
import Grid from "@/components/Grid";
import Footer from "@/components/Footer";
import Approach from "@/components/Approach";
import Experience from "@/components/Experience";
import RecentProjects from "@/components/RecentProjects";
import { FloatingNav } from "@/components/ui/FloatingNavbar";

const Home = () => {
  return (
    <main className="relative bg-black-100 flex justify-center items-center flex-col overflow-hidden mx-auto sm:px-10 px-5">
      {/* --- SAĞ ÜST SABİT PROFİL FOTOĞRAFI --- */}
      <div className="fixed top-8 right-8 z-[6000] hidden md:block">
        <div className="relative group">
          {/* Dış Işıltı Efekti */}
          <div className="absolute -inset-1 bg-gradient-to-r from-purple-600 to-blue-600 rounded-full blur opacity-25 group-hover:opacity-75 transition duration-1000 group-hover:duration-200"></div>
          
          {/* Fotoğraf Kabı */}
          <div className="relative w-32 h-32 rounded-full overflow-hidden border-2 border-white/10 shadow-2xl transition-transform duration-500 group-hover:scale-110">
            <img
              src="/Profil_Fotosu.jpeg"
              alt="Sami Güvenç"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </div>
      <div className="max-w-7xl w-full">
        <FloatingNav navItems={navItems} />
        <Hero />
        <Grid />
        <RecentProjects />
        <Experience />
        <Approach />
        <Footer />
        <SamiChat />
      </div>
    </main>
  );
};

export default Home;
