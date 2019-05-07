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
