// ============================================
// EVENTS.JS — мини-события и живые моменты
// ============================================

(function () {
  "use strict";

  function getP() {
    return (window.getP && window.getP()) || window.P || null;
  }

  function setP(P) {
    if (window.setP) window.setP(P);
    else window.P = P;
  }

  function todayStr() {
    return window.today ? window.today() : new Date().toISOString().slice(0, 10);
  }

  function hasGlobals() {
    return typeof window.EVENTS === "object" &&
           Array.isArray(window.EVENTS.random) &&
           Array.isArray(window.EVENTS.reaction);
  }

  // Форматирование награды в строку "+2🧠 +1✨ ..."
  function formatReward(reward) {
    if (!reward) return "";
    var parts = [];
    var STAT_KEYS = window.STAT_KEYS || [];
    var STAT_ICONS = window.STAT_ICONS || {};

    Object.keys(reward).forEach(function (key) {
      var val = reward[key];
      if (!val) return;

      if (STAT_KEYS.indexOf(key) !== -1) {
        var icon = STAT_ICONS[key] || "";
        parts.push("+" + val + icon);
        return;
      }

      if (key === "coins") parts.push("+" + val + "💰");
      else if (key === "angel") parts.push("+" + val + "😇");
      else if (key === "devil") parts.push("+" + val + "😈");
      else if (key === "petMood") parts.push("+" + val + "🐾");
      else if (key === "randomStat") parts.push("+" + val + "🎲");
    });

    return parts.join(" ");
  }

  // Тост-уведомление о награде
  function showEventToast(reward) {
    var doc = window.document;
    if (!doc) return;

    var text = formatReward(reward);
    if (!text) return;

    var toast = doc.createElement("div");
    toast.className = "event-toast";
    toast.textContent = text;
    toast.style.position = "fixed";
    toast.style.left = "50%";
    toast.style.bottom = "80px";
    toast.style.transform = "translateX(-50%)";
    toast.style.background = "rgba(6,8,30,0.95)";
    toast.style.color = "#fff";
    toast.style.padding = "8px 14px";
    toast.style.borderRadius = "999px";
    toast.style.fontSize = "0.8rem";
    toast.style.boxShadow = "0 6px 18px rgba(0,0,0,0.6)";
    toast.style.zIndex = "99999";
    toast.style.opacity = "0";
    toast.style.transition = "opacity 0.3s ease";

    doc.body.appendChild(toast);
    // Плавное появление
    requestAnimationFrame(function () {
      toast.style.opacity = "1";
    });

    // Исчезновение через 2 секунды
    setTimeout(function () {
      toast.style.opacity = "0";
      setTimeout(function () {
        if (toast.parentNode) toast.parentNode.removeChild(toast);
      }, 300);
    }, 2000);
  }

  // Применение награды события
  function applyEventReward(reward) {
    var P = getP();
    if (!P || !reward) return;

    var STAT_KEYS = window.STAT_KEYS || [];
    var STAT_ICONS = window.STAT_ICONS || {};
    var cl = window.cl || function (v, mn, mx) {
      return Math.min(mx, Math.max(mn, v));
    };
    var sMax = window.sMax || function () { return 999; };

    // Чтобы в тосте показать конкретный стат для randomStat
    var resolvedReward = {};

    Object.keys(reward).forEach(function (key) {
      var val = reward[key];
      if (!val) return;

      if (STAT_KEYS.indexOf(key) !== -1) {
        if (!P.stats) P.stats = {};
        var cur = P.stats[key] || 0;
        P.stats[key] = cl(cur + val, 0, sMax());
        resolvedReward[key] = (resolvedReward[key] || 0) + val;
        return;
      }

      if (key === "coins") {
        P.coins = (P.coins || 0) + val;
        resolvedReward.coins = (resolvedReward.coins || 0) + val;
      } else if (key === "angel") {
        P.angelPoints = (P.angelPoints || 0) + val;
        resolvedReward.angel = (resolvedReward.angel || 0) + val;
      } else if (key === "devil") {
        P.devilPoints = (P.devilPoints || 0) + val;
        resolvedReward.devil = (resolvedReward.devil || 0) + val;
      } else if (key === "petMood") {
        P.petMood = cl((P.petMood || 0) + val, 0, 10);
        resolvedReward.petMood = (resolvedReward.petMood || 0) + val;
      } else if (key === "randomStat") {
        if (!P.stats) P.stats = {};
        if (STAT_KEYS.length) {
          var rndKey = STAT_KEYS[Math.floor(Math.random() * STAT_KEYS.length)];
          var cur2 = P.stats[rndKey] || 0;
          P.stats[rndKey] = cl(cur2 + val, 0, sMax());
          // Сохраняем как конкретный стат, а не randomStat
          resolvedReward[rndKey] = (resolvedReward[rndKey] || 0) + val;
        }
      }
    });

    P.lastEventDate = todayStr();
    setP(P);
    if (window.save) window.save();
    if (window.render) window.render();

    var rewardText = formatReward(resolvedReward);
if (window.showQuestToast) {
  window.showQuestToast(rewardText, "🎁 Получено!", "good");
} else {
  showEventToast(resolvedReward);
}
  }

  // Попап мини-события
  function showEventPopup(eventObj) {
    var doc = window.document;
    if (!doc || !eventObj) return;

    // Если уже есть попап — убрать
    var existing = doc.getElementById("event-popup");
    if (existing && existing.parentNode) {
      existing.parentNode.removeChild(existing);
    }

    var overlay = doc.createElement("div");
    overlay.id = "event-popup";
    overlay.className = "event-overlay";
    overlay.style.position = "fixed";
    overlay.style.left = "0";
    overlay.style.top = "0";
    overlay.style.width = "100%";
    overlay.style.height = "100%";
    overlay.style.display = "flex";
    overlay.style.alignItems = "center";
    overlay.style.justifyContent = "center";
    overlay.style.background = "rgba(0,0,0,0.65)";
    overlay.style.zIndex = "99999";
	overlay.style.pointerEvents = "auto";
    overlay.style.opacity = "0";
    overlay.style.transition = "opacity 0.3s ease";

    var card = doc.createElement("div");
    card.className = "event-card";
    card.style.maxWidth = "420px";
    card.style.width = "90%";
    card.style.background = "rgba(6,8,30,0.97)";
    card.style.borderRadius = "18px";
    card.style.border = "1px solid rgba(230,194,0,0.4)";
    card.style.boxShadow = "0 18px 45px rgba(0,0,0,0.8)";
    card.style.position = "relative";
	card.style.zIndex = "100000";
	card.style.pointerEvents = "auto";
    card.style.color = "#fff";
    card.style.fontSize = "0.9rem";

    var iconEl = doc.createElement("div");
    iconEl.className = "event-icon";
    iconEl.textContent = eventObj.icon || "";
    iconEl.style.fontSize = "2.4rem";
    iconEl.style.marginBottom = "12px";
    iconEl.style.textAlign = "center";

    var textEl = doc.createElement("div");
    textEl.className = "event-text";
    var rawText = eventObj.text || "";
    if (window.applyGender) rawText = window.applyGender(rawText);
    textEl.innerHTML = String(rawText).replace(/\n/g, "<br>");
    textEl.style.marginBottom = "14px";
    textEl.style.lineHeight = "1.5";
	textEl.style.textAlign = "center";

    var choicesWrap = doc.createElement("div");
    choicesWrap.className = "event-choices";
    choicesWrap.style.display = "flex";
    choicesWrap.style.flexDirection = "column";
    choicesWrap.style.gap = "8px";

    function closeOverlay() {
      overlay.style.opacity = "0";
      setTimeout(function () {
        if (overlay.parentNode) overlay.parentNode.removeChild(overlay);
      }, 300);
    }

    (eventObj.choices || []).forEach(function (choice) {
      var btn = doc.createElement("button");
      btn.type = "button";
      btn.className = "event-btn";
      btn.textContent = choice.label || "";
      btn.style.padding = "8px 14px";
      btn.style.borderRadius = "999px";
      btn.style.border = "1px solid rgba(255,255,255,0.4)";
      btn.style.background = "transparent";
      btn.style.color = "#fff";
      btn.style.cursor = "pointer";
      btn.style.fontSize = "0.85rem";
      btn.style.fontWeight = "600";
      btn.style.display = "flex";
      btn.style.alignItems = "center";
      btn.style.justifyContent = "space-between";

      var rewardSpan = doc.createElement("span");
      rewardSpan.style.fontSize = "0.75rem";
      rewardSpan.style.color = "rgba(255,255,255,0.7)";
      rewardSpan.textContent = formatReward(choice.reward);

      var labelSpan = doc.createElement("span");
      labelSpan.textContent = choice.label || "";

      btn.innerHTML = "";
      btn.appendChild(labelSpan);
      btn.appendChild(rewardSpan);

      btn.addEventListener("click", function () {
        applyEventReward(choice.reward || {});
        closeOverlay();
      });

      choicesWrap.appendChild(btn);
    });

    card.appendChild(iconEl);
    card.appendChild(textEl);
    card.appendChild(choicesWrap);
    overlay.appendChild(card);
    doc.body.appendChild(overlay);

    // Плавное появление
    requestAnimationFrame(function () {
      overlay.style.opacity = "1";
    });
  }

  // Проверка случайного события при открытии
  function checkRandomEvent() {
    if (!hasGlobals()) return;
    var P = getP();
    if (!P) return;

    var today = todayStr();
    if (P.lastEventDate === today) return;

    if (Math.random() >= 0.3) return;

    var pool = window.EVENTS.random || [];
    if (!pool.length) return;

    P.shownEvents = Array.isArray(P.shownEvents) ? P.shownEvents : [];
    var lastIds = P.shownEvents.slice(-3);

    var candidates = pool.filter(function (ev) {
      return lastIds.indexOf(ev.id) === -1;
    });
    if (!candidates.length) candidates = pool.slice();

    var eventObj = candidates[Math.floor(Math.random() * candidates.length)];
    if (!eventObj) return;

    // Обновляем историю показанных событий
    P.shownEvents.push(eventObj.id);
    if (P.shownEvents.length > 3) {
      P.shownEvents = P.shownEvents.slice(-3);
    }

    setP(P);
    if (window.save) window.save();

    showEventPopup(eventObj);
  }

  // Проверка реакции мира после квестов
  function checkReactionEvent() {
    if (!hasGlobals()) return;
    var P = getP();
    if (!P) return;

    if (P.reactedToday) return;

    var completed = P.completedToday || 0;
    if (completed < 3) return;

    var pool = window.EVENTS.reaction || [];
    if (!pool.length) return;

    var eventObj = pool[Math.floor(Math.random() * pool.length)];
    if (!eventObj) return;

    P.reactedToday = true;
    setP(P);
    if (window.save) window.save();

    showEventPopup(eventObj);
  }

 // Экспортируем внешние функции
  window.checkRandomEvent = checkRandomEvent;
  window.checkReactionEvent = checkReactionEvent;
  window.showEventToast = showEventToast;
  window.formatEventReward = formatReward;
  window.showEventPopup = showEventPopup;

})(); 

