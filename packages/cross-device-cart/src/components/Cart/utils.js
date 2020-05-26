const getRandomName = length => Math.random().toString(36).substring(length)
const getRandomPrice = (min = 1, max = 10000) =>
  Math.round(min + Math.random() * (max - min))

export const getRandomItem = () => {
  return { name: getRandomName(5), price: getRandomPrice(1, 500) }
}
