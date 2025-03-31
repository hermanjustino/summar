# Summar - Personal Content Management & Social Media Assistant

Summar is an AI-powered application that helps users transform their media consumption into engaging social media content. Upload any content you've consumed, add your thoughts, and let our AI suggest tailored content for various social platforms.

## Project Overview

In today's content-saturated world, sharing meaningful perspectives on the media we consume can be challenging. Summar bridges this gap by helping you:

1. Organize content you've consumed (articles, podcasts, videos, etc.)
2. Record your personal insights and opinions
3. Generate platform-specific social media posts that reflect your authentic voice

## Key Features

- **Content Import**: Upload files or fetch content via URLs/Spotify links
- **Personal Insights**: Document your thoughts and reactions to consumed content
- **AI-Generated Suggestions**: Receive tailored post suggestions for:
  - LinkedIn
  - Substack
  - TikTok
  - Instagram
  - Twitter/X
- **Content Library**: Maintain a searchable archive of your media consumption
- **User Authentication**: Secure user profiles and content
- **Responsive Design**: Seamless experience across all devices

## Technology Stack

### Frontend
- React.js with hooks and context API
- Tailwind CSS for styling
- React Router for navigation
- Formik & Yup for form handling

### Backend
- Node.js with Express
- MongoDB for database
- OpenAI GPT API for content generation
- JWT for authentication

### Deployment
- Frontend: Vercel
- Backend: Heroku
- Database: MongoDB Atlas

## Getting Started

### Prerequisites
- Node.js (v14 or later)
- npm or yarn
- MongoDB (local or Atlas connection)
- Gemini API key

### Installation

1. Clone the repository
   ```
   git clone https://github.com/yourusername/summar.git
   cd summar
   ```

2. Install dependencies
   ```
   npm install
   ```

3. Create a `.env` file in the project root with the following:
   ```
   REACT_APP_API_URL=http://localhost:5000
   OPENAI_API_KEY=your_openai_api_key
   MONGODB_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret
   ```

4. Start the development server
   ```
   npm start
   ```
   
5. For backend development (in a separate terminal):
   ```
   cd server
   npm install
   npm run dev
   ```

## Available Scripts

In the project directory, you can run:

- `npm start`: Runs the app in development mode
- `npm test`: Launches the test runner
- `npm build`: Builds the app for production
- `npm eject`: Ejects from create-react-app (one-way operation)

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- OpenAI for their powerful language models
- Create React App for the project setup
- All contributors and supporters of this project
