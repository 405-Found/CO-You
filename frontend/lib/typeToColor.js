const typeToColor = (type) => {
  switch (type) {
    case 'Flight':
      return '#DC655D'
    case 'Car':
      return '#F6B277'
    case 'Motorbike':
      return '#E6ADB9'
    case 'Bus':
      return '#68A3AD'
    case 'Rail':
      return '#64ADF8'
    default:
      return '#000'
  }
}

export default typeToColor
