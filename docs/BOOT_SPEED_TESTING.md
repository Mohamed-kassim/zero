# Boot Speed Testing Guide

This guide provides comprehensive methods to test and optimize your React Native app's boot speed.

## 🚀 Quick Start

### 1. Automated Testing

Run the automated boot speed test suite:

```bash
npm run test:boot-speed
```

### 2. Manual Testing

For manual testing with detailed metrics, run the app and check the console logs:

```bash
# Android
npm run android

# iOS
npm run ios
```

## 📊 What We Measure

The boot time measurement system tracks:

- **JS Bundle Load Time**: Time to load and parse the JavaScript bundle
- **Redux Initialization**: Time to set up Redux store and sagas
- **Navigation Initialization**: Time to set up React Navigation
- **Component Mount Time**: Time for the main App component to mount
- **Total Boot Time**: Complete time from app start to interactive UI

## 🔧 Testing Methods

### 1. Cold Start Testing

Tests app launch with cleared caches:

```bash
# Clear Metro cache and test
npx react-native start --reset-cache
npm run android
```

### 2. Warm Start Testing

Tests app launch with existing caches:

```bash
npm run android
```

### 3. Bundle Size Analysis

Analyze your JavaScript bundle size:

```bash
npx react-native bundle --platform android --dev false --entry-file index.js --bundle-output android-release.bundle --assets-dest android-release-assets
```

### 4. Performance Profiling

Use React Native's built-in performance tools:

```bash
# Enable performance profiling
npx react-native run-android --variant=debug --no-packager
```

## 📱 Platform-Specific Testing

### Android

```bash
# Test on physical device
adb shell am start -W -n com.indranil.zer0/.MainActivity

# Test with specific device
npx react-native run-android --deviceId=YOUR_DEVICE_ID
```

### iOS

```bash
# Test on specific simulator
npx react-native run-ios --simulator="iPhone 14"

# Test on physical device
npx react-native run-ios --device="Your Device Name"
```

## 🛠️ Optimization Techniques

### 1. Code Splitting

Implement lazy loading for screens:

```typescript
const HomeScreen = React.lazy(() => import('./screens/HomeScreen'));
```

### 2. Bundle Optimization

- Remove unused dependencies
- Use tree shaking
- Implement dynamic imports

### 3. Redux Optimization

- Use Redux Toolkit for better performance
- Implement selective subscriptions
- Lazy load reducers

### 4. Navigation Optimization

- Use lazy loading for screens
- Implement proper screen preloading
- Optimize navigation structure

## 📈 Performance Benchmarks

### Target Metrics

- **Cold Start**: < 3 seconds
- **Warm Start**: < 1 second
- **Bundle Size**: < 10MB
- **Time to Interactive**: < 2 seconds

### Current Performance

Check the generated `boot-speed-report.json` for detailed metrics.

## 🔍 Debugging Slow Boot Times

### Common Issues

1. **Large Bundle Size**: Check for unused dependencies
2. **Heavy Initialization**: Move non-critical setup to background
3. **Synchronous Operations**: Use async/await for heavy operations
4. **Memory Leaks**: Check for retained references

### Debug Commands

```bash
# Analyze bundle
npx react-native bundle --platform android --dev false --entry-file index.js --bundle-output android-release.bundle --sourcemap-output android-release.bundle.map

# Check bundle size
ls -lh android-release.bundle

# Profile with Flipper (if available)
npx react-native run-android --variant=debug
```

## 📋 Testing Checklist

- [ ] Cold start time < 3 seconds
- [ ] Warm start time < 1 second
- [ ] Bundle size < 10MB
- [ ] No synchronous blocking operations
- [ ] Proper error boundaries in place
- [ ] Lazy loading implemented for heavy components
- [ ] Redux store optimized
- [ ] Navigation preloading configured
- [ ] Assets optimized and compressed
- [ ] Dependencies minimized

## 🎯 Advanced Testing

### Custom Performance Marks

Add custom performance marks in your code:

```typescript
import {measureOperation} from './src/utils/bootTimeMeasurement';

measureOperation('Database Initialization', async () => {
  // Your database setup code
});
```

### Continuous Monitoring

Set up automated testing in CI/CD:

```yaml
# .github/workflows/boot-speed.yml
name: Boot Speed Test
on: [push, pull_request]
jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - name: Run Boot Speed Tests
        run: npm run test:boot-speed
```

## 📊 Reporting

The test suite generates a comprehensive report at `boot-speed-report.json` containing:

- Individual test results
- Average boot times
- Platform-specific metrics
- Bundle size analysis
- Performance recommendations

## 🚨 Troubleshooting

### Common Errors

1. **Metro bundler issues**: Clear cache with `--reset-cache`
2. **Device connection**: Check ADB/Xcode device list
3. **Permission issues**: Ensure proper device permissions
4. **Memory issues**: Close other apps during testing

### Getting Help

- Check the generated report for specific issues
- Review console logs for error messages
- Use React Native Debugger for detailed profiling
- Consult React Native performance documentation

## 📚 Additional Resources

- [React Native Performance](https://reactnative.dev/docs/performance)
- [Metro Bundler Configuration](https://facebook.github.io/metro/docs/configuration)
- [Redux Performance](https://redux.js.org/usage/performance)
- [React Navigation Performance](https://reactnavigation.org/docs/performance)
