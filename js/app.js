// ============================================
// APP.JS — главная логика, рендер, события
// ============================================

(function () {

  // ── ГЛОБАЛЬНЫЕ ПЕРЕМЕННЫЕ ──────────────────
  let P           = null;
  let currentTab  = "hero";
  let currentFilter = "all";
  let currentQuestView = "smart";

  // ── УТИЛИТЫ ───────────────────────────────
  function $(id) { return document.getElementById(id); }
  function cl(v, mn, mx) { return Math.min(mx, Math.max(mn, v)); }
  function pct(v, mx) { return mx <= 0 ? 0 : cl(v / mx * 100, 0, 100); }
  function sMax() { return (P ? P.level : 1) * 10; }

  function today() {
    const d = new Date();
    return d.getFullYear() + "-" +
      String(d.getMonth() + 1).padStart(2, "0") + "-" +
      String(d.getDate()).padStart(2, "0");
  }

  function dateStrOffset(off) {
    const d = new Date();
    d.setDate(d.getDate() + off);
    return d.getFullYear() + "-" +
      String(d.getMonth() + 1).padStart(2, "0") + "-" +
      String(d.getDate()).padStart(2, "0");
  }

  function fmtDate() {
    const m = ["января","февраля","марта","апреля","мая","июня",
               "июля","августа","сентября","октября","ноября","декабря"];
    const d = new Date();
    return d.getDate() + " " + m[d.getMonth()] + " " + d.getFullYear();
  }

  function save() {
    try { localStorage.setItem(SK, JSON.stringify(P)); } catch(e) {}
  }

  // ── СДЕЛАТЬ ФУНКЦИИ ГЛОБАЛЬНЫМИ ───────────
  // (нужно для pet.js, inspiration.js, shop.js, stats.js)
  window.P    = P;
  window.save = save;
  window.sMax = sMax;
  window.cl   = cl;
  window.today = today;
  window.popup = popup;

  // ── ПОПАП И ТОСТ ──────────────────────────
  function popup(txt, type, subtitle) {
    const el = document.createElement("div");
    el.className = "xp-popup xp-popup--" + type;
    if (subtitle) {
      const main = document.createElement("div");
      main.className   = "xp-popup-main";
      main.textContent = txt;
      const sub = document.createElement("div");
      sub.className   = "xp-popup-sub";
      sub.textContent = subtitle;
      el.appendChild(main);
      el.appendChild(sub);
    } else {
      el.textContent = txt;
    }
    document.body.appendChild(el);
    setTimeout(function() { el.remove(); }, 1200);
  }

  function showQuestToast(line1, line2, type) {
    const el = document.createElement("div");
    el.className = "quest-toast quest-toast--" + (type || "good");
    el.innerHTML =
      '<div class="quest-toast-line1">' + line1 + '</div>' +
      '<div class="quest-toast-line2">' + line2 + '</div>';

    let t;
    function dismiss() {
      if (t) clearTimeout(t);
      el.classList.add("quest-toast--out");
      setTimeout(function() { el.remove(); }, 500);
    }

    el.addEventListener("click", dismiss);
    el.addEventListener("touchstart", function(e) {
      el._touchY = e.touches[0].clientY;
    }, {passive: true});
    el.addEventListener("touchend", function(e) {
      if (e.changedTouches[0].clientY - el._touchY > 30) dismiss();
    });

    document.body.appendChild(el);
    t = setTimeout(dismiss, 5000);
  }

  // ── АНИМАЦИЯ МОНЕТ ────────────────────────
  function animateCoins(to) {
    const el = $("coinsDisplay");
    if (!el) return;
    const from   = parseInt(el.textContent.replace(/\D/g, ""), 10) || 0;
    const target = Number(to) || 0;
    if (from === target) { el.textContent = target; return; }
    const duration  = 500;
    const startTime = performance.now();
    function step(t) {
      const progress = Math.min((t - startTime) / duration, 1);
      el.textContent = Math.round(from + (target - from) * progress);
      if (progress < 1) requestAnimationFrame(step);
    }
    requestAnimationFrame(step);
  }

  // ── ПРИВЕТСТВИЕ ───────────────────────────
  function showGreeting(useComeback) {
    const el = $("greetingPhrase");
    if (!el || !P) return;
    const pet = P.petName || "Питомец";
    let text  = "";

    if (useComeback) {
      text = COMEBACK_PHRASES[
        Math.floor(Math.random() * COMEBACK_PHRASES.length)
      ].replace(/{pet}/g, pet);
      text = text.replace("не сдалась", genderText("не сдалась", "не сдался"));
      text = text.replace("открыла", genderText("открыла", "открыл"));
      el.className = "greeting-phrase greeting-phrase--comeback";
    } else {
      const hour      = new Date().getHours();
      const dayOfWeek = new Date().getDay();
      let arr;

      if (hour < 12) {
        arr  = GREETINGS.morning;
        const idx = dayOfWeek === 0 ? 6 : dayOfWeek - 1;
        text = arr[idx];
      } else if (hour < 17) {
        arr  = GREETINGS.day;
        text = arr[Math.floor(Math.random() * arr.length)];
      } else if (hour < 22) {
        arr  = GREETINGS.evening;
        text = arr[Math.floor(Math.random() * arr.length)];
      } else {
        arr  = GREETINGS.night;
        text = arr[Math.floor(Math.random() * arr.length)];
      }
      text = text.replace(/{pet}/g, pet);
      text = text.replace("готов 🐱", genderText("готова 🐱", "готов 🐱"));
      el.className = "greeting-phrase";
    }
    if (P.heroName) {
      text = applyGender("{Рада|Рад} видеть тебя, ") + P.heroName + "! " + text;
    }
    el.textContent = applyGender(text);
  }

  // ── ГЛАВНЫЙ РЕНДЕР ────────────────────────
  function render() {
    if (!P) return;

    // Обновить глобальный P для других файлов
    window.P = P;

    const sm = sMax();
    const lv = P.level || 1;

    // Аватар и имя
    $("charAvatar").textContent = P.gender === "female" ? "👩" : "🧑";
    $("charName").textContent   = P.heroName || "Герой";
    $("charCrown").textContent  = P.inventory && P.inventory.crown ? "👑" : "";
    $("charLevel").textContent  = lv;

    // Streak
    const streakEl = $("charStreak");
    if (streakEl) {
      const s      = P.streak     || 0;
      const missed = P.missedDays || 0;
      const stage  = getStreakStage(s, missed);
      const icon   = STREAK_ICONS[String(stage)] || "💤";
      const name   = STREAK_NAMES[String(stage)] || "";
      const pulse  = (s >= 3 && stage >= 0) ? " streak-pulse" : "";
      if (stage >= 0) {
        streakEl.innerHTML =
          '<span class="streak-fire' + pulse + '">' + icon + '</span> ' +
          (name ? name + " | " : "") + declDays(s);
      } else {
        streakEl.innerHTML = '<span class="streak-fire">💤</span> | 0 дней';
      }
    }

    $("charStatMax").textContent = "Макс. стат: " + sm;

    // XP
    $("xpText").textContent    = (P.xp || 0) + "/" + (lv * 100);
    $("xpBar").style.width     = pct(P.xp || 0, lv * 100) + "%";

    // Статы
    STAT_KEYS.forEach(function(k) {
      const v = cl(P.stats[k] || 0, 0, sm);
      $(STAT_EL[k].v).textContent = v + "/" + sm;
      $(STAT_EL[k].b).style.width = pct(v, sm) + "%";
    });

    // Монеты
    animateCoins(P.coins || 0);

    // Путь света/тени
    const angel = P.angelPoints || 0;
    const devil = P.devilPoints || 0;
    const pathLeft  = $("pathScaleLeft");
    const pathTitle = $("pathScaleTitle");
    const pathRight = $("pathScaleRight");
    if (pathLeft)  pathLeft.textContent  = "😈 " + devil;
    if (pathRight) pathRight.textContent = "😇 " + angel;
    if (pathTitle) {
      const diff = angel - devil;
      if      (diff >  100) { pathTitle.textContent = applyGender("✨ {Хранительница|Хранитель} Света"); pathTitle.style.display = "block"; }
      else if (diff < -100) { pathTitle.textContent = applyGender("🌑 {Властительница|Властитель} Теней");       pathTitle.style.display = "block"; }
      else if (Math.abs(diff) < 30) { pathTitle.textContent = applyGender("⚖️ {Идущая|Идущий} по Грани"); pathTitle.style.display = "block"; }
      else { pathTitle.textContent = ""; pathTitle.style.display = "none"; }
    }

    // Питомец
    const stageData = getPetStageData(P);
    $("petIcon").textContent    = stageData.icon;
    $("petNameD").textContent   = P.petName || "Питомец";
    $("petFlower").textContent  = P.inventory && P.inventory.flower ? "🌺" : "";

    const sn = $("petStageName");
    const sd = $("petStageDesc");
    const sb = $("petStageBonus");
    if (sn) sn.textContent = stageData.name;
    if (sd) sd.textContent = stageData.desc;
    if (sb) {
      sb.textContent     = stageData.bonus ? "⭐ " + stageData.bonus : "";
      sb.style.display   = stageData.bonus ? "block" : "none";
    }

    // Сытость и настроение
    const h = cl(P.petHunger || 0, 0, 100);
    $("hungerText").textContent  = h + "%";
    $("hungerBar").style.width   = h + "%";

    const mood = cl(P.petMood || 0, 0, 10);
    $("moodEmoji").textContent   = moodEmoji(mood) + " Настроение";
    $("moodText").textContent    = mood + "/10";
    $("moodBar").style.width     = pct(mood, 10) + "%";
    $("moodDesc").textContent    = moodText(mood);

    // Щит
    $("shieldIndicator").style.display =
      (P.inventory && P.inventory.shield) ? "block" : "none";

    // Кнопка играть
    const playBtn = $("petPlayBtn");
    if (playBtn) {
      playBtn.style.display = (P.inventory && P.inventory.toy) ? "inline-block" : "none";
      if (P.inventory && P.inventory.toyUsedToday) {
        playBtn.disabled     = true;
        playBtn.textContent  = "Поиграли ✓";
      } else {
        playBtn.disabled     = false;
        playBtn.textContent  = "🎀 Поиграть";
      }
    }

    // Кнопка завершить день
    const endBtn = $("endDayBtn");
    if (endBtn) {
      if (P.dayCompleted) {
        endBtn.disabled    = true;
        endBtn.textContent = "День завершён 🌙";
      } else {
        endBtn.disabled    = false;
        endBtn.textContent = "🌙 Завершить день";
      }
    }

    updateCounter();
    renderShop();
    renderStats();
    checkPetEvolution(P);
  }

  // ── СТАТИСТИКА СТРОКИ КВЕСТОВ ─────────────
  function statStr(stats) {
    return Object.entries(stats).map(function(entry) {
      const k = entry[0], v = entry[1];
      return (STAT_ICONS[k] || k) + (v > 0 ? "+" : "") + v;
    }).join(" ");
  }

  // ── ФИЛЬТР КВЕСТОВ ────────────────────────
  function applyFilter(statKey) {
    currentFilter = statKey;
    document.querySelectorAll(".quest-item").forEach(function(item) {
      if (statKey === "all") { item.style.display = ""; return; }
      if (["easy","medium","hard"].indexOf(statKey) !== -1) {
        item.style.display = item.getAttribute("data-difficulty") === statKey ? "" : "none";
        return;
      }
      const cats = item.getAttribute("data-categories") || "";
      item.style.display = cats.indexOf(statKey) !== -1 ? "" : "none";
    });
    document.querySelectorAll(".filter-btn").forEach(function(btn) {
      btn.classList.toggle("active", btn.dataset.filter === statKey);
    });
  }

  // ── ИЗБРАННОЕ И УМНЫЙ ПОДБОР ─────────────
  function toggleFavorite(questId) {
    if (!P) return;
    var fav = P.favoriteQuests;
    if (!fav) P.favoriteQuests = fav = [];
    var i = fav.indexOf(questId);
    if (i !== -1) fav.splice(i, 1);
    else fav.push(questId);
    if (window.save) window.save();
    buildQuests();
  }

  function getSmartQuests() {
    const allQ = QUESTS.concat(P.customQuests || []);
    const uncompleted = allQ.filter(function(q) {
      return !(P.quests && P.quests[q.id]);
    });
    const ids = {};
    const favIds = P.favoriteQuests || [];

    function addUnique(q) {
      if (!ids[q.id]) { ids[q.id] = q; }
    }
    function pickRandom(arr, n) {
      const shuffled = arr.slice().sort(function() { return Math.random() - 0.5; });
      return shuffled.slice(0, n);
    }

    // 0. До 3 избранных первыми
    var addedFav = 0;
    for (var f = 0; f < favIds.length && addedFav < 3; f++) {
      var q = allQ.find(function(x) { return x.id === favIds[f]; });
      if (q && !ids[q.id]) { addUnique(q); addedFav++; }
    }

    // 1. Два случайных лёгких невыполненных
    const easy = uncompleted.filter(function(q) {
      return (q.difficulty || "medium") === "easy";
    });
    pickRandom(easy, 2).forEach(addUnique);

    // 2. Стат с минимальным значением — два квеста качающих его
    let minStat = null, minVal = 999;
    STAT_KEYS.forEach(function(k) {
      const v = P.stats[k] || 0;
      if (v < minVal) { minVal = v; minStat = k; }
    });
    if (minStat) {
      const forStat = uncompleted.filter(function(q) {
        return q.stats && q.stats[minStat];
      });
      pickRandom(forStat, 2).forEach(addUnique);
    }

    // 3. Один случайный невыполненный (никогда не выполнял — из оставшихся)
    const rest3 = uncompleted.filter(function(q) { return !ids[q.id]; });
    const one = pickRandom(rest3, 1)[0];
    if (one) addUnique(one);

    // 4. Один случайный невыполненный любой сложности
    const rest4 = uncompleted.filter(function(q) { return !ids[q.id]; });
    const oneAny = pickRandom(rest4, 1)[0];
    if (oneAny) addUnique(oneAny);

    // 5. Вызов дня — один hard, награда x2
    const hard = uncompleted.filter(function(q) {
      return (q.difficulty || "medium") === "hard";
    });
    const challenge = pickRandom(hard, 1)[0];
    if (challenge) {
      const copy = Object.assign({}, challenge, {
        coins: (challenge.coins || 0) * 2,
        isDailyChallenge: true
      });
      addUnique(copy);
      P.dailyChallengeId = challenge.id;
    }

    return Object.keys(ids).map(function(id) { return ids[id]; });
  }

  function buildSmartQuests() {
    const gList = $("goodQuestsList");
    if (!gList) return;
    gList.innerHTML = "";

    const smartList = getSmartQuests();

    smartList.forEach(function(q) {
      const done      = P.quests && P.quests[q.id];
      const statsText = statStr(q.stats || {});
      const diff      = q.difficulty || "medium";
      const diffCls   = "quest-difficulty-dot--" + diff;
      const alignIcon = q.alignment === "angel" ? "😇"
                      : q.alignment === "devil"  ? "😈" : "";
      const tip       = q.tip || "";
      const tipHtml   = tip
        ? '<span class="quest-tip-toggle" data-tip-for="' + q.id + '" title="Подсказка">💡</span>'
        : "";
      const tipBlock  = tip
        ? '<div class="quest-tip" id="tip-' + q.id + '">' + tip + '</div>'
        : "";
      const challengeLabel = q.isDailyChallenge
        ? ' <span class="quest-daily-challenge">⚡ Вызов дня x2</span>'
        : "";
      const isFav = (P.favoriteQuests || []).indexOf(q.id) !== -1;
      const starBtn = '<button type="button" class="quest-favorite-btn" data-quest-id="' + q.id + '" title="' + (isFav ? "Убрать из избранного" : "В избранное") + '">' + (isFav ? "⭐" : "☆") + '</button>';

      const div = document.createElement("div");
      div.className =
        "quest-item" +
        (done ? " quest-item--good-done" : "");
      div.dataset.questId    = q.id;
      div.dataset.categories = Object.keys(q.stats || {}).join(",");
      div.dataset.difficulty = diff;

      div.innerHTML =
        starBtn +
        '<div class="quest-main">' +
          '<span class="quest-icon">' + q.icon + '</span>' +
          '<div class="quest-text">' +
            '<div class="quest-title-row">' +
              '<span class="quest-difficulty-dot ' + diffCls + '"></span>' +
              '<div class="quest-title' + (done ? " quest-title--done" : "") + '">' + q.title + challengeLabel + '</div>' +
              (alignIcon ? '<span class="quest-alignment">' + alignIcon + '</span>' : "") +
            '</div>' +
            '<div class="quest-desc">' + (q.desc || "") + tipHtml + '</div>' +
            tipBlock +
            (q.custom ? '<span class="quest-delete-link" data-del="' + q.id + '">🗑️ удалить</span>' : "") +
            '<div class="quest-stats good">' + statsText + '</div>' +
          '</div>' +
        '</div>' +
        '<span class="quest-coins good">' + (q.coins > 0 ? "+" : "") + q.coins + '💰</span>' +
        '<button class="quest-btn quest-btn--good' + (done ? " quest-btn--done" : "") + '" ' +
          (done || P.dayCompleted ? "disabled" : "") + '>' +
          (done ? "✓" : "○") +
        '</button>';

      gList.appendChild(div);
    });

    document.querySelectorAll(".quest-tip-toggle").forEach(function(btn) {
      btn.addEventListener("click", function(ev) {
        ev.stopPropagation();
        const tipEl = $("tip-" + this.dataset.tipFor);
        if (tipEl) tipEl.classList.toggle("quest-tip--visible");
      });
    });

    applyFilter(currentFilter);
  }

  // ── ПОСТРОИТЬ СПИСОК КВЕСТОВ ──────────────
  function buildQuests() {
    if (currentQuestView === "smart") {
      buildSmartQuests();
      return;
    }
    const gList = $("goodQuestsList");
    if (!gList) return;
    gList.innerHTML = "";

    const allQ = QUESTS.concat(P.customQuests || []);

    // Подсказка кота-чародея
    let mysticQuestId = null;
    if ((P.petStage || 0) === 1 && P.petType === "cat") {
      let minStat = null, minVal = 999;
      STAT_KEYS.forEach(function(k) {
        const v = P.stats[k] || 0;
        if (v < minVal) { minVal = v; minStat = k; }
      });
      if (minStat) {
        const found = allQ.find(function(q) {
          return q.stats && q.stats[minStat] && !(P.quests && P.quests[q.id]);
        });
        if (found) mysticQuestId = found.id;
      }
    }

    const mysticAdvice = $("mysticAdvice");
    if (mysticAdvice) {
      if (mysticQuestId) {
        const q = allQ.find(function(x) { return x.id === mysticQuestId; });
        mysticAdvice.textContent = q ? "🐈 Мистик советует: " + q.title : "";
        mysticAdvice.style.display = q ? "block" : "none";
      } else {
        mysticAdvice.style.display = "none";
      }
    }

    // Отрисовать каждый квест
    allQ.forEach(function(q) {
      const done      = P.quests && P.quests[q.id];
      const statsText = statStr(q.stats || {});
      const diff      = q.difficulty || "medium";
      const diffCls   = "quest-difficulty-dot--" + diff;
      const alignIcon = q.alignment === "angel" ? "😇"
                      : q.alignment === "devil"  ? "😈" : "";
      const tip       = q.tip || "";
      const tipHtml   = tip
        ? '<span class="quest-tip-toggle" data-tip-for="' + q.id + '" title="Подсказка">💡</span>'
        : "";
      const tipBlock  = tip
        ? '<div class="quest-tip" id="tip-' + q.id + '">' + tip + '</div>'
        : "";
      const isMystic  = mysticQuestId === q.id;
      const isFav = (P.favoriteQuests || []).indexOf(q.id) !== -1;
      const starBtn = '<button type="button" class="quest-favorite-btn" data-quest-id="' + q.id + '" title="' + (isFav ? "Убрать из избранного" : "В избранное") + '">' + (isFav ? "⭐" : "☆") + '</button>';

      const div = document.createElement("div");
      div.className =
        "quest-item" +
        (done    ? " quest-item--good-done" : "") +
        (isMystic ? " quest-item--mystic"   : "");
      div.dataset.questId    = q.id;
      div.dataset.categories = Object.keys(q.stats || {}).join(",");
      div.dataset.difficulty = diff;

      div.innerHTML =
        starBtn +
        '<div class="quest-main">' +
          '<span class="quest-icon">' + q.icon + '</span>' +
          '<div class="quest-text">' +
            '<div class="quest-title-row">' +
              '<span class="quest-difficulty-dot ' + diffCls + '"></span>' +
              '<div class="quest-title' + (done ? " quest-title--done" : "") + '">' + q.title + '</div>' +
              (alignIcon ? '<span class="quest-alignment">' + alignIcon + '</span>' : "") +
            '</div>' +
            '<div class="quest-desc">' + (q.desc || "") + tipHtml + '</div>' +
            tipBlock +
            (q.custom ? '<span class="quest-delete-link" data-del="' + q.id + '">🗑️ удалить</span>' : "") +
            '<div class="quest-stats good">' + statsText + '</div>' +
          '</div>' +
        '</div>' +
        '<span class="quest-coins good">' + (q.coins > 0 ? "+" : "") + q.coins + '💰</span>' +
        '<button class="quest-btn quest-btn--good' + (done ? " quest-btn--done" : "") + '" ' +
          (done || P.dayCompleted ? "disabled" : "") + '>' +
          (done ? "✓" : "○") +
        '</button>';

      gList.appendChild(div);
    });

    // Тогл подсказок
    document.querySelectorAll(".quest-tip-toggle").forEach(function(btn) {
      btn.addEventListener("click", function(ev) {
        ev.stopPropagation();
        const tipEl = $("tip-" + this.dataset.tipFor);
        if (tipEl) tipEl.classList.toggle("quest-tip--visible");
      });
    });

    applyFilter(currentFilter);
  }

  // ── СЧЁТЧИК КВЕСТОВ ───────────────────────
  function updateCounter() {
    const allQ     = QUESTS.concat(P.customQuests || []);
    const doneGood = allQ.filter(function(q) {
      return P.quests && P.quests[q.id];
    }).length;
    const el = $("questCounter");
    if (el) el.textContent = "Выполнено: " + doneGood + "/" + allQ.length;

    const progressText = $("questsProgressText");
    if (progressText) progressText.textContent = "✅ " + doneGood + "/" + allQ.length + " выполнено";
    const quickBtn = $("quickEndDayBtn");
    if (quickBtn) {
      if (P.dayCompleted) {
        quickBtn.disabled = true;
        quickBtn.textContent = "День завершён ✓";
      } else {
        quickBtn.disabled = false;
        quickBtn.textContent = "🌙 Завершить";
      }
    }
  }

  // ── ВЫПОЛНИТЬ КВЕСТ ───────────────────────
  function doQuest(id) {
    if (!P || P.dayCompleted) return;
    if (!P.quests) P.quests = {};
    if (P.quests[id]) return;

    const allQ = QUESTS.concat(P.customQuests || []);
    const q    = allQ.find(function(x) { return x.id === id; });
    if (!q) return;

    const prevLv = P.level;
    const sm     = sMax();

    // Считаем монеты с бонусами
    let questCoins = q.coins || 0;
    if (q.isDailyChallenge || (P.dailyChallengeId && P.dailyChallengeId === q.id)) questCoins *= 2;
    if (P.doubleCoinsActive) questCoins *= 2;

    let dogBonus = false;
    if ((P.petStage || 0) === 1 && P.petType === "dog" &&
        q.stats && (q.stats.discipline || q.stats.strength)) {
      questCoins = Math.floor(questCoins * 1.1);
      dogBonus   = true;
    }
    if ((P.petStage || 0) === 2 && P.petType === "dragon") {
      questCoins = Math.floor(questCoins * 1.15);
    }

    // Бонус дракона-алхимика
    if ((P.petStage || 0) === 1 && P.petType === "dragon" && !P.dragonDailyBonusUsed) {
      const r = Math.random();
      if (r < 0.5) {
        questCoins += 5;
        popup("🐉 Пламя варит зелье... +5💰!", "good");
      } else if (r < 0.8) {
        const k = STAT_KEYS[Math.floor(Math.random() * STAT_KEYS.length)];
        P.stats[k] = cl((P.stats[k] || 0) + 1, 0, sMax());
        popup("🐉 Пламя варит зелье... " + STAT_ICONS[k] + "+1!", "good");
      }
      P.dragonDailyBonusUsed = true;
    }

    // Начислить монеты и статы
    P.coins = cl((P.coins || 0) + questCoins, 0, 999999);
    Object.entries(q.stats || {}).forEach(function(entry) {
      const k = entry[0], v = entry[1];
      let add = v;
      if (P.darkArmorActive && P.darkArmorStat === k) add += 2;
      if (P.stats[k] != null) P.stats[k] = cl((P.stats[k] || 0) + add, 0, sm);
    });

    // XP и очки пути
    P.xp = (P.xp || 0) + 10;
    if (q.alignment === "angel") P.angelPoints = (P.angelPoints || 0) + 1;
    else if (q.alignment === "devil") P.devilPoints = (P.devilPoints || 0) + 1;

    // Питомец
    P.petMood = cl((P.petMood || 3) + 1, 0, 10);

    // Тост с реакцией
    const statsPart = statStr(q.stats || {});
    const mainLine  =
      "+" + questCoins + "💰" +
      (statsPart ? " " + statsPart : "") +
      (dogBonus ? " 🐕+10%" : "");
    var reaction  = QUEST_REACTIONS.good[
      Math.floor(Math.random() * QUEST_REACTIONS.good.length)
    ].replace(/{pet}/g, P.petName || "Питомец");
    reaction = applyGender(reaction);

    showQuestToast(mainLine, reaction, "good");

    // Level up
    let lv = P.level, xp = P.xp, need = lv * 100;
    while (xp >= need) { xp -= need; lv++; need = lv * 100; }
    if (lv > prevLv) {
      $("levelUpLevel").textContent = lv;
      $("levelUpOverlay").classList.add("overlay--visible");
      setTimeout(function() {
        $("levelUpOverlay").classList.remove("overlay--visible");
      }, 5000);
    }
    P.level = lv; P.xp = xp; P.xpToNext = lv * 100;

    // Отметить квест
    P.quests[id] = true;

    // Скрыть подсказку
    const hint = $("questsHint");
    if (hint) hint.classList.add("hidden");

    save();
    buildQuests();
    render();
    checkPetEvolution(P);
  }

  // ── ЗАВЕРШИТЬ ДЕНЬ ────────────────────────
  function endDay() {
    if (!P || P.dayCompleted) return;

    const allQ       = QUESTS.concat(P.customQuests || []);
    const doneGood   = allQ.filter(function(q) { return P.quests && P.quests[q.id]; }).length;
    const earnedCoins = allQ
      .filter(function(q) { return P.quests && P.quests[q.id]; })
      .reduce(function(s, q) { return s + (q.coins || 0); }, 0);

    const petName = P.petName || "Питомец";
    const m       = P.petMood || 3;

    var endAddress = applyGender("{Ты справилась!|Ты справился!} ");
    $("endDayText").innerHTML =
      endAddress + '<br><br>' +
      'Выполнено: <strong>' + doneGood + '/' + allQ.length + '</strong> ✅<br><br>' +
      'Заработано: <strong>+' + earnedCoins + '💰</strong><br><br>' +
      '😇 +' + doneGood + '<br><br>' +
      moodEmoji(m) + ' ' + petName + ': ' + moodText(m);

    $("endDayOverlay").classList.add("overlay--visible");
    P.dayCompleted = true;

    const endBtn = $("endDayBtn");
    if (endBtn) {
      endBtn.disabled    = true;
      endBtn.textContent = "День завершён 🌙";
    }
    const endNote = $("endDayNote");
    if (endNote) endNote.textContent = "День завершён. Новые квесты завтра 🌅";

    // Streak
    const todayStr     = today();
    const yesterdayStr = dateStrOffset(-1);
    if (doneGood >= 1) {
      if (P.lastActiveDate === yesterdayStr) P.streak = (P.streak || 0) + 1;
      else P.streak = 1;
      P.lastActiveDate = todayStr;
      P.missedDays     = 0;

      // Milestone
      const str = P.streak || 0;
      [3, 7, 14, 30].forEach(function(ms) {
        if (str >= ms && (!P.shownMilestones || P.shownMilestones.indexOf(ms) === -1)) {
          if (!P.shownMilestones) P.shownMilestones = [];
          P.shownMilestones.push(ms);
          if (ms === 7)  P.angelPoints = (P.angelPoints || 0) + 5;
          if (ms === 14) P.devilPoints = (P.devilPoints || 0) + 5;
          if (MILESTONE_PHRASES[ms]) popup(MILESTONE_PHRASES[ms], "good");
        }
      });
    }

    // История
    if (!P.history) P.history = {};
    P.history[todayStr]  = {good: doneGood, bad: 0};
    P.totalDays          = (P.totalDays || 0) + 1;
    P.totalQuests        = (P.totalQuests || 0) + doneGood;
    P.totalCoinsEarned   = (P.totalCoinsEarned || 0) + earnedCoins;

    save();
    buildQuests();
    render();
    checkPetEvolution(P);
  }

  // ── НОВЫЙ ДЕНЬ ────────────────────────────
  function newDay() {
    if (!P) return;
    const todayStr   = today();
    const lastActive = P.lastActiveDate || "1970-01-01";
    const daysSince  = Math.floor(
      (new Date(todayStr) - new Date(lastActive)) / 86400000
    );

    let missedDays = daysSince <= 1 ? 0 : daysSince - 1;
    if (P.streakProtection && missedDays === 1) {
      missedDays         = 0;
      P.streakProtection = false;
    }
    if      (missedDays >= 3) { P.streak = 0; P.missedDays = 0; }
    else if (missedDays >= 1) { P.missedDays = missedDays; }

    // Сбросить дневные флаги
    P.streakProtection   = false;
    P.darkArmorActive    = false;
    P.doubleCoinsActive  = false;
    P.dragonDailyBonusUsed = false;
    P.quests             = {};
    P.dayCompleted       = false;
    P.lastVisitDate      = todayStr;

    // Питомец теряет сытость
    P.petHunger = cl((P.petHunger || 80) - 20, 0, 100);
    P.petMood   = 3;

    // Цветок даёт +1 здоровье
    if (P.inventory && P.inventory.flower) {
      P.stats.health = cl((P.stats.health || 0) + 1, 0, sMax());
    }
    if (P.inventory) P.inventory.toyUsedToday = false;

    // Карта вдохновения сбрасывается
    P.completedCards     = {};
    P.dailyCard          = null;
    P.dailyCardDate      = null;
    P.dailyCardSwitched  = false;

    // Пассивные бонусы питомца 3-й стадии
    const sm = sMax();
    if ((P.petStage || 0) === 2) {
      if (P.petType === "cat") {
        P.stats.intelligence = cl((P.stats.intelligence || 0) + 1, 0, sm);
        P.stats.charisma     = cl((P.stats.charisma     || 0) + 1, 0, sm);
        popup("🌟 " + (P.petName || "Питомец") + " дарит бонус: +1🧠 +1✨", "good");
      } else if (P.petType === "dog") {
        P.stats.strength   = cl((P.stats.strength   || 0) + 1, 0, sm);
        P.stats.discipline = cl((P.stats.discipline || 0) + 1, 0, sm);
        popup("🌟 " + (P.petName || "Питомец") + " дарит бонус: +1💪 +1🛡️", "good");
      } else if (P.petType === "dragon") {
        P.stats.energy = cl((P.stats.energy || 0) + 1, 0, sm);
        P.stats.health = cl((P.stats.health || 0) + 1, 0, sm);
        popup("🌟 " + (P.petName || "Питомец") + " дарит бонус: +1⚡ +1❤️", "good");
      }
    }

    checkPetEvolution(P);
    save();
  }

  // ── ИНИЦИАЛИЗАЦИЯ ПРОФИЛЯ ─────────────────
  function initProfile(base) {
    const s = {};
    STAT_KEYS.forEach(function(k) { s[k] = 1; });
    return {
      heroName: base.heroName,
      gender:   base.gender   || "unknown",
      petType:  base.petType  || "cat",
      petName:  base.petName,
      level: 1, xp: 0, stats: s,
      angelPoints: 0, devilPoints: 0, coins: 0,
      petMood: 3, petHunger: 80, petStage: 0,
      quests: {}, inventory: {}, customQuests: [], favoriteQuests: [],
      dayCompleted: false,
      lastVisitDate:  today(),
      createdAt:      new Date().toISOString(),
      streak: 0, streakStage: 0,
      lastActiveDate: null, missedDays: 0,
      shownMilestones: [], streakProtection: false,
      darkArmorStat: null, darkArmorActive: false,
      doubleCoinsActive: false, dragonDailyBonusUsed: false,
      history: {}, totalDays: 0, totalQuests: 0, totalCoinsEarned: 0,
      completedCards: {}, dailyCard: null,
      dailyCardDate: null, dailyCardSwitched: false
    };
  }

  // ── ПОКАЗАТЬ ЭКРАН ПЕРСОНАЖА ──────────────
  function showChar(useComeback) {
    window.scrollTo(0, 0);
    const charScreen   = $("characterScreen");
    const createScreen = $("creationScreen");
    if (charScreen) {
      charScreen.classList.remove("screen-hidden-final", "screen-hidden");
      charScreen.classList.add("screen-active");
    }
    if (createScreen) {
      createScreen.classList.remove("screen-active");
      createScreen.classList.add("screen-hidden");
      setTimeout(function() {
        createScreen.classList.add("screen-hidden-final");
      }, 400);
    }
    const card = $("characterCard");
    if (card) {
      card.classList.add("character-card-enter");
      setTimeout(function() { card.classList.remove("character-card-enter"); }, 450);
    }
    const questsDate = $("questsDate");
    if (questsDate) questsDate.textContent = "📅 " + fmtDate();

    buildQuests();
    render();
    showGreeting(useComeback || false);
  }

  // ── ПЕРЕКЛЮЧЕНИЕ ВКЛАДОК ──────────────────
  function setTab(tab) {
    currentTab = tab;
    if (P) updateCounter();
    const map  = {hero:"tabHero", quests:"tabQuests", shop:"tabShop", stats:"tabStats", map:"tabMap"};
    Object.keys(map).forEach(function(key) {
      const pane = $(map[key]);
      if (!pane) return;
      pane.classList.toggle("tab-pane--active", key === tab);
    });
    document.querySelectorAll(".bottom-nav-item").forEach(function(btn) {
      btn.classList.toggle("bottom-nav-item--active", btn.getAttribute("data-tab") === tab);
    });
    if (tab === "map") renderMap();
    if (tab === "map" && typeof buildBossList !== "undefined") buildBossList();
  }

  function renderMap() {
    var el = document.getElementById("bossList");
    if (!el) return;
    if (!el.children.length || el.innerHTML.trim() === "") {
      if (typeof buildBossList === "function") buildBossList();
    }
  }

  function setQuestSubTab(subtab) {
    if (!subtab) return;
    document.querySelectorAll(".quest-sub-tab").forEach(function(btn) {
      btn.classList.toggle("active", btn.dataset.subtab === subtab);
    });
    var questsPane = $("questsSubPane");
    var inspirationPane = $("inspirationSubPane");
    if (subtab === "smart") {
      currentQuestView = "smart";
      if (questsPane) questsPane.classList.add("quest-sub-pane--active");
      if (inspirationPane) inspirationPane.classList.remove("quest-sub-pane--active");
      var shuffleWrap = $("shuffleSmartWrap");
      if (shuffleWrap) shuffleWrap.style.display = "";
      buildQuests();
    } else if (subtab === "quests") {
      currentQuestView = "all";
      if (questsPane) questsPane.classList.add("quest-sub-pane--active");
      if (inspirationPane) inspirationPane.classList.remove("quest-sub-pane--active");
      var shuffleWrap = $("shuffleSmartWrap");
      if (shuffleWrap) shuffleWrap.style.display = "none";
      buildQuests();
    } else if (subtab === "inspiration") {
      var shuffleWrap = $("shuffleSmartWrap");
      if (shuffleWrap) shuffleWrap.style.display = "none";
      if (questsPane) questsPane.classList.remove("quest-sub-pane--active");
      if (inspirationPane) inspirationPane.classList.add("quest-sub-pane--active");
      if (typeof renderInspiration === "function") renderInspiration();
    }
  }

  // ── ВОССТАНОВИТЬ ПРОФИЛЬ ──────────────────
  function restore() {
    try {
      const raw = localStorage.getItem(SK);
      if (!raw) return;
      const d = JSON.parse(raw);
      if (!d || typeof d !== "object") return;

      if (typeof d.level === "number") {
        P = d;
        window.P = P;

        let useComeback = false;

        // Новый день?
        if (d.lastVisitDate !== today()) {
          const yesterdayStr = dateStrOffset(-1);
          if (!d.history || !d.history[yesterdayStr]) useComeback = true;
          newDay();
        }

        // Защита от undefined полей
        if (!P.customQuests)    P.customQuests    = [];
        if (!P.favoriteQuests)  P.favoriteQuests  = [];
        if (!P.inventory)       P.inventory       = {};
        if (P.streak     == null) P.streak        = 0;
        if (P.missedDays == null) P.missedDays    = 0;
        if (!P.shownMilestones) P.shownMilestones = [];
        if (!P.history)         P.history         = {};
        if (P.totalDays        == null) P.totalDays        = 0;
        if (P.totalQuests      == null) P.totalQuests      = 0;
        if (P.totalCoinsEarned == null) P.totalCoinsEarned = 0;
        if (!P.completedCards)  P.completedCards  = {};
        if (P.dailyCardSwitched == null) P.dailyCardSwitched = false;
        if (P.streakProtection  == null) P.streakProtection  = false;
        if (P.darkArmorActive   == null) P.darkArmorActive   = false;
        if (P.doubleCoinsActive == null) P.doubleCoinsActive = false;
        if (P.petStage          == null) P.petStage          = 0;
        if (P.dragonDailyBonusUsed == null) P.dragonDailyBonusUsed = false;
        if (P.angelPoints == null) P.angelPoints = 0;
        if (P.devilPoints == null) P.devilPoints = 0;

        checkPetEvolution(P);
        save();
        showChar(useComeback);
        return;
      }

      // Частично заполненная форма
      if (d.heroName) $("heroName").value = d.heroName;
      if (d.petName)  $("petName").value  = d.petName;
      if (d.gender) {
        const c = document.querySelector('[data-group="gender"][data-value="' + d.gender + '"]');
        if (c) selCard(c);
      }
      if (d.petType) {
        const c = document.querySelector('[data-group="pet"][data-value="' + d.petType + '"]');
        if (c) selCard(c);
      }
    } catch(e) {}
  }

  // ── ВСПОМОГАТЕЛЬНЫЕ ДЛЯ ФОРМЫ ────────────
  function setErr(el, has) {
    if (!el) return;
    has ? el.classList.add("error") : el.classList.remove("error");
  }
  function selCard(c) {
    const g = c.dataset.group;
    document.querySelectorAll('[data-group="' + g + '"]').forEach(function(b) {
      b.classList.remove("selected");
    });
    c.classList.add("selected");
  }
  function getVal(g) {
    const s = document.querySelector('[data-group="' + g + '"].selected');
    return s ? s.dataset.value : null;
  }
  function genderText(femaleWord, maleWord) {
    var g = P && P.gender;
    if (g === "male") return maleWord;
    return femaleWord;
  }
  function applyGender(text) {
    if (!text || typeof text !== "string") return text || "";
    var gender = P && P.gender;
    return text.replace(/\{([^|}]+)\|([^}]+)\}/g, function(match, female, male) {
      return gender === "male" ? male : female;
    });
  }

  // ── КАСТОМНЫЕ КВЕСТЫ ──────────────────────
  const addBtn        = $("addCustomQuestBtn");
  const addForm       = $("customQuestForm");
  const limitMsg      = $("customQuestLimitMsg");
  const titleField    = $("customQuestTitleField");
  const titleInput    = $("customQuestTitle");
  const titleError    = $("customQuestTitleError");
  const descInput     = $("customQuestDesc");
  const emojiSelect   = $("customQuestEmoji");
  const coinsInput    = $("customQuestCoins");
  const statSelect1   = $("customQuestStat1");
  const statSelect2   = $("customQuestStat2");
  const bonusInput1   = $("customQuestBonus1");
  const bonusInput2   = $("customQuestBonus2");
  const addSubmit     = $("customQuestAddBtn");
  const addCancel     = $("customQuestCancelBtn");
  const diffSelect    = $("customQuestDifficulty");
  const alignSelect   = $("customQuestAlignment");
  const tipInput      = $("customQuestTip");

  function customQuestsCount() {
    return P && P.customQuests ? P.customQuests.length : 0;
  }
  function updateCustomQuestLimit() {
    if (!addBtn || !limitMsg) return;
    const n = customQuestsCount();
    addBtn.disabled          = n >= 10;
    limitMsg.style.display   = n >= 10 ? "block" : "none";
  }
  function resetCustomQuestForm() {
    if (titleField)  titleField.classList.remove("error");
    if (titleError)  titleError.style.display = "none";
    if (titleInput)  titleInput.value  = "";
    if (descInput)   descInput.value   = "";
    if (emojiSelect) emojiSelect.value = "⭐";
    if (coinsInput)  coinsInput.value  = "15";
    if (statSelect1) statSelect1.value = "health";
    if (statSelect2) statSelect2.value = "";
    if (bonusInput1) bonusInput1.value = "2";
    if (bonusInput2) bonusInput2.value = "2";
    if (diffSelect)  diffSelect.value  = "easy";
    if (alignSelect) alignSelect.value = "neutral";
    if (tipInput)    tipInput.value    = "";
  }

  // ── ОБРАБОТЧИКИ СОБЫТИЙ ───────────────────

  // Выбор карточек (пол, питомец)
  document.querySelectorAll(".choice-card").forEach(function(c) {
    c.addEventListener("click", function() { selCard(c); });
  });

  // Кнопка "Начать приключение"
  $("startButton").addEventListener("click", function() {
    const hn = $("heroName").value.trim();
    const pn = $("petName").value.trim();
    const g  = getVal("gender");
    const pt = getVal("pet");
    let err  = false;

    if (!hn) { setErr($("field-hero-name"), true);  err = true; }
    else       setErr($("field-hero-name"), false);
    if (!pn) { setErr($("field-pet-name"),  true);  err = true; }
    else       setErr($("field-pet-name"),  false);
    if (err) return;

    P        = initProfile({heroName: hn, gender: g, petType: pt, petName: pn});
    window.P = P;
    save();
    showChar();
  });

  $("heroName").addEventListener("input", function() {
    if (this.value.trim()) setErr($("field-hero-name"), false);
  });
  $("petName").addEventListener("input", function() {
    if (this.value.trim()) setErr($("field-pet-name"), false);
  });

  // Главный делегат кликов
  document.addEventListener("click", function(e) {

    // Подвкладки квестов
    const subTab = e.target.closest(".quest-sub-tab");
    if (subTab) { setQuestSubTab(subTab.dataset.subtab); return; }

    // Вдохновение — выполнить
    const inspDone = e.target.closest(".inspiration-btn-done");
    if (inspDone && !inspDone.disabled) {
      doInspirationCard(inspDone.dataset.inspId); return;
    }

    // Вдохновение — сменить карту
    const inspSwitch = e.target.closest("[data-insp-switch]");
    if (inspSwitch && !inspSwitch.disabled) {
      const all = getAllInspirationCards();
      let card;
      do { card = all[Math.floor(Math.random() * all.length)]; }
      while (card && card.id === P.dailyCard);
      P.dailyCard         = card.id;
      P.dailyCardSwitched = true;
      save();
      renderInspiration();
      return;
    }

    // Вдохновение — категория
    const inspCat = e.target.closest(".inspiration-cat-btn");
    if (inspCat) { showInspirationCategory(inspCat.dataset.cat); return; }

    // Вдохновение — мини-карта
    const inspMini = e.target.closest(".inspiration-card-mini");
    if (inspMini) { showInspirationDetail(inspMini.dataset.inspId); return; }

    // Вдохновение — назад из категории
    const inspBackCat = e.target.closest("#inspirationBackBtn");
    if (inspBackCat) { renderInspiration(); return; }

    // Вдохновение — назад из детали
    const inspBackDetail = e.target.closest("#inspirationDetailBackBtn");
    if (inspBackDetail) {
      if (currentInspirationCategory) showInspirationCategory(currentInspirationCategory);
      else renderInspiration();
      return;
    }

    // Фильтр квестов
    const filterBtn = e.target.closest(".filter-btn");
    if (filterBtn) { applyFilter(filterBtn.dataset.filter); return; }

    // Тогл подсказки (не пропускать дальше)
    if (e.target.closest(".quest-tip-toggle") || e.target.closest(".quest-tip")) return;

    // Избранное — звёздочка (не выполнять квест)
    const favBtn = e.target.closest(".quest-favorite-btn");
    if (favBtn) {
      var qid = favBtn.dataset.questId;
      if (qid) toggleFavorite(qid);
      return;
    }

    // Кнопка квеста
    const btn = e.target.closest(".quest-btn");
    if (btn && !btn.disabled) {
      const item = btn.closest(".quest-item");
      if (item) doQuest(item.dataset.questId);
      return;
    }

    // Клик по строке квеста
    const questRow = e.target.closest(".quest-item");
    if (questRow) {
      const id = questRow.dataset.questId;
      if (id) doQuest(id);
    }

    // Удалить кастомный квест
    const del = e.target.closest(".quest-delete-btn") ||
                e.target.closest(".quest-delete-link");
    if (del) {
      const id = del.dataset.del;
      if (id && confirm("Удалить квест?")) {
        P.customQuests = (P.customQuests || []).filter(function(q) { return q.id !== id; });
        save(); buildQuests(); render();
      }
    }

    // Магазин — купить
    const buy = e.target.closest(".shop-buy-btn");
    if (buy && !buy.disabled) { buyItem(buy.dataset.shop); return; }

    // Магазин — вкладки
    const shopTab = e.target.closest(".shop-sub-tab");
    if (shopTab) {
      currentShopTab = shopTab.getAttribute("data-shop-tab") || "coins";
      render();
      return;
    }
  });

  // Кнопка добавить квест
  if (addBtn) {
    addBtn.addEventListener("click", function() {
      if (!P) return;
      updateCustomQuestLimit();
      if (customQuestsCount() >= 10) return;
      if (addForm) addForm.style.display = "block";
      resetCustomQuestForm();
    });
  }

  // Отмена формы
  if (addCancel && addForm) {
    addCancel.addEventListener("click", function() {
      addForm.style.display = "none";
    });
  }

  // Сохранить кастомный квест
  if (addSubmit) {
    addSubmit.addEventListener("click", function() {
      if (!P) return;
      if (customQuestsCount() >= 10) { updateCustomQuestLimit(); return; }

      const title = titleInput ? titleInput.value.trim() : "";
      if (!title) {
        if (titleField) titleField.classList.add("error");
        if (titleError) titleError.style.display = "block";
        return;
      }
      if (titleField) titleField.classList.remove("error");
      if (titleError) titleError.style.display = "none";

      const desc       = descInput   ? (descInput.value   || "").trim().slice(0, 50) : "";
      const emoji      = emojiSelect && emojiSelect.value ? emojiSelect.value : "⭐";
      const difficulty = diffSelect  && diffSelect.value  ? diffSelect.value  : "easy";
      const alignment  = alignSelect && alignSelect.value ? alignSelect.value : "neutral";
      const tip        = tipInput    ? (tipInput.value    || "").trim().slice(0, 80) : "";

      let coins = 15;
      if (coinsInput && coinsInput.value !== "") {
        const v = parseInt(coinsInput.value, 10);
        if (!isNaN(v)) coins = cl(v, 5, 30);
      }

      const stats = {};
      const key1  = statSelect1 ? statSelect1.value : "health";
      let b1 = 2;
      if (bonusInput1 && bonusInput1.value !== "") {
        const v = parseInt(bonusInput1.value, 10);
        if (!isNaN(v)) b1 = cl(v, 1, 5);
      }
      stats[key1] = b1;

      const key2 = statSelect2 ? statSelect2.value : "";
      if (key2) {
        let b2 = 2;
        if (bonusInput2 && bonusInput2.value !== "") {
          const v = parseInt(bonusInput2.value, 10);
          if (!isNaN(v)) b2 = cl(v, 1, 5);
        }
        stats[key2] = b2;
      }

      if (!P.customQuests) P.customQuests = [];
      P.customQuests.push({
        id: "custom_" + Date.now(),
        type: "good", icon: emoji, title, desc, tip,
        coins, difficulty, alignment, stats, custom: true
      });
      save(); buildQuests(); render(); updateCustomQuestLimit();
      if (addForm) addForm.style.display = "none";
    });
  }

  // Валидация монет
  if (coinsInput) {
    coinsInput.addEventListener("input", function() {
      let v = parseInt(this.value, 10);
      if (isNaN(v)) return;
      this.value = String(cl(v, 5, 30));
    });
  }

  // Валидация бонусов
  [bonusInput1, bonusInput2].forEach(function(inp) {
    if (!inp) return;
    inp.addEventListener("input", function() {
      let v = parseInt(this.value, 10);
      if (isNaN(v)) return;
      this.value = String(cl(v, 1, 5));
    });
  });

  // Завершить день
  $("endDayBtn").addEventListener("click", endDay);
  $("quickEndDayBtn").addEventListener("click", endDay);

  var shuffleSmartBtn = $("shuffleSmartBtn");
  if (shuffleSmartBtn) {
    shuffleSmartBtn.addEventListener("click", function() {
      if (currentQuestView !== "smart") return;
      buildQuests();
    });
  }

  $("btnSmartQuests").addEventListener("click", function() {
    currentQuestView = "smart";
    this.classList.add("active");
    var allBtn = $("btnAllQuests");
    if (allBtn) allBtn.classList.remove("active");
    buildQuests();
  });
  $("btnAllQuests").addEventListener("click", function() {
    currentQuestView = "all";
    this.classList.add("active");
    var smartBtn = $("btnSmartQuests");
    if (smartBtn) smartBtn.classList.remove("active");
    buildQuests();
  });

  $("endDayClose").addEventListener("click", function() {
    $("endDayOverlay").classList.remove("overlay--visible");
  });

  // Закрыть оверлей эволюции
  $("evolutionClose").addEventListener("click", function() {
    if (evolutionOverlayTimeout) {
      clearTimeout(evolutionOverlayTimeout);
      evolutionOverlayTimeout = null;
    }
    $("evolutionOverlay").classList.remove("overlay--visible");
  });

  // Питомец — тап и игра
  $("petIcon").addEventListener("click", function() {
    this.classList.remove("bounce");
    void this.offsetWidth;
    this.classList.add("bounce");
  });
  $("petPlayBtn").addEventListener("click", function() {
    if (!P || !P.inventory || !P.inventory.toy || P.inventory.toyUsedToday) return;
    P.inventory.toyUsedToday = true;
    P.petMood = cl((P.petMood || 3) + 3, 0, 10);
    popup("🎀 " + P.petName + " доволен!", "good");
    checkPetEvolution(P);
    save(); render();
  });

  // Дебаг-кнопки
  $("dbgXP").addEventListener("click", function() {
    if (!P) return;
    P.xp = (P.xp || 0) + 90;
    let lv = P.level, xp = P.xp, n = lv * 100, pl = lv;
    while (xp >= n) { xp -= n; lv++; n = lv * 100; }
    if (lv > pl) {
      $("levelUpLevel").textContent = lv;
      $("levelUpOverlay").classList.add("overlay--visible");
      setTimeout(function() { $("levelUpOverlay").classList.remove("overlay--visible"); }, 5000);
    }
    P.level = lv; P.xp = xp;
    save(); render(); checkPetEvolution(P);
    popup("+90 XP", "good");
  });

  $("dbgCoins").addEventListener("click", function() {
    if (!P) return;
    P.coins = (P.coins || 0) + 100;
    save(); render();
    popup("+100💰", "good");
  });

  $("dbgAngel").addEventListener("click", function() {
    if (!P) return;
    P.angelPoints = (P.angelPoints || 0) + 50;
    save(); render();
    popup("+50😇", "good");
  });

  $("dbgDevil").addEventListener("click", function() {
    if (!P) return;
    P.devilPoints = (P.devilPoints || 0) + 50;
    save(); render();
    popup("+50😈", "good");
  });

  $("dbgReset").addEventListener("click", function() {
    if (confirm("Удалить персонажа и начать заново?")) {
      localStorage.removeItem(SK);
      location.reload();
    }
  });

  var dbgDevMode = $("dbgDevMode");
  if (dbgDevMode) {
    dbgDevMode.addEventListener("click", function() {
      if (!P) return;
      if (!P.stats) P.stats = {};
      STAT_KEYS.forEach(function(k) { P.stats[k] = 50; });
      P.level = 55;
      P.coins = 9999;
      if (typeof window.save === "function") window.save();
      if (typeof window.render === "function") window.render();
      alert("⚔️ Режим разраба! Уровень 55, все статы 50");
    });
  }

  // Навигация
  document.querySelectorAll(".bottom-nav-item").forEach(function(btn) {
    btn.addEventListener("click", function() {
      const tab = this.getAttribute("data-tab");
      if (tab) setTab(tab);
    });
  });


  // ── ГЛОБАЛЬНЫЙ ЭКСПОРТ ────────────────────
  // Делаем функции доступными для других файлов
  window.save         = save;
  window.render       = render;
  window.buildQuests  = buildQuests;
  window.popup        = popup;
  window.cl           = cl;
  window.sMax         = sMax;
  window.today        = today;
  window.dateStrOffset = dateStrOffset;
  window.declDays     = declDays;
  window.getStreakStage = getStreakStage;
  window.showQuestToast = showQuestToast;
  window.applyFilter  = applyFilter;
  window.applyGender  = applyGender;
  window.updateCounter = updateCounter;
  window.buildSmartQuests = buildSmartQuests;
  window.getSmartQuests  = getSmartQuests;

  // Геттер и сеттер для P
  window.getP = function() { return P; };
  window.setP = function(newP) { P = newP; window.P = newP; };

  // ── СТАРТ ─────────────────────────────────
  setTab("hero");
  restore();

  // Автовыбор по умолчанию на экране создания (если ничего не выбрано)
  if (!document.querySelector('[data-group="gender"].selected')) {
    var femaleCard = document.querySelector('[data-group="gender"][data-value="female"]');
    if (femaleCard) selCard(femaleCard);
  }
  if (!document.querySelector('[data-group="pet"].selected')) {
    var catCard = document.querySelector('[data-group="pet"][data-value="cat"]');
    if (catCard) selCard(catCard);
  }

})();