let hutan, n_samping,  tangan_1, jubah_1, kepala_1, kaki_1, kunai_1, o_samping, jubaho_1, kepalao_1, kakio_1, tangano_1;
let startTime;
let baseAngle = -27;
let animationAngle = 0;  

function preload () {
  hutan = loadImage ("hutan.jpg");
  n_samping = loadImage ("n_samping.png");
  jubah_1 = loadImage ("jubah-1.png");
  kepala_1 = loadImage ("kepala-1.png");
  kaki_1 = loadImage ("kaki-1.png");
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
  
  // Hitung pergeseran jubah (20 piksel = 2cm)
  const displacementMagnitude = animProgress * 20;
  const radiansAngle = radians(totalAngle);
  const displacementX = cos(radiansAngle) * displacementMagnitude;
  const displacementY = sin(radiansAngle) * displacementMagnitude;
  
  // PARAMETER KEPALA INDEPENDEN
  const headRotationAngle = -10 * animProgress; // Rotasi khusus kepala (-10° saat animasi selesai)
  const headDisplacementX = -5 * animProgress;  // Pergeseran horizontal kepala
  const headDisplacementY = 9 * animProgress;  // Pergeseran vertikal kepala
  const headPivotX = 90;  // Titik pivot X (dasar leher)
  const headPivotY = 200; // Titik pivot Y (dasar leher)
  
  // Hitung offset kepala berdasarkan posisi awal
  const headInitialX = 40;
  const headInitialY = 135;
  const headWidth = 100;
  const headHeight = 200;
  const headOffsetX = headInitialX - headPivotX + headWidth/2;
  const headOffsetY = headInitialY - headPivotY + headHeight/2;
  
  // Gambar bagian bawah karakter utama
  image(kaki_2, 60, 140, 100, 200);
  image(kaki_1, 45, 151, 100, 200);
  image(kunai_1, 45, 135, 100, 200);
  
  // ANIMASI KEPALA - rotasi dan pergeseran independen
  push();
  translate(headPivotX, headPivotY); // Pindah ke pivot point
  rotate(radians(headRotationAngle)); // Rotasi khusus kepala
  translate(headDisplacementX, headDisplacementY); // Pergeseran khusus kepala
  imageMode(CENTER);
  image(kepala_1, headOffsetX, headOffsetY, headWidth, headHeight);
  
   // Debug: titik pivot (berwarna merah)
  fill(255, 0, 0);
  noStroke();
  ellipse(0, 0, 8, 8);
  pop();
  
  // ANIMASI Jubah
  push();
  translate(65, 235); // Pivot point rotasi
  rotate(radians(totalAngle)); // Rotasi jubah
  translate(displacementX, displacementY); // Pergeseran maju
  imageMode(CENTER);
  image(jubah_1, 5, 20, 100, 200);
  
   // Debug: titik pivot (berwarna biru)
  fill(0, 0, 255);
  noStroke();
  ellipse(0, 0, 8, 8);
  pop();
  
  // Tangan karakter utama
  push();
  translate(12, 30);
  rotate(radians(30));
  imageMode(CENTER);
  image(tangan_1, 195, 135, 100, 200);
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
  text(`Waktu: ${elapsedSeconds.toFixed(1)} detik | Rotasi jubah: ${totalAngle.toFixed(1)}° | Rotasi kepala: ${headRotationAngle.toFixed(1)}°`, 20, 30);
  text(`Pergeseran kepala: X:${headDisplacementX.toFixed(1)} Y:${headDisplacementY.toFixed(1)}`, 20, 50);
}