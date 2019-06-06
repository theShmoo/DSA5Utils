import {DSAMonths} from '../data/DSAMonths';

export function Modifier(modifier) {
  let out = modifier;
  if(modifier === 0) out = "+/-" + Math.abs(modifier);
  else if(modifier > 0) out = "+" + Math.abs(modifier);
  else if(modifier < 0) out = "-" + Math.abs(modifier);
  return out;
}

export function Attribute(attribute) {
  return attribute[0] + "/" + attribute[1] + "/" + attribute[2];
}

export function Talent(talent) {
  let r = talent.talent;
  if(talent.anwendungsgebiet)
    r += " (" + talent.anwendungsgebiet + ")";
  r += " - " + Attribute(talent.eigenschaften);
  return r;
}

export function Time(t) {
  return t.start + " " + t.unit;
}

export function QS(qs) {
  return "QS " + qs;
}

export function MonthTooltip(month) {
  const m = DSAMonths[month];
  return "Irdisch: " + m.irdisch + ", " +
         "Thorwal: " + m.thorwaler + ", " +
         "Zwerge: " + m.zwerge
}

/// gets an array of integers (the months)
/// and returns a nice string
export function Months(months) {
  // months should be integers
  // sort them:
  let sorted = months.sort((a, b) => a-b);
  const max = sorted.length - 1;
  const ids = sorted.filter((m, i, array) => {
    // if the index is 0 look at the other side of the array
    const id_before = i < 1 ? max : i - 1;
    const id_after = i >= max ? 0 : i + 1;
    const val_before = m < 1 ? 12 : m - 1;
    const val_after = m >= 12 ? 0 : m + 1;
    return array[id_before] === val_before && array[id_after] === val_after;
  });

  // if we have all months
  if(ids.length === DSAMonths.length)
    return "ganzjährig";

  // now we want to build a nice string:
  // subsequent ints become connected by -
  const to_replace = ids.map((i) => sorted.indexOf(i))
  let fin = sorted.map((m, i, array) => {
    if (to_replace.includes(i))
      return "-"
    else
     return m;
  })
  // filter away the too many "-"
  .filter((m, i, array) => {
    return i === 0 || m !== array[i-1];
  })

  // two consecutive months get a ", ""
  const len = fin.length;
  if(len > 1) {
    if(fin[0] === "-") {
      const first = fin[1];
      const last = fin[len - 1];
      fin.splice(0, 2); // remove the - and the first
      // and insert it in the end! (if there is not already a "-")
      if(last !== "-")
        fin.push("-");
      fin.push(first);
    }
    if(fin[len - 1] === "-") {
      const last = fin[len - 2];
      fin.splice(len - 2, 2); // remove the last and the -
      fin.splice( 0, 0, ...[last, "-"])// and insert it at the start!
    }
  }

  return fin.reduce((sum, m, i, array) => {
    if(m === "-")
      return sum += m;
    else if(i !== 0 && array[i-1] !== "-")
      return sum += ", " + DSAMonths[m].normal;
    else
      return sum += DSAMonths[m].normal;
  }, "");
}
