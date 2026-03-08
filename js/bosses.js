// ============================================
// BOSSES.JS — данные и логика боссов HeroLife
// ============================================

var BOSSES = [
  {
    id: 1,
    emoji: "🌫️",
    name: "Туманный Сомнамбул",
    region: "Туманные болота",
    levelRequired: 5,
    requirements: { energy: 12, discipline: 8 },
    story: "Существо из тумана. Люди в его власти ходят с открытыми глазами, но спят. Делают одно и то же каждый день, не замечая жизни вокруг.",
    victoryText: "Туман рассеивается. Мир яркий, живой. Впервые ты чувствуешь, что по-настоящему {проснулась|проснулся}.",
    defeatText: "Туман густеет. Нужно больше энергии и дисциплины, чтобы пробиться сквозь него.",
    reward: { title: "{Пробудившаяся|Пробудившийся}", coins: 50, special: null },
    defeated: false
  },
  {
    id: 2,
    emoji: "❄️",
    name: "Кристальная Прокрастинация",
    region: "Ледяная цитадель",
    levelRequired: 12,
    requirements: { discipline: 20, intelligence: 15, strength: 10 },
    story: "Ледяная фигура, которая замораживает дела, планы и мечты. Шепчет: не сейчас, подожди ещё немного.",
    victoryText: "Лёд трескается. Под ним зелёная трава. Начать было совсем не так страшно, как казалось.",
    defeatText: "Лёд держит крепко. Прокачай дисциплину, интеллект и силу, чтобы растопить его.",
    reward: { title: "{Сокрушительница|Сокрушитель} Льда", coins: 75, special: null },
    defeated: false
  },
  {
    id: 3,
    emoji: "🌑",
    name: "Тень Усталости",
    region: "Сумеречный лес",
    levelRequired: 20,
    requirements: { health: 25, energy: 25, charisma: 15 },
    story: "Фигура без лица, которая не атакует, а забирает. Цвета тускнеют, еда теряет вкус, музыка замолкает. Это не лень — это истощение.",
    victoryText: "Мир обретает цвет. Пение птиц. Запах кофе. Мелочи, из которых состоит настоящая жизнь.",
    defeatText: "Тень накрывает. Позаботься о здоровье и энергии — ты заслуживаешь отдыха.",
    reward: { title: "{Познавшая|Познавший} Тишину", coins: 100, special: "День отдыха — раз в неделю пропуск без потери streak" },
    defeated: false
  },
  {
    id: 4,
    emoji: "🕸️",
    name: "Паутина Сомнений",
    region: "Паутинные пещеры",
    levelRequired: 28,
    requirements: { strength: 25, discipline: 24, intelligence: 22 },
    story: "Паучиха плетёт паутину из мыслей «а что если». Чем больше думаешь, тем гуще сеть. Анализ превращается в паралич.",
    victoryText: "Нити тоньше, чем казалось. Оказывается, нужно было просто сделать первый шаг.",
    defeatText: "Паутина держит. Развивай силу, дисциплину и интеллект, чтобы разорвать сомнения.",
    reward: { title: "{Разрубившая|Разрубивший} Узел", coins: 100, special: null },
    defeated: false
  },
  {
    id: 5,
    emoji: "🔮",
    name: "Зеркальная Самозванка",
    region: "Зеркальный лабиринт",
    levelRequired: 35,
    requirements: { charisma: 22, health: 18, intelligence: 18 },
    story: "Твоя копия говорит твоим голосом. Тебе просто повезло — скоро все поймут, что ты {самозванка|самозванец}. Ты {слышала|слышал} этот голос раньше?",
    victoryText: "Зеркала трескаются. Самозванка улыбается — наконец ты {поверила|поверил} в себя. Она была только отражением страха.",
    defeatText: "Отражения множатся. Прокачай харизму, здоровье и интеллект — поверь в себя.",
    reward: { title: "{Подлинная|Подлинный}", coins: 125, special: "уникальная рамка аватара" },
    defeated: false
  },
  {
    id: 6,
    emoji: "💔",
    name: "Хранитель Стены",
    region: "Каменная крепость",
    levelRequired: 42,
    requirements: { charisma: 26, health: 28, strength: 20 },
    story: "Каменный голем построил стену вокруг сердца. Думает, что защищает. Но за стеной одиноко, и никто не может войти.",
    victoryText: "За стеной — сад. Он рос в темноте всё это время. Жажда близости оказалась сильнее любой стены.",
    defeatText: "Стена стоит. Развивай харизму, здоровье и силу, чтобы открыть сердце.",
    reward: { title: "Открытое Сердце", coins: 150, special: null },
    defeated: false
  },
  {
    id: 7,
    emoji: "👑",
    name: "Серая Королева",
    region: "Серый замок",
    levelRequired: 50,
    requirements: { health: 30, intelligence: 30, strength: 30, charisma: 30, discipline: 30, energy: 30 },
    story: "Она была такой же, как ты. {Хотела|Хотел} меняться и {меняла|менял}. Потом {устала|устал} и {решила|решил}, что ничего не имеет смысла. Серая Королева — это ты через 10 лет, если сдашься.",
    victoryText: {
      angel: "Ты садишься рядом с ней. Показываешь свой путь. Она плачет и берёт твою руку. Королевство спасено светом.",
      devil: "Ты смотришь ей в глаза. Этот трон — мой. Она отступает. Королевство под твоей властью.",
      balance: "Вы смотрите друг на друга. Мы будем править вместе. Королевство обретает баланс."
    },
    defeatText: "Она смотрит устало. Ещё не время. Прокачай все статы до 30 и вернись.",
    reward: {
      titleByAlignment: true,
      titleAngel: "{Светлая Правительница|Светлый Правитель}",
      titleDevil: "{Тёмная Властительница|Тёмный Властитель}",
      titleBalance: "{Хранительница|Хранитель} Баланса",
      coins: 500,
      special: "финальный экран"
    },
    defeated: false
  }
];

/**
 * Возвращает статус босса для данного профиля.
 * @param {number} bossId - id босса (1-7)
 * @param {Object} profile - профиль игрока (P)
 * @returns {Object} { canFight, missingStats, isClose, isDefeated }
 */
function getBossStatus(bossId, profile) {
  var boss = BOSSES.find(function(b) { return b.id === bossId; });
  if (!boss) {
    return { canFight: false, missingStats: [], isClose: false, isDefeated: false };
  }

  var defeatedBosses = profile.defeatedBosses || [];
  var isDefeated = defeatedBosses.indexOf(bossId) !== -1;
  if (isDefeated) {
    return { canFight: false, missingStats: [], isClose: false, isDefeated: true };
  }

  var level = profile.level || 1;
  if (level < boss.levelRequired) {
    return {
      canFight: false,
      missingStats: [],
      isClose: false,
      isDefeated: false
    };
  }

  var stats = profile.stats || {};
  var missingStats = [];
  var deficitSum = 0;

  for (var stat in boss.requirements) {
    var current = stats[stat] || 0;
    var required = boss.requirements[stat];
    if (current < required) {
      missingStats.push({ stat: stat, current: current, required: required });
      deficitSum += required - current;
    }
  }

  var canFight = missingStats.length === 0;
  var isClose = deficitSum > 0 && deficitSum < 5;

  return {
    canFight: canFight,
    missingStats: missingStats,
    isClose: isClose,
    isDefeated: false
  };
}

/**
 * Получить награду босса с учётом варианта для босса 7 (по шкале ангел/дьявол).
 */
function getBossReward(boss, profile) {
  var r = boss.reward;
  if (boss.id === 7 && r.titleByAlignment) {
    var angel = profile.angelPoints || 0;
    var devil = profile.devilPoints || 0;
    var diff = angel - devil;
    var title, victoryText;
    if (diff > 100) {
      title = r.titleAngel;
      victoryText = boss.victoryText.angel;
    } else if (devil - angel > 100) {
      title = r.titleDevil;
      victoryText = boss.victoryText.devil;
    } else {
      title = r.titleBalance;
      victoryText = boss.victoryText.balance;
    }
    title = typeof window.applyGender === "function" ? window.applyGender(title) : title;
    victoryText = typeof window.applyGender === "function" ? window.applyGender(victoryText) : victoryText;
    return { title: title, coins: r.coins, special: r.special, victoryText: victoryText };
  }
  var result = {
    title: typeof window.applyGender === "function" ? window.applyGender(r.title || "") : (r.title || ""),
    coins: r.coins,
    special: r.special,
    victoryText: typeof boss.victoryText === "string"
      ? (typeof window.applyGender === "function" ? window.applyGender(boss.victoryText) : boss.victoryText)
      : (typeof window.applyGender === "function" ? window.applyGender(boss.victoryText.balance) : boss.victoryText.balance)
  };
  return result;
}

/**
 * Победа над боссом: отмечает в профиле, начисляет награду, сохраняет.
 * @param {number} bossId - id босса (1-7)
 * @param {Object} profile - профиль игрока (P)
 */
function defeatBoss(bossId, profile) {
  var boss = BOSSES.find(function(b) { return b.id === bossId; });
  if (!boss) return;

  var reward = getBossReward(boss, profile);

  if (!profile.defeatedBosses) profile.defeatedBosses = [];
  if (profile.defeatedBosses.indexOf(bossId) === -1) {
    profile.defeatedBosses.push(bossId);
  }

  profile.coins = (profile.coins || 0) + reward.coins;
  profile.title = typeof window.applyGender === "function" ? window.applyGender(reward.title || "") : (reward.title || "");

  if (reward.special) {
    if (bossId === 3) {
      profile.restDayPerWeek = true;
    } else if (bossId === 5) {
      profile.hasAvatarFrame = true;
    } else if (bossId === 7) {
      profile.finalBossDefeated = true;
    }
  }

  if (typeof window.save === "function") window.save();
  if (typeof window.render === "function") window.render();
}

var STAT_ICONS_BOSS = { health: "❤️", intelligence: "🧠", strength: "💪", charisma: "✨", discipline: "🛡️", energy: "⚡" };

function buildBossList() {
  var profile = typeof window.getP === "function" ? window.getP() : null;
  if (!profile) return;

  var listEl = document.getElementById("bossList");
  if (!listEl) return;
  listEl.innerHTML = "";

  var defeated = profile.defeatedBosses || [];
  var level = profile.level || 1;
  var stats = profile.stats || {};

  BOSSES.forEach(function(boss) {
    var isDefeated = defeated.indexOf(boss.id) !== -1;
    var prevBoss = BOSSES.find(function(b) { return b.id === boss.id - 1; });
    var prevDefeated = !prevBoss || defeated.indexOf(prevBoss.id) !== -1;
    var levelOk = level >= boss.levelRequired;
    var isLocked = !isDefeated && (!levelOk || !prevDefeated);
    var isAvailable = !isDefeated && !isLocked;

    var card = document.createElement("div");
    card.className = "boss-card";
    if (isDefeated) card.classList.add("boss-card--defeated");
    if (isLocked) card.classList.add("boss-card--locked");
    if (isAvailable) card.classList.add("boss-card--available");

    var statusText = isDefeated ? "✅ Побеждён" : isLocked ? "🔒 Нужен уровень " + boss.levelRequired : "⚔️ Доступен";
    var reqParts = [];
    for (var s in boss.requirements) {
      reqParts.push((STAT_ICONS_BOSS[s] || s) + boss.requirements[s]);
    }
    var reqStr = reqParts.join(" ");

    card.innerHTML =
      "<div class=\"boss-card-title\">" + boss.emoji + " " + boss.name + "</div>" +
      "<div class=\"boss-card-region\">" + boss.region + "</div>" +
      "<div class=\"boss-card-status\">" + statusText + "</div>" +
      "<div class=\"boss-card-reqs\">" + reqStr + "</div>";

    if (!isLocked) {
      card.style.cursor = "pointer";
      card.addEventListener("click", function() { showBossDetail(boss.id); });
    }
    listEl.appendChild(card);
  });
}

function showBossDetail(bossId) {
  var boss = BOSSES.find(function(b) { return b.id === bossId; });
  if (!boss) return;
  var profile = typeof window.getP === "function" ? window.getP() : null;
  if (!profile) return;

  var status = getBossStatus(bossId, profile);
  var listEl = document.getElementById("bossList");
  var detailEl = document.getElementById("bossDetail");
  if (!listEl || !detailEl) return;

  listEl.style.display = "none";
  detailEl.style.display = "block";

  var stats = profile.stats || {};
  var reqsHtml = "";
  for (var stat in boss.requirements) {
    var cur = stats[stat] || 0;
    var need = boss.requirements[stat];
    var ok = cur >= need;
    var icon = STAT_ICONS_BOSS[stat] || stat;
    reqsHtml += "<div class=\"boss-detail-stat " + (ok ? "boss-detail-stat--ok" : "boss-detail-stat--fail") + "\">" +
      icon + " " + cur + " / " + need + "</div>";
  }

  var btnHtml = "";
  var btnExtra = "";
  if (status.isDefeated) {
    btnHtml = "<button type=\"button\" class=\"boss-detail-btn boss-detail-btn--disabled\" disabled>✅ Уже побеждён</button>";
  } else if (status.canFight) {
    btnHtml = "<button type=\"button\" class=\"boss-detail-btn boss-detail-btn--fight\" data-boss-id=\"" + bossId + "\">⚔️ Вступить в бой!</button>";
  } else if (status.isClose) {
    btnHtml = "<button type=\"button\" class=\"boss-detail-btn boss-detail-btn--hard\" data-boss-id=\"" + bossId + "\" data-hard=\"1\">⚡ Попробовать (сложнее)</button>";
  } else {
    btnHtml = "<button type=\"button\" class=\"boss-detail-btn boss-detail-btn--disabled\" disabled>🔒 Прокачай статы</button>";
    if (status.missingStats && status.missingStats.length) {
      var parts = status.missingStats.map(function(m) {
        return (STAT_ICONS_BOSS[m.stat] || m.stat) + " " + m.current + "→" + m.required;
      });
      btnExtra = "<div class=\"boss-detail-missing\">" + parts.join(", ") + "</div>";
    }
  }

  detailEl.innerHTML =
    "<button type=\"button\" class=\"boss-detail-back\" id=\"bossDetailBackBtn\">← Назад</button>" +
    "<div class=\"boss-detail-emoji\">" + boss.emoji + "</div>" +
    "<div class=\"boss-detail-name\">" + boss.name + "</div>" +
    "<div class=\"boss-detail-story\">" + boss.story + "</div>" +
    "<div class=\"boss-detail-reqs\">" + reqsHtml + "</div>" +
    "<div class=\"boss-detail-actions\">" + btnHtml + btnExtra + "</div>";

  detailEl.dataset.currentBossId = bossId;

  document.getElementById("bossDetailBackBtn").addEventListener("click", function() {
    listEl.style.display = "";
    detailEl.style.display = "none";
  });

  var fightBtn = detailEl.querySelector(".boss-detail-btn--fight, .boss-detail-btn--hard");
  if (fightBtn) {
    fightBtn.addEventListener("click", function() {
      var hard = this.getAttribute("data-hard") === "1";
      startBossFight(parseInt(this.dataset.bossId, 10), hard);
    });
  }
}

function startBossFight(bossId, isHard) {
  var profile = typeof window.getP === "function" ? window.getP() : null;
  if (!profile) return;
  var boss = BOSSES.find(function(b) { return b.id === bossId; });
  if (!boss) return;

  var isVictory;
  if (isHard) {
    isVictory = Math.random() > 0.5;
  } else {
    isVictory = true;
  }
  bossFightResult(bossId, isVictory);
}

function bossFightResult(bossId, isVictory) {
  var profile = typeof window.getP === "function" ? window.getP() : null;
  if (!profile) return;
  var boss = BOSSES.find(function(b) { return b.id === bossId; });
  if (!boss) return;

  var detailEl = document.getElementById("bossDetail");
  if (!detailEl) return;

  var victoryText = "";
  var defeatText = typeof boss.defeatText === "string" ? boss.defeatText : boss.defeatText;

  if (isVictory) {
    defeatBoss(bossId, profile);
    var reward = getBossReward(boss, profile);
    victoryText = reward.victoryText || (typeof boss.victoryText === "string" ? boss.victoryText : boss.victoryText.balance);
    victoryText = typeof window.applyGender === "function" ? window.applyGender(victoryText) : victoryText;
    var rewardTitle = typeof window.applyGender === "function" ? window.applyGender(reward.title || "") : (reward.title || "");
    detailEl.innerHTML =
      "<button type=\"button\" class=\"boss-detail-back\" id=\"bossDetailBackBtn\">← Назад</button>" +
      "<div class=\"boss-detail-emoji\">" + boss.emoji + "</div>" +
      "<div class=\"boss-result-title\">Победа!</div>" +
      "<div class=\"boss-detail-story boss-result-text\">" + victoryText + "</div>" +
      "<div class=\"boss-detail-reward\">Титул: " + rewardTitle + ", +" + (reward.coins || 0) + " 💰</div>" +
      "<button type=\"button\" class=\"boss-detail-btn\" id=\"bossResultBackBtn\">← Вернуться к карте</button>";
  } else {
    detailEl.innerHTML =
      "<button type=\"button\" class=\"boss-detail-back\" id=\"bossDetailBackBtn\">← Назад</button>" +
      "<div class=\"boss-detail-emoji\">" + boss.emoji + "</div>" +
      "<div class=\"boss-result-title boss-result-title--defeat\">Поражение</div>" +
      "<div class=\"boss-detail-story boss-result-text\">" + defeatText + "</div>" +
      "<button type=\"button\" class=\"boss-detail-btn\" id=\"bossResultBackBtn\">← Вернуться к карте</button>";
  }

  document.getElementById("bossDetailBackBtn").addEventListener("click", function() {
    var listEl = document.getElementById("bossList");
    if (listEl) listEl.style.display = "";
    detailEl.style.display = "none";
  });
  var backBtn = document.getElementById("bossResultBackBtn");
  if (backBtn) {
    backBtn.addEventListener("click", function() {
      var listEl = document.getElementById("bossList");
      if (listEl) listEl.style.display = "";
      detailEl.style.display = "none";
    });
  }
}
