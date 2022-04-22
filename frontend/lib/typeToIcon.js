const typeToIcon = (type) => {
  switch (type) {
    case 'Flight':
      return 'flight'
    case 'Car':
      return 'directions_car'
    case 'Motorbike':
      return 'two_wheeler'
    case 'Bus':
      return 'directions_bus'
    case 'Rail':
      return 'train'
    default:
      return ''
  }
}

export default typeToIcon
