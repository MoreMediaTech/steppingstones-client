const dev = process.env.NODE_ENV !== 'production'

export const NEXT_URL = dev
  ? 'http://localhost:3001'
  : 'https://steppingstonesapp.com'

export const API_URL = dev
  ? 'http://localhost:5001/api/v1/'
  : 'https://steppingstonesapp.com/api/v1/'
