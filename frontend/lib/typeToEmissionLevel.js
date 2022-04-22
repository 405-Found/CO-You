const typeToEmissionLevel = (type) => {
  switch (type) {
    case 'Flight':
      return 'very high'
    case 'Car':
      return 'high'
    case 'Motorbike':
      return 'medium'
    case 'Bus':
      return 'low'
    case 'Rail':
      return 'low'
    default:
      return ''
  }
}

export default typeToEmissionLevel
