export interface BootTimeMetrics {
  appStartTime: number;
  jsBundleLoadTime: number;
  componentMountTime: number;
  reduxInitTime: number;
  navigationInitTime: number;
  totalBootTime: number;
}

class BootTimeMeasurement {
  private startTime: number;
  private metrics: Partial<BootTimeMetrics> = {};

  constructor() {
    this.startTime = Date.now();
    this.metrics.appStartTime = this.startTime;
  }

  markJSBundleLoaded() {
    this.metrics.jsBundleLoadTime = Date.now() - this.startTime;
    console.log(
      `🚀 JS Bundle loaded in: ${this.metrics.jsBundleLoadTime.toFixed(2)}ms`,
    );
  }

  markReduxInitialized() {
    this.metrics.reduxInitTime = Date.now() - this.startTime;
    console.log(
      `📦 Redux initialized in: ${this.metrics.reduxInitTime.toFixed(2)}ms`,
    );
  }

  markNavigationInitialized() {
    this.metrics.navigationInitTime = Date.now() - this.startTime;
    console.log(
      `🧭 Navigation initialized in: ${this.metrics.navigationInitTime.toFixed(
        2,
      )}ms`,
    );
  }

  markComponentMounted() {
    this.metrics.componentMountTime = Date.now() - this.startTime;
    console.log(
      `⚛️ Component mounted in: ${this.metrics.componentMountTime.toFixed(
        2,
      )}ms`,
    );
  }

  finish() {
    this.metrics.totalBootTime = Date.now() - this.startTime;
    console.log(
      `🎯 Total boot time: ${this.metrics.totalBootTime.toFixed(2)}ms`,
    );

    // Log detailed breakdown
    console.log('📊 Boot Time Breakdown:', {
      jsBundleLoad: this.metrics.jsBundleLoadTime?.toFixed(2) + 'ms',
      reduxInit: this.metrics.reduxInitTime?.toFixed(2) + 'ms',
      navigationInit: this.metrics.navigationInitTime?.toFixed(2) + 'ms',
      componentMount: this.metrics.componentMountTime?.toFixed(2) + 'ms',
      total: this.metrics.totalBootTime?.toFixed(2) + 'ms',
    });

    return this.metrics as BootTimeMetrics;
  }

  getMetrics(): Partial<BootTimeMetrics> {
    return this.metrics;
  }
}

export const bootTimeMeasurement = new BootTimeMeasurement();

// Utility to measure specific operations
export const measureOperation = (
  name: string,
  operation: () => void | Promise<void>,
) => {
  const start = Date.now();

  const result = operation();
  if (result instanceof Promise) {
    return result.finally(() => {
      const duration = Date.now() - start;
      console.log(`⏱️ ${name}: ${duration.toFixed(2)}ms`);
    });
  } else {
    const duration = Date.now() - start;
    console.log(`⏱️ ${name}: ${duration.toFixed(2)}ms`);
  }
};
