 import seedrandom from 'seedrandom'

export function createSeed(seed) {
  return new seedrandom(seed);
}

// not a good seed
export function createAutoSeed() {
  return (Math.random() + 1).toString(36).substr(2, 7);
}

export function pickRandom(to_pick, seed) {
  // to pick contains an array with objects
  // each object needs to have a property "p" with a probability between 0 and 1
  // the sum of all p needs to be 1
  const r = seed();
  let sum_p = 0;
  for(let i = 0; i < to_pick.length; i++) {
    sum_p += to_pick[i].p;
    if(r < sum_p)
      return to_pick[i];
  }

  // we should never come here.
  return undefined;
}

export function getRandomElement(a, seed) {
  return a[Math.floor(seed()*a.length)];
}

export function getRandomIntInclusive(min, max, seed) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(seed() * (max - min + 1)) + min;
}

export function throwDice(dice, seed) {
  // a dice should look like this:
  // {d: {type: 6, count: 2}, mod: 2}
  // means 2W6 + 2
  const {d, mod, description} = dice;

  if(description) {
    return description;
  }
  else {
    let result = mod;
    const {count, type} = d;
    for(let i = 0; i < count; i++) {
      result += Math.floor((seed() * type) + 1);
    }
    return result;
  }

}
