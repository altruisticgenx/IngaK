import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useEffect, useState } from 'react';

interface FeatureFlag {
  id: string;
  name: string;
  description: string | null;
  enabled: boolean;
  rollout_percentage: number;
  user_ids: string[];
  created_at: string;
  updated_at: string;
}

// Simple hash function to determine if user falls within rollout percentage
function hashUserId(userId: string): number {
  let hash = 0;
  for (let i = 0; i < userId.length; i++) {
    const char = userId.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash = hash & hash; // Convert to 32bit integer
  }
  return Math.abs(hash % 100);
}

export function useFeatureFlags() {
  const [userId, setUserId] = useState<string | null>(null);

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => {
      setUserId(data.user?.id ?? null);
    });
  }, []);

  const { data: flags, isLoading, error } = useQuery({
    queryKey: ['feature-flags'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('feature_flags')
        .select('*');
      
      if (error) throw error;
      return data as FeatureFlag[];
    },
    staleTime: 1000 * 60 * 5, // Cache for 5 minutes
    gcTime: 1000 * 60 * 10,
  });

  const isEnabled = (flagName: string): boolean => {
    if (!flags) return false;
    
    const flag = flags.find(f => f.name === flagName);
    if (!flag) return false;
    if (!flag.enabled) return false;

    // Check if user is in specific user_ids list (beta testers)
    if (userId && flag.user_ids?.includes(userId)) {
      return true;
    }

    // Check rollout percentage
    if (flag.rollout_percentage === 100) return true;
    if (flag.rollout_percentage === 0) return false;

    // Use user ID hash or random for anonymous users
    const userHash = userId ? hashUserId(userId) : Math.random() * 100;
    return userHash < flag.rollout_percentage;
  };

  return {
    flags,
    isLoading,
    error,
    isEnabled,
    userId,
  };
}

export function useFeatureFlag(flagName: string): boolean {
  const { isEnabled, isLoading } = useFeatureFlags();
  
  // Default to false while loading to prevent flash of content
  if (isLoading) return false;
  
  return isEnabled(flagName);
}
