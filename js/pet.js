// ============================================
// PET.JS — логика питомца и эволюции
// ============================================

const PET_STAGES = {
  cat: [
    {stage:0, name:"Котёнок Искорка",        icon:"🐱", desc:"Маленький пушистый котёнок с большими глазами", bonus:null},
    {stage:1, name:"Кот-Чародей Мистик",     icon:"🐈", desc:"Грациозный кот в шляпе волшебника",            bonus:"Подсказывает квест для отстающего стата"},
    {stage:2, name:"Звёздный Страж Лунарис", icon:"🦁", desc:"Величественный кот с узорами созвездий",        bonus:"+1 🧠 +1 ✨ пассивно"}
  ],
  dog: [
    {stage:0, name:"Щенок Дружок",           icon:"🐶", desc:"Верный и энергичный щенок",                    bonus:null},
    {stage:1, name:"Пёс-Рыцарь Защитник",    icon:"🐕", desc:"Верный пёс в доспехах",                       bonus:"+10% к квестам 🛡️💪"},
    {stage:2, name:"Золотой Паладин Аврелий", icon:"🐺", desc:"Сияющий страж с золотой гривой",              bonus:"+1 💪 +1 🛡️ пассивно"}
  ],
  dragon: [
    {stage:0, name:"Дракончик Уголёк",       icon:"🐲", desc:"Маленький дракончик, дышит дымком",            bonus:null},
    {stage:1, name:"Дракон-Алхимик Пламя",   icon:"🐉", desc:"Гордый дракон, варит зелья",                   bonus:"Рандомный бонус 1 раз в день"},
    {stage:2, name:"Древний Дракон Эмберия", icon:"🔥", desc:"Легендарный дракон с хрустальными крыльями",   bonus:"+1 ⚡ +1 ❤️ пассивно, +15% монет"}
  ]
};

function getPetStage(profile) {
  const hunger    = profile.petHunger ?? 80;
  const mood      = profile.petMood   ?? 3;
  const canEvolve = hunger >= 70 && mood >= 7;
  if ((profile.level || 1) >= 36 && canEvolve) return 2;
  if ((profile.level || 1) >= 16 && canEvolve) return 1;
  return 0;
}

function getPetStageData(profile) {
  const type   = profile.petType || "cat";
  const stages = PET_STAGES[type] || PET_STAGES.cat;
  const stage  = profile.petStage ?? getPetStage(profile);
  return stages.find(function(s) { return s.stage === stage; }) || stages[0];
}

var evolutionOverlayTimeout = null;

function checkPetEvolution(profile) {
  if (!profile) return;
  const oldStage = profile.petStage ?? 0;
  const newStage = getPetStage(profile);

  if (newStage > oldStage) {
    profile.petStage = newStage;
    if (window.save) window.save();
    showEvolutionOverlay(profile, oldStage, newStage);
  }

  const hintEl = document.getElementById("petEvolutionHint");
  if (!hintEl) return;
  const level  = profile.level  || 1;
  const hunger = profile.petHunger ?? 80;
  const mood   = profile.petMood   ?? 3;
  const stage  = profile.petStage  ?? 0;
  const nearEvo1 = level >= 16 && stage < 1;
  const nearEvo2 = level >= 36 && stage < 2;

  if ((nearEvo1 || nearEvo2) && (hunger < 70 || mood < 7)) {
    hintEl.style.display = "block";
    hintEl.innerHTML =
      "✨ Почти готов к эволюции!<br>" +
      "Сытость: " + hunger + "% " + (hunger >= 70 ? "✅" : "(нужно 70%)") + "<br>" +
      "Настроение: " + mood + "/10 " + (mood >= 7 ? "✅" : "(нужно 7)");
  } else {
    hintEl.style.display = "none";
  }
}

function showEvolutionOverlay(profile, oldStage, newStage) {
  const type   = profile.petType || "cat";
  const stages = PET_STAGES[type] || PET_STAGES.cat;
  const oldS   = stages.find(function(s) { return s.stage === oldStage; }) || stages[0];
  const newS   = stages.find(function(s) { return s.stage === newStage; }) || stages[newStage];
  const el     = document.getElementById("evolutionText");
  if (el) {
    el.innerHTML =
      oldS.icon + " → " + newS.icon + "<br><br>" +
      "<strong>" + oldS.name + "</strong> → <strong>" + newS.name + "</strong><br><br>" +
      newS.desc + "<br><br>" +
      (newS.bonus ? "⭐ Новая способность: " + newS.bonus : "");
  }
  const overlay = document.getElementById("evolutionOverlay");
  if (overlay) overlay.classList.add("overlay--visible");
  if (evolutionOverlayTimeout) clearTimeout(evolutionOverlayTimeout);
  evolutionOverlayTimeout = setTimeout(function() {
    evolutionOverlayTimeout = null;
    if (overlay) overlay.classList.remove("overlay--visible");
  }, 7000);
}

function moodEmoji(v) {
  return v <= 2 ? "😢" : v <= 4 ? "😐" : v <= 7 ? "😊" : "😍";
}
function moodText(v) {
  return v <= 2 ? "Грустит..." : v <= 4 ? "Нормально" : v <= 7 ? "Доволен!" : "В восторге!";
}