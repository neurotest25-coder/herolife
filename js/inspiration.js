// ============================================
// INSPIRATION.JS — логика вдохновения
// ============================================

let currentInspirationCategory = null;

// Получить все карты одним массивом
function getAllInspirationCards() {
  const all = [];
  Object.keys(INSPIRATION_CARDS).forEach(function(k) {
    all.push.apply(all, INSPIRATION_CARDS[k]);
  });
  return all;
}

// Найти карту по id
function getInspirationCardById(id) {
  return getAllInspirationCards().find(function(c) { return c.id === id; });
}

// Получить карту дня (или назначить новую)
function getDailyCard() {
  const todayStr = today();
  if (P.dailyCardDate === todayStr && P.dailyCard) {
    const c = getInspirationCardById(P.dailyCard);
    if (c) return c;
  }
  const all  = getAllInspirationCards();
  const card = all[Math.floor(Math.random() * all.length)];
  P.dailyCard     = card.id;
  P.dailyCardDate = todayStr;
  save();
  return card;
}

// Переключить подвкладку квесты/вдохновение
function setQuestSubTab(subtab) {
  document.querySelectorAll(".quest-sub-tab").forEach(function(t) {
    t.classList.toggle("active", t.dataset.subtab === subtab);
  });
  const qPane = document.getElementById("questsSubPane");
  const iPane = document.getElementById("inspirationSubPane");
  if (qPane) qPane.classList.toggle("quest-sub-pane--active", subtab === "quests");
  if (iPane) {
    iPane.classList.toggle("quest-sub-pane--active", subtab === "inspiration");
    if (subtab === "inspiration") renderInspiration();
  }
}

// Главный рендер вдохновения
function renderInspiration() {
  if (!P) return;

  const dailyCard = getDailyCard();
  const done      = P.completedCards && P.completedCards[dailyCard.id];
  const canSwitch = !P.dailyCardSwitched;

  // Карта дня
  const dailyEl = document.getElementById("inspirationDailyCard");
  if (dailyEl) {
    dailyEl.className = "inspiration-daily-card" + (done ? " inspiration-card--done" : "");
    dailyEl.innerHTML =
      '<div class="inspiration-daily-emoji">' + dailyCard.icon + '</div>' +
      '<div class="inspiration-daily-title ' + (done ? "inspiration-title--done" : "") + '">' + dailyCard.title + '</div>' +
      '<div class="inspiration-daily-desc">'  + dailyCard.desc  + '</div>' +
      '<div class="inspiration-daily-time">⏱ ' + dailyCard.time + ' мин</div>' +
      '<div class="inspiration-daily-btns">' +
        (done ? "" : '<div class="inspiration-detail-hint">Выполни задание и нажми кнопку ⬇️</div>') +
        '<button type="button" class="inspiration-btn-done" data-insp-id="' + dailyCard.id + '" ' + (done ? "disabled" : "") + '>' +
          (done ? "Выполнено ✓" : "✅ Сделала!") +
        '</button>' +
        '<button type="button" class="inspiration-btn-switch" data-insp-switch ' + (canSwitch ? "" : "disabled") + '>🔄 Другая</button>' +
      '</div>';
  }

  // Категории
  const catMap = {
    creativity: {icon:"🎨", label:"Творчество"},
    challenge:  {icon:"💪", label:"Вызов"},
    care:       {icon:"❤️", label:"Забота"},
    explore:    {icon:"🔮", label:"Исследование"}
  };
  const catEl = document.getElementById("inspirationCategories");
  if (catEl) {
    catEl.innerHTML = Object.keys(catMap).map(function(k) {
      return '<button type="button" class="inspiration-cat-btn" data-cat="' + k + '">' +
        '<span class="icon">' + catMap[k].icon + '</span>' +
        '<span class="label">' + catMap[k].label + '</span>' +
      '</button>';
    }).join("");
  }

  // Сбросить вложенные виды
  const catView    = document.getElementById("inspirationCategoryView");
  const cardDetail = document.getElementById("inspirationCardDetail");
  const categories = document.getElementById("inspirationCategories");
  if (catView)    catView.style.display    = "none";
  if (cardDetail) cardDetail.style.display = "none";
  if (categories) categories.style.display = "grid";
}

// Показать карты категории
function showInspirationCategory(catKey) {
  currentInspirationCategory = catKey;
  const cards = INSPIRATION_CARDS[catKey] || [];
  const grid  = document.getElementById("inspirationCardsGrid");

  if (grid) {
    grid.innerHTML = cards.map(function(c) {
      const done = P.completedCards && P.completedCards[c.id];
      return '<div class="inspiration-card-mini ' + (done ? "inspiration-card-mini--done" : "") +
        '" data-insp-id="' + c.id + '">' +
        '<span class="icon">'  + c.icon  + '</span>' +
        '<div class="title '   + (done ? "inspiration-title--done" : "") + '">' + c.title + '</div>' +
        '<div class="coins">+' + c.coins + '💰</div>' +
      '</div>';
    }).join("");
  }

  const categories = document.getElementById("inspirationCategories");
  const catView    = document.getElementById("inspirationCategoryView");
  const cardDetail = document.getElementById("inspirationCardDetail");
  if (categories) categories.style.display = "none";
  if (cardDetail) cardDetail.style.display  = "none";
  if (catView)    catView.style.display     = "block";
}

// Показать детали карты
function showInspirationDetail(cardId) {
  const c = getInspirationCardById(cardId);
  if (!c) return;

  const done    = P.completedCards && P.completedCards[c.id];
  const content = document.getElementById("inspirationDetailContent");

  if (content) {
    content.className = "inspiration-detail-content" + (done ? " inspiration-detail-content--done" : "");
    content.innerHTML =
      '<div class="inspiration-detail-emoji">' + c.icon + '</div>' +
      '<div class="inspiration-detail-title ' + (done ? "inspiration-title--done" : "") + '">' + c.title + '</div>' +
      '<div class="inspiration-detail-desc">'  + c.desc  + '</div>' +
      (c.tip ? '<div class="inspiration-detail-tip">💡 ' + c.tip + '</div>' : "") +
      '<div class="inspiration-detail-time">⏱ ' + c.time + ' мин</div>' +
      '<div class="inspiration-detail-actions">' +
        (done ? "" : '<div class="inspiration-detail-hint">Выполни задание и нажми кнопку ⬇️</div>') +
        '<button type="button" class="inspiration-btn-done" data-insp-id="' + c.id + '" ' + (done ? "disabled" : "") + '>' +
          (done ? "Выполнено ✓" : "✅ Сделала!") +
        '</button>' +
      '</div>';
  }

  const categories = document.getElementById("inspirationCategories");
  const catView    = document.getElementById("inspirationCategoryView");
  const cardDetail = document.getElementById("inspirationCardDetail");
  if (categories) categories.style.display = "none";
  if (catView)    catView.style.display    = "none";
  if (cardDetail) cardDetail.style.display = "block";
}

// Выполнить карту вдохновения
function doInspirationCard(id) {
  if (!P || P.dayCompleted) return;
  if (!P.completedCards) P.completedCards = {};
  if (P.completedCards[id]) return;

  const c = getInspirationCardById(id);
  if (!c) return;

  const sm = sMax();
  P.coins = cl((P.coins || 0) + c.coins, 0, 999999);
  if (c.stat && P.stats[c.stat] != null) {
    P.stats[c.stat] = cl((P.stats[c.stat] || 0) + 1, 0, sm);
  }
  P.completedCards[id] = true;
  P.xp          = (P.xp || 0) + 5;
  P.angelPoints = (P.angelPoints || 0) + 1;
  P.petMood     = cl((P.petMood || 3) + 1, 0, 10);

  checkPetEvolution(P);
  save();
  render();

  // Обновить вид
  const iPane = document.getElementById("inspirationSubPane");
  if (iPane && iPane.classList.contains("quest-sub-pane--active")) {
    const cardDetail = document.getElementById("inspirationCardDetail");
    if (cardDetail && cardDetail.style.display !== "none") {
      showInspirationCategory(currentInspirationCategory);
    } else {
      renderInspiration();
    }
  }

  popup("+" + c.coins + "💰 " + (STAT_ICONS[c.stat] || "") + "+1", "good", "Отлично! ✨");
}