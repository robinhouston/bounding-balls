import { enclose1, enclose2, enclose3, encloses, isBasis, pp_array, pp_circle } from "./libenclose";

export default function(circles) {
  return encloseBasis(findBasis(circles, circles.length, []));
}

function findBasis(L, n, B) {
  var circle = encloseBasis(B);

  for (var i = 0; i < n; i++) {
    var p = L[i];
    if (!circle || !encloses(circle, p)) {
      B = findBasis(L, i + 1, extendBasis(B, p));
      circle = encloseBasis(B);
    }
  }

  return B;
}

function encloseBasis(B) {
  switch(B.length) {
    case 1: return enclose1(B[0]);
    case 2: return enclose2(B[0], B[1]);
    case 3: return enclose3(B[0], B[1], B[2]);
  }
}

function extendBasis(B, p) {
  var i, j;
  if (enclosesAll(p, B)) return [p];

  // If we get here then B must have at least one element
  for (i = 0; i < B.length; i++) {
    if (enclosesAll(enclose2(B[i], p), B)) return [B[i], p];
  }

  // If we get here then B must have at least two elements
  for (i = 0; i < B.length-1; i++) {
    for (j = i+1; j < B.length; j++) {
      if (isBasis(B[i], B[j], p) && enclosesAll(enclose3(B[i], B[j], p), B)) {
        return [B[i], B[j], p];
      }
    }
  }

  // If we get here then something is very wrong
  console.error(pp_array(B), pp_circle(p));
  throw new Error("extendBasis: we should never get here");
}

function enclosesAll(a, B) {
  for (var i = 0; i < B.length; i++) {
    if (!encloses(a, B[i])) return false;
  }
  return true;
}
