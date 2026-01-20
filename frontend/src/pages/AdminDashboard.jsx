import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { 
  LayoutDashboard, 
  CalendarCheck, 
  MapPin, 
  Users, 
  Settings, 
  LogOut, 
  TrendingUp, 
  DollarSign,
  MoreVertical
} from 'lucide-react'; // Using Lucide for the professional icons

const Dashboard = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // Mock data to match your UI description
  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        // Replace with your actual API calls
        // const res = await getRecentBookings();
        const mockBookings = [
          { id: 'TT-1024', user: 'James Wilson', venue: 'Downtown Arena', amount: '$45.00', status: 'Confirmed' },
          { id: 'TT-1025', user: 'Sarah Chen', venue: 'Green Valley Turf', amount: '$60.00', status: 'Pending' },
          { id: 'TT-1026', user: 'Mike Ross', venue: 'Eastside Courts', amount: '$30.00', status: 'Cancelled' },
        ];
        setBookings(mockBookings);
      } catch (error) {
        toast.error("Failed to load dashboard data");
      } finally {
        setLoading(false);
      }
    };
    fetchDashboardData();
  }, []);

  const stats = [
    { label: 'Total Revenue', value: '$12,840', icon: <DollarSign />, color: 'text-emerald-600', bg: 'bg-emerald-100', trend: '+12.5%' },
    { label: 'Active Bookings', value: '156', icon: <CalendarCheck />, color: 'text-blue-600', bg: 'bg-blue-100', trend: '+5% ' },
    { label: 'Total Venues', value: '24', icon: <MapPin />, color: 'text-orange-600', bg: 'bg-orange-100', trend: '0%' },
    { label: 'Registered Users', value: '1,204', icon: <Users />, color: 'text-purple-600', bg: 'bg-purple-100', trend: '+18%' },
  ];

  if (loading) return <div className="flex h-screen items-center justify-center">Loading TurfTime...</div>;

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* 1. Persistent Sidebar */}
      <aside className="w-64 bg-white border-r border-gray-200 flex flex-col fixed h-full">
        <div className="p-6 flex items-center gap-3">
          <div className="bg-emerald-600 p-2 rounded-lg">
            <TrendingUp className="text-white w-6 h-6" />
          </div>
          <h1 className="text-xl font-bold text-gray-800 tracking-tight">TurfTime</h1>
        </div>

        <nav className="flex-1 px-4 space-y-1 mt-4">
          <NavItem icon={<LayoutDashboard size={20}/>} label="Dashboard" active />
          <NavItem icon={<CalendarCheck size={20}/>} label="Bookings" />
          <NavItem icon={<MapPin size={20}/>} label="Venues" />
          <NavItem icon={<Users size={20}/>} label="Users" />
          <NavItem icon={<Settings size={20}/>} label="Settings" />
        </nav>

        <div className="p-4 border-t border-gray-100">
          <button className="flex items-center gap-3 w-full p-3 text-red-500 hover:bg-red-50 rounded-lg transition-colors font-medium">
            <LogOut size={20} /> Logout
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="ml-64 flex-1 p-8">
        {/* 2. Header & User Profile */}
        <header className="flex justify-between items-center mb-10">
          <div>
            <h2 className="text-3xl font-bold text-gray-900">Dashboard Overview</h2>
            <p className="text-gray-500">Welcome back, Super Admin</p>
          </div>
          <div className="flex items-center gap-4 bg-white p-2 pr-6 rounded-full shadow-sm border border-gray-100">
            <div className="w-10 h-10 rounded-full bg-emerald-600 flex items-center justify-center text-white font-bold">
              AD
            </div>
            <div>
              <p className="text-sm font-bold text-gray-800">Admin Name</p>
              <p className="text-xs text-emerald-600 font-semibold uppercase">Super Admin</p>
            </div>
          </div>
        </header>

        {/* 3. KPI Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
          {stats.map((stat, i) => (
            <div key={i} className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
              <div className="flex justify-between items-start mb-4">
                <div className={`${stat.bg} ${stat.color} p-3 rounded-lg`}>
                  {stat.icon}
                </div>
                <span className="text-emerald-500 text-sm font-medium">{stat.trend}</span>
              </div>
              <p className="text-gray-500 text-sm">{stat.label}</p>
              <h3 className="text-2xl font-bold text-gray-800">{stat.value}</h3>
            </div>
          ))}
        </div>

        {/* 4. Recent Activity Table */}
        <section className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="p-6 border-b border-gray-100 flex justify-between items-center">
            <h3 className="text-lg font-bold text-gray-800">Recent Bookings</h3>
            <button className="text-emerald-600 font-semibold text-sm hover:underline">View All</button>
          </div>
          <table className="w-full text-left">
            <thead className="bg-gray-50 text-gray-400 text-xs uppercase tracking-wider">
              <tr>
                <th className="px-6 py-4 font-semibold">Booking ID</th>
                <th className="px-6 py-4 font-semibold">User</th>
                <th className="px-6 py-4 font-semibold">Venue</th>
                <th className="px-6 py-4 font-semibold">Amount</th>
                <th className="px-6 py-4 font-semibold">Status</th>
                <th className="px-6 py-4 font-semibold"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {bookings.map((booking) => (
                <tr key={booking.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4 font-mono text-sm text-gray-500">{booking.id}</td>
                  <td className="px-6 py-4 font-bold text-gray-800">{booking.user}</td>
                  <td className="px-6 py-4 text-gray-600">{booking.venue}</td>
                  <td className="px-6 py-4 font-bold text-gray-900">{booking.amount}</td>
                  <td className="px-6 py-4">
                    <StatusBadge status={booking.status} />
                  </td>
                  <td className="px-6 py-4 text-right">
                    <button className="text-gray-400 hover:text-gray-600">
                      <MoreVertical size={18} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>
      </main>
    </div>
  );
};

// Helper Components for cleaner code
const NavItem = ({ icon, label, active = false }) => (
  <div className={`
    flex items-center gap-3 p-3 rounded-lg cursor-pointer transition-all
    ${active 
      ? 'bg-emerald-50 text-emerald-600 border-r-4 border-emerald-600 font-bold' 
      : 'text-gray-500 hover:bg-gray-50 hover:text-emerald-600'}
  `}>
    {icon}
    <span>{label}</span>
  </div>
);

const StatusBadge = ({ status }) => {
  const styles = {
    Confirmed: 'bg-emerald-100 text-emerald-700',
    Pending: 'bg-amber-100 text-amber-700',
    Cancelled: 'bg-red-100 text-red-700'
  };
  return (
    <span className={`px-3 py-1 rounded-full text-xs font-bold ${styles[status]}`}>
      {status}
    </span>
  );
};

export default Dashboard;