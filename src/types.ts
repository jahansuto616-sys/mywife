export interface PhotoItem {
  id: string;
  url: string;
  title: string;
  caption: string;
  reason: string;
}

export interface LoveCard {
  id: string;
  title: string;
  iconName: string;
  message: string;
}

export interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
  funnyWrong: string;
}

export interface HiddenHeart {
  id: string;
  top: number; // percentage
  left: number; // percentage
  message: string;
  hint: string;
}

export interface AppSettings {
  wifeName: string;
  nickname: string;
  husbandName: string;
  couplePhoto?: string;
  birthdayDate: string; // e.g. "September 23"
  ageNumber: number; // e.g. 23
  welcomeQuote: string;
  loveLetter: string;
  secretMessagePart1: string;
  secretMessagePart2: string;
  secretMessagePart3: string;
  secretMessagePart4: string;
  promises: string[];
  photos: PhotoItem[];
  reasons: string[];
  loveCards: LoveCard[];
  quizQuestions: QuizQuestion[];
}

export type StageId = 
  | 'opening'
  | 'welcome'
  | 'story'
  | 'quiz'
  | 'memory_game'
  | 'hidden_hearts'
  | 'gift_box'
  | 'reasons_10'
  | 'cake'
  | 'secret_message'
  | 'love_letter'
  | 'grand_finale';

export interface StageInfo {
  id: StageId;
  index: number;
  title: string;
  subtitle: string;
  icon: string;
}
