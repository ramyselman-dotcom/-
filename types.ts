
export interface Team {
  id: string;
  name: string;
  logo: string;
}

export interface Match {
  id: string;
  homeTeam: Team;
  awayTeam: Team;
  homeScore: number;
  awayScore: number;
  time: string;
  status: 'live' | 'upcoming' | 'finished';
  league: string;
  minute?: number;
}

export interface NewsItem {
  id: string;
  title: string;
  image: string;
  date: string;
  category: string;
  content?: string;
}

export interface UserSettings {
  theme: 'dark' | 'light';
  favoriteLeagues: string[];
}

export type Page = 'home' | 'live' | 'matches' | 'leagues' | 'admin' | 'analysis' | 'settings';
