const typeToDistCarbonConstant = (type) => {
  switch (type) {
    case 'Flight':
      return 0.00005
    case 'Car':
      return 0.0005
    case 'Motorbike':
      return 0.0005
    case 'Bus':
      return 0.00005
    case 'Rail':
      return 0.00005
    default:
      return 0
  }
}

export default typeToDistCarbonConstant
