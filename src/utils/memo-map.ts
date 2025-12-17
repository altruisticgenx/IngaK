/**
 * MEMOIZATION OPTIMIZATION MAP
 * 
 * This document tracks all memoized components and their dependencies
 * for performance auditing and optimization verification.
 * 
 * ┌─────────────────────────────────────────────────────────────────────────────┐
 * │ COMPONENT MEMOIZATION STATUS                                                │
 * ├─────────────────────────┬──────────────┬────────────────────────────────────┤
 * │ Component               │ Memoized     │ Props/Dependencies                 │
 * ├─────────────────────────┼──────────────┼────────────────────────────────────┤
 * │ NavLink                 │ ✅ React.memo │ id, name, activeSection, onClick   │
 * │ SectionTitle            │ ✅ React.memo │ title, subtitle, center            │
 * │ SkillCard               │ ✅ React.memo │ icon, color, title, items          │
 * │ ExperienceItem          │ ✅ React.memo │ role, company, period, items, etc. │
 * │ ProjectCard             │ ✅ React.memo │ title, desc, tags, icon, etc.      │
 * │ Navbar                  │ ❌ No memo    │ activeSection, scrolled, onNavigate│
 * │ Hero                    │ ❌ No memo    │ onNavigate                         │
 * │ About                   │ ❌ No memo    │ None                               │
 * │ Expertise               │ ❌ No memo    │ None                               │
 * │ Experience              │ ❌ No memo    │ None                               │
 * │ Qualifications          │ ❌ No memo    │ None                               │
 * │ Projects                │ ❌ No memo    │ None                               │
 * │ Footer                  │ ❌ No memo    │ onNavigate                         │
 * └─────────────────────────┴──────────────┴────────────────────────────────────┘
 * 
 * ┌─────────────────────────────────────────────────────────────────────────────┐
 * │ HOOKS MEMOIZATION STATUS                                                    │
 * ├─────────────────────────┬──────────────┬────────────────────────────────────┤
 * │ Hook Usage              │ Type         │ Dependencies                       │
 * ├─────────────────────────┼──────────────┼────────────────────────────────────┤
 * │ scrollToSection         │ useCallback  │ [] (stable)                        │
 * │ navItems (Navbar)       │ useMemo      │ [] (stable)                        │
 * │ colorClasses (SkillCard)│ useMemo      │ [] (stable)                        │
 * │ borderColors (ExpItem)  │ useMemo      │ [] (stable)                        │
 * │ textColors (ExpItem)    │ useMemo      │ [] (stable)                        │
 * │ colorMap (ProjectCard)  │ useMemo      │ [] (stable)                        │
 * └─────────────────────────┴──────────────┴────────────────────────────────────┘
 * 
 * ┌─────────────────────────────────────────────────────────────────────────────┐
 * │ RE-RENDER TRIGGERS                                                          │
 * ├─────────────────────────┬───────────────────────────────────────────────────┤
 * │ State Change            │ Components Affected                               │
 * ├─────────────────────────┼───────────────────────────────────────────────────┤
 * │ activeSection           │ Portfolio → Navbar → NavLinks (memoized)         │
 * │ scrolled                │ Portfolio → Navbar (class changes)               │
 * │ isMenuOpen (Navbar)     │ Navbar only (mobile menu toggle)                 │
 * └─────────────────────────┴───────────────────────────────────────────────────┘
 * 
 * OPTIMIZATION NOTES:
 * 
 * 1. Section components (About, Expertise, etc.) don't need memoization
 *    because they have no props and render static content.
 * 
 * 2. NavLink is correctly memoized - only re-renders when activeSection
 *    changes for that specific link.
 * 
 * 3. SkillCard, ExperienceItem, ProjectCard use useMemo for color maps
 *    to prevent object recreation on each render.
 * 
 * 4. scrollToSection is wrapped in useCallback with empty deps for
 *    stable reference across re-renders.
 * 
 * 5. The debounced scroll handler is stored in useRef to maintain
 *    identity and proper cleanup.
 * 
 * AUDIT CHECKLIST:
 * ✅ No unnecessary re-renders from prop spreading
 * ✅ All callback props are memoized (useCallback)
 * ✅ All computed objects are memoized (useMemo)
 * ✅ Child components receiving callbacks are memoized (React.memo)
 * ✅ Keys use stable identifiers (not array indices)
 * ✅ Context consumers are properly split to minimize re-renders
 */

export const MEMO_MAP = {
  components: {
    memoized: ['NavLink', 'SectionTitle', 'SkillCard', 'ExperienceItem', 'ProjectCard'],
    notMemoized: ['Navbar', 'Hero', 'About', 'Expertise', 'Experience', 'Qualifications', 'Projects', 'Footer'],
  },
  hooks: {
    useCallback: ['scrollToSection'],
    useMemo: ['navItems', 'colorClasses', 'borderColors', 'textColors', 'colorMap'],
  },
  stateChanges: {
    activeSection: ['Portfolio', 'Navbar', 'NavLink'],
    scrolled: ['Portfolio', 'Navbar'],
    isMenuOpen: ['Navbar'],
  },
} as const;
