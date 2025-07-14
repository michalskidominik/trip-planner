// Configuration for the trip planner
// This file contains client-side configuration
const CONFIG = {
  // API endpoints
  GEMINI_PROXY_URL: "/api/gemini-proxy",
  
  // Other configuration options
  DEFAULT_LANGUAGE: "pl"
};

// Export for use in the main application
if (typeof window !== 'undefined') {
  window.CONFIG = CONFIG;
}
