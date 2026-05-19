import React, { useState, useEffect, FormEvent } from 'react';

const AUTH_KEY = 'lm-proto-authenticated';
const passwordHash = import.meta.env.VITE_PROTOTYPE_PASSWORD_HASH?.trim() ?? '';

async function sha256(text: string): Promise<string> {
  const data = new TextEncoder().encode(text);
  const hash = await crypto.subtle.digest('SHA-256', data);
  return Array.from(new Uint8Array(hash))
    .map((b) => b.toString(16).padStart(2, '0'))
    .join('');
}

function isGateEnabled(): boolean {
  return passwordHash.length > 0;
}

export default function PrototypeGate({ children }: { children: React.ReactNode }) {
  const [unlocked, setUnlocked] = useState(false);
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [checking, setChecking] = useState(false);

  useEffect(() => {
    if (!isGateEnabled()) {
      setUnlocked(true);
      return;
    }
    if (sessionStorage.getItem(AUTH_KEY) === '1') {
      setUnlocked(true);
    }
  }, []);

  if (!isGateEnabled() || unlocked) {
    return <>{children}</>;
  }

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError('');
    setChecking(true);
    try {
      const hash = await sha256(password);
      if (hash === passwordHash) {
        sessionStorage.setItem(AUTH_KEY, '1');
        setUnlocked(true);
      } else {
        setError('Incorrect password');
        setPassword('');
      }
    } finally {
      setChecking(false);
    }
  };

  return (
    <div className="min-h-screen bg-museum-black flex items-center justify-center px-6">
      <div className="w-full max-w-md">
        <div className="text-3xl font-display font-black leading-none tracking-tighter text-white mb-2">
          LONDON<br />MUSEUM
        </div>
        <p className="text-white/60 text-sm mb-8">Prototype — password required</p>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <label htmlFor="prototype-password" className="sr-only">
            Password
          </label>
          <input
            id="prototype-password"
            type="password"
            autoComplete="current-password"
            autoFocus
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter password"
            className="w-full bg-museum-charcoal border border-white/20 rounded-lg px-4 py-3 text-white placeholder:text-white/40 focus:outline-none focus:border-museum-mint"
          />
          {error && (
            <p className="text-sm text-red-400" role="alert">
              {error}
            </p>
          )}
          <button
            type="submit"
            disabled={checking || !password}
            className="w-full py-3 bg-museum-mint text-museum-black font-bold rounded-full hover:scale-[1.02] transition-transform disabled:opacity-50 disabled:hover:scale-100"
          >
            {checking ? 'Checking…' : 'Continue'}
          </button>
        </form>
      </div>
    </div>
  );
}

