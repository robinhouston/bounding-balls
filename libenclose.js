export function shuffle(L) {
  for (var i = 0; i < L.length; i++) {
    var j = Math.floor(Math.random() * (i+1));
    var tmp = L[i]; L[i] = L[j]; L[j] = tmp;
  }
}

function distance(x1, y1, x2, y2) {
  var dx = x1 - x2, dy = y1 - y2;
  return Math.sqrt(dx * dx + dy * dy);
}

export function enclose1(a) {
  // console.log("enclose1", pp_circle(a));
  return {
    x: a.x,
    y: a.y,
    r: a.r
  };
}

export function enclose2(a, b) {
  // console.log("enclose2", pp_array([a,b]));
  var x1 = a.x, y1 = a.y, r1 = a.r,
      x2 = b.x, y2 = b.y, r2 = b.r,
      x21 = x2 - x1, y21 = y2 - y1, r21 = r2 - r1,
      l = Math.sqrt(x21 * x21 + y21 * y21);
  return {
    x: (x1 + x2 + x21 / l * r21) / 2,
    y: (y1 + y2 + y21 / l * r21) / 2,
    r: (l + r1 + r2) / 2
  };
}

export function enclose3(a, b, c) {
  var x1 = a.x, y1 = a.y, r1 = a.r,
      x2 = b.x, y2 = b.y, r2 = b.r,
      x3 = c.x, y3 = c.y, r3 = c.r,
      a2 = x1 - x2,
      a3 = x1 - x3,
      b2 = y1 - y2,
      b3 = y1 - y3,
      c2 = r2 - r1,
      c3 = r3 - r1,
      d1 = x1 * x1 + y1 * y1 - r1 * r1,
      d2 = d1 - x2 * x2 - y2 * y2 + r2 * r2,
      d3 = d1 - x3 * x3 - y3 * y3 + r3 * r3,
      ab = a3 * b2 - a2 * b3,
      xa = (b2 * d3 - b3 * d2) / (ab * 2) - x1,
      xb = (b3 * c2 - b2 * c3) / ab,
      ya = (a3 * d2 - a2 * d3) / (ab * 2) - y1,
      yb = (a2 * c3 - a3 * c2) / ab,
      A = xb * xb + yb * yb - 1,
      B = 2 * (r1 + xa * xb + ya * yb),
      C = xa * xa + ya * ya - r1 * r1,
      r = -(A ? (B + Math.sqrt(B * B - 4 * A * C)) / (2 * A) : C / B),
      x = x1 + xa + xb * r,
      y = y1 + ya + yb * r;
  return {
    x: x,
    y: y,
    r: Math.max(
      distance(x, y, x1, y1) + r1,
      distance(x, y, x2, y2) + r2,
      distance(x, y, x3, y3) + r3
    )
  };
}

export function encloses(a, b) {
  var dr = a.r - b.r, dx = b.x - a.x, dy = b.y - a.y;
  return dr >= -1e-6 && dr * dr * (1 + 1e-9) > dx * dx + dy * dy;
}

export function enclosesAll(a, B) {
  for (var i = 0; i < B.length; i++) {
    if (!encloses(a, B[i])) return false;
  }
  return true;
}

export function isBasis(a, b, c) {
  return !encloses(enclose2(a, b), c)
    && !encloses(enclose2(a, c), b)
    && !encloses(enclose2(b, c), a);
}


export function pp_circle(a) {
  return a.name || JSON.stringify(a);
}

export function pp_array(B) {
  return B.map(pp_circle).join(",");
}

export function pp_list(L) {
  var s = [];
  for (var node = L.head; node; node = node.next) {
    s.push(node._);
  }
  return pp_array(s);
}
