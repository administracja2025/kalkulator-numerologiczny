// Helper function to reduce a number to a single digit (1-9)
// Exception: 11, 22, and 33 are master numbers and are not reduced
export function reduceToSingleDigit(num: number): number {
  if (num === 11 || num === 22 || num === 33) {
    return num
  }

  if (num <= 9) {
    return num
  }

  // Convert to string, split into digits, convert back to numbers, and sum
  const sum = num
    .toString()
    .split("")
    .reduce((acc, digit) => acc + Number.parseInt(digit), 0)

  // Recursively reduce until we get a single digit
  return reduceToSingleDigit(sum)
}

// Calculate Life Path Number from birth date
export function calculateLifePathNumber(birthDate: string): number {
  // Extract month, day, and year from the date string (format: YYYY-MM-DD)
  const [year, month, day] = birthDate.split("-").map(Number)

  // Reduce each component to a single digit
  const reducedMonth = reduceToSingleDigit(month)
  const reducedDay = reduceToSingleDigit(day)

  // For year, first sum all digits
  const yearSum = year
    .toString()
    .split("")
    .reduce((acc, digit) => acc + Number.parseInt(digit), 0)
  const reducedYear = reduceToSingleDigit(yearSum)

  // Sum all reduced values and reduce again to get the Life Path Number
  const sum = reducedMonth + reducedDay + reducedYear
  return reduceToSingleDigit(sum)
}

// Letter to number conversion for name calculations
const letterValues: Record<string, number> = {
  a: 1,
  b: 2,
  c: 3,
  d: 4,
  e: 5,
  f: 6,
  g: 7,
  h: 8,
  i: 9,
  j: 1,
  k: 2,
  l: 3,
  m: 4,
  n: 5,
  o: 6,
  p: 7,
  q: 8,
  r: 9,
  s: 1,
  t: 2,
  u: 3,
  v: 4,
  w: 5,
  x: 6,
  y: 7,
  z: 8,
}

// Calculate Destiny/Expression Number from full name
export function calculateDestinyNumber(name: string): number {
  // Convert name to lowercase and remove non-alphabetic characters
  const cleanName = name.toLowerCase().replace(/[^a-z]/g, "")

  // Sum the values of all letters
  let sum = 0
  for (const letter of cleanName) {
    sum += letterValues[letter] || 0
  }

  return reduceToSingleDigit(sum)
}

// Calculate Soul Urge/Heart's Desire Number from vowels in name
export function calculateSoulUrgeNumber(name: string): number {
  // Convert name to lowercase
  const cleanName = name.toLowerCase()

  // Sum the values of vowels
  let sum = 0
  for (const letter of cleanName) {
    if ("aeiou".includes(letter)) {
      sum += letterValues[letter] || 0
    }
  }

  return reduceToSingleDigit(sum)
}

// Calculate Personality Number from consonants in name
export function calculatePersonalityNumber(name: string): number {
  // Convert name to lowercase
  const cleanName = name.toLowerCase()

  // Sum the values of consonants
  let sum = 0
  for (const letter of cleanName) {
    if ("bcdfghjklmnpqrstvwxyz".includes(letter)) {
      sum += letterValues[letter] || 0
    }
  }

  return reduceToSingleDigit(sum)
}

// Get meaning for each numerology number
export function getNumerologyMeaning(type: string, number: number): string {
  const meanings: Record<string, Record<number, string>> = {
    lifePath: {
      1: "You are a natural leader with strong independence and creativity. Your path involves developing confidence and individuality while learning to be both independent and cooperative.",
      2: "You are diplomatic and sensitive with a gift for peacemaking. Your path involves developing patience, cooperation, and finding balance in relationships.",
      3: "You are creative, expressive, and socially engaging. Your path involves developing your creative talents and learning to focus your energies productively.",
      4: "You are practical, reliable, and hardworking. Your path involves building stable foundations and developing discipline and organization.",
      5: "You are adventurous, versatile, and freedom-loving. Your path involves embracing change and learning to use freedom responsibly.",
      6: "You are responsible, caring, and nurturing. Your path involves service to others and finding balance between helping others and self-care.",
      7: "You are analytical, introspective, and spiritual. Your path involves seeking knowledge and developing faith in what cannot be proven.",
      8: "You are ambitious, goal-oriented, and business-minded. Your path involves learning to balance material and spiritual success.",
      9: "You are compassionate, humanitarian, and idealistic. Your path involves selfless service and letting go of what no longer serves you.",
      11: "As a master number, you have heightened intuition and spiritual insight. Your path involves inspiring others and channeling your spiritual awareness.",
      22: "As a master number, you have exceptional practical vision and the ability to manifest on a large scale. Your path involves turning dreams into reality.",
      33: "As a master number, you have extraordinary nurturing abilities and creative expression. Your path involves selfless service and uplifting humanity.",
    },
    destiny: {
      1: "Your destiny is to develop independence, leadership, and originality. You're here to pioneer new paths and inspire others through your confidence and innovation.",
      2: "Your destiny is to create harmony, cooperation, and balance. You're here to mediate, support, and bring people together through your diplomacy and sensitivity.",
      3: "Your destiny is to express creativity, joy, and communication. You're here to uplift others through your self-expression, optimism, and artistic abilities.",
      4: "Your destiny is to build stable foundations and create order. You're here to demonstrate reliability, hard work, and practical solutions to life's challenges.",
      5: "Your destiny is to embrace freedom, change, and adventure. You're here to experience life fully and inspire others to break free from limitations.",
      6: "Your destiny is to nurture, heal, and create harmony. You're here to take responsibility for others and create beauty through your compassion and service.",
      7: "Your destiny is to seek wisdom, analysis, and spiritual truth. You're here to develop your inner knowing and share profound insights with others.",
      8: "Your destiny is to achieve material and spiritual abundance. You're here to master personal power and use it to create prosperity that benefits many.",
      9: "Your destiny is to serve humanity and achieve completion. You're here to let go of personal desires for the greater good and inspire universal compassion.",
      11: "Your destiny as a master number is to bring spiritual illumination. You're here to inspire others through your intuition and heightened sensitivity.",
      22: "Your destiny as a master number is to be a master builder. You're here to transform innovative ideas into practical realities that benefit humanity.",
      33: "Your destiny as a master number is to be a master teacher. You're here to nurture the spiritual growth of humanity through compassion and creativity.",
    },
    soulUrge: {
      1: "Your heart desires independence, leadership, and achievement. You're driven by a need to pioneer new paths and make your unique mark on the world.",
      2: "Your heart desires harmony, cooperation, and partnership. You're driven by a need for connection and to create peace in your relationships.",
      3: "Your heart desires self-expression, joy, and social connection. You're driven by a need to create, communicate, and bring happiness to others.",
      4: "Your heart desires stability, order, and accomplishment. You're driven by a need to build something lasting and create security in your life.",
      5: "Your heart desires freedom, change, and adventure. You're driven by a need for variety and to experience life to its fullest.",
      6: "Your heart desires to nurture, protect, and serve. You're driven by a need to care for others and create harmony in your home and community.",
      7: "Your heart desires wisdom, spirituality, and understanding. You're driven by a need to find deeper meaning and analyze the mysteries of life.",
      8: "Your heart desires success, influence, and material comfort. You're driven by a need to achieve recognition and financial security.",
      9: "Your heart desires to make a difference, serve humanity, and achieve personal growth. You're driven by compassion and universal love.",
      11: "Your heart desires spiritual insight and inspiration. You're driven by a need to elevate consciousness and serve a higher purpose.",
      22: "Your heart desires to transform dreams into reality. You're driven by a need to create large-scale projects that benefit many people.",
      33: "Your heart desires to nurture the spiritual growth of others. You're driven by a need to teach and heal on a profound level.",
    },
    personality: {
      1: "You appear confident, independent, and pioneering to others. People see you as a leader who is original and self-reliant.",
      2: "You appear diplomatic, cooperative, and sensitive to others. People see you as a peacemaker who is supportive and intuitive.",
      3: "You appear expressive, social, and creative to others. People see you as optimistic, talented, and enjoyable to be around.",
      4: "You appear reliable, practical, and organized to others. People see you as hardworking, honest, and dependable.",
      5: "You appear adaptable, progressive, and energetic to others. People see you as adventurous, versatile, and freedom-loving.",
      6: "You appear responsible, caring, and harmonious to others. People see you as nurturing, protective, and service-oriented.",
      7: "You appear thoughtful, reserved, and analytical to others. People see you as wise, spiritual, and somewhat mysterious.",
      8: "You appear confident, ambitious, and authoritative to others. People see you as powerful, goal-oriented, and business-minded.",
      9: "You appear sophisticated, humanitarian, and idealistic to others. People see you as compassionate, artistic, and globally-minded.",
      11: "You appear intuitive, inspirational, and sensitive to others. People see you as having unusual spiritual awareness and insight.",
      22: "You appear visionary, practical, and masterful to others. People see you as having extraordinary ability to manifest large projects.",
      33: "You appear nurturing, creative, and altruistic to others. People see you as having exceptional ability to uplift and heal.",
    },
  }

  return meanings[type][number] || "This number requires personal interpretation based on your unique circumstances."
}
