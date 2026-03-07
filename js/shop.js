// ============================================
// SHOP.JS — логика магазина
// ============================================

let currentShopTab = "coins";

// Рендер магазина
function renderShop() {
  const list = document.getElementById("shopList");
  if (!list) return;
  list.innerHTML = "";

  const closed     = P && P.dayCompleted;
  const closedText = document.getElementById("shopClosedText");
  if (closedText) closedText.style.display = closed ? "block" : "none";

  const arr = currentShopTab === "angel" ? SHOP_ANGEL
            : currentShopTab === "devil" ? SHOP_DEVIL
            : SHOP;

  const currencyIcon = currentShopTab === "angel" ? "😇"
                     : currentShopTab === "devil"  ? "😈"
                     : "💰";

  const balance = currentShopTab === "angel" ? (P.angelPoints || 0)
                : currentShopTab === "devil"  ? (P.devilPoints || 0)
                : (P.coins || 0);

  arr.forEach(function(s) {
    const owned    = P.inventory && P.inventory[s.id];
    const canBuy   = balance >= s.price;
    const disabled = closed || (!canBuy && !owned) || (s.once && owned);
    const btnText  = s.once && owned ? "Куплено ✓" : "Купить";

    const div = document.createElement("div");
    div.className = "shop-item";
    div.innerHTML =
      '<div class="shop-main">' +
        '<span class="shop-icon">' + s.icon + '</span>' +
        '<div class="shop-text">' +
          '<div class="shop-name">'  + s.name + '</div>' +
          '<div class="shop-desc">'  + s.desc + '</div>' +
        '</div>' +
      '</div>' +
      '<span class="shop-price">' + s.price + currencyIcon + '</span>' +
      '<button class="shop-buy-btn" data-shop="' + s.id + '" ' + (disabled ? "disabled" : "") + '>' +
        btnText +
      '</button>';
    list.appendChild(div);
  });

  // Подсветить активную вкладку
  document.querySelectorAll(".shop-sub-tab").forEach(function(btn) {
    btn.classList.toggle(
      "shop-sub-tab--active",
      btn.getAttribute("data-shop-tab") === currentShopTab
    );
  });

  // Заголовок с балансом
  const shopTitleText = document.getElementById("shopTitleText");
  if (shopTitleText) {
    const coins = P.coins || 0;
    const angel = P.angelPoints || 0;
    const devil = P.devilPoints || 0;
    if (currentShopTab === "coins") {
      shopTitleText.innerHTML = '💰 Монеты — <span class="shop-title-coins">' + coins + '</span>';
    } else if (currentShopTab === "angel") {
      shopTitleText.innerHTML = '😇 Свет — <span class="shop-title-coins">' + angel + '</span>';
    } else {
      shopTitleText.innerHTML = '😈 Тень — <span class="shop-title-coins">' + devil + '</span>';
    }
  }
}

// Найти предмет в любом магазине
function getShopItem(id) {
  return SHOP.find(function(s) { return s.id === id; }) ||
         SHOP_ANGEL.find(function(s) { return s.id === id; }) ||
         SHOP_DEVIL.find(function(s) { return s.id === id; });
}

// Купить предмет
function buyItem(id) {
  if (!P) return;
  if (!P.inventory) P.inventory = {};

  const item = getShopItem(id);
  if (!item) return;
  if (item.once && P.inventory[id]) return;

  const currency = item.currency || "coins";
  const balance  = currency === "angel" ? (P.angelPoints || 0)
                 : currency === "devil"  ? (P.devilPoints || 0)
                 : (P.coins || 0);

  if (balance < item.price) return;

  // Списать валюту
  if (currency === "angel")     P.angelPoints = (P.angelPoints || 0) - item.price;
  else if (currency === "devil") P.devilPoints = (P.devilPoints || 0) - item.price;
  else                           P.coins -= item.price;

  // Применить эффект предмета
  if (id === "crown")  P.inventory.crown  = true;
  if (id === "flower") P.inventory.flower = true;
  if (id === "toy")    P.inventory.toy    = true;

  if (id === "treat") {
    P.petHunger   = cl((P.petHunger || 0) + 30, 0, 100);
    P.petMood     = cl((P.petMood   || 3) + 2,  0, 10);
    P.angelPoints = (P.angelPoints  || 0) + 1;
  }

  if (id === "dice") {
    const k = STAT_KEYS[Math.floor(Math.random() * STAT_KEYS.length)];
    P.stats[k] = cl((P.stats[k] || 0) + 5, 0, sMax());
    popup("🎲 " + STAT_ICONS[k] + "+5", "info");
  }

  if (id === "shield")  P.inventory.shield = true;

  if (id === "a_bless") {
    P.petMood = cl((P.petMood || 3) + 10, 0, 10);
    popup("💛 +10 настроения питомцу", "good");
  }

  if (id === "d_treat") {
    P.petHunger = cl((P.petHunger || 0) + 10, 0, 100);
    popup("🍖 +10 сытости питомцу", "good");
  }

  if (id === "a_staff")  P.streakProtection = true;

  if (id === "d_armor") {
    P.darkArmorStat   = STAT_KEYS[Math.floor(Math.random() * STAT_KEYS.length)];
    P.darkArmorActive = true;
  }

  if (id === "d_blade") P.doubleCoinsActive = true;

  // Визуальные предметы
  const visualItems = [
    "a_nimb","a_wings","a_armor","a_tiara","a_skin",
    "d_horns","d_cloak","d_crown","d_skin"
  ];
  if (visualItems.indexOf(id) !== -1) P.inventory[id] = true;

  // Проверить эволюцию если покормили
  if (["treat","a_bless","d_treat"].indexOf(id) !== -1) {
    checkPetEvolution(P);
  }

  save();
  render();
}