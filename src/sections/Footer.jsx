import { ArrowUp, Heart } from 'lucide-react';
import { profile, socials } from '../data/content';
import SocialIcon from '../components/SocialIcon';

export default function Footer() {
  const toTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

  return (
    <footer className="border-t border-white/10">
      <div className="mx-auto flex max-w-6xl flex-col items-center gap-6 px-6 py-12 sm:flex-row sm:justify-between">
        <div className="text-center sm:text-left">
          <a href="#home" className="font-display text-lg font-bold text-white">
            {profile.firstName}
            <span className="text-accent-pink">.</span>
          </a>
          <p className="mt-1 flex items-center justify-center gap-1.5 text-sm text-slate-500 sm:justify-start">
            Made with <Heart size={13} className="text-accent-pink" fill="currentColor" /> by {profile.name}
          </p>
        </div>

        <div className="flex items-center gap-3">
          {socials.map((s) => (
            <a
              key={s.label}
              href={s.href}
              target="_blank"
              rel="noreferrer"
              aria-label={s.label}
              className="grid h-10 w-10 place-items-center rounded-xl glass text-slate-300 transition-colors hover:text-white"
            >
              <SocialIcon name={s.icon} size={16} />
            </a>
          ))}
          <button
            onClick={toTop}
            aria-label="Back to top"
            className="grid h-10 w-10 place-items-center rounded-xl bg-gradient-to-r from-accent-pink to-accent-violet text-onaccent transition-transform hover:-translate-y-1"
          >
            <ArrowUp size={18} />
          </button>
        </div>
      </div>
      <div className="pb-8 text-center text-xs text-slate-600">
        &copy; {new Date().getFullYear()} {profile.name}. All rights reserved.
      </div>
    </footer>
  );
}
