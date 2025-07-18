// --- DEKLARASI VARIABEL GLOBAL ---
let hutan, hutan2, tangan_1, jubah_1, kepala_1, kaki_1, kunai_1, tangano_1, kakio_1, kepalao_1, jubaho_1, n_khusus;
let narutoa, obitoa, kunaia2;
let startTime;
let baseAngle = -27;
let animationAngle = 0;
let baseHandAngle = 30;
let baseKunaiAngle = -60;
let baseKatanaAngle = 10;
let specialSceneStartTime = -1;
let v, s;
let vStartTime = -1;
let tahap2StartTime = -1;
let narutoa2, tanga_na2, rasengan;
let tahap3StartTime = -1;
let kyubi;
let tahap4Started = false;
let hutan3, nkunai, opedang;
let backgroundSnapshot;
let snapshotTaken = false;
let narutosound;


// --- FUNGSI PRELOAD ---
function preload() {
    hutan = loadImage("hutan.jpg");
    hutan2 = loadImage("hutan2.jpg");
    narutosound = loadSound('narutosound.mp3');

    n_khusus = loadImage("n_khusus.png");
    tangan_1 = loadImage("tangan-1.png");
    jubah_1 = loadImage("jubah-1.png");
    kepala_1 = loadImage("kepala-1.png");
    kaki_1 = loadImage("kaki-1.png");
    kakikiri_1 = loadImage("kakikiri-1.png");
    kaki_2 = loadImage("kaki-2.png");
    kunai_1 = loadImage("kunai-1.png");

    tangano_1 = loadImage("tangano-1.png");
    kakio_1 = loadImage("kakio-1.png");
    kakio_2 = loadImage("kakio-2.png");
    kepalao_1 = loadImage("kepalao-1.png");
    jubaho_1 = loadImage("jubaho-1.png");

    katana = loadImage("katana.png");
    kunai = loadImage("kunai.png");
    v = loadImage("v.png");
    s = loadImage("s.png");

    // Adegan final Tahap 1
    hutan3 = loadImage("hutan.jpg");
    nkunai = loadImage("nkunai.png");
    opedang = loadImage("opedang.png");
    
    // Adegan Tahap 2
    narutoa = loadImage("narutoa.png");
    obitoa = loadImage("obitoa.png");
    kunaia2 = loadImage("kunaia2.png");
    
    // Adegan Tahap 3
    narutoa2 = loadImage("narutoa2.png");
    tanga_na2 = loadImage("tangana2.png");
    rasengan = loadImage("rasengan.png");
  
    // Adegan Tahap 4
    narutoback = loadImage("narutoback.png");
    kyubi = createVideo("end.mp4");
}

// --- FUNGSI SETUP ---
function setup() {
    createCanvas(640, 400);
    frameRate(30);
    startTime = millis();
    backgroundSnapshot = createGraphics(width, height);
    kyubi.hide();
    narutosound.loop();
}

// --- FUNGSI DRAW UTAMA ---
function draw() {
    const elapsedSeconds = (millis() - startTime) / 1000;
    const inSpecialScene = isInSpecialScene(elapsedSeconds);

    const tahap1_fadeStartTime = 17.7;
    const tahap1_fadeDuration = 1.0;
    const tahap1_delayAfterFade = 1.0;
    const tahap2_TriggerTime = tahap1_fadeStartTime + tahap1_fadeDuration + tahap1_delayAfterFade;

    const tahap2_moveDuration = 5.0;
    const tahap2_endTime = tahap2_TriggerTime + tahap2_moveDuration;
    const tahap2_fadeStartTime = tahap2_endTime;
    const tahap2_fadeDuration = 1.0;
    const tahap2_delayAfterFade = 0;
    const tahap3_TriggerTime = tahap2_fadeStartTime + tahap2_fadeDuration + tahap2_delayAfterFade;
    
    const tahap3_initialAnimDuration = 1.0;
    const tahap3_finalAnimDuration = 0.5;
    const tahap3_totalAnimDuration = tahap3_initialAnimDuration + tahap3_finalAnimDuration;
    const tahap3_animEndTime = tahap3_TriggerTime + tahap3_totalAnimDuration;
    
    // --- PERUBAHAN & PENAMBAHAN DI SINI ---
    const finalFadeStartTime = tahap3_animEndTime; 
    const finalFadeDuration = 1.5;
    const tahap4_TriggerTime = finalFadeStartTime + finalFadeDuration;

    if (elapsedSeconds >= tahap4_TriggerTime) {
      
        // TAHAP 4
        drawTahap4();
    } else if (elapsedSeconds >= finalFadeStartTime) {
        drawTahap3(tahap3_totalAnimDuration);
        let fadeProgress = (elapsedSeconds - finalFadeStartTime) / finalFadeDuration;
        let alpha = constrain(fadeProgress, 0, 1) * 255;
        fill(0, alpha);
        noStroke();
        rect(0, 0, width, height);
      
    } else if (elapsedSeconds >= tahap3_TriggerTime) {
        if (tahap3StartTime < 0) {
            tahap3StartTime = millis();
        }
        const tahap3Elapsed = (millis() - tahap3StartTime) / 1000;
        const initialFadeInDuration = 1.0;
        let initialFadeProgress = constrain(tahap3Elapsed / initialFadeInDuration, 0, 1);
        tint(255, initialFadeProgress * 255);
        drawTahap3(tahap3Elapsed);
        noTint();

    } else if (elapsedSeconds >= tahap2_fadeStartTime) {
        drawTahap2(tahap2_moveDuration);
        let fadeProgress = (elapsedSeconds - tahap2_fadeStartTime) / tahap2_fadeDuration;
        let alpha = constrain(fadeProgress, 0, 1) * 255;
        fill(0, alpha);
        noStroke();
        rect(0, 0, width, height);

    } else if (elapsedSeconds >= tahap2_TriggerTime) {
        // TAHAP 2: Animasi Bergerak
        if (tahap2StartTime < 0) {
            tahap2StartTime = millis();
        }
        const tahap2Elapsed = (millis() - tahap2StartTime) / 1000;
        tint(255, constrain(tahap2Elapsed / 1.0, 0, 1) * 255);
        drawTahap2(tahap2Elapsed);
        noTint();

    } else if (elapsedSeconds >= tahap1_fadeStartTime) {
        // Transisi Gelap dari Tahap 1 ke 2
        drawFinalScene();
        drawVAnimation(elapsedSeconds);
        let fadeProgress = (elapsedSeconds - tahap1_fadeStartTime) / tahap1_fadeDuration;
        let alpha = constrain(fadeProgress, 0, 1) * 255;
        fill(0, alpha);
        noStroke();
        rect(0, 0, width, height);

    } else if (elapsedSeconds >= 16) {
        drawFinalScene();
        drawVAnimation(elapsedSeconds);

    } else if (inSpecialScene) {
        // Adegan Khusus
        drawSpecialScene();

    } else {
        // Adegan Awal
        if (elapsedSeconds >= 9 && !snapshotTaken) {
            drawAnimatedBackground(1);
            backgroundSnapshot.image(get(), 0, 0);
            snapshotTaken = true;
        }
        if (snapshotTaken) {
            image(backgroundSnapshot, 0, 0);
        } else {
            let animProgress = constrain((elapsedSeconds - 8) / 1, 0, 1);
            drawAnimatedBackground(animProgress);
        }
    }
}

// --- FUNGSI GAMBAR TAHAP 2 ---
function drawTahap2(tahap2Elapsed) {
    image(hutan, 0, 0, width, height);
    const moveDuration = 5.0;
    // -------------------------
    let moveProgress = constrain(tahap2Elapsed / moveDuration, 0, 1);
    
    let narutoa_startX = 30;
    let narutoa_endX = 30 + 50;  
    let kunaia2_startX = 250;
    let kunaia2_endX = 250 + 200;
    let obitoa_startX = 350;
    let obitoa_endX = 350 - 50;
    
    let narutoaCurrentX = lerp(narutoa_startX, narutoa_endX, moveProgress);
    let kunaia2CurrentX = lerp(kunaia2_startX, kunaia2_endX, moveProgress);
    let obitoaCurrentX = lerp(obitoa_startX, obitoa_endX, moveProgress);

    image(narutoa, narutoaCurrentX, 150, 250, 300);
    image(kunaia2, kunaia2CurrentX, 250, 110, 100);
    image(obitoa, obitoaCurrentX, 100, 300, 410);
}

// --- FUNGSI GAMBAR TAHAP 3 (DENGAN ANIMASI AKHIR) ---
function drawTahap3(tahap3Elapsed) {
    image(hutan, 0, 0, width, height);
    image(narutoa2, 290, 20, 200, 250);

    // --- Animasi Awal Tahap 3
    const initialAnimDuration = 1.0;
    let initialProgress = constrain(tahap3Elapsed / initialAnimDuration, 0, 1);

    let obitoa_startX = 60;
    let obitoa_endX = 40;
    let obitoaInitialX = lerp(obitoa_startX, obitoa_endX, initialProgress);
    let obitoaInitialY = 140; 
    let tanganAngle = lerp(0, -50, initialProgress);

    const finalAnimDuration = 0.5;
    const finalAnimStartTime = initialAnimDuration;
    let finalAnimProgress = 0;

    if (tahap3Elapsed >= finalAnimStartTime) {
        finalAnimProgress = constrain((tahap3Elapsed - finalAnimStartTime) / finalAnimDuration, 0, 1);
    }
    
    // Animasi Obito terlempar
    let obitoFinalX = lerp(obitoaInitialX, -100, finalAnimProgress);
    let obitoFinalY = lerp(obitoaInitialY, 350, finalAnimProgress);
    image(obitoa, obitoFinalX, obitoFinalY, 400, 200);

    // --- Gambar Tangan & Rasengan ---
    const tanganX = 255;
    const tanganY = 150;
    const tanganLebar = 100;
    const tanganTinggi = 50;
    const pivotX = tanganX + tanganLebar;
    const pivotY = tanganY + (tanganTinggi / 2);

    push();
    translate(pivotX, pivotY);
    rotate(radians(tanganAngle));
    image(tanga_na2, -tanganLebar, -tanganTinggi / 2, tanganLebar, tanganTinggi);
    
    // Animasi Rasengan membesar dan menghilang
    let rasenganSize = lerp(200, 300, finalAnimProgress);
    let rasenganAlpha = lerp(500, 0, finalAnimProgress); 
    
    tint(255, rasenganAlpha);
    imageMode(CENTER);
    image(rasengan, -80, +20, rasenganSize, rasenganSize);
    noTint();
    
    pop();
}

// --- FUNGSI GAMBAR TAHAP 4 ---
function drawTahap4() {
    if (!tahap4Started) {
        kyubi.loop();
      tahap4Started = true;
    }
    image(kyubi, 0, 0, width, height);
}

// --- FUNGSI-FUNGSI LAIN ---
function drawVAnimation(elapsedSeconds) {
    if (elapsedSeconds >= 16 && vStartTime < 0) {
        vStartTime = millis();
    }
    push();
    if (vStartTime > 0) {
        const vElapsed = (millis() - vStartTime) / 1000;
        const vDuration = 0.7;
        const progress = min(vElapsed / vDuration, 1);
        const offset = 5;
        let vPosX = width / 2 - offset;
        let vPosY = -100 + progress * 300;
        let sPosX = width / 2 + offset;
        let sPosY = height + 100 - progress * 300;
        const alpha = progress * 255;
        tint(255, alpha);
        imageMode(CENTER);
        image(v, vPosX, vPosY, 100, 100);
        image(s, sPosX, sPosY, 100, 100);
        noTint();
    }
    pop();
}
function drawFinalScene() {
    image(hutan3, 0, 0, width, height);
    image(nkunai, 50, 120, 150, 300);
    image(opedang, 390, 130, 180, 310);
}
function isInSpecialScene(elapsedSeconds) {
    if (elapsedSeconds >= 11 && specialSceneStartTime < 0) {
        specialSceneStartTime = millis();
    }
    if (specialSceneStartTime > 0) {
        const specialSceneElapsed = (millis() - specialSceneStartTime) / 1000;
        return specialSceneElapsed < 5;
    }
    return false;
}
function drawSpecialScene() {
    background(200);
    image(hutan2, 0, 0, width, height);
    const narutoX = 155;
    const narutoY = 88;
    image(n_khusus, narutoX, narutoY, 260, 520);
    fill(255, 0, 0);
}
function drawAnimatedBackground(animProgress) {
    image(hutan, 0, 0, width, height);
    animationAngle = animProgress * 15;
    const totalAngle = baseAngle + animationAngle;
    const displacementMagnitude = animProgress * 20;
    const radiansAngle = radians(totalAngle);
    const displacementX = cos(radiansAngle) * displacementMagnitude;
    const displacementY = sin(radiansAngle) * displacementMagnitude;
    const headRotationAngle = -9 * animProgress;
    const headDisplacementX = -5 * animProgress;
    const headDisplacementY = 9 * animProgress;
    const headPivotX = 90;
    const headPivotY = 200;
    const kunaiAnimationAngle = -45 * animProgress;
    const totalKunaiRotation = baseKunaiAngle + kunaiAnimationAngle;
    const kunaiDisplacementX = -10 * animProgress;
    const kunaiDisplacementY = -2 * animProgress;
    const kunaiPivotX = 95;
    const kunaiPivotY = 275;
    const handAnimationAngle = -45 * animProgress;
    const totalHandRotation = baseHandAngle + handAnimationAngle;
    const handDisplacementX = -5 * animProgress;
    const handDisplacementY = 10 * animProgress;
    const handPivotX = 95;
    const handPivotY = 275;
    const kickRotationAngle = 45 * animProgress;
    const kickDisplacementX = -5 * animProgress;
    const kickDisplacementY = -4 * animProgress;
    const kickPivotX = 95;
    const kickPivotY = 290;
    const headInitialX = 36;
    const headInitialY = 136;
    const headWidth = 100;
    const headHeight = 200;
    const headOffsetX = headInitialX - headPivotX + headWidth / 2;
    const headOffsetY = headInitialY - headPivotY + headHeight / 2;
    const kunaiInitialX = 50;
    const kunaiInitialY = 288;
    const kunaiWidth = 35;
    const kunaiHeight = 70;
    const kunaiOffsetX = kunaiInitialX - kunaiPivotX + kunaiWidth / 2;
    const kunaiOffsetY = kunaiInitialY - kunaiPivotY + kunaiHeight / 2;
    const handInitialX = 50;
    const handInitialY = 140;
    const handWidth = 100;
    const handHeight = 200;
    const handOffsetX = handInitialX - handPivotX + handWidth / 2;
    const handOffsetY = handInitialY - handPivotY + handHeight / 2;
    const kickInitialX = 45;
    const kickInitialY = 152;
    const kickWidth = 100;
    const kickHeight = 200;
    const kickOffsetX = kickInitialX - kickPivotX + kickWidth / 2;
    const kickOffsetY = kickInitialY - kickPivotY + kickHeight / 2;
    image(kaki_2, 60, 140, 100, 200);
    image(kaki_1, 45, 151, 100, 200);
    image(kunai_1, 45, 135, 100, 200);
    push();
    translate(headPivotX, headPivotY);
    rotate(radians(headRotationAngle));
    translate(headDisplacementX, headDisplacementY);
    imageMode(CENTER);
    image(kepala_1, headOffsetX, headOffsetY, headWidth, headHeight);
    pop();
    push();
    translate(kickPivotX, kickPivotY);
    rotate(radians(kickRotationAngle));
    translate(kickDisplacementX, kickDisplacementY);
    imageMode(CENTER);
    image(kakikiri_1, kickOffsetX, kickOffsetY, kickWidth, handHeight);
    pop();
    push();
    translate(65, 235);
    rotate(radians(totalAngle));
    translate(displacementX, displacementY);
    imageMode(CENTER);
    image(jubah_1, 5, 20, 100, 200);
    pop();
    push();
    translate(kunaiPivotX, kunaiPivotY);
    rotate(radians(totalKunaiRotation));
    translate(kunaiDisplacementX, kunaiDisplacementY);
    imageMode(CENTER);
    image(kunai, kunaiOffsetX, kunaiOffsetY, kunaiWidth, kunaiHeight);
    pop();
    push();
    translate(handPivotX, handPivotY);
    rotate(radians(totalHandRotation));
    translate(handDisplacementX, handDisplacementY);
    imageMode(CENTER);
    image(tangan_1, handOffsetX, handOffsetY, handWidth, handHeight);
    pop();
    const headoRotationAngle = -9 * animProgress;
    const headoDisplacementX = -20 * animProgress;
    const headoDisplacementY = 1 * animProgress;
    const headoPivotX = 550;
    const headoPivotY = 220;
    const kickoRotationAngle = -1 * animProgress;
    const kickoDisplacementX = -5 * animProgress;
    const kickoDisplacementY = -2 * animProgress;
    const kickoPivotX = 550;
    const kickoPivotY = 300;
    const kicko2RotationAngle = -30 * animProgress;
    const kicko2DisplacementX = 15 * animProgress;
    const kicko2DisplacementY = -1 * animProgress;
    const kicko2PivotX = 550;
    const kicko2PivotY = 300;
    const jubahoRotationAngle = -20 * animProgress;
    const jubahoDisplacementX = -15 * animProgress;
    const jubahoDisplacementY = -5 * animProgress;
    const jubahoPivotX = 550;
    const jubahoPivotY = 250;
    const katanaAnimationAngle = 55 * animProgress;
    const katanaRotationAngle = baseKatanaAngle + katanaAnimationAngle;
    const katanaDisplacementX = -10 * animProgress;
    const katanaDisplacementY = 20 * animProgress;
    const katanaPivotX = 550;
    const katanaPivotY = 250;
    const handoRotationAngle = 55 * animProgress;
    const handoDisplacementX = -10 * animProgress;
    const handoDisplacementY = 20 * animProgress;
    const handoPivotX = 550;
    const handoPivotY = 250;
    const headoInitialX = 500;
    const headoInitialY = 140;
    const headoWidth = 100;
    const headoHeight = 200;
    const headoOffsetX = headoInitialX - headoPivotX + headoWidth / 2;
    const headoOffsetY = headoInitialY - headoPivotY + headoHeight / 2;
    const kickoInitialX = 500;
    const kickoInitialY = 140;
    const kickoWidth = 100;
    const kickoHeight = 200;
    const kickoOffsetX = kickoInitialX - kickoPivotX + kickoWidth / 2;
    const kickoOffsetY = kickoInitialY - kickoPivotY + kickoHeight / 2;
    const kicko2InitialX = 500;
    const kicko2InitialY = 140;
    const kicko2Width = 100;
    const kicko2Height = 200;
    const kicko2OffsetX = kicko2InitialX - kicko2PivotX + kicko2Width / 2;
    const kicko2OffsetY = kicko2InitialY - kicko2PivotY + kicko2Height / 2;
    const jubahoInitialX = 500;
    const jubahoInitialY = 140;
    const jubahoWidth = 100;
    const jubahoHeight = 200;
    const jubahoOffsetX = jubahoInitialX - jubahoPivotX + jubahoWidth / 2;
    const jubahoOffsetY = jubahoInitialY - jubahoPivotY + jubahoHeight / 2;
    const katanaInitialX = 530;
    const katanaInitialY = 273;
    const katanaWidth = 40;
    const katanaHeight = 80;
    const katanaOffsetX = katanaInitialX - katanaPivotX + katanaWidth / 2;
    const katanaOffsetY = katanaInitialY - katanaPivotY + katanaHeight / 2;
    const handoInitialX = 500;
    const handoInitialY = 140;
    const handoWidth = 100;
    const handoHeight = 200;
    const handoOffsetX = handoInitialX - handoPivotX + handoWidth / 2;
    const handoOffsetY = handoInitialY - handoPivotY + handoHeight / 2;
    push();
    translate(headoPivotX, headoPivotY);
    rotate(radians(headoRotationAngle));
    translate(headoDisplacementX, headoDisplacementY);
    imageMode(CENTER);
    image(kepalao_1, headoOffsetX, headoOffsetY, headoWidth, headoHeight);
    pop();
    push();
    translate(kickoPivotX, kickoPivotY);
    rotate(radians(kickoRotationAngle));
    translate(kickoDisplacementX, kickoDisplacementY);
    imageMode(CENTER);
    image(kakio_1, kickoOffsetX, kickoOffsetY, kickoWidth, kickoHeight);
    pop();
    push();
    translate(kicko2PivotX, kicko2PivotY);
    rotate(radians(kicko2RotationAngle));
    translate(kicko2DisplacementX, kicko2DisplacementY);
    imageMode(CENTER);
    image(kakio_2, kicko2OffsetX, kicko2OffsetY, kicko2Width, kicko2Height);
    pop();
    push();
    translate(jubahoPivotX, jubahoPivotY);
    rotate(radians(jubahoRotationAngle));
    translate(jubahoDisplacementX, jubahoDisplacementY);
    imageMode(CENTER);
    image(jubaho_1, jubahoOffsetX, jubahoOffsetY, jubahoWidth, jubahoHeight);
    pop();
    push();
    translate(katanaPivotX, katanaPivotY);
    rotate(radians(katanaRotationAngle));
    translate(katanaDisplacementX, katanaDisplacementY);
    imageMode(CENTER);
    image(katana, katanaOffsetX, katanaOffsetY, katanaWidth, katanaHeight);
    pop();
    push();
    translate(handoPivotX, handoPivotY);
    rotate(radians(handoRotationAngle));
    translate(handoDisplacementX, handoDisplacementY);
    imageMode(CENTER);
    image(tangano_1, handoOffsetX, handoOffsetY, handoWidth, handoHeight);
    pop();
}