// Logger Service
class Logger {
  private rerenderCounts: Map<string, number>;
  private isDevelopment: boolean;

  constructor() {
    this.rerenderCounts = new Map();
    this.isDevelopment = process.env.NODE_ENV === 'development';
  }

  rerender(componentName: string): void {
    if (!this.isDevelopment) return;

    // Increment the rerender count for this component
    const currentCount = this.rerenderCounts.get(componentName) || 0;
    const newCount = currentCount + 1;
    this.rerenderCounts.set(componentName, newCount);

    // Log the rerender with styling
    console.log(
      `%c🔄 ${componentName} %crerendered %c${newCount} %ctimes`,
      'color: #2196F3; font-weight: bold;',
      'color: #666;',
      'color: #f44336; font-weight: bold;',
      'color: #666;',
    );
  }

  getRerenderCount(componentName: string): number {
    return this.rerenderCounts.get(componentName) || 0;
  }

  getAllRerenderCounts(): Record<string, number> {
    return Object.fromEntries(this.rerenderCounts);
  }

  resetRerenderCount(componentName?: string): void {
    if (componentName) {
      this.rerenderCounts.delete(componentName);
    } else {
      this.rerenderCounts.clear();
    }
  }

  // Additional logging methods
  info(message: string, ...args: unknown[]): void {
    if (this.isDevelopment) {
      console.log(`%cℹ️ INFO: ${message}`, 'color: #2196F3;', ...args);
    }
  }

  warn(message: string, ...args: unknown[]): void {
    if (this.isDevelopment) {
      console.warn(`%c⚠️ WARN: ${message}`, 'color: #ff9800;', ...args);
    }
  }

  error(message: string, ...args: unknown[]): void {
    console.error(`%c❌ ERROR: ${message}`, 'color: #f44336;', ...args);
  }

  debug(message: string, ...args: unknown[]): void {
    if (this.isDevelopment) {
      console.debug(`%c🐛 DEBUG: ${message}`, 'color: #9c27b0;', ...args);
    }
  }
}

// Create singleton instance
const logger = new Logger();

export default logger;

// Optional: Export the class for testing or multiple instances
export {Logger};
