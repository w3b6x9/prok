export const randomVec = length => {
  const deg = 2 * Math.PI * Math.random();
  return scale([Math.sin(deg), Math.cos(deg)], length);
};

export const scale = (vec, length) => {
  return [vec[0] * length, vec[1] * length];
};

export const dist = (pos1, pos2) => {
  return Math.sqrt(
    Math.pow(pos1[0] - pos2[0], 2) + Math.pow(pos1[1] - pos2[1], 2)
  );
};

export const norm = vec => {
  return dist([0, 0], vec);
};

export const dir = vec => {
  return scale(vec, norm(vec));
};

export const bulletVel = (deg, length) => {
  return scale([Math.cos(deg), Math.sin(deg)], length);
};
