import { createContext, useContext, ReactNode } from 'react';
import { useFeatureFlags } from '@/hooks/useFeatureFlag';

interface FeatureFlagContextValue {
  isEnabled: (flagName: string) => boolean;
  isLoading: boolean;
  error: Error | null;
}

const FeatureFlagContext = createContext<FeatureFlagContextValue | null>(null);

interface FeatureFlagProviderProps {
  children: ReactNode;
}

export function FeatureFlagProvider({ children }: FeatureFlagProviderProps) {
  const { isEnabled, isLoading, error } = useFeatureFlags();

  return (
    <FeatureFlagContext.Provider value={{ isEnabled, isLoading, error: error as Error | null }}>
      {children}
    </FeatureFlagContext.Provider>
  );
}

export function useFeatureFlagContext() {
  const context = useContext(FeatureFlagContext);
  if (!context) {
    throw new Error('useFeatureFlagContext must be used within a FeatureFlagProvider');
  }
  return context;
}
