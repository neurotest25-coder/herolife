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
      angel: "Ты садишься рядом с ней. Показываешь свой путь созидания. Она плачет и берёт твою руку. Королевство расцветает.",
      devil: "Ты смотришь ей в глаза — в них твоя воля и сила. Этот трон — мой. Она отступает. Королевство под твоей властью.",
      balance: "Вы смотрите друг на друга. Мы будем править вместе. Королевство обретает баланс."
    },
    defeatText: "Она смотрит устало. Ещё не время. Прокачай все статы до 30 и вернись.",
    reward: {
      titleByAlignment: true,
      titleAngel: "{Созидательница|Созидатель} Королевства",
      titleDevil: "{Воительница|Воитель} Воли",
      titleBalance: "{Хранительница|Хранитель} Баланса",
      coins: 500,
      special: "финальный экран"
    },
    defeated: false
  }
];

// ── НАРРАТИВ ПОСЛЕ ПОБЕДЫ НАД БОССАМИ ──────
var BOSS_NARRATIVES = {
  1: [
    {
      emoji: "🌅",
      text: "Туман рассеялся.\n\nВпервые за долгое время\nты видишь королевство ясно.\nХолмы, леса, далёкие башни.\n\nОказывается, мир вокруг\nвсегда был таким красивым."
    },
    {
      emoji: "🐱",
      text: "{petName} принюхивается к свежему воздуху.\n\nКажется, ему тоже нравится\nмир без тумана.\n\nОн смотрит на тебя и мурлычет.\nЭто его способ сказать: «Идём дальше»."
    },
    {
      emoji: "💫",
      text: "Но на горизонте — что-то блестит.\n\nЛедяная крепость.\nГоворят, там живёт тот,\nкто заставляет откладывать всё на потом.\n\nКристальная Прокрастинация ждёт."
    },
    {
      emoji: "✨",
      title: "Победа!",
      text: "Ты {победила|победил} своего первого врага.\n\nТитул получен: {Пробудившаяся|Пробудившийся}\n\nЭто только начало.\nНо какое начало."
    }
  ],
  2: [
    {
      emoji: "💎",
      text: "Лёд треснул. Крепость осыпается.\n\nВсе те дела, что были заморожены —\nначинают оттаивать.\n\nТы чувствуешь это?\nЛёгкость. Движение. Свобода начинать."
    },
    {
      emoji: "🐱",
      text: "{petName} поймал осколок льда.\n\nИграет с ним, подбрасывает лапой.\nДаже лёд может стать игрушкой,\nесли ты {победила|победил} того,\nкто его создал."
    },
    {
      emoji: "🌑",
      text: "Дальше на пути — Долина Усталости.\n\nТам всегда сумерки.\nТам живёт Тень, которая шепчет:\n«Ты {устала|устал}. Остановись. Не надо.»\n\nНо ты уже знаешь:\nотдых и сдача — разные вещи."
    },
    {
      emoji: "✨",
      title: "Победа!",
      text: "Ледяная крепость пала.\n\nТитул получен: {Сокрушительница|Сокрушитель} Льда\n\nТы умеешь начинать.\nТеперь научишься отдыхать."
    }
  ],
  3: [
    {
      emoji: "🌙",
      text: "Тень растворилась в лунном свете.\n\nТы {поняла|понял} главное:\nотдых — не слабость.\nОтдых — это часть пути.\n\nДолина наполнилась тёплым светом."
    },
    {
      emoji: "🐱",
      text: "{petName} свернулся клубком рядом.\n\nОн уже давно это знал.\nОтдыхать — нормально.\nСпать — важно.\nПросто быть — достаточно."
    },
    {
      emoji: "🕸️",
      text: "Но впереди — Лес Сомнений.\n\nТам паутина из мыслей:\n«А вдруг не получится?»\n«А что подумают другие?»\n«А может не стоит?»\n\nПаутина Сомнений ткёт свои нити\nкаждую ночь. Но ты уже не та."
    },
    {
      emoji: "✨",
      title: "Победа!",
      text: "Долина Усталости освобождена.\n\nТитул получен: {Познавшая|Познавший} Тишину\n\nТеперь ты умеешь не только идти,\nно и останавливаться."
    }
  ],
  4: [
    {
      emoji: "🦋",
      text: "Паутина порвана.\n\nИз неё вылетели бабочки.\nОказывается, под сомнениями\nвсегда прятались мечты.\n\nТы просто боялась их увидеть."
    },
    {
      emoji: "🐱",
      text: "{petName} ловит бабочку.\n\nПромахивается. Пробует снова.\nНе сомневается ни секунды.\n\nМожет, в этом и секрет?"
    },
    {
      emoji: "💫",
      text: "Впереди — Зеркальный Дворец.\n\nТам живёт та, что носит твоё лицо,\nно говорит чужим голосом:\n«Ты недостаточно хороша.\nТы притворяешься.\nСкоро все узнают.»\n\nСамозванка. Самый личный враг."
    },
    {
      emoji: "✨",
      title: "Победа!",
      text: "Лес Сомнений позади.\n\nТитул получен: {Разрубившая|Разрубивший} Узел\n\nСомнения не исчезли навсегда.\nНо теперь ты знаешь:\nможно действовать даже с ними."
    }
  ],
  5: [
    {
      emoji: "💫",
      text: "Зеркало треснуло.\n\nЗа ним — не самозванка.\nЗа ним — ты. {Настоящая|Настоящий}.\n\nБез масок, без ролей, без чужих ожиданий.\nПросто ты. И этого достаточно."
    },
    {
      emoji: "🐱",
      text: "{petName} смотрит на тебя\nкак смотрел с первого дня.\n\nДля него ты никогда\nне была самозванкой.\nТы всегда была — ты."
    },
    {
      emoji: "💔",
      text: "За Зеркальным Дворцом — Каменная Стена.\n\nЕё построил Хранитель Стены.\nОн убедил тебя, что безопаснее\nне чувствовать. Не открываться. Не пускать.\n\nНо стена защищает не только от боли.\nОна защищает и от жизни."
    },
    {
      emoji: "✨",
      title: "Победа!",
      text: "Зеркальный Дворец пуст.\n\nТитул получен: {Подлинная|Подлинный}\n\nЗапомни это чувство.\nВ дни когда забудешь —\nвернись сюда."
    }
  ],
  6: [
    {
      emoji: "💖",
      text: "Стена рухнула.\n\nЗа ней — не опасность.\nЗа ней — тёплый свет\nи люди, которые ждали.\n\nОказывается, мир по ту сторону\nне враждебный. Он просто живой."
    },
    {
      emoji: "🐱",
      text: "{petName} первым\nпрошёл через пролом в стене.\n\nОбернулся. Позвал.\nОн всегда знал:\nза стеной лучше."
    },
    {
      emoji: "👑",
      text: "Впереди — последний враг.\n\nСерая Королева.\nАпатия. Бессмысленность. Пустота.\n\nОна не кричит. Не нападает.\nОна просто шепчет:\n«Зачем?»\n\nНо ты знаешь зачем.\nТы прошла весь этот путь."
    },
    {
      emoji: "✨",
      title: "Победа!",
      text: "Каменная Стена — больше не преграда.\n\nТитул получен: Открытое Сердце\n\nОстался один враг.\nПоследний. Самый тихий.\nСамый опасный."
    }
  ],
  7: {
    angel: [
      {
        emoji: "🌟",
        text: "Серая Королева склонила голову.\n\nНе от силы. От света.\nТвой свет. Тот что ты несла\nчерез все семь битв.\n\nКоролевство наполнилось золотом рассвета."
      },
      {
        emoji: "🐱",
        text: "{petName} подошёл к трону\nи лёг у твоих ног.\n\nПуть пройден.\nНо он знает:\nсамое интересное только начинается."
      },
      {
        emoji: "👑",
        title: "Финал: Путь Созидания",
        text: "Титул получен: {Светлая Правительница|Светлый Правитель}\n\nТы выбрала путь Созидания.\nМягкость, забота, свет.\n\nЭто не конец истории.\nЭто начало новой главы."
      }
    ],
    devil: [
      {
        emoji: "🔥",
        text: "Серая Королева сломлена.\n\nНе светом — волей.\nТвоя дисциплина, твоя сила, твой огонь\nоказались сильнее пустоты.\n\nКоролевство дрожит от мощи."
      },
      {
        emoji: "🐱",
        text: "{petName} смотрит на тебя\nс уважением и лёгким страхом.\n\nНо ты знаешь:\nсила без жестокости — это власть.\nА власть над собой — высшая из всех."
      },
      {
        emoji: "👑",
        title: "Финал: Путь Воли",
        text: "Титул получен: {Тёмная Властительница|Тёмный Властитель}\n\nТы выбрала путь Воли.\nДисциплина, сила, решимость.\n\nЭто не конец истории.\nЭто начало нового правления."
      }
    ],
    balance: [
      {
        emoji: "⚖️",
        text: "Серая Королева посмотрела на тебя.\n\nИ увидела то, чего не ожидала:\nни свет, ни тьму.\nБаланс.\n\nСамый редкий и самый сильный путь."
      },
      {
        emoji: "🐱",
        text: "{petName} сел между светом и тенью.\n\nРовно посередине.\nКак всегда. Как ты."
      },
      {
        emoji: "👑",
        title: "Финал: Путь Баланса",
        text: "Титул получен: {Хранительница|Хранитель} Баланса\n\nТы не выбирала сторону.\nТы стала чем-то большим.\n\nЭто не конец истории.\nЭто начало гармонии."
      }
    ]
  }
};

window.BOSS_NARRATIVES = BOSS_NARRATIVES;

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
  buildBossList();
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
      "<div class=\"boss-card-title\" style=\"text-align:center;\">" + boss.emoji + " " + boss.name + "</div>" +
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

function showBossNarrative(bossId, profile, onFinish) {
  var narratives = window.BOSS_NARRATIVES;
  if (!narratives) { if (onFinish) onFinish(); return; }

  // Для босса 7 определяем финал по alignment
  var slides;
  if (bossId === 7) {
    var angel = profile.angelPoints || 0;
    var devil = profile.devilPoints || 0;
    var diff  = angel - devil;
    if      (diff >  100) slides = narratives[7].angel;
    else if (diff < -100) slides = narratives[7].devil;
    else                  slides = narratives[7].balance;
  } else {
    slides = narratives[bossId];
  }

  if (!slides || !slides.length) { if (onFinish) onFinish(); return; }

  var petName = profile.petName || "Питомец";
  var currentSlide = 0;

  // Создаём оверлей
  var overlay = document.createElement("div");
  overlay.id = "narrativeOverlay";
  overlay.style.cssText = "position:fixed;inset:0;z-index:9000;display:flex;align-items:center;justify-content:center;padding:20px;background:rgba(0,0,0,0.92);";

  function renderSlide() {
    var slide = slides[currentSlide];
    var isLast = currentSlide === slides.length - 1;

    var text = slide.text || "";
    text = text.replace(/\{petName\}/g, petName);
    if (typeof window.applyGender === "function") text = window.applyGender(text);
    text = text.replace(/\n/g, "<br>");

    var titleHtml = slide.title
      ? "<div style='font-size:1.1rem;font-weight:700;color:#e6c200;margin-bottom:12px;text-align:center;'>" + slide.title + "</div>"
      : "";

    overlay.innerHTML =
      "<div style='max-width:380px;width:100%;background:rgba(6,8,30,0.98);border:1px solid rgba(230,194,0,0.4);border-radius:18px;padding:28px 22px;text-align:center;'>" +
        "<div style='font-size:3rem;margin-bottom:16px;'>" + (slide.emoji || "✨") + "</div>" +
        titleHtml +
        "<div style='font-size:0.92rem;color:rgba(255,255,255,0.88);line-height:1.7;margin-bottom:24px;text-align:center;'>" + text + "</div>" +
        "<div style='font-size:0.75rem;color:rgba(255,255,255,0.3);margin-bottom:12px;'>" + (currentSlide + 1) + " / " + slides.length + "</div>" +
        "<button id='narrativeNextBtn' style='width:100%;padding:13px;border-radius:12px;border:1px solid rgba(230,194,0,0.5);background:rgba(230,194,0,0.1);color:#f7f7ff;font-size:0.95rem;font-weight:600;cursor:pointer;'>" +
          (isLast ? "Завершить ✨" : "Продолжить →") +
        "</button>" +
      "</div>";

    document.getElementById("narrativeNextBtn").addEventListener("click", function() {
      if (currentSlide < slides.length - 1) {
        currentSlide++;
        renderSlide();
      } else {
        document.body.removeChild(overlay);
        if (onFinish) onFinish();
      }
    });
  }

  document.body.appendChild(overlay);
  renderSlide();
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
      "<button type=\"button\" class=\"boss-detail-btn boss-detail-btn--fight\" id=\"bossNarrativeBtn\">Продолжить историю →</button>";

    // Показать нарратив после победы
    var narrativeBtn = document.getElementById("bossNarrativeBtn");
    if (narrativeBtn && window.BOSS_NARRATIVES) {
      narrativeBtn.addEventListener("click", function() {
        showBossNarrative(bossId, profile, function() {
          var listEl = document.getElementById("bossList");
          if (listEl) listEl.style.display = "";
          detailEl.style.display = "none";
        });
      });
    }

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
