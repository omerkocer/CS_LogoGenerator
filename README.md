# CS Logo Generator

CS Logo Generator is a mobile application that creates custom logo designs using AI-powered text prompts. This case study project demonstrates the integration of artificial intelligence with mobile app development, using Firebase as the Backend-as-a-Service (BaaS) solution.

## Overview

This application allows users to generate unique logos by simply describing their desired design in text. The text prompt is processed by an AI system to create a custom logo based on the user's description and selected style.

## Features

- **AI-Powered Logo Generation**: Transform text descriptions into unique logo designs
- **Multiple Logo Styles**: 
  - No Style
  - Monogram
  - Abstract
  - Mascot
- **Surprise Me**: Get random logo suggestions
- **Real-time Processing Status**: Track the logo generation progress
- **Easy Prompt Copying**: Copy generated logo prompts with one click
- **Modern UI/UX**: User-friendly and contemporary interface

## Technical Details

### Technologies Used

- React Native
- Expo
- TypeScript
- Firebase (Firestore as BaaS)
- Linear Gradient
- React Navigation

### Project Structure

```
CS_LogoGenerator/
├── app/
│   ├── (tabs)/
│   │   ├── index.tsx
│   │   ├── output.tsx
│   │   └── _layout.tsx
│   ├── _layout.tsx
│   └── +not-found.tsx
├── assets/
│   ├── icons/
│   ├── images/
│   └── fonts/
├── components/
│   ├── LogoInput.tsx
│   ├── LogoOutput.tsx
│   └── ui/
│       ├── Header.tsx
│       ├── Status.tsx
│       └── CircularLoader.tsx
└── constants/
    └── Colors.ts
```

### Setup

1. Clone the project:
```bash
git clone [repo-url]
```

2. Install dependencies:
```bash
npm install
```

3. Install Expo CLI (if not installed):
```bash
npm install -g expo-cli
```

4. Start the application:
```bash
npx expo start
```

### Development

- `npm start`: Start Expo development server
- `npm run android`: Run on Android
- `npm run ios`: Run on iOS
- `npm run web`: Run on web

## Usage

1. Enter a description for your logo on the main screen
2. Optionally click "Surprise me" for a random suggestion
3. Select a logo style
4. Click "Create"
5. Monitor the generation progress
6. View the generated logo and copy the prompt

## Screenshots

### Main Screen
<img src="./assets/screenshots/1Simulator%20Screenshot-iPhone%2016%20Pro-2025-05-11.png" width="300" alt="Main Screen" />
*The main screen where users can enter their logo description*

### Style Selection
<img src="./assets/screenshots/2Simulator%20Screenshot-iPhone%2016%20Pro-2025-05-11%20at%2020.37.51.png" width="300" alt="Style Selection" />
*Different logo styles available for selection*

### Processing Status
<img src="./assets/screenshots/3Simulator%20Screenshot%20-%20iPhone%2016%20Pro%20-%202025-05-11%20at%2020.38.03.png" width="300" alt="Processing Status" />
*Real-time status updates during logo generation*

### Generated Logo
<img src="./assets/screenshots/4Simulator%20Screenshot%20-%20iPhone%2016%20Pro%20-%202025-05-11%20at%2020.38.57.png" width="300" alt="Generated Logo" />
*The final generated logo with copy functionality*

### Final Result
<img src="./assets/screenshots/5Simulator%20Screenshot%20-%20iPhone%2016%20Pro%20-%202025-05-11%20at%2020.39.03.png" width="300" alt="Final Result" />
*The final result screen showing the generated logo*

### Error State
<img src="./assets/screenshots/6Simulator%20Screenshot%20-%20iPhone%2016%20Pro%20-%202025-05-11%20at%2020.57.15.png" width="300" alt="Error State" />
*Error state display when logo generation fails*

## Case Study Details

This project was developed as a case study to demonstrate:
- Integration of AI with mobile applications
- Implementation of Firebase as a BaaS solution
- Modern mobile app development practices
- Real-time status updates and user feedback
- Efficient state management and UI/UX design

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the `LICENSE` file for details.

## Contact

Project Owner - [omerkocer](https://github.com/omerkocer)

Project Link: [https://github.com/omerkocer/CS_LogoGenerator](https://github.com/omerkocer/CS_LogoGenerator)
