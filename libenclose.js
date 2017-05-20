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
  // console.log("enclose3", pp_array([a,b,c]));
  var x1 = a.x, y1 = a.y, r1 = a.r,
      x2 = b.x, y2 = b.y, r2 = b.r,
      x3 = c.x, y3 = c.y, r3 = c.r,
      a2 = 2 * (x1 - x2),
      b2 = 2 * (y1 - y2),
      c2 = 2 * (r2 - r1),
      d2 = x1 * x1 + y1 * y1 - r1 * r1 - x2 * x2 - y2 * y2 + r2 * r2,
      a3 = 2 * (x1 - x3),
      b3 = 2 * (y1 - y3),
      c3 = 2 * (r3 - r1),
      d3 = x1 * x1 + y1 * y1 - r1 * r1 - x3 * x3 - y3 * y3 + r3 * r3,
      ab = a3 * b2 - a2 * b3,
      xa = (b2 * d3 - b3 * d2) / ab - x1,
      xb = (b3 * c2 - b2 * c3) / ab,
      ya = (a3 * d2 - a2 * d3) / ab - y1,
      yb = (a2 * c3 - a3 * c2) / ab,
      A = xb * xb + yb * yb - 1,
      B = 2 * (xa * xb + ya * yb + r1),
      C = xa * xa + ya * ya - r1 * r1,
      r = A ? (-B - Math.sqrt(B * B - 4 * A * C)) / (2 * A) : -C / B;
  return {
    x: xa + xb * r + x1,
    y: ya + yb * r + y1,
    r: r
  };
}

export function encloses(a, b) {
  if (a.r < b.r) return false;
  var dx = b.x - a.x,
      dy = b.y - a.y,
      dr = a.r - b.r;
  return dr * dr * (1 + 1e-6) > dx * dx + dy * dy;
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
