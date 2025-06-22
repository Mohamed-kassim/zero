#!/usr/bin/env node

const {execSync} = require('child_process');
const fs = require('fs');
const path = require('path');

class BootSpeedTester {
  constructor() {
    this.results = [];
    this.testCount = 0;
  }

  log(message) {
    console.log(`[${new Date().toISOString()}] ${message}`);
  }

  async runCommand(command, description) {
    this.log(`Running: ${description}`);
    try {
      const startTime = Date.now();
      const result = execSync(command, {encoding: 'utf8', stdio: 'pipe'});
      const duration = Date.now() - startTime;

      this.log(`✅ ${description} completed in ${duration}ms`);
      return {success: true, duration, output: result};
    } catch (error) {
      this.log(`❌ ${description} failed: ${error.message}`);
      return {success: false, error: error.message};
    }
  }

  async testColdStart() {
    this.log('🧪 Testing Cold Start...');

    // Kill any existing Metro bundler
    await this.runCommand(
      'pkill -f "react-native start"',
      'Kill existing Metro',
    );

    // Clear Metro cache
    await this.runCommand(
      'npx react-native start --reset-cache',
      'Clear Metro cache',
    );

    // Wait for Metro to be ready
    await new Promise(resolve => setTimeout(resolve, 5000));

    // Test Android cold start
    const androidResult = await this.runCommand(
      'npx react-native run-android --variant=debug',
      'Android Cold Start',
    );

    // Test iOS cold start (if on macOS)
    let iosResult = null;
    if (process.platform === 'darwin') {
      iosResult = await this.runCommand(
        'npx react-native run-ios --simulator="iPhone 14"',
        'iOS Cold Start',
      );
    }

    return {android: androidResult, ios: iosResult};
  }

  async testWarmStart() {
    this.log('🔥 Testing Warm Start...');

    // Test Android warm start
    const androidResult = await this.runCommand(
      'npx react-native run-android --variant=debug',
      'Android Warm Start',
    );

    // Test iOS warm start (if on macOS)
    let iosResult = null;
    if (process.platform === 'darwin') {
      iosResult = await this.runCommand(
        'npx react-native run-ios --simulator="iPhone 14"',
        'iOS Warm Start',
      );
    }

    return {android: androidResult, ios: iosResult};
  }

  async testBundleSize() {
    this.log('📦 Analyzing Bundle Size...');

    // Generate bundle analysis
    const bundleResult = await this.runCommand(
      'npx react-native bundle --platform android --dev false --entry-file index.js --bundle-output android-release.bundle --assets-dest android-release-assets',
      'Generate Android Bundle',
    );

    if (bundleResult.success) {
      const stats = fs.statSync('android-release.bundle');
      const sizeInMB = (stats.size / (1024 * 1024)).toFixed(2);
      this.log(`📊 Android Bundle Size: ${sizeInMB}MB`);
    }

    return bundleResult;
  }

  async testPerformance() {
    this.log('⚡ Testing Performance...');

    // Run performance tests
    const perfResult = await this.runCommand(
      'npx react-native run-android --variant=debug --no-packager',
      'Performance Test',
    );

    return perfResult;
  }

  generateReport() {
    this.log('📋 Generating Boot Speed Report...');

    const report = {
      timestamp: new Date().toISOString(),
      platform: process.platform,
      nodeVersion: process.version,
      results: this.results,
      summary: {
        totalTests: this.results.length,
        successfulTests: this.results.filter(r => r.success).length,
        averageBootTime: this.calculateAverageBootTime(),
      },
    };

    const reportPath = path.join(__dirname, '../boot-speed-report.json');
    fs.writeFileSync(reportPath, JSON.stringify(report, null, 2));

    this.log(`📄 Report saved to: ${reportPath}`);
    this.printSummary(report);
  }

  calculateAverageBootTime() {
    const successfulTests = this.results.filter(r => r.success && r.duration);
    if (successfulTests.length === 0) return 0;

    const totalTime = successfulTests.reduce(
      (sum, test) => sum + test.duration,
      0,
    );
    return Math.round(totalTime / successfulTests.length);
  }

  printSummary(report) {
    console.log('\n🎯 BOOT SPEED TEST SUMMARY');
    console.log('========================');
    console.log(`Total Tests: ${report.summary.totalTests}`);
    console.log(`Successful: ${report.summary.successfulTests}`);
    console.log(`Average Boot Time: ${report.summary.averageBootTime}ms`);
    console.log(`Platform: ${report.platform}`);
    console.log(`Node Version: ${report.nodeVersion}`);

    if (report.results.length > 0) {
      console.log('\n📊 Detailed Results:');
      report.results.forEach((result, index) => {
        console.log(
          `${index + 1}. ${result.description}: ${
            result.success ? '✅' : '❌'
          } ${result.duration ? `${result.duration}ms` : 'Failed'}`,
        );
      });
    }
  }

  async runAllTests() {
    this.log('🚀 Starting Boot Speed Test Suite...');

    // Test cold start
    const coldStartResult = await this.testColdStart();
    this.results.push({
      description: 'Cold Start - Android',
      ...coldStartResult.android,
    });

    if (coldStartResult.ios) {
      this.results.push({
        description: 'Cold Start - iOS',
        ...coldStartResult.ios,
      });
    }

    // Test warm start
    const warmStartResult = await this.testWarmStart();
    this.results.push({
      description: 'Warm Start - Android',
      ...warmStartResult.android,
    });

    if (warmStartResult.ios) {
      this.results.push({
        description: 'Warm Start - iOS',
        ...warmStartResult.ios,
      });
    }

    // Test bundle size
    const bundleResult = await this.testBundleSize();
    this.results.push({
      description: 'Bundle Size Analysis',
      ...bundleResult,
    });

    // Test performance
    const perfResult = await this.testPerformance();
    this.results.push({
      description: 'Performance Test',
      ...perfResult,
    });

    this.generateReport();
  }
}

// Run the tests if this script is executed directly
if (require.main === module) {
  const tester = new BootSpeedTester();
  tester.runAllTests().catch(console.error);
}

module.exports = BootSpeedTester;
