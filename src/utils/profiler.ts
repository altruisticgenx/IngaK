/**
 * Performance Profiling Utilities
 * 
 * Use these tools to audit re-renders and verify memoization effectiveness.
 * Only active in development mode - zero overhead in production.
 */

type RenderLog = {
  component: string;
  timestamp: number;
  phase: 'mount' | 'update';
};

const renderLogs: RenderLog[] = [];
const renderCounts = new Map<string, number>();

/**
 * Log a component render for debugging purposes.
 * Only logs in development mode.
 */
export function logRender(componentName: string, phase: 'mount' | 'update' = 'update'): void {
  if (import.meta.env.DEV) {
    const count = (renderCounts.get(componentName) ?? 0) + 1;
    renderCounts.set(componentName, count);
    
    renderLogs.push({
      component: componentName,
      timestamp: performance.now(),
      phase,
    });

    console.debug(
      `%c[render] %c${componentName} %c(${phase}) %c#${count}`,
      'color: #64748b',
      'color: #22d3ee; font-weight: bold',
      'color: #94a3b8',
      'color: #f59e0b'
    );
  }
}

/**
 * Get render statistics for performance analysis.
 */
export function getRenderStats(): { component: string; count: number }[] {
  return Array.from(renderCounts.entries())
    .map(([component, count]) => ({ component, count }))
    .sort((a, b) => b.count - a.count);
}

/**
 * Clear all render logs and counts.
 */
export function clearRenderStats(): void {
  renderLogs.length = 0;
  renderCounts.clear();
}

/**
 * Print a summary of render statistics to console.
 */
export function printRenderSummary(): void {
  if (import.meta.env.DEV) {
    const stats = getRenderStats();
    console.group('%c📊 Render Summary', 'color: #22d3ee; font-size: 14px; font-weight: bold');
    console.table(stats);
    console.groupEnd();
  }
}

/**
 * React Profiler onRender callback for detailed timing analysis.
 * Use with <React.Profiler id="name" onRender={onRenderCallback}>
 */
export function onRenderCallback(
  id: string,
  phase: 'mount' | 'update' | 'nested-update',
  actualDuration: number,
  _baseDuration: number,
  _startTime: number,
  _commitTime: number
): void {
  if (import.meta.env.DEV) {
    const isExpensive = actualDuration > 16; // > 1 frame at 60fps
    
    console.debug(
      `%c[profiler] %c${id} %c${phase} %c${actualDuration.toFixed(2)}ms ${isExpensive ? '⚠️ SLOW' : ''}`,
      'color: #64748b',
      'color: #a78bfa; font-weight: bold',
      'color: #94a3b8',
      isExpensive ? 'color: #ef4444; font-weight: bold' : 'color: #22c55e'
    );
  }
}
