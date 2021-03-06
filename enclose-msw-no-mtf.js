import { enclose1, enclose2, enclose3, encloses, enclosesAll, isBasis, pp_array, pp_circle } from "./libenclose";
import makeList from "./list";

export default function(circles) {
  return encloseBasis(findBasis(makeList(circles), []));
}

function findBasis(L, B, level=0) {
  // console.log("  ".repeat(level) + "encloseN", pp_list(L), "[" + pp_array(B) + "]");
  var circle = encloseBasis(B),
      l0 = null,
      l1 = L.head,
      l2,
      p1;

  while (l1) {
    p1 = l1._, l2 = l1.next;
    if (!circle || !encloses(circle, p1)) {

      // Temporarily truncate L before l1.
      if (l0) l0.next = null;
      else L.head = null;

      B = findBasis(L, extendBasis(B, p1), level + 1); // Note: reorders L!
      circle = encloseBasis(B);

      // Reconnect the truncated list L.
      if (l0) l0.next = l1;
      else L.head = l1;
    }
    l0 = l1;
    l1 = l2;
  }

  L.tail = l0;
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
