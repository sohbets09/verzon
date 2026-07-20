
function createPoem() {
  const name = document.getElementById("name").value.trim();
  const lang = document.getElementById("language").value;
  const poemBox = document.getElementById("poem-box");

  if (!name) {
    alert("Lütfen isim girin.");
    return;
  }

  const poems = {
    tr: `Sevgili ${name},

Senin adını her sabah kalbime fısıldıyor rüzgar.  
Bir gülüşünle başlıyor içimdeki bahar.  
Adını yıldızlara yazdım, her gece seni anlatıyorlar.  
Seninle geçen her saniye, sonsuzluğun kendisi kadar anlamlı.

Kalbimde açan en özel çiçeksin sen.  
Varlığınla hayat daha güzel, daha renkli.  
Sana yazdığım her mısra, sonsuz sevgimin sesi.  
Seninle yaşlanmak, en güzel hayalim…

Birlikte yürüdüğümüz yolların her adımında seni hissettim.  
Sessizliğin bile huzur veriyor bana, sesinden önce.  
Gözlerinde kaybolmak, bir ömrün en güzel kayboluşu olurdu.  
Ben seni, zamanın ötesinde bile seveceğim.`,
    en: `Dear ${name},

Every morning the wind whispers your name into my heart.  
With just your smile, my spring begins.  
I wrote your name in the stars, they tell stories of you each night.  
Every second with you feels like eternity.

You're the most beautiful flower blooming in my heart.  
With you, life is more colorful and full of meaning.  
Every line I write for you is a voice of my endless love.  
To grow old with you is my most precious dream.

In every step we walk together, I feel you beside me.  
Even your silence comforts me before your words.  
To be lost in your eyes is the sweetest kind of lost.  
I will love you beyond time itself.`,
    ru: `Дорогой(ая) ${name},

Каждое утро ветер шепчет твоё имя моему сердцу.  
С твоей улыбкой приходит весна в мою душу.  
Я написал(а) твоё имя на звёздах — они рассказывают о тебе каждую ночь.  
С тобой каждая секунда — как вечность.

Ты — самый прекрасный цветок в моем сердце.  
С тобой жизнь становится ярче, насыщеннее.  
Каждая строка — это голос моей бесконечной любви.  
Состариться с тобой — моя заветная мечта.

В каждом шаге рядом с тобой я чувствую твое тепло.  
Даже твоя тишина приносит покой моему сердцу.  
Потеряться в твоих глазах — лучшее приключение.  
Я буду любить тебя вне времени.`,
    tm: `Eziz ${name},

Her ertir ýüregime adyňy şemal aýdýar.  
Gülüşiň bilen bahar başlaýar içimde.  
Adyňy ýyldyzlara ýazdym — her gije senden gürrüň berýärler.  
Seniň bilen geçýän her pursat — ebedilik ýaly.

Kalbimde açan iň owadan güldürsen.  
Seniň bilen durmuş reňkli, lezzetli bolýar.  
Saňa ýazýan her setir — söýgümiň owazy.  
Seniň bilen garry günde ýaşamak — arzuwym.

Bilelikde ýörän her ädimimde seni duýdum.  
Dilegleriň sessizligi hem kalbymy rahatlandyrýar.  
Gözleriňde ýitmek — ýaşaýyşdaky iň owadan ýitmekdir.  
Men seni wagtyň ötesinde-de söýerin.`
  };

  poemBox.innerText = poems[lang];
  poemBox.style.display = 'block';
}

 {
  const selected = document.getElementById("theme").value;
  const style = document.getElementById("theme-style");

  if (selected === 'pink') {
    style.innerHTML = "body { background: #fff0f5; color: #660033; }";
  } else if (selected === 'dark') {
    style.innerHTML = `
      body { background: #1a1a1a; color: #f0f0f0; }
      .container { background: #2b2b2b; box-shadow: 0 0 20px rgba(255,255,255,0.1); }
      button { background: #bb3974; color: white; }
      #poem-box { background: #3a3a3a; padding: 15px; border-radius: 10px; border: 1px solid #555; }
    `;
    style.innerHTML = "body { background: #1a1a1a; color: #f0f0f0; }";
  } else if (selected === 'hearts') {
    style.innerHTML = "body { background: url('https://www.transparenttextures.com/patterns/hearts.png'), #ffe6eb; color: #8b0035; }";
  }
}

