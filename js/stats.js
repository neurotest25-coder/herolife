// ============================================
// STATS.JS — статистика и календарь
// ============================================

let statsMonthOffset = 0;

function renderStats() {
  if (!P) return;

  // ── Streak ──
  const streakNum = P.streak || 0;
  const streakBox = document.getElementById("statsStreak");
  if (streakBox) {
    const missed = P.missedDays || 0;
    const stage  = getStreakStage(streakNum, missed);
    const icon   = STREAK_ICONS[String(stage)] || "💤";
    const name   = STREAK_NAMES[String(stage)] || "";
    if (stage >= 0) {
      streakBox.innerHTML =
        '<span class="streak-fire">' + icon + '</span> ' +
        (name ? name + " | " : "") +
        declDays(streakNum) + " подряд!";
    } else {
      streakBox.textContent = "💤 Нет серии";
    }
  }

  // ── Календарь ──
  const cal = document.getElementById("statsCalendar");
  if (cal) {
    cal.innerHTML = "";

    const realToday = new Date();
    realToday.setHours(0, 0, 0, 0);
    const realYear  = realToday.getFullYear();
    const realMonth = realToday.getMonth();

    const base = new Date();
    base.setHours(0, 0, 0, 0);
    const view = new Date(base.getFullYear(), base.getMonth() + statsMonthOffset, 1);
    const year  = view.getFullYear();
    const month = view.getMonth();

    // Заголовок месяца
    const monthLabel = document.getElementById("statsCalendarMonth");
    if (monthLabel) {
      monthLabel.textContent = "📅 " + MONTH_NAMES[month] + " " + year;
    }

    // Кнопки навигации
    const prevBtn = document.getElementById("statsMonthPrev");
    const nextBtn = document.getElementById("statsMonthNext");
    if (prevBtn) prevBtn.onclick = function() { statsMonthOffset--; renderStats(); };
    if (nextBtn) nextBtn.onclick = function() { statsMonthOffset++; renderStats(); };

    // Построить сетку
    const first        = new Date(year, month, 1);
    const startCol     = (first.getDay() + 6) % 7; // Пн = 0
    const daysInMonth  = new Date(year, month + 1, 0).getDate();
    const hist         = P.history || {};

    const usedCells    = startCol + daysInMonth;
    const rows         = Math.max(Math.ceil(usedCells / 7), 4);
    const totalCells   = rows * 7;
    const trailing     = totalCells - usedCells;

    // Пустые ячейки до 1-го числа
    for (let i = 0; i < startCol; i++) {
      const empty = document.createElement("div");
      empty.className = "stats-cell";
      cal.appendChild(empty);
    }

    // Дни месяца
    for (let day = 1; day <= daysInMonth; day++) {
      const cellDate = new Date(year, month, day);
      cellDate.setHours(0, 0, 0, 0);

      const key = year + "-" +
        String(month + 1).padStart(2, "0") + "-" +
        String(day).padStart(2, "0");

      const h = hist[key];

      const isSameMonth  = year === realYear && month === realMonth;
      const isToday      = isSameMonth && cellDate.getTime() === realToday.getTime();
      const isFuture     = cellDate.getTime() > realToday.getTime();

      let cls = "stats-cell";
      if (!isFuture && h) {
        cls += h.good >= 3 ? " stats-cell--active" : " stats-cell--bad";
      }
      if (isToday) cls += " stats-cell--today";

      const cell = document.createElement("div");
      cell.className   = cls;
      cell.title       = key;
      cell.textContent = String(day);
      cal.appendChild(cell);
    }

    // Пустые ячейки после последнего дня
    for (let i = 0; i < trailing; i++) {
      const empty = document.createElement("div");
      empty.className = "stats-cell";
      cal.appendChild(empty);
    }
  }

  // ── Итоги ──
  const td = P.totalDays        || 0;
  const tq = P.totalQuests      || 0;
  const tc = P.totalCoinsEarned || 0;

  const elDays   = document.getElementById("statsTotalDays");
  const elQuests = document.getElementById("statsTotalQuests");
  const elCoins  = document.getElementById("statsTotalCoins");

  if (elDays)   elDays.textContent   = "📅 Всего дней: "      + td;
  if (elQuests) elQuests.textContent = "✅ Всего квестов: "   + tq;
  if (elCoins)  elCoins.textContent  = "💰 Всего заработано: " + tc;
}

// Вычислить стадию streak с учётом пропусков
function getStreakStage(streak, missedDays) {
  let stage;
  if      (streak >= 30) stage = 3;
  else if (streak >= 14) stage = 2;
  else if (streak >= 7)  stage = 1;
  else if (streak >= 1)  stage = 0;
  else return -1;

  stage = Math.max(-1, stage - missedDays);
  return stage;
}

// Склонение слова "день"
function declDays(n) {
  const abs = Math.abs(n) % 100;
  const mod = abs % 10;
  if (abs >= 11 && abs <= 19) return n + " дней";
  if (mod === 1)               return n + " день";
  if (mod >= 2 && mod <= 4)   return n + " дня";
  return n + " дней";
}