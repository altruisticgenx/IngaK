import React from 'react';

type Props = {
  id: string;
  name: string;
  activeSection: string;
  onClick: (id: string) => void;
  mobile?: boolean;
};

const NavLink: React.FC<Props> = ({ id, name, activeSection, onClick, mobile = false }) => {
  const isActive = activeSection === id;

  return (
    <button
      onClick={() => onClick(id)}
      aria-current={isActive ? 'true' : undefined}
      aria-label={`Navigate to ${name} section`}
      className={`
        font-medium transition-all duration-300 relative group
        focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950 rounded-sm
        ${mobile
          ? 'text-3xl py-3 w-full text-center hover:text-cyan-300'
          : 'text-sm hover:text-cyan-400'
        }
        ${isActive ? 'text-cyan-400' : 'text-slate-400'}
      `}
    >
      {name}
      {!mobile && (
        <span 
          className={`absolute -bottom-1 left-0 w-0 h-0.5 bg-cyan-400 transition-all duration-300 group-hover:w-full ${isActive ? 'w-full' : ''}`}
          aria-hidden="true"
        />
      )}
    </button>
  );
};

export default React.memo(NavLink);
