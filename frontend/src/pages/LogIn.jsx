import { useState } from 'react';
import { Eye, EyeOff, Mail, Lock, User, Phone, ArrowRight, Check } from 'lucide-react';

const LogIn = ({ onSwitchToSignup, onLogin }) => {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({ email: '', password: '' });

  const handleSubmit = () => {
    if (formData.email && formData.password) {
      onLogin(formData);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-400 via-green-500 to-teal-600 flex items-center justify-center p-4 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute w-96 h-96 bg-green-400/30 rounded-full blur-3xl top-0 -left-48 animate-pulse"></div>
        <div className="absolute w-96 h-96 bg-emerald-400/30 rounded-full blur-3xl bottom-0 -right-48 animate-pulse delay-1000"></div>
      </div>

      <div className="bg-white rounded-3xl shadow-2xl w-full max-w-md overflow-hidden relative z-10 backdrop-blur-sm">
        <div className="bg-gradient-to-br from-emerald-500 to-green-600 p-10 text-white text-center relative">
          <div className="absolute top-0 right-0 w-40 h-40 bg-white/10 rounded-full -mr-20 -mt-20"></div>
          <div className="absolute bottom-0 left-0 w-32 h-32 bg-white/10 rounded-full -ml-16 -mb-16"></div>
          <h1 className="text-4xl font-bold mb-3 relative">Welcome Back</h1>
          <p className="text-emerald-50 text-lg relative">Sign in to continue your journey</p>
        </div>

        <div className="p-10">
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Email Address
              </label>
              <div className="relative group">
                <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 group-focus-within:text-emerald-500 w-5 h-5 transition-colors" />
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full pl-12 pr-4 py-4 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-all"
                  placeholder="you@example.com"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Password
              </label>
              <div className="relative group">
                <Lock className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 group-focus-within:text-emerald-500 w-5 h-5 transition-colors" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  onKeyPress={(e) => e.key === 'Enter' && handleSubmit()}
                  className="w-full pl-12 pr-14 py-4 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-all"
                  placeholder="Enter your password"
                />
                <button
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-emerald-600 transition-colors"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <label className="flex items-center cursor-pointer group">
                <input type="checkbox" className="w-5 h-5 accent-emerald-500 cursor-pointer" />
                <span className="ml-3 text-sm text-gray-600 group-hover:text-gray-800">Remember me</span>
              </label>
              <a href="#" className="text-sm text-emerald-600 hover:text-emerald-700 font-semibold hover:underline">
                Forgot password?
              </a>
            </div>

            <button
              onClick={handleSubmit}
              className="w-full bg-gradient-to-r from-emerald-500 to-green-600 text-white py-4 rounded-xl font-bold text-lg hover:from-emerald-600 hover:to-green-700 transition-all transform hover:scale-[1.02] hover:shadow-xl active:scale-[0.98] flex items-center justify-center gap-2"
            >
              Sign In
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>

          <div className="mt-8 text-center">
            <p className="text-gray-600">
              Don't have an account?{' '}
              <button
                onClick={onSwitchToSignup}
                className="text-emerald-600 hover:text-emerald-700 font-bold hover:underline"
              >
                Create Account
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};


export default LogIn;


// export default function App() {
//   const [currentPage, setCurrentPage] = useState('login');

//   const handleLogin = (data) => {
//     console.log('Login data:', data);
//     alert(`Login successful! Email: ${data.email}`);
//   };

//   const handleSignup = (data) => {
//     console.log('Signup data:', data);
//     alert(`Account created! Welcome ${data.fullName}`);
//   };

//   return (
//     <>
//       {currentPage === 'login' ? (
//         <LoginPage
//           onSwitchToSignup={() => setCurrentPage('signup')}
//           onLogin={handleLogin}
//         />
//       ) : (
//         <SignupPage
//           onSwitchToLogin={() => setCurrentPage('login')}
//           onSignup={handleSignup}
//         />
//       )}
//     </>
//   );
// }