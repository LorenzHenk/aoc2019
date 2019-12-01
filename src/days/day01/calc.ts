export const calculateFuel = (mass: number) => Math.floor(mass / 3) - 2;

export const calculateFuelWithFuel = (mass: number) => {
  let totalFuel = 0;
  let currentMass = mass;
  while (true) {
    const currentFuel = calculateFuel(currentMass);
    if (currentFuel <= 0) {
      break;
    }
    totalFuel += currentFuel;
    currentMass = currentFuel;
  }
  return totalFuel;
};
