# Norway Trip Planner 2025

An interactive trip planner for Norway with AI-powered attraction suggestions using Gemini API.

## Features

- Interactive timeline with completion badges
- AI-powered attraction suggestions along routes
- Progress tracking with localStorage
- Weather forecast integration
- Cost breakdown and planning
- Responsive design for mobile and desktop

## Setup Instructions

### 1. Environment Configuration

Copy `.env.local.example` to `.env.local` and fill in your values:

```bash
cp .env.local .env.local
```

Edit `.env.local`:
```
GEMINI_API_KEY=your_actual_gemini_api_key_here
```

### 2. Get Gemini API Key

1. Go to [Google AI Studio](https://aistudio.google.com/)
2. Create a new API key
3. Add it to your `.env.local` file

### 3. Local Development

Install dependencies:
```bash
npm install
```

Run development server:
```bash
npm run dev
```

### 4. Deployment to Vercel

1. Install Vercel CLI:
```bash
npm install -g vercel
```

2. Deploy:
```bash
vercel
```

3. Set environment variables in Vercel dashboard:
   - `GEMINI_API_KEY`: Your Gemini API key

## API Integration

The application uses a Vercel API proxy (`/api/gemini-proxy`) to securely communicate with the Gemini API. This approach:

- Keeps API keys secure on the server
- Provides consistent error handling
- Enables proper CORS handling

## File Structure

```
norway-trip.html          # Main application file
config.js                 # Client-side configuration
api/gemini-proxy.ts       # Vercel API proxy function
package.json              # Dependencies and scripts
vercel.json               # Vercel deployment configuration
.env.local                # Environment variables (not in git)
```

## Security Notes

- Never commit `.env.local` to git
- Consider implementing rate limiting for production use

## Usage

1. Open the application in your browser
2. Use the timeline to track your trip progress
3. Click "Znajdź miejsca" buttons to get AI-powered attraction suggestions
4. Use the AI search tab to find attractions between specific points
5. Track your progress with completion badges

## Troubleshooting

### API Errors
- Check that your Gemini API key is valid
- Check browser console for detailed error messages

### Local Development Issues
- Ensure all dependencies are installed: `npm install`
- Check that port 3000 is available
- Verify environment variables are set correctly

## License

MIT
