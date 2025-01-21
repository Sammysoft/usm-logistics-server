const priceFixes = {
  heavy: {
    small: 170,
    medium: 190,
    large: 250,
    extraLarge: 300,
  },
  medium: {
    small: 200,
    medium: 190,
    large: 130,
    extraLarge: 100,
  },
  light: {
    small: 200,
    medium: 130,
    large: 150,
    extraLarge: 120,
  },
};

export const getQuote = async (weight, container) => {
  let findWeightCat = (weight) => {
    if (weight < 20) {
      return priceFixes.light;
    } else if (weight < 50) {
      return priceFixes.medium;
    } else if (weight > 50) {
      return priceFixes.heavy;
    } else {
      return priceFixes.light;
    }
  };


  let weightCat = await findWeightCat();
  switch (container) {
    case "Small Size":
      return weightCat.small;
      break;
    case "Medium Size":
      return weightCat.medium;
      break;
    case "Extra Large Size":
      return weightCat.extraLarge;
      break;
    case "Large Size":
      return weightCat.large;
      break;

    default:
      return weightCat.light;
      break;
  }
};

// Light: 0–20 kg
// Medium: 21–50 kg
// Heavy: Above 50 kg

// console.log(await getQuote(50, "Large"));
