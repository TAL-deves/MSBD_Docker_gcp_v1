let coursesData = [
  {
    courseID: "C001",
    title: "Learn Mindfulness Meditation for a Calmer and Clearer mind",
    introduction:
      "Practical mindfulness meditation course showing the method how to increase concentration and reduce stress",
    description: [
      "By the end of this programme you will have experienced and practiced all of the key mindfulness meditations. You will have learned how to",
      "Develop your mental capacity, concentration, capability and focus",
      "Calm yourself in moments of anger, high stress and anxiety",
      "Develop ongoing resilience to stress and anxiety",
      "Deal calmly with stressful communications",
    ],
    thumbnail:
      "https://images.unsplash.com/photo-1528715471579-d1bcf0ba5e83?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1493&q=80",
    courseLength: "12",
    totalLecture: "45",
    price: "4500",
    instructor: {
      _id: 10001,
      name: "Per Norrgren",
      designation: "Director of Training and founder of inMindSight",
      description: `For 10 years I have been studying life, energy, spirit, healing, Law of Attraction to understand why I am here, how the spiritual world works and how to make my life amazing.
      I am a compassionate and grounded Reiki Energy Healer offering beautiful souls like you spiritual guidance, wisdom, and the deep transformation you are seeking.`,
      courses: ["C001"],
    }
  },
  {
    courseID: "C002",
    title: "Run a meditation class in your community",
    introduction:
      "Teach a group how to meditate in your workplace or community",
    description: [
      "Lead a meditation class with full support from Skillful MIND",
      "Know all the logistics behind running a meditation group",
      "Avoid the pitfalls that you might get into when setting up a class",
      "Join a community of other meditation leaders around the world",
    ],
    thumbnail:
      "https://images.unsplash.com/photo-1458501534264-7d326fa0ca04?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80",
    courseLength: "08",
    totalLecture: "23",
    price: "2500",
    instructor: {
      _id: 10002,
      name: "Peter Radcliffe",
      designation: "Meditation Teacher and Life Coach",
      description:
        "Peter Radcliffe is a highly realized siddha monk who reveals to us a Himalayan tradition of higher yoga based on his tutelage within the Sanskrit heritage. He hails from lineages of meditation adepts from Himalaya who are known for their combination of rishi sagely scholarship and nātha yogic practices. Deep meditation on the Sanskrit verses of cardinal philosophies and monastic inquiry methods led to his profound realization. His Holiness teaches cardinal philosophies with exquisite clarity directly from the original Sanskrit literature.",
      courses: ["C002"],
    },
  },
  {
    courseID: "C003",
    title: "Learn Meditation - Theory & Practice",
    introduction: "yoga for life",
    description: [
      "learn theory and practice of meditation and start benefiting from practice of mediation. And also teach others on how to mediatiate",
    ],
    thumbnail:
      "https://images.unsplash.com/photo-1531234806657-a8bfaab6de57?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1422&q=80",
    courseLength: "03",
    totalLecture: "08",
    price: "1000",
    instructor: {
      _id: 10003,
      name: "Felix Harder",
      designation: "Health & Fitness Coach | Best Selling Instructor",
      description: `Im a certified coach and author. Over the years I've worked with and coached 100,000 students from all over the world. My expertise includes science-based personal development, health & fitness advice in the following areas:
      - Self Improvement
      - Life Coaching
      - Stress Management
      - Muscle Growth & Fat Loss
      - Healthy Living & Meal Planning
      - Gym Workouts & Bodybuilding`,
      courses: ["C003"],
    },
  },
  {
    courseID: "C004",
    title: "Introduction to Heartfulness Relaxation and Meditation",
    introduction:
      "A simple, heart-centered relaxation and meditation you can do every day",
    description: [
      "Relax and relieve stress using a simple relaxation and meditation technique",
      "Connect mind and heart, naturally and gently",
      "Practice self-observation and meditation with compassion and clarity",
    ],
    thumbnail:
      "https://images.unsplash.com/photo-1593811167562-9cef47bfc4d7?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1472&q=80",
    courseLength: "18",
    totalLecture: "54",
    price: "9500",
    instructor: {
      _id: 10004,
      name: "Ranjani Iyer",
      designation: "Heartfulness Meditation Trainer",
      description: `I LOVE Ann's way of delivering the material. This course is full of little gems, with many surprising techniques to use with one bowl plus the resources are really usefull and add good value to the course! This was a good match for me. I am really looking forward for the next step (Part 3)! Blessings!`,
      courses: ["C004"],
    },
  },
  {
    courseID: "C005",
    title: "Mindfulness Meditation: The Science And Practice",
    introduction:
      "Retrain your brain to reduce stress and improve your focus and concentration.",
    description: [
      "Relax and relieve stress using a simple relaxation and meditation technique",
      "You will learn what mindfulness meditation is all about and how to practice it.",
      "Practice self-observation and meditation with compassion and clarity",
    ],
    thumbnail:
      "https://images.unsplash.com/photo-1508583732154-e9ff899f8534?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=928&q=80",
    courseLength: "2.5",
    totalLecture: "12",
    price: "3200",
    instructor: {
      _id: 10005,
      name: "Susan Weinschenk, Ph.D.",
      designation: "The Brain Lady",
      description:
        "My name is Alina and I am the founder of peace inside me online retreats and I am super excited to be a part of the Udemy community and cultivate inner peace and balance through powerful meditative practices that me and my team collected from around the world to help you get in touch with yourself and find your happy place.",
      courses: ["C005"],
    },
  },
  {
    courseID: "C006",
    title: "Complete meditation, mindfulness and mind training course",
    introduction:
      "Learn the art of meditation and mastery of the mind. Bring inner peace, focus and mindfulness into your life.",
    description: [
      "Learn to calm the mind and enter into a state of deep meditation and relaxation",
      "Several powerful mindfulness breathing techniques for meditation to cleanse and harmonize mind and body",
      "Recover and/ or prevent burn-out and stress through mindfulness meditation",
      "Meditations to realize that you create for a great part your own reality and how you can influence that",
      "Develop health, inner wisdom, mindfulness and true happiness",
      "4 hours of BEA (brain enhancing audio) mp3 files to help harmonize the brain for easier meditation",
    ],
    thumbnail:
      "https://images.unsplash.com/photo-1577253313708-cab167d2c474?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1438&q=80",
    courseLength: "9.5",
    totalLecture: "61",
    price: "4200",
    instructor: {
      _id: 10006,
      name: "Kevin Ellerton",
      designation: "Founder & CEO, Meditation Magazine",
      description:
        "Hi, I'm Kevin! When I was in college, I was anxious and depressed. I was smoking a lot of weed, addicted to video games, taking a lot of psychedelics, waking up around 2pm every day. I was going out of my mind. Thankfully, a friend introduced me to meditation, and it gave me my life back.",
      courses: ["C006"],
    },
  },
  {
    courseID: "C007",
    title: "Singing Bowls for ENERGY Work",
    introduction:
      "Level 2: BLISSbowls™ Sound Healing Methods for Integrating a Bowl into Sessions!",
    description: [
      'NOTE: To get the most out of this training, you will need to watch the "Singing Bowl FUNdamentals" class to receive important foundational skills.',
      "Sound-crafting a complete BLISSbowls™ Sound Healing Session with just one bowl!",
      "How to integrate a metal or quartz crystal singing bowl into any Energy or Bodywork Healing modality.",
      "Providing new sound healing ideas for practitioners of all kinds, including energy workers, massage therapists, and bodyworkers.",
      "Develop health, inner wisdom, mindfulness and true happiness",
      "4 hours of BEA (brain enhancing audio) mp3 files to help harmonize the brain for easier meditation",
    ],
    thumbnail:
      "https://images.unsplash.com/photo-1528659432556-884cfe1480ef?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1469&q=80",
    courseLength: "1.23",
    totalLecture: "15",
    price: "800",
    instructor: {
      _id: 10007,
      name: "Ann Martin",
      designation: "Sound Energy Practitioner, BLISSbowls™ Healing Methods",
      description:
        "Ann Martin combines a 23-year career in the healing arts with 40 years in the music business to manifest her passion for helping people through an innovative approach to singing bowls. She is a pioneer in the use of therapeutic techniques with singing bowls to help a modern society find transformation, stress-relief and pure presence.",
      courses: ["C007"],
    },
  },
  {
    courseID: "C008",
    title: "Meditation Masterclass: meditation teacher certification",
    introduction:
      "Accredited meditation certification course. Learn & teach a wide range of meditation techniques from around the world!",
    description: [
      "meditation",
      "breathwork",
      "metta (compassion) meditation",
      "tibetan bowls",
      "mindfulness",
      "meditation teacher training",
    ],
    thumbnail:
      "https://images.unsplash.com/photo-1518564747095-d2fbe4b452b7?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1432&q=80",
    courseLength: "5.23",
    totalLecture: "48",
    price: "5600",
    instructor: {
      _id: 10008,
      name: "Michaël Bijker",
      designation: "Founder of 'Life Awareness Project' - YogaLAP",
      description:
        "Michaël Bijker is the best-selling course creator of QiGong, Breath-work and Meditation courses on Udemy. His teachings have transformed the lives of thousands of people around the world.",
      courses: ["C008"],
    },
  },
  {
    courseID: "C009",
    title: "Meditate for How You Feel",
    introduction: "Harness the Energy of Your emotions to Ease into Meditation",
    description: [
      "How to use your current emotional state to ease into meditation",
      "Your unique mind-body constitution, according to Ayurveda",
      "How to meditate when you are feeling stressed, impatient, self-critical",
      "Breathing techniques to calm, chill, and uplift your energy, according to your needs in the moment",
      "Whether your emotions are air, fire, or earth-dominant and how to balance them out",
      "How to meditate when you are feeling restless, worried, anxious",
    ],
    thumbnail:
      "https://images.unsplash.com/photo-1499728603263-13726abce5fd?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80",
    courseLength: "2.29",
    totalLecture: "31",
    price: "2000",
    instructor: {
      _id: 10009,
      name: "Sylvie Barthelemy",
      designation: "Meditation & Yoga Teacher, Ayurvedic Practitioner, L.M.T.",
      description:
        "Sylvie Barthelemy is a certified professional coach, Ayurveda practitioner, and licensed massage therapist. She has over twenty four years of experience teaching yoga and meditation to stressed-out New Yorkers. Her passion is to help people cultivate a calm mind, a fearless heart and joyful spirit, all to ultimately navigate life with ease.",
      courses: ["C009"],
    },
  },
  {
    courseID: "C010",
    title: "Meditation For Beginners",
    introduction: "Completely new to meditation? This is the course for you!",
    description: [
      "Meditation",
      "Breathwork Meditation",
      "Broad Mindfulness Meditation",
      "Mindfulness of Breathing",
      "Body Awareness Meditation",
    ],
    thumbnail:
      "https://images.unsplash.com/photo-1502139214982-d0ad755818d8?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80",
    courseLength: "1.31",
    totalLecture: "22",
    price: "1200",
    instructor: {
      _id: 10010,
      name: "Alina Avdyukova",
      designation: "peaceinside.me meditation retreat",
      description:
        "Ann Martin combines a 23-year career in the healing arts with 40 years in the music business to manifest her passion for helping people through an innovative approach to singing bowls. She is a pioneer in the use of therapeutic techniques with singing bowls to help a modern society find transformation, stress-relief and pure presence.",
      courses: ["C010"],
    },
  },
];

module.exports = {
  coursesData: coursesData,
};
