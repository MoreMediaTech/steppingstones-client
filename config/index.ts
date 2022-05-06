const dev = process.env.NODE_ENV !== 'production'

export const NEXT_URL = dev
  ? 'http://localhost:3000'
  : 'https://steppingstonesapp.com/'

export const API_URL = dev
  ? 'http://localhost:5001/api/v1/'
  : 'https://steppingstoneapp-server.herokuapp.com/api/v1/'
