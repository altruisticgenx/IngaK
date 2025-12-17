import { useEffect, useRef } from 'react';
import { logRender } from '@/utils/profiler';

/**
 * Hook to track component renders for performance debugging.
 * Only active in development mode.
 * 
 * @param componentName - Name of the component to track
 * 
 * @example
 * function MyComponent() {
 *   useRenderTracker('MyComponent');
 *   return <div>...</div>;
 * }
 */
export function useRenderTracker(componentName: string): void {
  const mountedRef = useRef(false);

  useEffect(() => {
    if (!mountedRef.current) {
      mountedRef.current = true;
      logRender(componentName, 'mount');
    } else {
      logRender(componentName, 'update');
    }
  });
}

export default useRenderTracker;
