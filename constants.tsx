
import React from 'react';
import { Match, NewsItem } from './types';

export const LEAGUES = [
  { id: "1", name: "الدوري المصري", logo: "🇪🇬" },
  { id: "4", name: "دوري أبطال أفريقيا", logo: "🌍🏆" },
  { id: "6", name: "الكونفدرالية الأفريقية", logo: "🌍🥈" },
  { id: "2", name: "الدوري الإسباني", logo: "🇪🇸" },
  { id: "3", name: "الدوري الإنجليزي", logo: "🏴󠁧󠁢󠁥󠁮󠁧󠁿" },
  { id: "5", name: "دوري أبطال أوروبا", logo: "🏆" }
];

export const TEAMS = [
  { id: "ahly", name: "الأهلي", logo: "🔴" },
  { id: "zamalek", name: "الزمالك", logo: "⚪" },
  { id: "pyramids", name: "بيراميدز", logo: "🔵" },
  { id: "ismaily", name: "الإسماعيلي", logo: "🟡" },
  { id: "masry", name: "المصري", logo: "🟢" },
  { id: "esperance", name: "الترجي التونسي", logo: "🟡🔴" },
  { id: "raja", name: "الرجاء المغربي", logo: "🟢⚪" },
  { id: "wydad", name: "الوداد المغربي", logo: "🔴⚪" },
  { id: "sundowns", name: "صن داونز", logo: "🟡🔵" },
  { id: "berkane", name: "نهضة بركان", logo: "🟠" },
  { id: "mazembe", name: "تي بي مازيمبي", logo: "⚪⚫" },
  { id: "liverpool", name: "ليفربول", logo: "🔴🏴󠁧󠁢󠁥󠁮󠁧󠁿" },
  { id: "realmadrid", name: "ريال مدريد", logo: "⚪🇪🇸" }
];

export const INITIAL_MATCHES: Match[] = [
  {
    id: "1",
    homeTeam: TEAMS[0],
    awayTeam: TEAMS[1],
    homeScore: 2,
    awayScore: 1,
    time: "21:00",
    status: "live",
    league: "الدوري المصري",
    minute: 72
  },
  {
    id: "5",
    homeTeam: TEAMS[0],
    awayTeam: TEAMS[5],
    homeScore: 1,
    awayScore: 1,
    time: "22:00",
    status: "live",
    league: "دوري أبطال أفريقيا",
    minute: 45
  }
];

export const INITIAL_NEWS: NewsItem[] = [
  {
    id: "1",
    title: "قرعة ربع نهائي دوري أبطال أفريقيا تضع الأهلي في مواجهة نارية",
    image: "https://picsum.photos/seed/africa1/800/450",
    date: "الآن",
    category: "دوري أبطال أفريقيا"
  },
  {
    id: "2",
    title: "الزمالك يتأهب لموقعة نهضة بركان في نهائي الكونفدرالية",
    image: "https://picsum.photos/seed/africa2/800/450",
    date: "منذ ساعة",
    category: "الكونفدرالية الأفريقية"
  }
];
