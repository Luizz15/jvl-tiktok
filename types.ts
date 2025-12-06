import React from 'react';

export type Step = 
  | 'HOME' 
  | 'CONNECTING' 
  | 'QUIZ_1' 
  | 'QUIZ_2' 
  | 'QUIZ_3' 
  | 'QUIZ_4' 
  | 'SOCIAL_PROOF' 
  | 'SIMULATE_SELECT' 
  | 'SIMULATION_RUN' 
  | 'ROULETTE' 
  | 'OFFERS';

export interface UserState {
  name: string;
  discount: number;
  selectedFollowers: number;
}

export interface QuizOption {
  label: string;
  icon?: any;
}

export interface Package {
  name: string;
  followers: string;
  price: string;
  features: string[];
  bonuses: string[];
  highlight?: boolean;
}