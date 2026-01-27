import React from "react";
import { useNavigate } from "react-router-dom";
import {
  Trophy,
  MapPin,
  Calendar,
  Users,
  ArrowRight,
  Star,
  Search,
  Activity
} from "lucide-react";

const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-white font-sans selection:bg-emerald-100">
      {/* --- HERO SECTION --- */}
      <div className="relative min-h-[90vh] bg-gradient-to-br from-emerald-400 via-green-500 to-teal-600 flex flex-col overflow-hidden">
        {/* Animated Background Orbs (matching Login) */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute w-[500px] h-[500px] bg-white/20 rounded-full blur-3xl -top-48 -left-24 animate-pulse"></div>
          <div className="absolute w-[400px] h-[400px] bg-emerald-200/20 rounded-full blur-3xl bottom-0 -right-24 animate-pulse delay-700"></div>
        </div>

        {/* Navbar */}
        <nav className="relative z-50 flex items-center justify-between px-6 py-6 max-w-7xl mx-auto w-full">
          <div className="flex items-center gap-2 text-white">
            <div className="bg-white/20 p-2 rounded-xl backdrop-blur-md">
              <Trophy className="w-6 h-6" />
            </div>
            <span className="text-2xl font-black tracking-tight">TurfTime</span>
          </div>
          <div className="flex gap-4">
            <button 
              onClick={() => navigate("/login")}
              className="px-6 py-2.5 text-white font-bold hover:bg-white/10 rounded-xl transition-all"
            >
              Log In
            </button>
            <button 
              onClick={() => navigate("/register")}
              className="px-6 py-2.5 bg-white text-emerald-600 font-bold rounded-xl shadow-lg hover:shadow-white/20 transition-all transform hover:scale-105"
            >
              Register
            </button>
          </div>
        </nav>

        {/* Hero Content */}
        <div className="relative z-10 flex-1 flex flex-col items-center justify-center text-center px-4 max-w-4xl mx-auto">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-md rounded-full text-emerald-50 text-sm font-bold mb-6 border border-white/20">
            <Activity className="w-4 h-4" />
            <span>Over 500+ venues available now</span>
          </div>
          <h1 className="text-5xl md:text-7xl font-extrabold text-white mb-6 leading-tight">
            Elevate Your Game. <br />
            <span className="text-emerald-100">Book Your Arena.</span>
          </h1>
          <p className="text-lg md:text-xl text-emerald-50 mb-10 max-w-2xl opacity-90">
            The ultimate platform to discover, book, and play. From football turfs to basketball courts, get your spot in seconds.
          </p>

          {/* Quick Search Bar (Glassmorphism) */}
          <div className="w-full max-w-2xl bg-white/10 backdrop-blur-lg p-3 rounded-3xl border border-white/30 shadow-2xl flex flex-col md:flex-row gap-2">
            <div className="flex-1 relative">
              <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 text-emerald-100 w-5 h-5" />
              <input 
                type="text" 
                placeholder="Where do you want to play?" 
                className="w-full bg-white/20 border-none rounded-2xl py-4 pl-12 pr-4 text-white placeholder:text-emerald-100 outline-none focus:ring-2 focus:ring-white/50 transition-all"
              />
            </div>
            <button className="bg-white text-emerald-600 px-8 py-4 rounded-2xl font-black flex items-center justify-center gap-2 hover:bg-emerald-50 transition-all">
              <Search className="w-5 h-5" />
              Find Venues
            </button>
          </div>
        </div>
      </div>

      {/* --- STATS SECTION --- */}
      <div className="max-w-7xl mx-auto px-6 -mt-16 relative z-30">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <StatCard icon={<Calendar />} label="Bookings" value="12,000+" color="bg-emerald-500" />
          <StatCard icon={<Users />} label="Active Players" value="45,000+" color="bg-green-500" />
          <StatCard icon={<Star />} label="Top Venues" value="500+" color="bg-teal-500" />
        </div>
      </div>

      {/* --- FEATURED VENUES --- */}
      <section className="py-24 px-6 max-w-7xl mx-auto">
        <div className="flex justify-between items-end mb-12">
          <div>
            <h2 className="text-4xl font-black text-gray-900 mb-2">Popular Venues</h2>
            <p className="text-gray-500 font-medium italic">Handpicked spots for your next match</p>
          </div>
          <button className="flex items-center gap-2 text-emerald-600 font-bold hover:underline">
            View All Venues <ArrowRight className="w-5 h-5" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <VenuePreview image="https://images.unsplash.com/photo-1574629810360-7efbbe195018?q=80&w=1000" name="The Arena Center" type="Football" price="$45/hr" />
          <VenuePreview image="https://images.unsplash.com/photo-1504450758481-7338eba7524a?q=80&w=1000" name="Skyline Courts" type="Basketball" price="$30/hr" />
          <VenuePreview image="https://images.unsplash.com/photo-1544105492-7f180391e93f?q=80&w=1000" name="Green Garden Turf" type="Cricket" price="$40/hr" />
        </div>
      </section>

      {/* --- CTA SECTION --- */}
      <section className="px-6 pb-24">
        <div className="max-w-7xl mx-auto bg-gradient-to-r from-emerald-600 to-teal-700 rounded-[3rem] p-12 text-center text-white relative overflow-hidden shadow-2xl">
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -mr-32 -mt-32"></div>
          <h2 className="text-4xl font-black mb-6">Ready to play?</h2>
          <p className="text-xl mb-10 opacity-80">Join the largest community of sports enthusiasts today.</p>
          <button 
            onClick={() => navigate("/signin")}
            className="bg-white text-emerald-700 px-10 py-5 rounded-2xl font-black text-lg shadow-xl hover:scale-105 transition-all"
          >
            Create Your Account
          </button>
        </div>
      </section>
    </div>
  );
};

/* --- SUB-COMPONENTS --- */

const StatCard = ({ icon, label, value, color }) => (
  <div className="bg-white p-8 rounded-3xl shadow-xl border border-gray-100 flex items-center gap-6 group hover:translate-y-[-5px] transition-all">
    <div className={`${color} p-4 rounded-2xl text-white shadow-lg`}>
      {React.cloneElement(icon, { size: 28 })}
    </div>
    <div>
      <p className="text-gray-400 text-sm font-bold uppercase tracking-widest">{label}</p>
      <h4 className="text-2xl font-black text-gray-800">{value}</h4>
    </div>
  </div>
);

const VenuePreview = ({ image, name, type, price }) => (
  <div className="group cursor-pointer">
    <div className="relative overflow-hidden rounded-[2.5rem] h-64 mb-6">
      <img src={image} alt={name} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
      <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-md px-4 py-1.5 rounded-full text-xs font-black text-emerald-600 uppercase">
        {type}
      </div>
    </div>
    <div className="flex justify-between items-start px-2">
      <div>
        <h4 className="text-xl font-black text-gray-900 mb-1">{name}</h4>
        <div className="flex items-center gap-1 text-gray-500 text-sm">
          <MapPin size={14} />
          <span>2.4 miles away</span>
        </div>
      </div>
      <div className="text-right">
        <p className="text-emerald-600 font-black text-xl">{price}</p>
        <span className="text-xs text-gray-400 font-bold uppercase">starts from</span>
      </div>
    </div>
  </div>
);

export default Home;