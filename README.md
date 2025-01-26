# EduVortex - AI-Powered Learning Platform

![EduVortex](https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=1200&q=80)

EduVortex is an innovative learning platform that leverages AI to create personalized learning experiences. It combines adaptive learning paths, interactive content, and real-time progress tracking to help users master new skills effectively.
Test this website here: https://illustrious-banoffee-01ece8.netlify.app/

## Features

- 🧠 **AI-Powered Learning Paths**: Generate customized learning roadmaps for any topic
- 🎯 **Personalized Progress Tracking**: Track your learning journey with detailed analytics
- 🤖 **AI Learning Assistant**: Get instant help and clarification on any topic
- 🏆 **Achievement System**: Stay motivated with gamified learning experiences
- 📊 **Visual Progress**: Track your growth with intuitive progress visualization

## Tech Stack

- **Frontend**: React with TypeScript
- **Styling**: Tailwind CSS
- **State Management**: Zustand
- **Database**: Supabase
- **AI Integration**: Google's Gemini AI
- **3D Graphics**: Spline
- **Routing**: React Router
- **Markdown**: React Markdown with syntax highlighting
- **Animations**: Framer Motion

## Getting Started

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up environment variables:
   Create a `.env` file with:
   ```env
   VITE_SUPABASE_URL=your_supabase_url
   VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
   VITE_GEMINI_API_KEY=your_gemini_api_key
   ```

4. Start the development server:
   ```bash
   npm run dev
   ```

## Project Structure

```
src/
├── components/         # Reusable UI components
│   ├── ui/            # Core UI components
│   └── ...
├── lib/               # Utilities and store
│   ├── gemini.ts      # AI integration
│   ├── supabase.ts    # Database client
│   └── ...
├── pages/             # Main application pages
└── types/             # TypeScript type definitions
```

## Features in Detail

### AI-Powered Learning Paths
- Generate custom learning roadmaps for any topic
- Visual representation of learning progress
- Interactive node-based navigation

### Progress Tracking
- XP-based progression system
- Learning streaks
- Achievement unlocks
- Detailed analytics

### Interactive Learning
- AI-powered chat assistance
- Real-time feedback
- Dynamic content generation

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request


## Acknowledgments

- [Supabase](https://supabase.com/) for the backend infrastructure
- [Google Gemini AI](https://deepmind.google/technologies/gemini/) for AI capabilities
- [Spline](https://spline.design/) for 3D graphics
- [Unsplash](https://unsplash.com/) for image
