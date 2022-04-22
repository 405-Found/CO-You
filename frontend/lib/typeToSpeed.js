// Returns the ~speed of a given transport type
const typeToSpeed = (type) => {
  switch (type) {
    case 'Flight':
      return 800
    case 'Car':
      return 40
    case 'Motorbike':
      return 40
    case 'Bus':
      return 40
    case 'Rail':
      return 20
    default:
      return 0
  }
}

export default typeToSpeed
