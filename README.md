# FYNP - Financial Planning App

A React Native mobile application built with Expo for financial planning and management.

## Features

- **Onboarding Flow**: Welcome screen, mobile number verification, and OTP authentication
- **Dashboard**: Personal finance overview with wealth tracking
- **Credit Cards**: Browse and apply for credit cards with personalized recommendations
- **Bottom Tab Navigation**: Easy access to Home, Portfolio, Offers, and Account sections
- **Modern UI**: Dark theme with custom SVG icons

## Tech Stack

- **Framework**: React Native with Expo SDK 54.0.0
- **Navigation**: React Navigation (Stack & Bottom Tabs)
- **State Management**: React Context API
- **Icons**: React Native SVG
- **Styling**: StyleSheet with themed design system

## Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn
- Expo CLI (optional, but recommended)

### Installation

1. Clone the repository:
```bash
git clone https://github.com/U1technologies/FYNPAPP.git
cd FYNPAPP
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file in the root directory:
```bash
API_URL=your_api_url
API_TIMEOUT=30000
ENV=development
```

### Running the App

Start the Expo development server:
```bash
npx expo start
```

Then:
- Press `a` to open on Android emulator
- Press `i` to open on iOS simulator
- Scan the QR code with Expo Go app on your physical device

### Running on Specific Platform

**Android:**
```bash
npx expo start --android
```

**iOS:**
```bash
npx expo start --ios
```

**Web:**
```bash
npx expo start --web
```

## Project Structure

```
FYNP-expo/
├── src/
│   ├── assets/          # Images, icons, and other static files
│   ├── components/      # Reusable UI components
│   ├── config/          # App configuration and constants
│   ├── hooks/           # Custom React hooks
│   ├── navigation/      # Navigation setup (Stack & Tab navigators)
│   ├── screens/         # App screens
│   │   ├── Onboarding/
│   │   ├── Dashboard/
│   │   ├── CreditCards/
│   │   ├── Portfolio/
│   │   ├── Offers/
│   │   └── Profile/
│   ├── services/        # API services
│   ├── store/           # Context-based state management
│   ├── styles/          # Global styles
│   ├── theme/           # Theme configuration (colors, spacing, typography)
│   └── utils/           # Utility functions
├── App.js               # Entry point
├── babel.config.js      # Babel configuration
├── metro.config.js      # Metro bundler config (for SVG support)
├── package.json         # Dependencies
└── README.md           # This file
```

## Key Files

- **App.js**: Main entry point with providers setup
- **metro.config.js**: Metro bundler configuration for SVG imports
- **svg.d.ts**: TypeScript declarations for SVG modules
- **src/navigation/AppNavigator.js**: Main navigation controller
- **src/navigation/HomeStackNavigator.js**: Home tab stack navigation
- **src/navigation/TabNavigator.js**: Bottom tab navigation

## Development Notes

### SVG Icons

SVG icons are imported directly as React components:
```javascript
import HomeIcon from '../assets/homepage/icons/home-active.svg';

<HomeIcon width={24} height={24} />
```

### State Management

The app uses React Context API for state management:
- **AuthProvider**: Authentication state
- **UserProvider**: User data
- **TransactionProvider**: Transaction history

### Navigation

The app uses a nested navigation structure:
- Stack Navigator (root)
  - Tab Navigator
    - Home Stack Navigator
      - Dashboard Screen
      - Credit Cards Screen
    - Portfolio Screen
    - Offers Screen
    - Account Screen
  - Settings Screen

## Environment Variables

Create a `.env` file with the following variables:

```env
API_URL=https://your-api-url.com
API_TIMEOUT=30000
ENV=development
```

## Troubleshooting

### Metro Bundler Port Already in Use

If you see "Port 8081 is being used by another process":

**Windows:**
```bash
netstat -ano | findstr :8081
taskkill //PID [PID_NUMBER] //F
```

**Mac/Linux:**
```bash
lsof -i :8081
kill -9 [PID_NUMBER]
```

### Clear Cache

If you encounter build issues:
```bash
npx expo start --clear
```

Or clear Metro bundler cache:
```bash
npx expo start -c
```

### SVG Icons Not Showing

Make sure you've installed the SVG dependencies:
```bash
npm install react-native-svg react-native-svg-transformer
```

Then restart the dev server with:
```bash
npx expo start -c
```

## Contributing

1. Create a feature branch: `git checkout -b feature/your-feature-name`
2. Make your changes
3. Commit with descriptive messages: `git commit -m "Add: feature description"`
4. Push to the branch: `git push origin feature/your-feature-name`
5. Create a Pull Request

## Team

- **Organization**: U1 Technologies
- **Repository**: https://github.com/U1technologies/FYNPAPP

## License

Private - All rights reserved by U1 Technologies
