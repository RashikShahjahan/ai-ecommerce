import { storeEssenceEmbedding } from '../src/chatbot/utils/embeddings'
import prisma from '../prisma/client'


async function main() {
  const essences = [
    {
      name: "Teenage Angst Premium",
      description: "Capture the authentic aroma of your parent's disappointment, with subtle notes of slammed doors and dramatic sighs.",
      price: 29.99,
      stock: 100
    },
    {
      name: "Midlife Crisis Deluxe",
      description: "The unmistakable scent of impulsive purchases and leather car seats, with a hint of regret.",
      price: 49.99,
      stock: 75
    },
    {
      name: "Monday Morning Dread",
      description: "A powerful blend of cold coffee, unanswered emails, and the lingering essence of weekend freedom.",
      price: 24.99,
      stock: 150
    },
    {
      name: "First Date Jitters",
      description: "A nervous combination of mint breath freshener, sweaty palms, and overthinking.",
      price: 34.99,
      stock: 85
    },
    {
      name: "Procrastinator's Paradise",
      description: "Notes of deadline panic, energy drinks, and last-minute inspiration.",
      price: 19.99,
      stock: 120
    },
    {
      name: "Social Media Envy",
      description: "A sophisticated blend of FOMO, filtered reality, and compulsive scrolling.",
      price: 39.99,
      stock: 90
    },
    {
      name: "Nostalgia Ultra",
      description: "The sweet aroma of childhood memories, old video games, and grandmother's cookies.",
      price: 44.99,
      stock: 60
    },
    {
      name: "Impulse Shopping Spree",
      description: "The intoxicating scent of new purchases, empty wallet, and temporary satisfaction.",
      price: 29.99,
      stock: 110
    },
    {
      name: "Netflix Binge",
      description: "Cozy notes of microwave popcorn, unwashed blankets, and 'just one more episode'.",
      price: 27.99,
      stock: 95
    },
    {
      name: "Gym Resolution",
      description: "A powerful mix of determination, new workout clothes, and short-lived motivation.",
      price: 32.99,
      stock: 80
    },
    {
      name: "Deadline Rush",
      description: "An intense fusion of energy drinks, stress sweat, and keyboard clicking.",
      price: 36.99,
      stock: 70
    },
    {
      name: "Social Awkwardness",
      description: "The distinct aroma of missed social cues and uncomfortable silence.",
      price: 25.99,
      stock: 130
    },
    {
      name: "Digital Detox Dreams",
      description: "A refreshing blend of unused notifications and peaceful disconnection.",
      price: 42.99,
      stock: 65
    },
    {
      name: "Apartment Hunting Horror",
      description: "Notes of overpriced rent, fake listings, and desperate optimism.",
      price: 38.99,
      stock: 85
    },
    {
      name: "Dating App Despair",
      description: "A complex mixture of hope, disappointment, and left swipes.",
      price: 31.99,
      stock: 95
    },
    {
      name: "Zoom Meeting Fatigue",
      description: "The essence of 'you're on mute', virtual backgrounds, and camera-off moments.",
      price: 28.99,
      stock: 110
    },
    {
      name: "Freelancer Frenzy",
      description: "A blend of irregular income, multiple projects, and coffee addiction.",
      price: 45.99,
      stock: 70
    },
    {
      name: "Student Loan Stress",
      description: "The lasting scent of mounting debt and delayed adulting.",
      price: 33.99,
      stock: 100
    },
    {
      name: "Social Media Detox",
      description: "A refreshing mix of digital peace and FOMO-free existence.",
      price: 41.99,
      stock: 75
    },
    {
      name: "Weekend Warrior",
      description: "The dynamic scent of adventure plans versus actual couch time.",
      price: 37.99,
      stock: 90
    },
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

  console.log('Database has been seeded with 20 essences and their embeddings! 🌱')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  }) 