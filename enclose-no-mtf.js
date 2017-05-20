import makeList from "./list";
import { enclose1, enclose2, enclose3, encloses, isBasis, pp_list, pp_array } from "./libenclose";

export default function(circles) {
  return encloseN(makeList(circles), []);
}

// Returns the smallest circle that contains circles L and intersects circles B.
function encloseN(L, B, level=0) {
  //console.log("  ".repeat(level) + "encloseN", pp_list(L), "[" + pp_array(B) + "]");
  var circle,
      l0 = null,
      l1 = L.head,
      l2,
      p1;

  switch (B.length) {
    case 1: circle = enclose1(B[0]); break;
    case 2: circle = enclose2(B[0], B[1]); break;
    case 3: circle = enclose3(B[0], B[1], B[2]); break;
  }

  while (l1) {
    p1 = l1._, l2 = l1.next;
    if (!circle || !encloses(circle, p1)) {

      // Temporarily truncate L before l1.
      if (l0) l0.next = null;
      else L.head = null;

      B.push(p1);
      circle = encloseN(L, B, level + 1);
      B.pop();

      // Reconnect the truncated list L.
      if (l0) l0.next = l1;
      else L.head = l1;
    }

    l0 = l1;
    l1 = l2;
  }

  //console.log("  ".repeat(level) + "returning", JSON.stringify(circle) || "undefined");
  return circle;
}
