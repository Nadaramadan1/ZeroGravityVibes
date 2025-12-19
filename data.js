/**
 * COSMIC DATA STORE (v2.0)
 * Defines themes and vibe cards for the ZeroGravity system.
 * Loaded before app.js in index.html.
 */

// 1. COSMIC THEMES (Background Gradients)
const COSMIC_THEMES = {
    Nebula: ["#fbc2eb", "#a6c1ee"],       // Pink/Blue Soft (Party/Playful)
    DeepSpace: ["#0f0c29", "#302b63"],    // Dark/Purple (Focused/Deep)
    Sunrise: ["#f6d365", "#fda085"],      // Orange/Gold (Morning/Energy)
    Aurora: ["#00bf8f", "#001510"],       // Green/Dark (Calm/Nature)
    Midnight: ["#232526", "#414345"],     // Grey/Black (Night/Quiet)
    MilkyWay: ["#E0EAFC", "#CFDEF3"],     // White/Blue Soft (Calm/Clean)
    Mars: ["#ff9966", "#ff5e62"],         // Red/Orange (Energy/Chaos)
    Zen: ["#d4fc79", "#96e6a1"],          // Green/Lime (Calm/Nature)
    Void: ["#000000", "#434343"],         // Pure Dark (Video/Code)
    Starlight: ["#4facfe", "#00f2fe"]     // Bright Blue (Party/Active)
};

// 2. PHRASES (Thinking & Easter Eggs)
const phrases = {
    thinking: [
        "Consulting the stars...",
        "Aligning celestial bodies...",
        "Measuring your chaos levels...",
        "Asking the magic 8-ball...",
        "Calculating antigravity...",
        "Reading the cosmic room..."
    ],
    easterEgg: [
        "You don't trust the universe? 😏",
        "Stop clicking, I'm thinking! 😤",
        "Do absolutely nothing today. You earned it. 🏆"
    ]
};

// 3. VIBE CARDS (The Dataset - 30 Cards)
// Vibes: 'calm', 'focused', 'energetic', 'party'
// Times: 'morning', 'work', 'evening', 'night', 'any'
const globalVibes = [
    // --- MORNING ---
    {
        id: "m1",
        title: "Caffeine Rocket",
        emoji: "🚀",
        quote: "I don't need sleep, I need speed.",
        activity: "Drink a double espresso.",
        instruction: "Do not blink for 5 minutes.",
        time: ["morning"],
        vibe: "energetic",
        mood: "chaos", // Legacy fallback
        energy: 9,
        theme: "Mars"
    },
    {
        id: "m2",
        title: "Slow Start",
        emoji: "🥐",
        quote: "The world can wait.",
        activity: "Eat a pastry slowly.",
        instruction: "Savor every crumb. Ignore emails.",
        time: ["morning"],
        vibe: "calm",
        mood: "calm",
        energy: 2,
        theme: "Sunrise"
    },
    {
        id: "m3",
        title: "Morning Glory",
        emoji: "🌅",
        quote: "New day, fresh code.",
        activity: "Look closely at the sunrise.",
        instruction: "Take one epic photo. Then put phone away.",
        time: ["morning"],
        vibe: "calm",
        mood: "neutral",
        energy: 5,
        theme: "Sunrise"
    },
    {
        id: "m4",
        title: "Bed Rot (AM Edition)",
        emoji: "🛌",
        quote: "Five more minutes... or fifty.",
        activity: "Stay in bed.",
        instruction: "Cancel your first meeting. Blame wifi.",
        time: ["morning"],
        vibe: "calm",
        mood: "calm",
        energy: 1,
        theme: "MilkyWay"
    },
    {
        id: "m5",
        title: "Hydration Check",
        emoji: "💧",
        quote: "You are basically a houseplant.",
        activity: "Chug a glass of water.",
        instruction: "Your brain needs it. Do it now.",
        time: ["morning", "any"],
        vibe: "focused",
        mood: "neutral",
        energy: 4,
        theme: "Starlight"
    },

    // --- WORK / AFTERNOON ---
    {
        id: "w1",
        title: "Deep Focus",
        emoji: "🧠",
        quote: "Flow state incoming.",
        activity: "Put on noise-canceling headphones.",
        instruction: "Listen to lo-fi beats. Code for 1 hour.",
        time: ["work", "afternoon"],
        vibe: "focused",
        mood: "neutral",
        energy: 7,
        theme: "DeepSpace"
    },
    {
        id: "w2",
        title: "Inbox Zero",
        emoji: "📧",
        quote: "Delete, archive, unsubscribe.",
        activity: "Clean your email inbox.",
        instruction: "Be ruthless. Nobody needs that newsletter.",
        time: ["work", "morning"],
        vibe: "focused",
        mood: "chaos",
        energy: 6,
        theme: "Void"
    },
    {
        id: "w3",
        title: "Fake Productivity",
        emoji: "💅",
        quote: "Look busy, do nothing.",
        activity: "Organize your desktop icons.",
        instruction: "Color coordinate them. It counts as work.",
        time: ["work", "afternoon"],
        vibe: "energetic",
        mood: "chaos",
        energy: 4,
        theme: "Nebula"
    },
    {
        id: "w4",
        title: "Touch Grass",
        emoji: "🌱",
        quote: "Nature keeps receipts.",
        activity: "Go outside immediately.",
        instruction: "Find a tree. Stare at it. Breathe.",
        time: ["work", "afternoon"],
        vibe: "calm",
        mood: "calm",
        energy: 3,
        theme: "Zen"
    },
    {
        id: "w5",
        title: "Chaos Gremlin",
        emoji: "👾",
        quote: "Let the tabs pile up.",
        activity: "Open 50 browser tabs.",
        instruction: "Don't read any of them. Just hoard info.",
        time: ["work", "afternoon"],
        vibe: "energetic",
        mood: "chaos",
        energy: 8,
        theme: "Nebula"
    },
    {
        id: "w6",
        title: "Debug Mode",
        emoji: "🐛",
        quote: "It works on my machine.",
        activity: "Fix that one bug.",
        instruction: "Or introduce two new ones. Who knows?",
        time: ["work", "afternoon"],
        vibe: "focused",
        mood: "neutral",
        energy: 6,
        theme: "Midnight"
    },

    // --- EVENING ---
    {
        id: "e1",
        title: "Golden Hour",
        emoji: "✨",
        quote: "Everything looks better now.",
        activity: "Main character walk.",
        instruction: "Play your cinematic playlist. Strut.",
        time: ["evening"],
        vibe: "calm",
        mood: "neutral",
        energy: 6,
        theme: "Sunrise"
    },
    {
        id: "e2",
        title: "Social Butterfly",
        emoji: "🦋",
        quote: "Yapping is a sport.",
        activity: "Call a friend.",
        instruction: "Talk until your battery dies.",
        time: ["evening"],
        vibe: "party",
        mood: "chaos",
        energy: 8,
        theme: "Nebula"
    },
    {
        id: "e3",
        title: "Chef Failure",
        emoji: "🔥",
        quote: "It's not burnt, it's caramelized.",
        activity: "Cook something ambitious.",
        instruction: "Ideally with fire. Have takeout backup.",
        time: ["evening"],
        vibe: "energetic",
        mood: "chaos",
        energy: 7,
        theme: "Mars"
    },
    {
        id: "e4",
        title: "Hermit Mode",
        emoji: "🐚",
        quote: "My couch is my kingdom.",
        activity: "Cancel plans.",
        instruction: "Text 'I'm sick' and order pizza.",
        time: ["evening"],
        vibe: "calm",
        mood: "calm",
        energy: 2,
        theme: "MilkyWay"
    },
    {
        id: "e5",
        title: "Gaming Session",
        emoji: "🎮",
        quote: "Just one more level.",
        activity: "Play your favorite game.",
        instruction: "Ignore the clock completely.",
        time: ["evening", "night"],
        vibe: "focused",
        mood: "neutral",
        energy: 7,
        theme: "Starlight"
    },

    // --- NIGHT ---
    {
        id: "n1",
        title: "Cosmic Existentialism",
        emoji: "🌌",
        quote: "We are just dust in space.",
        activity: "Stare at the stars.",
        instruction: "Contemplate infinity until you feel small.",
        time: ["night"],
        vibe: "calm",
        mood: "calm",
        energy: 1,
        theme: "DeepSpace"
    },
    {
        id: "n2",
        title: "3AM Motivation",
        emoji: "🦉",
        quote: "Now is the time to fix my life.",
        activity: "Reorganize your entire room.",
        instruction: "Quietly. Don't wake the neighbors.",
        time: ["night"],
        vibe: "energetic",
        mood: "chaos",
        energy: 9,
        theme: "Midnight"
    },
    {
        id: "n3",
        title: "Doom Scroll",
        emoji: "📱",
        quote: "Just one more reel...",
        activity: "Fall into the algorithm.",
        instruction: "Lose track of time and space.",
        time: ["night", "any"],
        vibe: "focused",
        mood: "neutral",
        energy: 3,
        theme: "Aurora"
    },
    {
        id: "n4",
        title: "Dream Drift",
        emoji: "💤",
        quote: "System shutting down.",
        activity: "Sleep.",
        instruction: "Put the phone away. Seriously.",
        time: ["night"],
        vibe: "calm",
        mood: "calm",
        energy: 0,
        theme: "DeepSpace"
    },
    {
        id: "n5",
        title: "Movie Marathon",
        emoji: "🍿",
        quote: "Cinema therapy.",
        activity: "Watch a classic movie.",
        instruction: "Ideally sci-fi. Popcorn mandatory.",
        time: ["night"],
        vibe: "calm",
        mood: "neutral",
        energy: 3,
        theme: "Void"
    },

    // --- PARTY / ANYTIME ---
    {
        id: "p1",
        title: "Disco Ball Hips",
        emoji: "💃",
        quote: "Dance like nobody's watching.",
        activity: "Solo dance party.",
        instruction: "Put on Earth, Wind & Fire. Groove.",
        time: ["any", "evening"],
        vibe: "party",
        mood: "chaos",
        energy: 9,
        theme: "Nebula"
    },
    {
        id: "p2",
        title: "Karaoke Legend",
        emoji: "🎤",
        quote: "Sing it loud, sing it wrong.",
        activity: "Belt out a ballad.",
        instruction: "Use a hairbrush as a mic.",
        time: ["any"],
        vibe: "party",
        mood: "energetic",
        energy: 8,
        theme: "Starlight"
    },
    {
        id: "x1",
        title: "Sophisticated Procrastination",
        emoji: "🧐",
        quote: "I need this espresso machine.",
        activity: "Research expensive hobbies.",
        instruction: "Watch 3 hours of reviews for things you won't buy.",
        time: ["any"],
        vibe: "focused",
        mood: "chaos",
        energy: 5,
        theme: "Aurora"
    },
    {
        id: "x2",
        title: "Digital Detox",
        emoji: "📵",
        quote: "Unplug to recharge.",
        activity: "Turn off your phone.",
        instruction: "For 10 minutes. Panic is normal.",
        time: ["any"],
        vibe: "calm",
        mood: "calm",
        energy: 2,
        theme: "Zen"
    },
    {
        id: "x3",
        title: "Creative Spark",
        emoji: "🎨",
        quote: "Make something terrible.",
        activity: "Doodle, write, or build.",
        instruction: "Quantity over quality. Just flow.",
        time: ["any"],
        vibe: "focused",
        mood: "energetic",
        energy: 6,
        theme: "Nebula"
    },
    {
        id: "x4",
        title: "Organized Chaos",
        emoji: "🗂️",
        quote: "A place for everything.",
        activity: "Sort one drawer.",
        instruction: "Feel the satisfaction of order.",
        time: ["any"],
        vibe: "focused", // Fixed typo
        mood: "calm",
        energy: 5,
        theme: "MilkyWay"
    },
    {
        id: "x5",
        title: "Treat Yourself",
        emoji: "🍩",
        quote: "You earned it.",
        activity: "Eat your favorite snack.",
        instruction: "Zero guilt. 100% flavor.",
        time: ["any"],
        vibe: "energetic",
        mood: "neutral",
        energy: 6,
        theme: "Sunrise"
    }
];

// 4. MOOD KEYWORDS (For AI Detection)
const MOOD_KEYWORDS = {
    calm: ['tired', 'sleepy', 'chill', 'relax', 'bored', 'calm', 'quiet', 'lazy', 'peace', 'sad', 'down'],
    focused: ['work', 'study', 'focus', 'busy', 'learning', 'code', 'productive', 'deadline', 'thinking'],
    energetic: ['happy', 'excited', 'gym', 'run', 'active', 'hyper', 'good', 'great', 'awake', 'coffee'],
    party: ['party', 'dance', 'fun', 'drinking', 'friends', 'music', 'crazy', 'wild', 'celebrate']
};
