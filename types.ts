
export interface Message {
  role: 'user' | 'assistant';
  content: string;
  feedback: 'positive' | 'negative' | null;
}

export interface Tournament {
  id: string;
  name: string;
  date: string;
  location: string;
  status: 'Upcoming' | 'Live' | 'Completed';
  image: string;
}

export interface Player {
  rank: number;
  name: string;
  points: number;
  country: string;
  image: string;
  bio?: string;
  highlights?: string[];
  videos?: string[];
}

export interface TourData {
  name: string;
  tagline: string;
  description: string;
  email: string;
  tournaments: Tournament[];
  rankings: {
    category: string;
    players: Player[];
  }[];
}
