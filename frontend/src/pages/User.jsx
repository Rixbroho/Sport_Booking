import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { 
  Search, UserPlus, Edit, Trash2, 
  ArrowLeft, Filter, TrendingUp, 
  LayoutDashboard, CalendarCheck, MapPin, 
  Users as UsersIcon, Settings, LogOut 
} from 'lucide-react';
import toast from 'react-hot-toast';

const Users = () => {
  const navigate = useNavigate();
  const [users, setUsers] = useState([
    { id: 1, username: 'johndoe', email: 'john@example.com', role: 'User', joined: 'Oct 12, 2023' },
    { id: 2, username: 'sarah_smith', email: 'sarah@example.com', role: 'Admin', joined: 'Nov 05, 2023' },
    { id: 3, username: 'mike_turf', email: 'mike@turftime.com', role: 'User', joined: 'Dec 01, 2023' },
    { id: 4, username: 'alex_r', email: 'alex@example.com', role: 'User', joined: 'Jan 15, 2024' },
  ]);

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      setUsers(users.filter(u => u.id !== id));
      toast.success("User deleted successfully");
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-50 w-full">
      
      {/* 1. SIDEBAR NAVIGATION (Fixed width) */}
      <aside className="w-72 bg-white border-r border-gray-200 flex flex-col fixed h-full shadow-sm z-10">
        <div className="p-8 flex items-center gap-3">
          <div className="bg-emerald-600 p-2 rounded-lg shadow-lg shadow-emerald-200">
            <TrendingUp className="text-white" size={24} />
          </div>
          <h1 className="text-2xl font-black text-gray-900 tracking-tight">TurfTime</h1>
        </div>

        <nav className="flex-1 px-4 space-y-2">
          <Link to="/adminDashboard">
            <NavItem icon={<LayoutDashboard size={22}/>} label="Dashboard" />
          </Link>
          <NavItem icon={<CalendarCheck size={22}/>} label="Bookings" />
          <NavItem icon={<MapPin size={22}/>} label="Venues" />
          <Link to="/Users">
            <NavItem icon={<UsersIcon size={22}/>} label="Users" active />
          </Link>
          <NavItem icon={<Settings size={22}/>} label="Settings" />
        </nav>

        <div className="p-6 mt-auto">
          <button className="flex items-center gap-3 w-full p-4 text-red-500 hover:bg-red-50 rounded-2xl transition-all font-bold">
            <LogOut size={22} /> Logout
          </button>
        </div>
      </aside>

      {/* 2. MAIN CONTENT AREA (Fills remaining width) */}
      <main className="pl-72 w-full flex flex-col min-h-screen">
        
        {/* HEADER */}
        <div className="p-10 w-full max-w-[1600px] mx-auto">
          <header className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-12">
            <div className="flex items-center gap-6">
              <button 
                onClick={() => navigate(-1)} 
                className="p-3 bg-white rounded-2xl shadow-sm border border-gray-100 hover:text-emerald-600 hover:border-emerald-200 transition-all"
              >
                <ArrowLeft size={24} />
              </button>
              <div>
                <h2 className="text-4xl font-black text-gray-900 tracking-tight">User Management</h2>
                <p className="text-gray-500 font-medium mt-1">Manage and monitor all registered accounts.</p>
              </div>
            </div>
            
            <button className="bg-emerald-600 text-white px-8 py-4 rounded-2xl font-black flex items-center gap-3 hover:bg-emerald-700 transition-all shadow-xl shadow-emerald-200 transform hover:scale-[1.02] active:scale-[0.98]">
              <UserPlus size={24} /> Add New User
            </button>
          </header>

          {/* TABLE CONTAINER */}
          <section className="bg-white rounded-[2.5rem] shadow-sm border border-gray-100 overflow-hidden w-full">
            <div className="p-8 border-b border-gray-50 flex flex-col lg:flex-row justify-between items-stretch lg:items-center gap-6 bg-white">
              <div className="relative flex-1 max-w-2xl">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                <input 
                  type="text" 
                  placeholder="Search by name, email, or ID..." 
                  className="w-full pl-12 pr-6 py-4 bg-gray-50 border-2 border-transparent rounded-2xl outline-none focus:bg-white focus:border-emerald-500 transition-all font-medium" 
                />
              </div>
              <button className="flex items-center justify-center gap-2 px-6 py-4 bg-gray-50 text-gray-600 font-bold rounded-2xl hover:bg-emerald-50 hover:text-emerald-600 transition-all border border-transparent hover:border-emerald-100">
                <Filter size={20} /> Advanced Filters
              </button>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead className="bg-gray-50/50 text-gray-400 text-xs uppercase font-black tracking-[0.15em]">
                  <tr>
                    <th className="px-10 py-6">User Details</th>
                    <th className="px-10 py-6">Role</th>
                    <th className="px-10 py-6">Joined Date</th>
                    <th className="px-10 py-6 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {users.map((user) => (
                    <tr key={user.id} className="group hover:bg-emerald-50/30 transition-all">
                      <td className="px-10 py-8">
                        <div className="flex items-center gap-4">
                          <div className="w-12 h-12 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center font-black text-lg">
                            {user.username.charAt(0).toUpperCase()}
                          </div>
                          <div>
                            <div className="font-black text-gray-900 text-lg">{user.username}</div>
                            <div className="text-gray-500 font-medium">{user.email}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-10 py-8">
                        <span className={`px-4 py-1.5 rounded-full text-[11px] font-black uppercase tracking-wider ${
                          user.role === 'Admin' ? 'bg-purple-100 text-purple-700' : 'bg-blue-100 text-blue-700'
                        }`}>
                          {user.role}
                        </span>
                      </td>
                      <td className="px-10 py-8 font-bold text-gray-500">
                        {user.joined}
                      </td>
                      <td className="px-10 py-8 text-right">
                        <div className="flex justify-end gap-3 opacity-0 group-hover:opacity-100 transition-opacity">
                          <button 
                            onClick={() => navigate(`/admin/edit-user/${user.id}`)}
                            className="p-3 text-emerald-600 bg-white border border-gray-100 rounded-xl shadow-sm hover:bg-emerald-600 hover:text-white transition-all"
                          >
                            <Edit size={20} />
                          </button>
                          <button 
                            onClick={() => handleDelete(user.id)}
                            className="p-3 text-red-500 bg-white border border-gray-100 rounded-xl shadow-sm hover:bg-red-500 hover:text-white transition-all"
                          >
                            <Trash2 size={20} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
};

// Internal Components
const NavItem = ({ icon, label, active = false }) => (
  <div className={`w-full flex items-center gap-4 px-5 py-4 rounded-2xl transition-all font-black group cursor-pointer ${
    active 
    ? 'bg-emerald-50 text-emerald-600 border-r-4 border-emerald-600 shadow-sm' 
    : 'text-gray-400 hover:text-emerald-600 hover:bg-emerald-50/50'
  }`}>
    <span className={`${active ? 'text-emerald-600' : 'group-hover:text-emerald-600 transition-colors'}`}>{icon}</span>
    <span className="text-base tracking-tight">{label}</span>
  </div>
);

export default Users;