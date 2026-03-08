// ============================================
// INSPIRATION.JS — логика вдохновения
// ============================================

var currentInspirationCategory = null;

function getAllInspirationCards() {
  var all = [];
  Object.keys(INSPIRATION_CARDS).forEach(function(k) {
    all.push.apply(all, INSPIRATION_CARDS[k]);
  });
  return all;
}

function getInspirationCardById(id) {
  return getAllInspirationCards().find(function(c) { return c.id === id; });
}

function getDailyCard() {
  var P       = window.getP ? window.getP() : window.P;
  var todayStr = window.today ? window.today() : today();
  if (P.dailyCardDate === todayStr && P.dailyCard) {
    var c = getInspirationCardById(P.dailyCard);
    if (c) return c;
  }
  var all  = getAllInspirationCards();
  var card = all[Math.floor(Math.random() * all.length)];
  P.dailyCard     = card.id;
  P.dailyCardDate = todayStr;
  if (window.setP) window.setP(P);
  if (window.save) window.save();
  return card;
}

function setQuestSubTab(subtab) {
  document.querySelectorAll(".quest-sub-tab").forEach(function(t) {
    t.classList.toggle("active", t.dataset.subtab === subtab);
  });
  var qPane = document.getElementById("questsSubPane");
  var iPane = document.getElementById("inspirationSubPane");
  if (qPane) qPane.classList.toggle("quest-sub-pane--active", subtab === "quests");
  if (iPane) {
    iPane.classList.toggle("quest-sub-pane--active", subtab === "inspiration");
    if (subtab === "inspiration") renderInspiration();
  }
}

function renderInspiration() {
  var P = window.getP ? window.getP() : window.P;
  if (!P) return;

  var dailyCard = getDailyCard();
  var done      = P.completedCards && P.completedCards[dailyCard.id];
  var canSwitch = !P.dailyCardSwitched;

  var dailyEl = document.getElementById("inspirationDailyCard");
  if (dailyEl) {
    dailyEl.className = "inspiration-daily-card" + (done ? " inspiration-card--done" : "");
    dailyEl.innerHTML =
      '<div class="inspiration-daily-emoji">' + dailyCard.icon + '</div>' +
      '<div class="inspiration-daily-title ' + (done ? "inspiration-title--done" : "") + '">' + dailyCard.title + '</div>' +
      '<div class="inspiration-daily-desc">'  + dailyCard.desc  + '</div>' +
      '<div class="inspiration-daily-time">⏱ ' + dailyCard.time + ' мин</div>' +
      '<div class="inspiration-daily-btns">' +
        (done ? "" : '<div class="inspiration-detail-hint">Выполни задание и нажми кнопку ⬇️</div>') +
        '<button type="button" class="inspiration-btn-done" data-insp-id="' + dailyCard.id + '" ' +
          (done ? "disabled" : "") + '>' + (done ? "Выполнено ✓" : "✅ Готово!") + '</button>' +
        '<button type="button" class="inspiration-btn-switch" data-insp-switch ' +
          (canSwitch ? "" : "disabled") + '>🔄 Заменить карту</button>' +
      '</div>';
  }

  var catMap = {
    creativity: {icon:"🎨", label:"Творчество"},
    challenge:  {icon:"💪", label:"Вызов"},
    care:       {icon:"❤️", label:"Забота"},
    explore:    {icon:"🔮", label:"Исследование"}
  };
  var catEl = document.getElementById("inspirationCategories");
  if (catEl) {
    catEl.innerHTML = Object.keys(catMap).map(function(k) {
      return '<button type="button" class="inspiration-cat-btn" data-cat="' + k + '">' +
        '<span class="icon">' + catMap[k].icon + '</span>' +
        '<span class="label">' + catMap[k].label + '</span></button>';
    }).join("");
  }

  var catView    = document.getElementById("inspirationCategoryView");
  var cardDetail = document.getElementById("inspirationCardDetail");
  var categories = document.getElementById("inspirationCategories");
  if (catView)    catView.style.display    = "none";
  if (cardDetail) cardDetail.style.display = "none";
  if (categories) categories.style.display = "grid";
}

function showInspirationCategory(catKey) {
  var P = window.getP ? window.getP() : window.P;
  currentInspirationCategory = catKey;
  var cards = INSPIRATION_CARDS[catKey] || [];
  var grid  = document.getElementById("inspirationCardsGrid");
  if (grid) {
    grid.innerHTML = cards.map(function(c) {
      var done = P.completedCards && P.completedCards[c.id];
      return '<div class="inspiration-card-mini ' + (done ? "inspiration-card-mini--done" : "") +
        '" data-insp-id="' + c.id + '">' +
        '<span class="icon">' + c.icon + '</span>' +
        '<div class="title ' + (done ? "inspiration-title--done" : "") + '">' + c.title + '</div>' +
        '<div class="coins">+' + c.coins + '💰</div></div>';
    }).join("");
  }
  var categories = document.getElementById("inspirationCategories");
  var catView    = document.getElementById("inspirationCategoryView");
  var cardDetail = document.getElementById("inspirationCardDetail");
  if (categories) categories.style.display = "none";
  if (cardDetail) cardDetail.style.display  = "none";
  if (catView)    catView.style.display     = "block";
}

function showInspirationDetail(cardId) {
  var P    = window.getP ? window.getP() : window.P;
  var c    = getInspirationCardById(cardId);
  if (!c) return;
  var done    = P.completedCards && P.completedCards[c.id];
  var content = document.getElementById("inspirationDetailContent");
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
        '<button type="button" class="inspiration-btn-done" data-insp-id="' + c.id + '" ' +
          (done ? "disabled" : "") + '>' + (done ? "Выполнено ✓" : "✅ Готово!") + '</button>' +
      '</div>';
  }
  var categories = document.getElementById("inspirationCategories");
  var catView    = document.getElementById("inspirationCategoryView");
  var cardDetail = document.getElementById("inspirationCardDetail");
  if (categories) categories.style.display = "none";
  if (catView)    catView.style.display    = "none";
  if (cardDetail) cardDetail.style.display = "block";
}

function doInspirationCard(id) {
  var P = window.getP ? window.getP() : window.P;
  if (!P || P.dayCompleted) return;
  if (!P.completedCards) P.completedCards = {};
  if (P.completedCards[id]) return;

  var c = getInspirationCardById(id);
  if (!c) return;

  var sm = window.sMax ? window.sMax() : 10;
  P.coins = window.cl((P.coins || 0) + c.coins, 0, 999999);
  if (c.stat && P.stats[c.stat] != null) {
    P.stats[c.stat] = window.cl((P.stats[c.stat] || 0) + 1, 0, sm);
  }
  P.completedCards[id] = true;
  P.xp          = (P.xp || 0) + 5;
  P.angelPoints = (P.angelPoints || 0) + 1;
  P.petMood     = window.cl((P.petMood || 3) + 1, 0, 10);

  checkPetEvolution(P);

  if (window.setP) window.setP(P);
  if (window.save) window.save();
  if (window.render) window.render();

  var iPane = document.getElementById("inspirationSubPane");
  if (iPane && iPane.classList.contains("quest-sub-pane--active")) {
    var cardDetail = document.getElementById("inspirationCardDetail");
    if (cardDetail && cardDetail.style.display !== "none") {
      showInspirationCategory(currentInspirationCategory);
    } else {
      renderInspiration();
    }
  }

  if (window.popup) window.popup("+" + c.coins + "💰 " + (STAT_ICONS[c.stat] || "") + "+1", "good", "Отлично! ✨");
}