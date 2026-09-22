import { AppSettings, StageInfo } from '../types';

export const STAGES: StageInfo[] = [
  { id: 'opening', index: 1, title: 'Cinematic Opening', subtitle: 'A gentle cosmic welcome', icon: 'Sparkles' },
  { id: 'welcome', index: 2, title: 'Birthday Welcome', subtitle: 'To the one who lights my life', icon: 'Heart' },
  { id: 'story', index: 3, title: 'Our Love Story', subtitle: 'Chapters of our journey', icon: 'BookOpen' },
  { id: 'quiz', index: 4, title: 'Love Quiz', subtitle: 'How well do you know us?', icon: 'HelpCircle' },
  { id: 'memory_game', index: 5, title: 'Memory Match', subtitle: 'Pair our cherished moments', icon: 'Grid' },
  { id: 'hidden_hearts', index: 6, title: 'Unlock My Heart', subtitle: 'Find the 5 hidden stars', icon: 'Compass' },
  { id: 'gift_box', index: 7, title: 'The Gift Box', subtitle: 'Unwrapping a lifelong promise', icon: 'Gift' },
  { id: 'reasons_10', index: 8, title: '10 Reasons', subtitle: 'Why you have my heart', icon: 'Camera' },
  { id: 'cake', index: 9, title: 'Birthday Cake', subtitle: 'Make a wish & blow candles', icon: 'Cake' },
  { id: 'secret_message', index: 10, title: 'Secret Whispers', subtitle: 'A private thought for you', icon: 'Eye' },
  { id: 'love_letter', index: 11, title: 'Love Letter', subtitle: 'From your husband', icon: 'Mail' },
  { id: 'grand_finale', index: 12, title: 'Eternal Beginning', subtitle: 'Happy Birthday, My Forever', icon: 'Flame' },
];

export const DEFAULT_SETTINGS: AppSettings = {
  wifeName: 'My Wife',
  nickname: 'My Wife',
  husbandName: 'Your Loving Husband',
  couplePhoto: '/photos/our_real_pic.png',
  birthdayDate: 'September 23',
  ageNumber: 23,
  welcomeQuote: "Today isn't just another day...\nToday is the day the world became a little more beautiful because you were born, my love.",
  
  secretMessagePart1: "If I could give you one thing in this world, my love...",
  secretMessagePart2: "I would give you the ability to see yourself through my eyes.",
  secretMessagePart3: "Then you would finally understand…",
  secretMessagePart4: "…how deeply and endlessly loved you truly are. ❤️",

  promises: [
    "💍 I promise to stand beside you, my wife, through every storm and every triumph.",
    "❤️ I promise to keep choosing you, every morning and every night, without hesitation.",
    "🌙 I promise to be your calm harbor when the world feels loud and overwhelming.",
    "🌸 I promise to celebrate your happiness and cheer the loudest for all your dreams.",
    "🥰 I promise to keep dating you, making you laugh, and holding your hand forever."
  ],

  photos: [
    {
      id: 'photo-1',
      url: '/photos/sheena_outdoor.jpg',
      title: 'My Radiant Queen',
      caption: 'The breathtaking beauty that captured my heart and soul forever.',
      reason: 'Because your smile fixes my worst days, turning gloom into pure sunshine.'
    },
    {
      id: 'photo-2',
      url: '/photos/sheena_couple_studio.jpg',
      title: 'Leaning on My Heart',
      caption: 'Resting your head on my shoulder—the only place you will always belong.',
      reason: 'Because having you beside me makes me feel like the most blessed man alive.'
    },
    {
      id: 'photo-3',
      url: '/photos/sheena_couple_tender.jpg',
      title: 'The Way I Look at You',
      caption: 'Lost in your eyes, thanking the heavens every day for the gift of your love.',
      reason: 'Because you understand me without a single word needed.'
    },
    {
      id: 'photo-4',
      url: '/photos/sheena_mirror_pink.jpg',
      title: 'Pretty in Pink',
      caption: 'That joyful sparkle in your eyes and the sweetest smile that melts my heart.',
      reason: 'Because your laugh is my sweetest addiction and my favorite sound.'
    },
    {
      id: 'photo-5',
      url: '/photos/sheena_couple_studio.jpg',
      title: 'Our Sacred Bond',
      caption: 'Two souls written into destiny, walking hand in hand through this beautiful life.',
      reason: 'Because of the tender, selfless way you care for everyone around you.'
    },
    {
      id: 'photo-6',
      url: '/photos/sheena_outdoor.jpg',
      title: 'Pure Grace & Light',
      caption: 'Surrounded by nature, but your grace and radiant glow outshone everything.',
      reason: 'Because you believe in me even when I doubt myself, giving me courage.'
    },
    {
      id: 'photo-7',
      url: '/photos/sheena_couple_tender.jpg',
      title: 'Forever My Home',
      caption: 'Wrapped close in your embrace where all the noise of the world disappears.',
      reason: 'Because coming home to your arms is the safest feeling in the universe.'
    },
    {
      id: 'photo-8',
      url: '/photos/sheena_mirror_pink.jpg',
      title: 'Everyday Sunshine',
      caption: 'Bringing vibrant colors, warmth, and laughter into every second we share.',
      reason: 'Because every ordinary day feels like a celebration with you, my love.'
    },
    {
      id: 'photo-9',
      url: '/photos/sheena_couple_studio.jpg',
      title: 'My Queen & Best Friend',
      caption: 'My confidante, my partner in every adventure, and the queen of my heart.',
      reason: 'Because you are my best friend, my soulmate, and my ultimate teammate.'
    },
    {
      id: 'photo-10',
      url: '/photos/sheena_couple_tender.jpg',
      title: 'Forever & Always',
      caption: 'My promise written in every beat of my heart: I am yours forever, my love.',
      reason: 'Because my soul recognized its eternal home in you from the very beginning.'
    }
  ],

  reasons: [
    "Because your smile fixes my worst days instantly.",
    "Because you understand me without a single spoken word.",
    "Because you make me feel so deeply loved and cherished.",
    "Because your sweet laugh is my favorite melody.",
    "Because your kindness touches everyone you meet.",
    "Because you believe in me and stand by my side.",
    "Because your warm hugs make all anxiety melt away.",
    "Because you make ordinary moments unforgettable.",
    "Because you are my greatest blessing and inspiration.",
    "Because my soul found its eternal home in you, my wife."
  ],

  loveCards: [
    {
      id: 'lc-1',
      title: 'Your Smile 😊',
      iconName: 'Smile',
      message: 'It lights up whatever room you walk into and instantly brightens my whole world.'
    },
    {
      id: 'lc-2',
      title: 'Your Kindness 🌸',
      iconName: 'HeartHandshake',
      message: 'The gentle compassion you show to animals, strangers, and the people you love.'
    },
    {
      id: 'lc-3',
      title: 'Your Eyes ✨',
      iconName: 'Sparkles',
      message: 'Like warm starlight—I can see our whole future and endless warmth reflected in them.'
    },
    {
      id: 'lc-4',
      title: 'Your Way of Caring ❤️',
      iconName: 'ShieldHeart',
      message: 'Always remembering the little things, checking if I ate, and warming my cold hands.'
    },
    {
      id: 'lc-5',
      title: 'Your Laugh 😂',
      iconName: 'Laugh',
      message: 'Unfiltered, musical, and infectious. Hearing it is my daily dose of joy.'
    },
    {
      id: 'lc-6',
      title: 'Your Little Habits 🥰',
      iconName: 'Coffee',
      message: 'The cute way you tuck your hair, make your tea, and wrap up in oversized hoodies.'
    },
    {
      id: 'lc-7',
      title: 'Everyday Magic 💫',
      iconName: 'Sun',
      message: 'The magical ability to turn a simple grocery trip or quiet dinner into an adventure.'
    }
  ],

  quizQuestions: [
    {
      id: 'q1',
      question: "Where did our hearts first realize this was something forever?",
      options: [
        "❤️ The first time our eyes locked and the rest of the room faded away",
        "🌸 During that late-night conversation where we lost track of hours",
        "✨ The moment you laughed at my terrible joke and smiled"
      ],
      correctIndex: 0,
      explanation: "From that very first glance, my heart whispered: 'That's the one.'",
      funnyWrong: "Close! But honestly, every single second with you made me fall deeper. ❤️"
    },
    {
      id: 'q2',
      question: "What is my absolute favorite thing about waking up?",
      options: [
        "☕ Hot coffee in the morning",
        "🥰 Seeing your peaceful sleeping face and pulling you closer",
        "📱 Checking morning notifications"
      ],
      correctIndex: 1,
      explanation: "Nothing in this world compares to holding you first thing in the morning.",
      funnyWrong: "Are you kidding me? Coffee is good, but you are my entire morning sun! 🥰"
    },
    {
      id: 'q3',
      question: "Who fell in love first?",
      options: [
        "❤️ Me (I was completely smitten from day one)",
        "🌸 You (though you played it cool)",
        "✨ It happened at the exact same heartbeat"
      ],
      correctIndex: 0,
      explanation: "I was head-over-heels before you even realized what happened to me!",
      funnyWrong: "Aww! But admit it, I was helpless from the first greeting. ❤️"
    },
    {
      id: 'q4',
      question: "What is my favorite destination in the world?",
      options: [
        "🏖️ A tropical beach resort in the Maldives",
        "🏰 A historical romantic European city",
        "🏡 Wherever you are, wrapped in your embrace"
      ],
      correctIndex: 2,
      explanation: "Home isn't a coordinate on a map; home is right by your side.",
      funnyWrong: "Travel is fun, but anywhere without you is just an empty place. You are home. ❤️"
    }
  ],

  loveLetter: `To My Dearest Wife,

As I sit down to write this on your 23rd September birthday, my heart swells with a gratitude I can hardly put into sentences. 

Looking at you today, my sweet wife, I don't just see the most stunning woman in the world. I see my best friend, my confidante, my biggest blessing, and the keeper of all my secret hopes. You bring a quiet grace, boundless kindness, and an irreplaceable warmth into our life that turns every single day into something sacred.

Thank you for choosing to walk this life with me. Thank you for your patience on my clumsy days, your infectious laughter when we share quiet moments together, and the gentle touch that reminds me I am never alone.

On this special birthday, my wish for you is simple: may your heart always feel as loved, cherished, and safe as you make mine feel every single day. May all your dreams take flight, and may you always remember that I will be right beside you, loving you and cheering you on with all my soul.

Happy Birthday, my beloved wife. I love you today, tomorrow, and through all our forevers.

Forever and always yours,
Your Loving Husband ❤️`
};
