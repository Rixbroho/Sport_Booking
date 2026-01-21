import React, { useState, useEffect } from 'react';
import { 
  LayoutDashboard, CalendarCheck, MapPin, 
  Users, Settings, LogOut, TrendingUp, 
  DollarSign, Bell, Search, Filter 
} from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

const AdminDashboard = () => {
  const [loading, setLoading] = useState(true);
  const location = useLocation();

  const stats = [
    { label: 'Total Revenue', value: '$14,250', trend: '+12.5%', icon: <DollarSign size={20}/>, color: 'text-emerald-600', bg: 'bg-emerald-100' },
    { label: 'Active Bookings', value: '84', trend: '+8.2%', icon: <CalendarCheck size={20}/>, color: 'text-blue-600', bg: 'bg-blue-100' },
    { label: 'Total Venues', value: '12', trend: '+1 new', icon: <MapPin size={20}/>, color: 'text-orange-600', bg: 'bg-orange-100' },
    { label: 'Registered Users', value: '1,024', trend: '+15%', icon: <Users size={20}/>, color: 'text-purple-600', bg: 'bg-purple-100' },
  ];

  const recentBookings = [
    { id: 'TT-8821', user: 'Alex Rivera', venue: 'Stadium Field A', amount: '$55.00', status: 'Confirmed' },
    { id: 'TT-8822', user: 'Sarah Miller', venue: 'Indoor Turf 2', amount: '$40.00', status: 'Pending' },
    { id: 'TT-8823', user: 'John Doe', venue: 'Downtown Arena', amount: '$65.00', status: 'Cancelled' },
    { id: 'TT-8824', user: 'Priya Khan', venue: 'Stadium Field A', amount: '$55.00', status: 'Confirmed' },
  ];

  useEffect(() => {
    setTimeout(() => setLoading(false), 800);
  }, []);

  if (loading) return (
    <div className="h-screen w-full flex items-center justify-center text-emerald-600 font-bold animate-pulse">
      TurfTime Admin Loading...
    </div>
  );

  return (
    <div className="flex min-h-screen bg-gray-50 text-gray-800">
      
      {/* 1. SIDEBAR NAVIGATION */}
      <aside className="w-64 bg-white border-r border-gray-200 flex flex-col fixed h-full shadow-sm">
        <div className="p-8 flex items-center gap-3">
          <div className="bg-emerald-600 p-1.5 rounded-lg shadow-lg shadow-emerald-200">
            <TrendingUp className="text-white" size={24} />
          </div>
          <h1 className="text-2xl font-black text-gray-900 tracking-tight">TurfTime</h1>
        </div>

        <nav className="flex-1 px-4 space-y-1">
          <Link to="/admin/dashboard">
            <NavItem 
              icon={<LayoutDashboard size={20}/>} 
              label="Dashboard" 
              active={location.pathname === '/adminDashboard'} 
            />
          </Link>
          
          <NavItem icon={<CalendarCheck size={20}/>} label="Bookings" />
          <NavItem icon={<MapPin size={20}/>} label="Venues" />
          
          <Link to="/Users">
            <NavItem 
              icon={<Users size={20}/>} 
              label="Users" 
              active={location.pathname === '/admin/users'} 
            />
          </Link>

          <NavItem icon={<Settings size={20}/>} label="Settings" />
        </nav>

        <div className="p-4 mt-auto">
          <button className="flex items-center gap-3 w-full p-3 text-red-500 hover:bg-red-50 rounded-xl transition-all font-bold">
            <LogOut size={20} /> Logout
          </button>
        </div>
      </aside>

      {/* MAIN CONTENT AREA */}
      <main className="ml-64 flex-1 p-10">
        <header className="flex justify-between items-center mb-10">
          <div>
            <h2 className="text-3xl font-extrabold text-gray-900">Dashboard Overview</h2>
            <p className="text-gray-500">Welcome back, Super Admin.</p>
          </div>
          <div className="flex items-center gap-5">
            <button className="p-2 text-gray-400 bg-white border border-gray-200 rounded-full hover:text-emerald-600 transition-all shadow-sm">
              <Bell size={20} />
            </button>
            <div className="flex items-center gap-3 bg-white p-1.5 pr-5 border border-gray-200 rounded-full shadow-sm">
              <div className="w-10 h-10 rounded-full bg-emerald-600 flex items-center justify-center text-white font-black text-sm">SA</div>
              <div className="hidden sm:block">
                <p className="text-xs font-bold text-gray-900">Super Admin</p>
                <p className="text-[10px] text-emerald-600 font-black uppercase tracking-widest">Available</p>
              </div>
            </div>
          </div>
        </header>

        {/* STATS GRID */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
          {stats.map((stat, i) => (
            <div key={i} className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 hover:border-emerald-200 transition-all group">
              <div className="flex justify-between items-start mb-4">
                <div className={`${stat.bg} ${stat.color} p-3 rounded-xl group-hover:scale-110 transition-transform`}>
                  {stat.icon}
                </div>
                <span className="text-emerald-600 text-xs font-black bg-emerald-50 px-2 py-1 rounded-md">{stat.trend}</span>
              </div>
              <p className="text-gray-400 text-xs font-bold uppercase tracking-wider">{stat.label}</p>
              <h3 className="text-2xl font-black text-gray-900">{stat.value}</h3>
            </div>
          ))}
        </div>

        {/* RECENT ACTIVITY TABLE */}
        <section className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="p-6 border-b border-gray-50 flex justify-between items-center">
            <h3 className="text-lg font-black text-gray-800">Recent Activity</h3>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
              <input type="text" placeholder="Search ID..." className="pl-9 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm outline-none focus:border-emerald-500" />
            </div>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead className="bg-gray-50 text-gray-400 text-[10px] uppercase font-black tracking-widest">
                <tr>
                  <th className="px-8 py-4">Booking ID</th>
                  <th className="px-8 py-4">Customer</th>
                  <th className="px-8 py-4">Venue</th>
                  <th className="px-8 py-4">Amount</th>
                  <th className="px-8 py-4">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {recentBookings.map((row) => (
                  <tr key={row.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-8 py-5 font-mono text-xs font-bold text-gray-400">{row.id}</td>
                    <td className="px-8 py-5 font-bold text-gray-900">{row.user}</td>
                    <td className="px-8 py-5 text-gray-500 text-sm">{row.venue}</td>
                    <td className="px-8 py-5 font-black text-gray-900">{row.amount}</td>
                    <td className="px-8 py-5"><StatusPill status={row.status} /></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      </main>
    </div>
  );
};

// UI Components
const NavItem = ({ icon, label, active = false }) => (
  <div className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all font-bold group cursor-pointer ${
    active ? 'bg-emerald-50 text-emerald-600 border-l-4 border-emerald-600' : 'text-gray-400 hover:text-emerald-600 hover:bg-emerald-50/50'
  }`}>
    <span className={`${active ? 'text-emerald-600' : 'group-hover:text-emerald-600 transition-colors'}`}>{icon}</span>
    <span className="text-sm">{label}</span>
  </div>
);

const StatusPill = ({ status }) => {
  const styles = {
    Confirmed: 'bg-emerald-100 text-emerald-700',
    Pending: 'bg-amber-100 text-amber-700',
    Cancelled: 'bg-red-50 text-red-500',
  };
  return <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider ${styles[status]}`}>{status}</span>;
};

export default AdminDashboard;