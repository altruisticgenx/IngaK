import React from 'react';

type Props = {
  id: string;
  name: string;
  activeSection: string;
  onClick: (id: string) => void;
  mobile?: boolean;
};

const NavLink: React.FC<Props> = ({ id, name, activeSection, onClick, mobile = false }) => (
  <button
    onClick={() => onClick(id)}
    className={`
      font-medium transition-all duration-300 relative group
      ${mobile
        ? 'text-3xl py-3 w-full text-center hover:text-cyan-300'
        : 'text-sm hover:text-cyan-400'
      }
      ${activeSection === id ? 'text-cyan-400' : 'text-slate-400'}
    `}
  >
    {name}
    {!mobile && (
      <span className={`absolute -bottom-1 left-0 w-0 h-0.5 bg-cyan-400 transition-all duration-300 group-hover:w-full ${activeSection === id ? 'w-full' : ''}`} />
    )}
  </button>
);

export default React.memo(NavLink);
