let hutan, n_samping,  tangan_1, jubah_1, kepala_1, kaki_1, kunai_1, o_samping, jubaho_1, kepalao_1, kakio_1, tangano_1;
let startTime;
let baseAngle = -27;
let animationAngle = 0;  
let baseHandAngle = 30;
let baseKatanaAngle = 10;

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
  kakio_2 = loadImage ("kakio-2.png");
  kepalao_1 = loadImage ("kepalao-1.png");
  jubaho_1 = loadImage ("jubaho-1.png");
  o_samping = loadImage ("o_samping.png");
  
  katana = loadImage ("katana.png");
  kunai = loadImage ("kunai.png");
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
  
  
  // OBITO
  
  // PARAMETER KEPALAO INDEPENDEN
  const headoRotationAngle = -9 * animProgress;
  const headoDisplacementX = -20 * animProgress;
  const headoDisplacementY = 1 * animProgress;
  const headoPivotX = 550;
  const headoPivotY = 220;
  
  // PARAMETER KAKIO-1 INDEPENDEN
  const kickoRotationAngle = -1 * animProgress;
  const kickoDisplacementX = -5 * animProgress;
  const kickoDisplacementY = -2 * animProgress;
  const kickoPivotX = 550;
  const kickoPivotY = 300;
  
  // PARAMETER KAKIO-2 INDEPENDEN
  const kicko2RotationAngle = -30 * animProgress;
  const kicko2DisplacementX = 15 * animProgress;
  const kicko2DisplacementY = -1 * animProgress;
  const kicko2PivotX = 550;
  const kicko2PivotY = 300;
  
  // PARAMETER JUBAHO INDEPENDEN
  const jubahoRotationAngle = -20 * animProgress;
  const jubahoDisplacementX = -15 * animProgress;
  const jubahoDisplacementY = -5 * animProgress;
  const jubahoPivotX = 550;
  const jubahoPivotY = 250;
  
  // PARAMETER KATANA INDEPENDEN
  const katanaAnimationAngle = 55 * animProgress;
  const katanaRotationAngle = baseKatanaAngle + katanaAnimationAngle;
  const katanaDisplacementX = -10 * animProgress;
  const katanaDisplacementY = 20 * animProgress;
  const katanaPivotX = 550;
  const katanaPivotY = 250;
  
  // PARAMETER TANGANO INDEPENDEN
  const handoRotationAngle = 55 * animProgress;
  const handoDisplacementX = -10 * animProgress;
  const handoDisplacementY = 20 * animProgress;
  const handoPivotX = 550;
  const handoPivotY = 250;
  
  // Hitung offset kepalao berdasarkan posisi awal
  const headoInitialX = 500;
  const headoInitialY = 140;
  const headoWidth = 100;
  const headoHeight = 200;
  const headoOffsetX = headoInitialX - headoPivotX + headoWidth/2;
  const headoOffsetY = headoInitialY - headoPivotY + headoHeight/2;
  
  // Hitung offset kakio berdasarkan posisi awal
  const kickoInitialX = 500;
  const kickoInitialY = 140;
  const kickoWidth = 100;
  const kickoHeight = 200;
  const kickoOffsetX = kickoInitialX - kickoPivotX + kickoWidth/2;
  const kickoOffsetY = kickoInitialY - kickoPivotY + kickoHeight/2;
  
  // Hitung offset kakio2 berdasarkan posisi awal
  const kicko2InitialX = 500;
  const kicko2InitialY = 140;
  const kicko2Width = 100;
  const kicko2Height = 200;
  const kicko2OffsetX = kicko2InitialX - kicko2PivotX + kicko2Width/2;
  const kicko2OffsetY = kicko2InitialY - kicko2PivotY + kicko2Height/2;
  
  
  // Hitung offset jubaho berdasarkan posisi awal
  const jubahoInitialX = 500;
  const jubahoInitialY = 140;
  const jubahoWidth = 100;
  const jubahoHeight = 200;
  const jubahoOffsetX = jubahoInitialX - jubahoPivotX + jubahoWidth/2;
  const jubahoOffsetY = jubahoInitialY - jubahoPivotY + jubahoHeight/2;
  
  // Hitung offset katana berdasarkan posisi awal
  const katanaInitialX = 530;
  const katanaInitialY = 273;
  const katanaWidth = 40;
  const katanaHeight = 80;
  const katanaOffsetX = katanaInitialX - katanaPivotX + katanaWidth/2;
  const katanaOffsetY = katanaInitialY - katanaPivotY + katanaHeight/2;
  
  // Hitung offset tangano berdasarkan posisi awal
  const handoInitialX = 500;
  const handoInitialY = 140;
  const handoWidth = 100;
  const handoHeight = 200;
  const handoOffsetX = handoInitialX - handoPivotX + handoWidth/2;
  const handoOffsetY = handoInitialY - handoPivotY + handoHeight/2;
  

  
  
  // ANIMASI KEPALAO - rotasi dan pergeseran independen
  push();
  translate(headoPivotX, headoPivotY);
  rotate(radians(headoRotationAngle));
  translate(headoDisplacementX, headoDisplacementY);
  imageMode(CENTER);
  image(kepalao_1, headoOffsetX, headoOffsetY, headoWidth, headoHeight);
  
  // Debug: titik pivot (berwarna merah)
  fill(255, 0, 0);
  noStroke();
  ellipse(0, 0, 8, 8);
  pop();
  
  // ANIMASI KAKIO - rotasi dan pergeseran independen
  push();
  translate(kickoPivotX, kickoPivotY);
  rotate(radians(kickoRotationAngle));
  translate(kickoDisplacementX, kickoDisplacementY);
  imageMode(CENTER);
  image(kakio_1, kickoOffsetX, kickoOffsetY, kickoWidth, kickoHeight);
  
  // Debug: titik pivot (berwarna merah)
  fill(255, 0, 0);
  noStroke();
  ellipse(0, 0, 8, 8);
  pop();
  
  // ANIMASI KAKIO2 - rotasi dan pergeseran independen
  push();
  translate(kicko2PivotX, kicko2PivotY);
  rotate(radians(kicko2RotationAngle));
  translate(kicko2DisplacementX, kicko2DisplacementY);
  imageMode(CENTER);
  image(kakio_2, kicko2OffsetX, kicko2OffsetY, kicko2Width, kicko2Height);
  
  // Debug: titik pivot (berwarna merah)
  fill(255, 0, 0);
  noStroke();
  ellipse(0, 0, 8, 8);
  pop();
  
  // ANIMASI JUBAHO - rotasi dan pergeseran independen
  push();
  translate(jubahoPivotX, jubahoPivotY);
  rotate(radians(jubahoRotationAngle));
  translate(jubahoDisplacementX, jubahoDisplacementY);
  imageMode(CENTER);
  image(jubaho_1, jubahoOffsetX, jubahoOffsetY, jubahoWidth, jubahoHeight);
  
  // Debug: titik pivot (berwarna merah)
  fill(255, 0, 0);
  noStroke();
  ellipse(0, 0, 8, 8);
  pop();
  
  // ANIMASI KATANA - rotasi dan pergeseran independen
  push();
  translate(katanaPivotX, katanaPivotY);
  rotate(radians(katanaRotationAngle));
  translate(katanaDisplacementX, katanaDisplacementY);
  imageMode(CENTER);
  image(katana, katanaOffsetX, katanaOffsetY, katanaWidth, katanaHeight);
  
  // Debug: titik pivot (berwarna merah)
  fill(255, 0, 0);
  noStroke();
  ellipse(0, 0, 8, 8);
  pop();
  
  // ANIMASI TANGANO - rotasi dan pergeseran independen
  push();
  translate(handoPivotX, handoPivotY);
  rotate(radians(handoRotationAngle));
  translate(handoDisplacementX, handoDisplacementY);
  imageMode(CENTER);
  image(tangano_1, handoOffsetX, handoOffsetY, handoWidth, handoHeight);
  
  // Debug: titik pivot (berwarna merah)
  fill(255, 0, 0);
  noStroke();
  ellipse(0, 0, 8, 8);
  pop();
  
  
  
  

  
  // Debug info
  fill(0); 
}