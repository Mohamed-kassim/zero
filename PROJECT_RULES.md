# Zer0 - Project Rules & Architecture Guidelines

## Project Overview

**Zer0** is a React Native expense management app built with TypeScript, featuring local data storage, Redux state management, and a minimalist design prioritizing user privacy.

## Technology Stack

### Core Technologies

- **React Native**: 0.72.6
- **TypeScript**: 4.8.4
- **Redux Toolkit + Redux Saga**: State management
- **Realm**: Local database
- **React Navigation**: Navigation framework
- **Zod**: Schema validation

### Key Dependencies

- **@react-native-async-storage/async-storage**: Local storage
- **@react-native-community/datetimepicker**: Date/time selection
- **react-native-svg-charts**: Data visualization
- **react-native-vector-icons**: Icon library
- **moment**: Date manipulation
- **patch-package**: Dependency patching

## Architecture Patterns

### 1. Atomic Design Pattern

The component architecture follows the Atomic Design methodology:

```
src/components/
├── atoms/          # Basic building blocks (buttons, inputs, text)
├── molecules/      # Simple combinations of atoms
└── organisms/      # Complex UI components (not currently used)
```

**Rules:**

- Atoms must be reusable and context-independent
- Molecules should combine 2-3 atoms maximum
- Each component must have proper TypeScript interfaces
- Components should accept `colors` prop for theming

### 2. Redux Architecture

Follows Redux Toolkit with Redux Saga pattern:

```
src/redux/
├── slice/          # Redux Toolkit slices
├── saga/           # Redux Saga side effects
├── actionTypes.ts  # Action type constants
├── rootReducer.ts  # Combined reducers
├── rootSaga.ts     # Combined sagas
└── store.ts        # Store configuration
```

**Rules:**

- Use Redux Toolkit for slice creation
- Implement Redux Saga for async operations
- Keep actions in separate actionTypes file
- Use TypeScript for all Redux code
- Follow naming convention: `entityAction` (e.g., `getExpenseRequest`)

### 3. Screen Architecture

Each screen follows a consistent pattern:

```
src/screens/ScreenName/
├── index.tsx       # Main component (UI only)
├── useScreenName.ts # Business logic hook
└── style.ts        # Screen-specific styles
```

**Rules:**

- Separate UI logic from business logic
- Use custom hooks for business logic
- Keep styles in separate files
- Follow naming convention: `useScreenName` for hooks

### 4. Service Layer Pattern

Services handle data operations:

```
src/services/
├── EntityService.ts    # CRUD operations for each entity
├── GetService.ts       # Read operations
└── DeleteService.ts    # Delete operations
```

**Rules:**

- Services must be async/await based
- Use Realm for all database operations
- Implement proper error handling
- Follow naming convention: `actionEntity` (e.g., `createExpense`)

## Database Schema Rules

### Realm Database Structure

```
src/schemas/
├── UserSchema.ts
├── CategorySchema.ts
├── ExpenseSchema.ts
├── CurrencySchema.ts
├── DebtorSchema.ts
└── DebtSchema.ts
```

**Rules:**

- All schemas must extend `Realm.Object`
- Use `Realm.BSON.ObjectId` for primary keys
- Define proper relationships between schemas
- Include schema versioning in realm config
- Use descriptive property names

### Schema Relationships

- User has many Expenses, Categories, Debtors
- Category belongs to User
- Expense belongs to User and Category
- Debtor belongs to User
- Debt belongs to Debtor

## Navigation Structure

### Stack Navigation

```
MainStack
├── OnboardingStack (for new users)
│   ├── WelcomeScreen
│   ├── PersonalizeScreen
│   ├── ChooseCurrencyScreen
│   └── ExistingUserScreen
└── HomeStack (for existing users)
    ├── TabStack
    │   ├── HomeScreen
    │   ├── ReportsScreen
    │   ├── CategoryScreen
    │   └── DebtsScreen
    └── Modal Screens
        ├── AddTransactionsScreen
        ├── UpdateTransactionScreen
        ├── AddCategoryScreen
        └── SettingsScreen
```

**Rules:**

- Use stack navigation for main flows
- Use tab navigation for primary screens
- Implement proper navigation guards
- Use navigation refs for programmatic navigation

## Theming System

### Color Management

```
src/hooks/useThemeColors.ts
```

**Rules:**

- Support light, dark, and system themes
- Use consistent color naming
- Store theme preference in AsyncStorage
- Provide fallback to system theme
- Use semantic color names (primary, secondary, accent)

### Color Palette

- **Light Theme**: White backgrounds, dark text
- **Dark Theme**: Dark backgrounds, light text
- **Accent Colors**: Green for positive, orange for warnings, red for errors

## Component Development Rules

### 1. Atomic Components

```typescript
// Example: PrimaryButton
interface PrimaryButtonProps {
  title: string;
  onPress: () => void;
  colors: Colors;
  disabled?: boolean;
}
```

**Rules:**

- Accept `colors` prop for theming
- Use proper TypeScript interfaces
- Implement accessibility features
- Follow consistent naming conventions

### 2. Molecule Components

```typescript
// Example: TransactionCard
interface TransactionCardProps {
  currencySymbol: string;
  day: string;
  totalSpent: number;
}
```

**Rules:**

- Combine 2-3 atoms maximum
- Keep business logic minimal
- Use proper prop validation
- Implement proper error boundaries

## State Management Rules

### Redux Slice Pattern

```typescript
const entitySlice = createSlice({
  name: 'entity',
  initialState: {
    data: [],
    isLoading: false,
    error: null,
  },
  reducers: {
    getEntityRequest: state => {
      state.isLoading = true;
      state.error = null;
    },
    getEntitySuccess: (state, action) => {
      state.isLoading = false;
      state.data = action.payload;
    },
    getEntityFailure: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
  },
});
```

**Rules:**

- Use consistent state structure
- Implement loading, success, and error states
- Use TypeScript for all state definitions
- Follow naming conventions

### Saga Pattern

```typescript
function* fetchEntity(): Generator<any, void, any> {
  try {
    const userId = yield select(selectUserId);
    const data = yield call(getEntityService, userId);
    yield put(getEntitySuccess(data));
  } catch (error) {
    yield put(getEntityFailure(error));
  }
}
```

**Rules:**

- Use try-catch for error handling
- Select data from Redux state
- Call services for data operations
- Dispatch success/failure actions

## Validation Rules

### Zod Schema Validation

```typescript
export const expenseSchema = z
  .string()
  .min(1, 'Expense must be at least 1 character long.')
  .max(25, 'Expense cannot exceed 25 characters.');
```

**Rules:**

- Use Zod for all form validation
- Provide meaningful error messages
- Validate input length and format
- Use consistent validation patterns

## File Organization Rules

### Directory Structure

```
src/
├── components/     # Reusable UI components
├── hooks/         # Custom React hooks
├── navigation/    # Navigation configuration
├── redux/         # State management
├── schemas/       # Database schemas
├── screens/       # Application screens
├── services/      # Data layer services
├── styles/        # Global styles
└── utils/         # Utility functions
```

**Rules:**

- Keep related files together
- Use consistent naming conventions
- Separate concerns properly
- Maintain clear import paths

## Code Style Rules

### TypeScript

- Use strict TypeScript configuration
- Define interfaces for all props
- Use proper type annotations
- Avoid `any` type usage

### Naming Conventions

- **Components**: PascalCase (e.g., `TransactionCard`)
- **Hooks**: camelCase with `use` prefix (e.g., `useHome`)
- **Files**: camelCase for utilities, PascalCase for components
- **Constants**: UPPER_SNAKE_CASE (e.g., `FETCH_ALL_DATA`)

### Import Organization

```typescript
// React and React Native imports
import React from 'react';
import {View, Text} from 'react-native';

// Third-party library imports
import {useSelector, useDispatch} from 'react-redux';

// Local imports
import {Colors} from '../../hooks/useThemeColors';
import PrimaryButton from '../atoms/PrimaryButton';
```

## Testing Rules

### Test Structure

```
__tests__/
└── App.test.tsx
```

**Rules:**

- Write tests for critical business logic
- Test component rendering
- Test Redux actions and reducers
- Use Jest and React Native Testing Library

## Performance Rules

### Optimization Guidelines

- Use `React.memo` for expensive components
- Implement proper list virtualization
- Optimize images and assets
- Use proper dependency arrays in useEffect
- Implement proper cleanup in useEffect

### Memory Management

- Clean up subscriptions and listeners
- Properly dispose of Realm instances
- Use proper key props for lists
- Avoid memory leaks in navigation

## Security Rules

### Data Privacy

- Store all data locally (no cloud storage)
- Use AsyncStorage for user preferences
- Implement proper data export/import
- No user data collection or analytics

### Input Validation

- Validate all user inputs
- Sanitize data before storage
- Implement proper error handling
- Use secure data formats

## Build and Deployment Rules

### Development

- Use Yarn for package management
- Follow semantic versioning
- Use patch-package for dependency fixes
- Maintain proper .gitignore

### Platform Support

- Primary: Android
- Secondary: iOS (basic support)
- Use React Native CLI
- Follow platform-specific guidelines

## Documentation Rules

### Code Documentation

- Document complex business logic
- Use JSDoc for function documentation
- Maintain README with setup instructions
- Document API changes

### Architecture Documentation

- Keep architecture decisions documented
- Document data flow patterns
- Maintain component relationship diagrams
- Document state management patterns

## Feature-Specific Rules

### Expense Management

- Support CRUD operations
- Implement category-based organization
- Provide date-based filtering
- Support currency formatting

### Debt Management

- Track debtors and debts separately
- Support debt status tracking
- Implement debt calculations
- Provide debt history

### Reporting

- Generate spending analytics
- Support date range filtering
- Implement data visualization
- Export reports in JSON format

### Settings

- Support theme switching
- Allow currency customization
- Provide data export/import
- Support user profile management

## Error Handling Rules

### Error Boundaries

- Implement React error boundaries
- Provide user-friendly error messages
- Log errors for debugging
- Graceful degradation

### Validation Errors

- Display validation errors clearly
- Prevent invalid data submission
- Provide helpful error messages
- Implement proper form validation

## Accessibility Rules

### Accessibility Features

- Support screen readers
- Implement proper focus management
- Use semantic HTML elements
- Provide alternative text for images
- Support keyboard navigation

### Color and Contrast

- Maintain proper contrast ratios
- Support color-blind users
- Use semantic color coding
- Provide theme alternatives

## Internationalization Rules

### Localization Support

- Support multiple currencies
- Use proper number formatting
- Support date/time localization
- Prepare for future i18n implementation

## Maintenance Rules

### Code Quality

- Use ESLint for code linting
- Follow Prettier formatting
- Regular dependency updates
- Code review requirements

### Performance Monitoring

- Monitor app performance
- Track memory usage
- Optimize bundle size
- Regular performance audits

---

This document serves as the comprehensive guide for maintaining consistency and quality across the Zer0 expense management application. All developers should follow these rules to ensure code quality, maintainability, and user experience consistency.
