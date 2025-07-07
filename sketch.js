let hutan, n_samping,  tangan_1, jubah_1, kepala_1, kaki_1, kunai_1, o_samping, jubaho_1, kepalao_1, kakio_1, tangano_1;
let startTime;
let baseAngle = -27;
let animationAngle = 0;  
let baseHandAngle = 30;

function preload () {
  hutan = loadImage ("hutan.jpg");
  
  n_samping = loadImage ("n_samping.png");
  n_serang = loadImage ("n_serang.png");
  jubah_1 = loadImage ("jubah-1.png");
  kepala_1 = loadImage ("kepala-1.png");
  kaki_1 = loadImage ("kaki-1.png");
  kakikiri_1 = loadImage ("kakikiri-1.png");
  kaki_2 = loadImage ("kaki-2.png");
  kunai_1 = loadImage ("kunai-1.png");
  tangan_1 = loadImage ("tangan-1.png");
  
  tangano_1 = loadImage ("tangano-1.png");
  kakio_1 = loadImage ("kakio-1.png");
  kepalao_1 = loadImage ("kepalao-1.png");
  jubaho_1 = loadImage ("jubaho-1.png");
  o_samping = loadImage ("o_samping.png");
}

function setup () {
  createCanvas  (640, 400);
  frameRate (30);
  startTime = millis();
}

function draw () {
  background (225);
  image(hutan, 0, 0, width, height);
  
  const elapsedSeconds = (millis() - startTime) / 1000;
  
  let animProgress = 0;
  if (elapsedSeconds > 3 && elapsedSeconds < 4) {
    animProgress = (elapsedSeconds - 3) / 1;
    animationAngle = animProgress * 15; 
  } else if (elapsedSeconds >= 4) {
    animationAngle = 15;
    animProgress = 1; // Animasi selesai
  } else {
    animationAngle = 0;
  }
  
   const totalAngle = baseAngle + animationAngle;
  
  // NARUTO
  
  // Hitung pergeseran jubah (20 piksel = 2cm)
  const displacementMagnitude = animProgress * 20;
  const radiansAngle = radians(totalAngle);
  const displacementX = cos(radiansAngle) * displacementMagnitude;
  const displacementY = sin(radiansAngle) * displacementMagnitude;
  
  // PARAMETER KEPALA INDEPENDEN
  const headRotationAngle = -9 * animProgress;
  const headDisplacementX = -5 * animProgress;
  const headDisplacementY = 9 * animProgress;
  const headPivotX = 90;
  const headPivotY = 200;
  
  // PARAMETER TANGAN INDEPENDEN
  const handAnimationAngle = -45 * animProgress;
  const totalHandRotation = baseHandAngle + handAnimationAngle;
  const handRotationAngle = -45 * animProgress;
  const handDisplacementX = -5 * animProgress;
  const handDisplacementY = 10 * animProgress;
  const handPivotX = 95;
  const handPivotY = 275; 
  
  // PARAMETER KAKIKIRI INDEPENDEN
  const kickRotationAngle = 45 * animProgress;
  const kickDisplacementX = -5 * animProgress;
  const kickDisplacementY = -4 * animProgress;
  const kickPivotX = 95;
  const kickPivotY = 290; 
  
  // Hitung offset kepala berdasarkan posisi awal
  const headInitialX = 36;
  const headInitialY = 136;
  const headWidth = 100;
  const headHeight = 200;
  const headOffsetX = headInitialX - headPivotX + headWidth/2;
  const headOffsetY = headInitialY - headPivotY + headHeight/2;
  
  // Hitung offset tangan
  const handInitialX = 50;
  const handInitialY = 140;
  const handWidth = 100;
  const handHeight = 200;
  const handOffsetX = handInitialX - handPivotX + handWidth/2;
  const handOffsetY = handInitialY - handPivotY + handHeight/2;
  
  // Hitung offset kaki kiri
  const kickInitialX = 45;
  const kickInitialY = 152;
  const kickWidth = 100;
  const kickHeight = 200;
  const kickOffsetX = kickInitialX - kickPivotX + kickWidth/2;
  const kickOffsetY = kickInitialY - kickPivotY + kickHeight/2;
  
 
  
  // Gambar bagian bawah karakter utama

  image(kaki_2, 60, 140, 100, 200);
  image(kaki_1, 45, 151, 100, 200);
  image(kunai_1, 45, 135, 100, 200);
  
  // ANIMASI KEPALA - rotasi dan pergeseran independen
  push();
  translate(headPivotX, headPivotY);
  rotate(radians(headRotationAngle));
  translate(headDisplacementX, headDisplacementY);
  imageMode(CENTER);
  image(kepala_1, headOffsetX, headOffsetY, headWidth, headHeight);
  
  
   // Debug: titik pivot (berwarna merah)
  fill(255, 0, 0);
  noStroke();
  ellipse(0, 0, 8, 8);
  pop();
  
  
  // ANIMASI KAKI KIRI - transformasi independen
  push();
  translate(kickPivotX, kickPivotY);
  rotate(radians(kickRotationAngle));
  translate(kickDisplacementX, kickDisplacementY);
  imageMode(CENTER);
  image(kakikiri_1, kickOffsetX, kickOffsetY, kickWidth, handHeight);
  
  // Debug: titik pivot tangan (hijau)
  fill(0, 255, 0);
  noStroke();
  ellipse(0, 0, 8, 8);
  pop();
  
  
  // ANIMASI Jubah
  push();
  translate(65, 235);
  rotate(radians(totalAngle));
  translate(displacementX, displacementY);
  imageMode(CENTER);
  image(jubah_1, 5, 20, 100, 200);
  
   // Debug: titik pivot (berwarna biru)
  fill(0, 0, 255);
  noStroke();
  ellipse(0, 0, 8, 8);
  pop();
  
  
  // ANIMASI TANGAN - transformasi independen
  push();
  translate(handPivotX, handPivotY);
 rotate(radians(totalHandRotation));
  translate(handDisplacementX, handDisplacementY);
  imageMode(CENTER);
  image(tangan_1, handOffsetX, handOffsetY, handWidth, handHeight);
  
  // Debug: titik pivot tangan (hijau)
  fill(0, 255, 0);
  noStroke();
  ellipse(0, 0, 8, 8);
  pop();
  
  
  // Karakter lawan
  image(o_samping, 500, 140, 100, 200);
  image(kakio_1, 500, 140, 100, 200);
  image(kepalao_1, 500, 140, 100, 200);
  image(jubaho_1, 500, 140, 100, 200);
  image(tangano_1, 500, 140, 100, 200);
  
  // Debug info
  fill(0);
  textSize(16);
  text(`Waktu: ${elapsedSeconds.toFixed(1)} detik | Rotasi jubah: ${totalAngle.toFixed(1)}°`, 20, 30);
  text(`Rotasi kepala: ${headRotationAngle.toFixed(1)}° | Rotasi tangan: ${handRotationAngle.toFixed(1)}° | Rotasi kakikiri: ${kickRotationAngle.toFixed(1)}°`, 20, 50);
  text(`Pergeseran kepala: X:${headDisplacementX.toFixed(1)} Y:${headDisplacementY.toFixed(1)}`, 20, 70);
  text(`Pergeseran tangan: X:${handDisplacementX.toFixed(1)} Y:${handDisplacementY.toFixed(1)}`, 20, 90);
  
}