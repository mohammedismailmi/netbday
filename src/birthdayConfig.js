/**
 * =========================================================================
 * 🎂 RAKSHITHA'S BIRTHDAY NETFLIX CONFIGURATION
 * =========================================================================
 * You can easily edit any text, title, date, episode details, photos, or videos here!
 *
 * HOW TO ADD YOUR VIDEOS & PICTURES:
 * 1. Place your photos and videos into the `public/media/` folder (or `media/` folder).
 * 2. Update the filenames below (e.g., "media/koli_pic.png", "media/ep1.mp4").
 *    Even if files are missing, beautiful animated fallbacks are automatically provided!
 */

export const BIRTHDAY_CONFIG = {
  // Brand name in the top left & intro animation
  brandName: "KOLIFLIX",

  // Birthday Girl details
  name: "Rakshitha",
  nickname: "Koli",
  birthdayDate: "November 15",
  birthdayYear: 2026,

  // Profile picture for the "Who's watching?" screen & avatar
  // Place your image at `public/media/koli_pic.jpeg`
  profilePic: "media/koli_pic.jpeg",

  // Main Featured Series Configuration
  // (You can change "Koli's Life" anytime right here!)
  series: {
    title: "Miracle",
    tagline: "The glamour, the confidence, the undeniable presence. A little romance. a little madness, and a whole lot of memories. Zero chill. Unlimited drama. One unforgettable human.",
    releaseYear: 2005,
    ageRating: "U/A 18+",
    matchPercentage: "369% Match",
    seasons: "21 Seasons",
    qualityBadge: "Ultra HD 4K",
    soundBadge: "Dolby Atmos",
    genres: ["Heartwarming", "Comedy", "Adventure", "Best Friend Ever"],

    // Overview description displayed on hero billboard and details modal
    description:
      "A heartwarming and hilarious journey celebrating the one and only Rakshitha. Packed with unforgettable memories, boundless laughter, and stories that deserve their own binge-watch. Three blockbuster episodes, zero spoilers, infinite love.",

    // Hero backdrop image (wide 16:9 banner)
    // Place your image at `public/media/banner.png`
    bannerImage: "media/banner.png",

    // =====================================================================
    // 🎬 EPISODES LIST
    // Edit the titles, descriptions, video file paths, and thumbnails below:
    // =====================================================================
    episodes: [
      {
        id: 1,
        number: 1,
        title: "THE IT GIRL", // <-- Edit Episode 1 Title here
        duration: "1m",
        description:
          "Some people follow trends. Some people set them. A little drama, a lot of style, and a whole lot of main-character energy. This is Rakshitha in her element — effortlessly iconic.", // <-- Edit description
        src: "media/ep1.mp4", // Video file in public/media/ep1.mp4
        thumbnail: "media/ep1.jpeg", // Thumbnail image in public/media/ep1.JPG
        downloadFileName: "Kolis_Life_Episode_1_The_Beginning.mp4"
      },
      {
        id: 2,
        number: 2,
        title: "THE LIFE DIARIES", // <-- Edit Episode 2 Title here
        duration: "1m 30s",
        description:
          "Behind every picture is a story, behind every laugh is a memory, and behind every moment is a little piece of her. A collection of the people, places, and memories that make life beautiful — and a reminder that she is loved more than she knows.", // <-- Edit description
        src: "media/ep2.mp4", // Video file in public/media/ep2.mp4
        thumbnail: "media/ep2.jpeg", // Thumbnail image in public/media/ep2.JPG
        downloadFileName: "Kolis_Life_Episode_2_Queen_Of_Chaos.mp4"
      },
      {
        id: 3,
        number: 3,
        title: "CERTIFIED PAGAL", // <-- Edit Episode 3 Title here
        duration: "10m",
        description:
          "Normal was never really an option. From questionable expressions to legendary nonsense, this is the unfiltered, unpredictable, absolutely lovable side of Rakshitha. Handle with care. Laughter guaranteed.", // <-- Edit description
        src: "media/ep3.mp4", // Video file in public/media/ep3.mp4
        thumbnail: "media/ep3.jpeg", // Thumbnail image (can be changed to media/ep3.JPG)
        downloadFileName: "Kolis_Life_Episode_3_Finale.mp4"
      }
      // You can add Episode 4, 5, etc. anytime by duplicating the block above!
    ]
  },

  // Other Profiles on the "Who's Watching?" screen
  profiles: [
    {
      id: "rakshitha",
      name: "Rakshitha",
      isBirthdayGirl: true,
      avatar: "media/koli_pic.jpeg",
      tag: "Birthday VIP 👑"
    },
    {
      id: "g",
      name: "The Squad",
      isBirthdayGirl: false,
      avatarColor: "#e50914",
      tag: "Fans & Family 💖"
    },

  ],

  // Upcoming Releases / Teasers row
  upcomingShows: [
    {
      id: "s2",
      title: "Koli's Life: Season 2",
      badge: "COMING 2027",
      desc: "More adventures, more trips, and double the chaos.",
      image: "media/coming_soon_1.jpg"
    },
    {
      id: "movie",
      title: "Rakshitha: The Blockbuster",
      badge: "IN PRODUCTION",
      desc: "The big-screen theatrical experience no cinema is ready for.",
      image: "media/coming_soon_2.jpg"
    },
    {
      id: "cake",
      title: "The Great Birthday Heist",
      badge: "EXCLUSIVE",
      desc: "Who stole the biggest slice of chocolate cake?",
      image: "media/coming_soon_3.jpg"
    }
  ],

  // Birthday Wishes & Critic Reviews from Friends
  reviews: [
    {
      author: "Your Best Friend",
      quote: "10/10 protagonist. Would definitely subscribe to a lifetime of friendship again!",
      stars: 5
    },
    {
      author: "The Squad",
      quote: "Deserves an Oscar for putting up with us every single day. Happy Birthday Koli!",
      stars: 5
    },
    {
      author: "Rotten Tomatoes",
      quote: "100% Certified Fresh. Unmatched charisma and infectious laughter.",
      stars: 5
    }
  ],

  // Pre-loaded birthday messages
  birthdayMessages: [
    {
      from: "The Gang 🥂",
      text: "Happy Birthday Rakshitha! May your 15th of November and year ahead be as cinematic, dramatic, and unforgettable as this series!"
    },
    {
      from: "Secret Admirer of Your Laugh 😄",
      text: "Never stop being the spontaneous, hilarious, and sweetest soul in every room."
    }
  ]
};

