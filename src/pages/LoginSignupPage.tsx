import React, { useState } from 'react';
import { Mail, Lock, ShieldCheck, Award, ArrowRight, User } from 'lucide-react';

interface LoginSignupPageProps {
  onLoginSuccess: (role: 'admin' | 'customer') => void;
}

export default function LoginSignupPage({ onLoginSuccess }: LoginSignupPageProps) {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('farmer.john@gmail.com');
  const [password, setPassword] = useState('password123');
  const [roleSelection, setRoleSelection] = useState<'customer' | 'admin'>('customer');
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (roleSelection === 'admin') {
      if (password !== 'dtcSecure2026') {
        setError('Invalid Administrative Access Passphrase. Please use the secure DTC token: dtcSecure2026');
        return;
      }
    }
    setError('');
    onLoginSuccess(roleSelection);
  };

  return (
    <div className="bg-[#FFF8E7]/30 min-h-[80vh] py-16 flex items-center justify-center text-left font-sans">
      <div className="max-w-md w-full mx-4 bg-white border border-orange-100 p-8 rounded-3xl shadow-lg space-y-6">
        
        {/* Title area */}
        <div className="text-center space-y-2">
          <span className="p-1 px-3 bg-[#F4B400]/20 text-[#1B5E20] border border-[#F4B400]/40 rounded-full font-bold uppercase text-[9px]">
            DTC Beekeeping Portal
          </span>
          <h2 className="text-2xl font-black text-gray-950">
            {isLogin ? 'Sign In to Your Apiary' : 'Register Agricultural Account'}
          </h2>
          <p className="text-xs text-gray-500 leading-normal">
            "Care for Planet and People" — secure client-side profile session.
          </p>
        </div>

        {/* Quick Credentials Suggestion badges */}
        <div className="bg-[#FFF8E7] p-3 rounded-xl border border-orange-100 space-y-1 text-[10px] text-gray-700 font-sans">
          <span className="font-bold text-[#1B5E20] block">💡 Access Credentials Verification:</span>
          <p>• <strong>DTC Customer Panel</strong>: Default password (any password is valid)</p>
          <p>• <strong>DTC Admin Terminal Staff</strong>: Requires security password: <code className="bg-amber-100 px-1.5 py-0.5 rounded font-mono text-[#E65100]">dtcSecure2026</code></p>
        </div>

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 p-3 rounded-xl text-xs font-semibold">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4 text-xs">
          
          {/* Custom Selector roles */}
          <div>
            <label className="text-gray-500 font-bold block mb-1">Select Access Authorization Role:</label>
            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => {
                  setRoleSelection('customer');
                  setEmail('farmer.john@gmail.com');
                }}
                className={`p-2.5 rounded-lg border text-center font-bold ${
                  roleSelection === 'customer' 
                    ? 'border-[#2E7D32] bg-[#2E7D32]/5 text-[#1B5E20]' 
                    : 'border-gray-200 text-gray-700'
                }`}
              >
                DTC Customer Profile
              </button>
              <button
                type="button"
                onClick={() => {
                  setRoleSelection('admin');
                  setEmail('admin.yogesh@gmail.com');
                }}
                className={`p-2.5 rounded-lg border text-center font-bold ${
                  roleSelection === 'admin' 
                    ? 'border-[#2E7D32] bg-[#2E7D32]/5 text-[#1B5E20]' 
                    : 'border-gray-200 text-gray-700'
                }`}
              >
                DTC Admin Terminal
              </button>
            </div>
          </div>

          <div>
            <label className="text-gray-500 font-bold block mb-1">Username / Email coords</label>
            <div className="relative">
              <Mail className="w-4 h-4 text-gray-400 absolute left-3 top-3" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-9 pr-3 py-2.5 border rounded-lg focus:outline-[#2E7D32]"
              />
            </div>
          </div>

          <div>
            <label className="text-gray-500 font-bold block mb-1">Passphrase token</label>
            <div className="relative">
              <Lock className="w-4 h-4 text-gray-400 absolute left-3 top-3" />
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-9 pr-3 py-2.5 border rounded-lg focus:outline-[#2E7D32]"
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-[#2E7D32] hover:bg-[#1B5E20] text-amber-50 font-bold py-3 rounded-lg transition text-xs"
          >
            {isLogin ? 'Sign In' : 'Create Account'}
          </button>

        </form>

        <div className="text-center pt-2">
          <button
            onClick={() => setIsLogin(!isLogin)}
            className="text-[11px] text-[#2E7D32] hover:underline font-bold"
          >
            {isLogin ? 'Don\'t have an agricultural account yet? Register' : 'Already have account? Sign in'}
          </button>
        </div>

      </div>
    </div>
  );
}
