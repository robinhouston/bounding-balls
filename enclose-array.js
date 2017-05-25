import makeList from "./list";
import { enclose1, enclose2, enclose3, encloses, isBasis } from "./libenclose";

export default function(circles) {
  return encloseN(circles, circles.length, []);
}

// Returns the smallest circle that contains circles L and intersects circles B.
function encloseN(L, n, B) {
  var circle, i, p;

  switch (B.length) {
    case 0: break;
    case 1: circle = enclose1(B[0]); break;
    case 2: circle = enclose2(B[0], B[1]); break;
    case 3:
      if (!isBasis(B[0], B[1], B[2])) return;
      circle = enclose3(B[0], B[1], B[2]);
      break;
    default: return;
  }

  for (i = 0; i < n; i++) {
    p = L[i];

    if (!circle || !encloses(circle, p)) {
      B.push(p);
      circle = encloseN(L, i, B);
      B.pop();
    }
  }

  return circle;
}
