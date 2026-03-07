// ============================================
// SHOP.JS — логика магазина
// ============================================

var currentShopTab = "coins";

function renderShop() {
  var P = window.getP ? window.getP() : window.P;
  if (!P) return;

  var list = document.getElementById("shopList");
  if (!list) return;
  list.innerHTML = "";

  var closed     = P.dayCompleted;
  var closedText = document.getElementById("shopClosedText");
  if (closedText) closedText.style.display = closed ? "block" : "none";

  var arr = currentShopTab === "angel" ? SHOP_ANGEL
          : currentShopTab === "devil"  ? SHOP_DEVIL
          : SHOP;

  var currencyIcon = currentShopTab === "angel" ? "😇"
                   : currentShopTab === "devil"  ? "😈" : "💰";

  var balance = currentShopTab === "angel" ? (P.angelPoints || 0)
              : currentShopTab === "devil"  ? (P.devilPoints || 0)
              : (P.coins || 0);

  arr.forEach(function(s) {
    var owned    = P.inventory && P.inventory[s.id];
    var canBuy   = balance >= s.price;
    var disabled = closed || (!canBuy && !owned) || (s.once && owned);
    var btnText  = s.once && owned ? "Куплено ✓" : "Купить";

    var div = document.createElement("div");
    div.className = "shop-item";
    div.innerHTML =
      '<div class="shop-main">' +
        '<span class="shop-icon">' + s.icon + '</span>' +
        '<div class="shop-text">' +
          '<div class="shop-name">' + s.name + '</div>' +
          '<div class="shop-desc">' + s.desc + '</div>' +
        '</div>' +
      '</div>' +
      '<span class="shop-price">' + s.price + currencyIcon + '</span>' +
      '<button class="shop-buy-btn" data-shop="' + s.id + '" ' +
        (disabled ? "disabled" : "") + '>' + btnText + '</button>';
    list.appendChild(div);
  });

  document.querySelectorAll(".shop-sub-tab").forEach(function(btn) {
    btn.classList.toggle(
      "shop-sub-tab--active",
      btn.getAttribute("data-shop-tab") === currentShopTab
    );
  });

  var shopTitleText = document.getElementById("shopTitleText");
  if (shopTitleText) {
    if (currentShopTab === "coins") {
      shopTitleText.innerHTML = '💰 Монеты — <span class="shop-title-coins">' + (P.coins || 0) + '</span>';
    } else if (currentShopTab === "angel") {
      shopTitleText.innerHTML = '😇 Свет — <span class="shop-title-coins">' + (P.angelPoints || 0) + '</span>';
    } else {
      shopTitleText.innerHTML = '😈 Тень — <span class="shop-title-coins">' + (P.devilPoints || 0) + '</span>';
    }
  }
}

function getShopItem(id) {
  return SHOP.find(function(s) { return s.id === id; }) ||
         SHOP_ANGEL.find(function(s) { return s.id === id; }) ||
         SHOP_DEVIL.find(function(s) { return s.id === id; });
}

function buyItem(id) {
  var P = window.getP ? window.getP() : window.P;
  if (!P) return;
  if (!P.inventory) P.inventory = {};

  var item = getShopItem(id);
  if (!item) return;
  if (item.once && P.inventory[id]) return;

  var currency = item.currency || "coins";
  var balance  = currency === "angel" ? (P.angelPoints || 0)
               : currency === "devil"  ? (P.devilPoints || 0)
               : (P.coins || 0);

  if (balance < item.price) return;

  // Списать валюту
  if (currency === "angel")      P.angelPoints = (P.angelPoints || 0) - item.price;
  else if (currency === "devil") P.devilPoints = (P.devilPoints || 0) - item.price;
  else                           P.coins = (P.coins || 0) - item.price;

  // Эффекты предметов
  if (id === "crown")  P.inventory.crown  = true;
  if (id === "flower") P.inventory.flower = true;
  if (id === "toy")    P.inventory.toy    = true;

  if (id === "treat") {
    var petName = P.petName || "Питомец";
    var hunger  = P.petHunger || 0;

    if (hunger > 85) {
      if (!confirm(petName + " сыт (" + hunger + "%). Всё равно покормить?")) {
        P.coins = (P.coins || 0) + item.price;
        if (window.setP) window.setP(P);
        if (window.save) window.save();
        if (window.render) window.render();
        return;
      }
    }

    P.petHunger   = window.cl((P.petHunger || 0) + 30, 0, 100);
    P.petMood     = window.cl((P.petMood   || 3) + 2,  0, 10);
    P.angelPoints = (P.angelPoints || 0) + 1;

    var line1 = "+30% сытости 😊 настроение +2";
    var line2 = hunger < 50
      ? petName + " набросился на угощение! 😋"
      : petName + " не очень голоден, но угощение принял 🐾";
    if (window.showQuestToast) window.showQuestToast(line1, line2, "good");
  }

  if (id === "dice") {
    var k = STAT_KEYS[Math.floor(Math.random() * STAT_KEYS.length)];
    P.stats[k] = window.cl((P.stats[k] || 0) + 5, 0, window.sMax());
    window.popup("🎲 " + STAT_ICONS[k] + "+5", "info");
  }

  if (id === "shield") P.inventory.shield = true;

  if (id === "a_bless") {
    P.petMood = window.cl((P.petMood || 3) + 10, 0, 10);
    window.popup("💛 +10 настроения питомцу", "good");
  }

  if (id === "d_treat") {
    P.petHunger = window.cl((P.petHunger || 0) + 10, 0, 100);
    window.popup("🍖 +10 сытости питомцу", "good");
  }

  if (id === "a_staff")  P.streakProtection = true;

  if (id === "d_armor") {
    P.darkArmorStat   = STAT_KEYS[Math.floor(Math.random() * STAT_KEYS.length)];
    P.darkArmorActive = true;
  }

  if (id === "d_blade") P.doubleCoinsActive = true;

  var visualItems = ["a_nimb","a_wings","a_armor","a_tiara","a_skin",
                     "d_horns","d_cloak","d_crown","d_skin"];
  if (visualItems.indexOf(id) !== -1) P.inventory[id] = true;

  if (["treat","a_bless","d_treat"].indexOf(id) !== -1) {
    checkPetEvolution(P);
  }

  // Обновить глобальный P и сохранить
  if (window.setP) window.setP(P);
  if (window.save) window.save();
  if (window.render) window.render();
}