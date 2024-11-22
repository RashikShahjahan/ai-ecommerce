import { storeEssenceEmbedding } from '../src/chatbot/utils/embeddings'
import prisma from '../prisma/client'


async function main() {
  // Clear existing data in the correct order (due to foreign key constraints)
  await prisma.message.deleteMany()
  await prisma.essence.deleteMany()
  await prisma.order.deleteMany()
  await prisma.cart.deleteMany()
  await prisma.user.deleteMany()
  console.log('Cleared existing data from database')



  const essences = [
    // Digital Life & Technology
    {
      name: "Crypto FOMO",
      description: "The volatile scent of missed opportunities, market charts, and digital dreams.",
      price: 53.99,
      stock: 88
    },
    {
      name: "AI Existential Crisis",
      description: "The complex aroma of automation fears mixed with technological fascination.",
      price: 51.99,
      stock: 70
    },
    {
      name: "Discord Server Drama",
      description: "Notes of emoji reactions, mod power struggles, and late-night debates.",
      price: 34.99,
      stock: 85
    },
    {
      name: "Reddit Rabbit Hole",
      description: "A spiraling blend of endless scrolling, unexpected knowledge, and lost time.",
      price: 29.99,
      stock: 110
    },
    {
      name: "Viral Tweet Anxiety",
      description: "The electrifying scent of notifications, unexpected fame, and typo regrets.",
      price: 31.99,
      stock: 95
    },

    // Work & Career
    {
      name: "Remote Work Reality",
      description: "A comfortable mix of pajama professionalism, home office chaos, and pet interruptions.",
      price: 42.99,
      stock: 120
    },
    {
      name: "Startup Burnout",
      description: "Notes of pitch deck anxiety, ramen dinners, and dwindling savings.",
      price: 47.99,
      stock: 95
    },
    {
      name: "Corporate Ladder",
      description: "The subtle essence of office politics, water cooler gossip, and promotion dreams.",
      price: 45.99,
      stock: 80
    },
    {
      name: "Freelance Hustle",
      description: "A dynamic blend of client emails, multiple deadlines, and coffee-fueled determination.",
      price: 39.99,
      stock: 100
    },
    {
      name: "Performance Review",
      description: "The tense aroma of self-evaluation, practiced responses, and salary negotiations.",
      price: 36.99,
      stock: 90
    },

    // Social & Relationships
    {
      name: "First Date Jitters",
      description: "A nervous combination of mint breath freshener, sweaty palms, and overthinking.",
      price: 34.99,
      stock: 85
    },
    {
      name: "Friend Group Drama",
      description: "Complex notes of group chat tension, canceled plans, and passive-aggressive emojis.",
      price: 33.99,
      stock: 110
    },
    {
      name: "Wedding Planning Chaos",
      description: "A stressful mixture of venue hunting, family opinions, and budget concerns.",
      price: 49.99,
      stock: 75
    },
    {
      name: "Long-Distance Love",
      description: "Bittersweet notes of video calls, timezone calculations, and airport reunions.",
      price: 44.99,
      stock: 95
    },
    {
      name: "Family Reunion",
      description: "The overwhelming scent of personal questions, childhood memories, and potluck dishes.",
      price: 38.99,
      stock: 85
    },

    // Urban Living
    {
      name: "City Rush Hour",
      description: "An intense blend of subway delays, coffee spills, and urban determination.",
      price: 32.99,
      stock: 120
    },
    {
      name: "Apartment Hunting",
      description: "Notes of broker fees, square footage compromises, and location dreams.",
      price: 41.99,
      stock: 90
    },
    {
      name: "Neighbor Drama",
      description: "The distinct aroma of thin walls, passive-aggressive notes, and borrowed sugar.",
      price: 35.99,
      stock: 100
    },
    {
      name: "Food Delivery Roulette",
      description: "A surprising mix of estimated arrival times, wrong orders, and hunger pangs.",
      price: 28.99,
      stock: 130
    },
    {
      name: "Urban Garden Dreams",
      description: "The hopeful scent of windowsill herbs, limited sunlight, and determination.",
      price: 37.99,
      stock: 85
    },

    // Entertainment & Pop Culture
    {
      name: "Binge Watch Marathon",
      description: "Cozy notes of autoplay, snack crumbs, and season finale anticipation.",
      price: 30.99,
      stock: 110
    },
    {
      name: "Concert FOMO",
      description: "The bitter aroma of sold-out tickets, social media stories, and missed experiences.",
      price: 36.99,
      stock: 95
    },
    {
      name: "Gaming Rage Quit",
      description: "An intense fusion of controller throws, respawn timers, and competitive spirit.",
      price: 33.99,
      stock: 100
    },
    {
      name: "Podcast Obsession",
      description: "A compelling blend of true crime theories, self-improvement goals, and daily commutes.",
      price: 31.99,
      stock: 120
    },
    {
      name: "Fandom Wars",
      description: "The passionate scent of online debates, theory crafting, and ship wars.",
      price: 34.99,
      stock: 90
    },

    // Health & Wellness
    {
      name: "New Year Resolution",
      description: "Fresh notes of gym memberships, meal prep containers, and temporary motivation.",
      price: 39.99,
      stock: 150
    },
    {
      name: "Meditation Attempt",
      description: "A peaceful blend of scented candles, racing thoughts, and phone notifications.",
      price: 42.99,
      stock: 85
    },
    {
      name: "Sleep Schedule Reset",
      description: "The drowsy aroma of multiple alarms, coffee dependency, and morning struggles.",
      price: 35.99,
      stock: 100
    },
    {
      name: "Wellness Influencer",
      description: "An expensive mixture of superfood powders, filtered photos, and sponsored content.",
      price: 48.99,
      stock: 70
    },
    {
      name: "Mental Health Day",
      description: "Gentle notes of self-care routines, comfort food, and guilt-free rest.",
      price: 41.99,
      stock: 95
    },

    // Financial Life
    {
      name: "Tax Season Panic",
      description: "A stressful blend of receipt hunting, deadline pressure, and mathematical confusion.",
      price: 43.99,
      stock: 110
    },
    {
      name: "Payday Celebration",
      description: "The brief joy of account balance notifications, online shopping carts, and bill payments.",
      price: 37.99,
      stock: 100
    },
    {
      name: "Investment Anxiety",
      description: "A volatile mixture of market watches, financial news, and risk calculations.",
      price: 45.99,
      stock: 85
    },
    {
      name: "Budget Reality",
      description: "The sobering scent of spreadsheet calculations, spending cuts, and saving goals.",
      price: 32.99,
      stock: 120
    },
    {
      name: "Impulse Purchase Regret",
      description: "Notes of shopping cart abandonment, buyer's remorse, and return policy checks.",
      price: 34.99,
      stock: 95
    },

    // Food & Dining
    {
      name: "Cooking Experiment",
      description: "A chaotic blend of recipe substitutions, kitchen disasters, and takeout backup plans.",
      price: 29.99,
      stock: 110
    },
    {
      name: "Brunch Queue",
      description: "The hungry aroma of weekend waiting, coffee cravings, and social media worthy plates.",
      price: 36.99,
      stock: 90
    },
    {
      name: "Meal Prep Sunday",
      description: "Organized notes of tupperware stacking, grocery lists, and weekly planning.",
      price: 38.99,
      stock: 100
    },
    {
      name: "Food Trend FOMO",
      description: "The trendy scent of viral recipes, ingredient hunting, and social media validation.",
      price: 33.99,
      stock: 95
    },
    {
      name: "Leftover Mystery",
      description: "The questionable aroma of forgotten containers, expiration dates, and fridge archaeology.",
      price: 27.99,
      stock: 120
    },

    // Travel & Adventure
    {
      name: "Vacation Planning",
      description: "Exciting notes of browser tabs, price comparisons, and itinerary dreams.",
      price: 46.99,
      stock: 85
    },
    {
      name: "Airport Sprint",
      description: "The rushed essence of gate changes, security lines, and boarding time pressure.",
      price: 39.99,
      stock: 100
    },
    {
      name: "Lost in Translation",
      description: "A confusing mix of language barriers, hand gestures, and cultural mishaps.",
      price: 41.99,
      stock: 90
    },
    {
      name: "Travel Instagram",
      description: "The curated scent of perfect angles, location tags, and filtered memories.",
      price: 37.99,
      stock: 110
    },
    {
      name: "Hostel Experience",
      description: "The social aroma of bunk beds, shared stories, and instant friendships.",
      price: 32.99,
      stock: 95
    },

    // Seasonal & Weather
    {
      name: "Summer FOMO",
      description: "The hot blend of beach posts, indoor air conditioning, and missed adventures.",
      price: 35.99,
      stock: 120
    },
    {
      name: "Winter Blues",
      description: "Cozy notes of early darkness, vitamin D deficiency, and wool sweaters.",
      price: 38.99,
      stock: 100
    },
    {
      name: "Spring Allergies",
      description: "The sneezy mixture of pollen counts, tissue boxes, and medication dependency.",
      price: 31.99,
      stock: 110
    },
    {
      name: "Fall Aesthetic",
      description: "A trendy blend of pumpkin spice, Instagram filters, and sweater weather.",
      price: 36.99,
      stock: 95
    },
    {
      name: "Weather App Betrayal",
      description: "The unpredictable scent of wrong forecasts, inappropriate outfits, and umbrella regrets.",
      price: 29.99,
      stock: 130
    },

    // Education & Learning
    {
      name: "Student Debt Cloud",
      description: "The heavy aroma of loan statements, career pressure, and delayed life plans.",
      price: 44.99,
      stock: 100
    },
    {
      name: "Online Course Motivation",
      description: "Notes of video lectures, unfinished assignments, and certificate dreams.",
      price: 33.99,
      stock: 120
    },
    {
      name: "Study Group Chaos",
      description: "A collaborative blend of scheduling conflicts, shared notes, and exam anxiety.",
      price: 35.99,
      stock: 95
    },
    {
      name: "All-Nighter Energy",
      description: "The intense fusion of energy drinks, deadline panic, and sunrise regrets.",
      price: 37.99,
      stock: 110
    },
    {
      name: "Grad School Applications",
      description: "Stressful notes of recommendation letters, personal statements, and future uncertainty.",
      price: 42.99,
      stock: 85
    },

    // Modern Anxieties
    {
      name: "Climate Anxiety",
      description: "The heavy scent of news headlines, eco-guilt, and reusable products.",
      price: 43.99,
      stock: 100
    },
    {
      name: "Digital Privacy Paranoia",
      description: "Notes of password changes, VPN connections, and targeted ad suspicion.",
      price: 39.99,
      stock: 90
    },
    {
      name: "Future FOMO",
      description: "The anxious blend of career paths, life milestones, and comparison traps.",
      price: 41.99,
      stock: 110
    },
    {
      name: "Information Overload",
      description: "An overwhelming mixture of news notifications, social feeds, and mental fatigue.",
      price: 36.99,
      stock: 95
    },
    {
      name: "Decision Paralysis",
      description: "The stagnant aroma of endless options, pros-and-cons lists, and missed opportunities.",
      price: 34.99,
      stock: 120
    },

    // Nostalgia & Memory
    {
      name: "Childhood Nostalgia",
      description: "Sweet notes of cartoon themes, playground memories, and simpler times.",
      price: 45.99,
      stock: 85
    },
    {
      name: "Old Phone Photos",
      description: "A sentimental blend of forgotten moments, storage warnings, and digital memories.",
      price: 32.99,
      stock: 110
    },
    {
      name: "Music Memory Lane",
      description: "The emotional scent of old playlists, concert tickets, and teenage feelings.",
      price: 37.99,
      stock: 95
    },
    {
      name: "Gaming Nostalgia",
      description: "Pixelated notes of loading screens, cheat codes, and victory dances.",
      price: 39.99,
      stock: 100
    },
    {
      name: "Pre-Social Media",
      description: "The peaceful aroma of offline connections, disposable cameras, and landline calls.",
      price: 41.99,
      stock: 90
    }
  ]

  for (const ess of essences) {
    const createdEssence = await prisma.essence.create({
      data: ess
    })

    await storeEssenceEmbedding(
      createdEssence.id,
      `${ess.name}. ${ess.description}`
    )

    console.log(`Created and embedded essence: ${ess.name}`)
  }

  console.log('Database has been seeded with users and essences! 🌱')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  }) 