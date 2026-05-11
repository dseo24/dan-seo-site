const MAX_MOUSE_ROTATION = (60* Math.PI) / 180;

const FLOAT_AMPLITUDE_Y = 0.12;
const FLOAT_FREQ_Y = 0.3;
const FLOAT_AMPLITUDE_Z = 0.12;
const FLOAT_FREQ_Z = 0.3;

const BOUNCE_AMPLITUDE_Y = 0.02;
const BOUNCE_FREQ_Y = 2;

const ROT_STIFFNESS = 0.55;
const ROT_DAMPING = 0.72;

const LERP_FACTOR = 0.08;

export function applyFloat(mesh, animState, t, mouseX, mouseY, isSelected, swayMult = 1, freqMult = 1) {
  const phase = animState.phaseOffset;
  const floatY = Math.sin(t * FLOAT_FREQ_Y * freqMult + phase) * FLOAT_AMPLITUDE_Y * swayMult;
  const floatZ = Math.sin(t * FLOAT_FREQ_Z * freqMult + phase + 1.0) * FLOAT_AMPLITUDE_Z * 0.6;
  const bounceY = Math.sin(t * BOUNCE_FREQ_Y + phase) * BOUNCE_AMPLITUDE_Y;

  const mouseOffsetX = isSelected ? -mouseY * MAX_MOUSE_ROTATION : 0;
  const mouseOffsetY = isSelected ? mouseX * MAX_MOUSE_ROTATION : 0;

  if (animState.spinVel   === undefined) animState.spinVel   = 0;
  if (animState.spinAngle === undefined) animState.spinAngle = 0;
  animState.spinAngle += animState.spinVel;
  animState.spinVel   *= 0.96;

  mesh.rotation.x = mouseOffsetX + floatY * 0.3;
  mesh.rotation.y = mouseOffsetY + floatY + animState.spinAngle;
  mesh.rotation.z = floatZ;

  animState.emergeY += (animState.baseY - animState.emergeY) * 0.04;

  const targetY = animState.emergeY + bounceY;
  animState.velPosY += (targetY - mesh.position.y) * ROT_STIFFNESS;
  animState.velPosY *= ROT_DAMPING;
  mesh.position.y += animState.velPosY;
}

export function applyCarouselPosition(mesh, animState, target) {
  if (animState.originY === undefined) animState.originY = animState.baseY;
  mesh.position.x += (target.x - mesh.position.x) * LERP_FACTOR;
  mesh.position.z += (target.z - mesh.position.z) * LERP_FACTOR;
  animState.baseY   = animState.originY + (target.y ?? 0);

  animState.currentScale += (target.scale - animState.currentScale) * LERP_FACTOR;
  mesh.scale.setScalar(animState.currentScale);
}
