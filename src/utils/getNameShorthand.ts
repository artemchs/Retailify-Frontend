export function getNameShorthand(fullName: string): string {
  // Split the full name into words
  const words = fullName.split(' ')

  // Get the initials from each word, and limit to two letters
  const initials = words.map((word) => word.charAt(0).toUpperCase()).slice(0, 2)

  // Join the initials to create the shorthand
  const shorthand = initials.join('')

  return shorthand
}
