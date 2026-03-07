// ============================================
// DATA.JS — все данные приложения
// Квесты, фразы, магазин, карты вдохновения
// ============================================

const SK = "heroLifeProfile";
const STAT_KEYS = ["health","intelligence","strength","charisma","discipline","energy"];
const STAT_ICONS = {health:"❤️",intelligence:"🧠",strength:"💪",charisma:"✨",discipline:"🛡️",energy:"⚡"};
const STAT_EL = {
  health:{v:"vHP",b:"bHP"},
  intelligence:{v:"vINT",b:"bINT"},
  strength:{v:"vSTR",b:"bSTR"},
  charisma:{v:"vCHA",b:"bCHA"},
  discipline:{v:"vDISC",b:"bDISC"},
  energy:{v:"vEN",b:"bEN"}
};
const MONTH_NAMES = ["Январь","Февраль","Март","Апрель","Май","Июнь","Июль","Август","Сентябрь","Октябрь","Ноябрь","Декабрь"];

// ── ФРАЗЫ ──────────────────────────────────
const GREETINGS = {
  morning: [
    "Новая неделя! {pet} верит в тебя 💪",
    "Вторник. Ты уже в пути! {pet} рядом ☀️",
    "Середина недели! {pet} гордится тобой 🌟",
    "Четверг. Скоро выходные. Но сначала — приключения ⚔️",
    "Пятница! Время для себя. {pet} готов 🐱",
    "Выходной! Позаботься о себе. {pet} предлагает отдохнуть 💤",
    "Воскресенье. Мягкий день. Что хорошего на этой неделе? 🌸"
  ],
  evening: [
    "Вечер. Время подвести итоги. {pet} сворачивается клубком 🌙",
    "День подходит к концу. Ты сделала достаточно. Правда 💜",
    "{pet} зевает. Пора отдыхать. Завтра новые приключения ✨"
  ],
  day: [
    "День в разгаре! {pet} следит за тобой 👀",
    "Обед? Не забудь про воду! {pet} напоминает 💧",
    "Полдень. {pet} верит что сегодня будет хороший день ☀️"
  ],
  night: [
    "Поздновато... {pet} уже спит 😴 Позаботься о себе 💜",
    "Ночь. {pet} мурлычет во сне. Может и тебе пора? 🌙",
    "Тише... {pet} видит сны. Завтра новый день ✨"
  ]
};

const QUEST_REACTIONS = {
  good: [
    "Отлично! {pet} мурчит от гордости 🐱",
    "Есть! Ещё один шаг вперёд 🌟",
    "Маленькая победа — но победа! ✨",
    "{pet} прыгает от радости! 🎉",
    "Чувствуешь? Ты становишься сильнее 💪",
    "Так держать! 🔥",
    "Будущая ты скажет спасибо 💜",
    "Квест выполнен! Ты — героиня ⚔️",
    "Ещё один кирпичик в новую жизнь 🏰",
    "{pet} смотрит с восхищением 🌟"
  ],
  bad: [
    "Бывает. {pet} не осуждает 💜",
    "Честность с собой — уже сила 🛡️",
    "Записано. Завтра будет лучше 🌅",
    "{pet} тычется носом: всё будет хорошо 🐱",
    "Один срыв — не конец пути ✨"
  ]
};

const COMEBACK_PHRASES = [
  "Вчера был непростой день? {pet} ждёт тебя 🐱",
  "Пропуск — это пауза, не конец. Ты здесь — значит не сдалась 💪",
  "{pet} загрустил вчера. Но он знает — ты вернёшься 💜",
  "Новый день. Чистый лист. Начнём? ☀️",
  "Знаешь что главное? Что ты открыла приложение. Это уже победа ✨"
];

const STREAK_ICONS = {"-1":"💤", "0":"🔥", "1":"🔥🔥", "2":"🔥🔥🔥", "3":"👑🔥"};
const STREAK_NAMES = {"-1":"",  "0":"Огонёк", "1":"Пламя", "2":"Костёр", "3":"Корона"};
const MILESTONE_PHRASES = {
  3:  "Начало положено! 🔥",
  7:  "НЕДЕЛЯ! Большинство бросают на третий. А ты нет 🔥🔥",
  14: "Две недели. Это характер 🔥🔥🔥",
  30: "МЕСЯЦ. Ты невероятна 👑🔥"
};

// ── КВЕСТЫ ─────────────────────────────────
const QUESTS = [
  {id:"q1", type:"good", icon:"💧", title:"Стакан воды после пробуждения",
    desc:"Сразу после будильника", tip:"Тело теряет за ночь до 1л воды",
    coins:5, difficulty:"easy", alignment:"neutral", stats:{health:1,energy:1}},

  {id:"q2", type:"good", icon:"😴", title:"Лечь спать до 23:00",
    desc:"Будильник-напоминание на 22:30", tip:"Каждый час сна до полуночи = два после",
    coins:10, difficulty:"medium", alignment:"devil", stats:{health:2,energy:1}},

  {id:"q3", type:"good", icon:"🚶", title:"Прогулка 15-30 минут",
    desc:"После обеда или работы", tip:"20 мин на улице снижают кортизол на 25%",
    coins:10, difficulty:"medium", alignment:"angel", stats:{health:2,energy:1}},

  {id:"q4", type:"good", icon:"🍽️", title:"Осознанный приём пищи",
    desc:"Не у экрана, не на бегу", tip:"Еда у экрана: ешь на 30% больше",
    coins:10, difficulty:"medium", alignment:"angel", stats:{health:2}},

  {id:"q5", type:"good", icon:"🏋️", title:"Тренировка 20+ минут",
    desc:"Любая: зарядка, йога, бег", tip:"Лучшая тренировка — та что делаешь",
    coins:20, difficulty:"hard", alignment:"devil", stats:{health:2,strength:2}},

  {id:"q6", type:"good", icon:"☀️", title:"Выйти на солнце на 10 минут",
    desc:"До обеда", tip:"80% россиян — дефицит витамина D",
    coins:5, difficulty:"easy", alignment:"neutral", stats:{health:1,energy:1}},

  {id:"q7", type:"good", icon:"📖", title:"Прочитать 10 страниц книги",
    desc:"Перед сном вместо телефона", tip:"10 стр/день = 12 книг в год",
    coins:10, difficulty:"medium", alignment:"neutral", stats:{intelligence:2}},

  {id:"q8", type:"good", icon:"📝", title:"Записать 3 задачи на сегодня",
    desc:"Утром после кофе. Ровно 3, не 10", tip:"Мозг не держит больше 3-4 приоритетов",
    coins:5, difficulty:"easy", alignment:"neutral", stats:{intelligence:1,discipline:1}},

  {id:"q9", type:"good", icon:"🎧", title:"Подкаст или аудиокнига 15 мин",
    desc:"В дороге, на прогулке, при уборке", tip:"Обучение без отдельного времени",
    coins:10, difficulty:"medium", alignment:"angel", stats:{intelligence:2}},

  {id:"q10", type:"good", icon:"📓", title:"Дневник: мысли или рефлексия",
    desc:"Вечером, 5-10 минут", tip:"Экспрессивное письмо снижает тревогу на 40%",
    coins:10, difficulty:"medium", alignment:"angel", stats:{intelligence:2,health:1}},

  {id:"q11", type:"good", icon:"💻", title:"1 урок или видео по обучению",
    desc:"Выделить 30 мин заранее", tip:"Один урок — прогресс. Не весь курс за день",
    coins:15, difficulty:"hard", alignment:"devil", stats:{intelligence:3}},

  {id:"q12", type:"good", icon:"🤸", title:"Утренняя разминка 5-10 минут",
    desc:"После стакана воды", tip:"5 минут движения = двигатель на день",
    coins:10, difficulty:"easy", alignment:"neutral", stats:{strength:1,energy:2}},

  {id:"q13", type:"good", icon:"⚔️", title:"Первый шаг в отложенном деле",
    desc:"Только 5 минут! Первый час дня", tip:"Не закончить а НАЧАТЬ. 80% продолжат",
    coins:15, difficulty:"hard", alignment:"devil", stats:{strength:3,discipline:1}},

  {id:"q14", type:"good", icon:"🛑", title:"Мягко отказать в ненужном",
    desc:"В момент просьбы", tip:"Каждое ненужное да = нет себе",
    coins:15, difficulty:"hard", alignment:"devil", stats:{strength:3,charisma:1}},

  {id:"q15", type:"good", icon:"🧊", title:"Холодное умывание или контрастный душ",
    desc:"Утром при умывании", tip:"Блуждающий нерв → прилив бодрости",
    coins:10, difficulty:"medium", alignment:"devil", stats:{strength:2,energy:1}},

  {id:"q16", type:"good", icon:"🧹", title:"Порядок в одной зоне 15 мин",
    desc:"Один ящик, одна полка", tip:"Внешний порядок = внутренний порядок",
    coins:10, difficulty:"easy", alignment:"neutral", stats:{strength:1,discipline:1}},

  {id:"q17", type:"good", icon:"🦁", title:"Сделать одну вещь которая пугает",
    desc:"1-2 раза в неделю", tip:"Одно страшное дело в неделю — за год ты другой человек",
    coins:25, difficulty:"hard", alignment:"devil", stats:{strength:4,charisma:2}},

  {id:"q18", type:"good", icon:"💖", title:"Отметить что в себе нравится",
    desc:"Утром или перед сном", tip:"Тренировка замечать хорошее в себе",
    coins:10, difficulty:"easy", alignment:"angel", stats:{charisma:2,health:1}},

  {id:"q19", type:"good", icon:"🙏", title:"Принять комплимент словом спасибо",
    desc:"Когда скажут приятное", tip:"Обесценивание комплимента = обесценивание себя",
    coins:10, difficulty:"medium", alignment:"angel", stats:{charisma:3}},

  {id:"q20", type:"good", icon:"📞", title:"Написать или позвонить кому-то первой",
    desc:"В обед или вечером", tip:"Качество отношений — предиктор счастья #1",
    coins:10, difficulty:"medium", alignment:"angel", stats:{charisma:2,health:1}},

  {id:"q21", type:"good", icon:"🏆", title:"Рассказать о своём достижении",
    desc:"1-2 раза в неделю", tip:"Видимость заслуг — навык, не хвастовство",
    coins:15, difficulty:"hard", alignment:"devil", stats:{charisma:3,strength:1}},

  {id:"q22", type:"good", icon:"🧘", title:"30 минут наедине по СВОЕМУ выбору",
    desc:"Вечером или в выходные", tip:"Одиночество по выбору = роскошь",
    coins:10, difficulty:"medium", alignment:"angel", stats:{charisma:2,energy:1}},

  {id:"q23", type:"good", icon:"🪞", title:"Поймала сравнение — запиши достижение",
    desc:"В момент сравнения с другими", tip:"Перенаправить внимание на себя",
    coins:15, difficulty:"medium", alignment:"angel", stats:{charisma:3,intelligence:1}},

  {id:"q24", type:"good", icon:"🛏️", title:"Заправить кровать",
    desc:"Сразу после подъёма", tip:"Первая завершённая задача = цепочка побед. 30 секунд",
    coins:5, difficulty:"easy", alignment:"neutral", stats:{discipline:1}},

  {id:"q25", type:"good", icon:"✅", title:"Выполнить 3 из запланированных задач",
    desc:"Вечером подвести итог", tip:"3 из 5 = успех. Антиперфекционизм",
    coins:10, difficulty:"medium", alignment:"neutral", stats:{discipline:2,intelligence:1}},

  {id:"q26", type:"good", icon:"🎯", title:"1 час фокуса без отвлечений",
    desc:"Своё продуктивное время", tip:"1 час фокуса = 3 часа с отвлечениями",
    coins:15, difficulty:"hard", alignment:"devil", stats:{discipline:3,intelligence:1}},

  {id:"q27", type:"good", icon:"🎒", title:"Подготовить вещи на завтра",
    desc:"Перед сном, 10 минут", tip:"Подарок завтрашней себе",
    coins:10, difficulty:"easy", alignment:"neutral", stats:{discipline:2}},

  {id:"q28", type:"good", icon:"🛡️", title:"Защитить своё дело от чужой просьбы",
    desc:"Когда возникнет ситуация", tip:"Твой план — обещание самой себе",
    coins:15, difficulty:"hard", alignment:"devil", stats:{discipline:3,strength:1}},

  {id:"q29", type:"good", icon:"⏳", title:"Перед покупкой подождать 24 часа",
    desc:"В момент импульса", tip:"Через 24ч дофамин спадёт",
    coins:10, difficulty:"medium", alignment:"devil", stats:{discipline:2}},

  {id:"q30", type:"good", icon:"⏰", title:"По первому будильнику без snooze",
    desc:"Утро", tip:"5 snooze = 5 прерванных циклов сна",
    coins:10, difficulty:"medium", alignment:"devil", stats:{energy:2}},

  {id:"q31", type:"good", icon:"🤫", title:"5 минут тишины без телефона",
    desc:"В любое время", tip:"5 минут тишины = перезагрузка",
    coins:10, difficulty:"easy", alignment:"angel", stats:{energy:2,intelligence:1}},

  {id:"q32", type:"good", icon:"💤", title:"Дневной отдых 15-20 минут",
    desc:"После обеда 13-15", tip:"NASA: 20 мин = +34% продуктивности",
    coins:10, difficulty:"medium", alignment:"angel", stats:{energy:3}},

  {id:"q33", type:"good", icon:"📵", title:"Вечер без экранов",
    desc:"Книга, рукоделие, общение. За 1ч до сна", tip:"Экраны = ложный отдых",
    coins:10, difficulty:"medium", alignment:"angel", stats:{energy:2,intelligence:1}},

  {id:"q34", type:"good", icon:"💃", title:"Потанцевать 5 минут под любимое",
    desc:"При упадке энергии", tip:"Движение + музыка = мгновенная перезагрузка",
    coins:10, difficulty:"easy", alignment:"angel", stats:{energy:2,charisma:1}},

  {id:"q35", type:"good", icon:"🙏", title:"Записать 3 благодарности за сегодня",
    desc:"Вечером, последнее перед сном", tip:"Доказано: +25% счастья за 2 недели",
    coins:10, difficulty:"easy", alignment:"angel", stats:{energy:1,charisma:1,health:1}}
];

// ── ВДОХНОВЕНИЕ ────────────────────────────
const INSPIRATION_CARDS = {
  creativity: [
    {id:"c1", icon:"🎨", title:"Нарисуй своё настроение",
      desc:"Возьми лист или открой заметки. Нарисуй как чувствуешь себя прямо сейчас. Линии, цвета, каракули — всё считается.",
      tip:"Рисование снижает кортизол на 75%", time:5, coins:3, stat:"charisma"},
    {id:"c2", icon:"📸", title:"Сфотографируй красоту в обычном",
      desc:"Найди что-то красивое рядом. Свет, тень, текстура. Одна фотография.",
      tip:"Тренировка замечать хорошее", time:5, coins:3, stat:"charisma"},
    {id:"c3", icon:"🎵", title:"Составь плейлист настроения",
      desc:"Добавь 5-7 песен которые отражают как ты себя чувствуешь сейчас.",
      tip:"Музыка — самый быстрый способ сменить настроение", time:10, coins:3, stat:"energy"},
    {id:"c4", icon:"✍️", title:"Напиши 6-словную историю своей жизни",
      desc:"Всего 6 слов. Попробуй несколько вариантов. Хемингуэй написал: Продаются детские ботинки, неношеные.",
      tip:"Ограничения развивают креативность", time:3, coins:3, stat:"intelligence"},
    {id:"c5", icon:"🤲", title:"Сделай что-то руками",
      desc:"Слепи из пластилина, сложи оригами, вышей стежок. Что угодно руками.",
      tip:"Мелкая моторика успокаивает нервную систему", time:15, coins:5, stat:"discipline"},
    {id:"c6", icon:"🌅", title:"Опиши идеальный обычный день",
      desc:"Не мечту, а просто хороший день. Что в нём есть? Напиши в заметках.",
      tip:"Помогает понять что тебе реально важно", time:10, coins:5, stat:"intelligence"},
    {id:"c7", icon:"💌", title:"Напиши письмо себе через месяц",
      desc:"Что хочешь чтобы случилось? Как ты хочешь себя чувствовать? Сохрани.",
      tip:"Письма себе повышают осознанность целей", time:10, coins:5, stat:"discipline"},
    {id:"c8", icon:"👩‍🍳", title:"Приготовь по новому рецепту",
      desc:"Найди рецепт чего-то чего никогда не готовила. Приготовь прямо сейчас или запланируй на сегодня.",
      tip:"Новые навыки = новые нейронные связи", time:20, coins:5, stat:"strength"}
  ],
  challenge: [
    {id:"ch1", icon:"🦵", title:"20 приседаний прямо сейчас",
      desc:"Встань и сделай 20 приседаний. Медленно, с правильной техникой.",
      tip:"Дофамин от быстрого достижения", time:1, coins:3, stat:"strength"},
    {id:"ch2", icon:"🗑️", title:"Удали 10 ненужных фото",
      desc:"Открой галерею. Удали 10 фото которые точно не нужны.",
      tip:"Цифровое захламление = ментальный шум", time:5, coins:3, stat:"discipline"},
    {id:"ch3", icon:"⭐", title:"Напиши отзыв или рекомендацию",
      desc:"Мастеру, кафе, книге, приложению. Хорошему — хорошее слово.",
      tip:"Благодарность улучшает настроение дающего", time:5, coins:3, stat:"charisma"},
    {id:"ch4", icon:"🔧", title:"Исправь мелочь которая раздражает",
      desc:"Та вещь которую откладываешь. Перегоревшая лампочка, неудобный ярлык.",
      tip:"Мелкие раздражители накапливаются и тратят энергию", time:10, coins:3, stat:"discipline"},
    {id:"ch5", icon:"🦸", title:"Постой 2 минуты в позе силы",
      desc:"Встань прямо, руки на бёдрах или вверх, подбородок вверх. 2 минуты.",
      tip:"Поза влияет на уровень кортизола и тестостерона", time:2, coins:3, stat:"strength"},
    {id:"ch6", icon:"👋", title:"Заговори с незнакомым",
      desc:"Скажи что-то приятное: продавцу, соседу, человеку в очереди.",
      tip:"Случайные связи повышают счастье", time:1, coins:3, stat:"charisma"},
    {id:"ch7", icon:"📨", title:"Отправь сообщение которое откладываешь",
      desc:"Оно уже давно ждёт. Напиши прямо сейчас. Коротко.",
      tip:"Незавершённые дела занимают ментальное пространство", time:3, coins:5, stat:"strength"},
    {id:"ch8", icon:"⚖️", title:"Узнай одну вещь о своих правах",
      desc:"Как потребитель, работник, гражданин. Один факт.",
      tip:"Знание своих прав = уверенность", time:10, coins:5, stat:"intelligence"}
  ],
  care: [
    {id:"ca1", icon:"☕", title:"Сделай напиток красиво",
      desc:"Чай, кофе, воду с лимоном. Красивая кружка, может пенка или лёд. Насладись процессом.",
      tip:"Маленькие ритуалы снижают стресс", time:5, coins:3, stat:"health"},
    {id:"ca2", icon:"🤗", title:"Обними кого-то на 20 секунд",
      desc:"Именно 20 — меньше не работает. Питомца тоже считается.",
      tip:"20 секунд объятий = выброс окситоцина", time:1, coins:3, stat:"health"},
    {id:"ca3", icon:"📱", title:"Позвони маме или папе просто так",
      desc:"Не по делу. Просто спросить как дела.",
      tip:"Связь с близкими — предиктор долголетия", time:5, coins:5, stat:"charisma"},
    {id:"ca4", icon:"🛋️", title:"Полежи 10 минут просто так",
      desc:"Без телефона. Без задач. Просто лечь и побыть.",
      tip:"Ненаправленное мышление — важная функция мозга", time:10, coins:3, stat:"energy"},
    {id:"ca5", icon:"🥇", title:"Вспомни 3 момента гордости",
      desc:"За эту неделю или за всё время. Запиши или просто вспомни.",
      tip:"Работает как антидепрессант без побочных эффектов", time:5, coins:5, stat:"charisma"},
    {id:"ca6", icon:"🫀", title:"Поблагодари своё тело",
      desc:"Скажи спасибо: ногам за то что ходят, рукам за то что создают.",
      tip:"Телесная осознанность снижает тревогу", time:3, coins:3, stat:"health"},
    {id:"ca7", icon:"💬", title:"Напиши кому-то скучаю",
      desc:"Тому кому давно не писала. Одно сообщение.",
      tip:"Поддержание связей требует активных действий", time:2, coins:3, stat:"charisma"},
    {id:"ca8", icon:"🕊️", title:"Прости себе одну вещь",
      desc:"Что-то за что ругаешь себя. Скажи себе: я делала лучшее что могла тогда.",
      tip:"Самосострадание = основа психологической устойчивости", time:3, coins:5, stat:"health"}
  ],
  explore: [
    {id:"e1", icon:"🗺️", title:"Пройди другой дорогой",
      desc:"В магазин, на работу, на прогулку. Другой маршрут.",
      tip:"Новые маршруты = новые нейронные связи", time:5, coins:3, stat:"intelligence"},
    {id:"e2", icon:"🎼", title:"10 мин музыки нового жанра",
      desc:"Жанр который никогда не слушала. Джаз, фолк, босанова, k-pop.",
      tip:"Музыкальные предпочтения расширяются через практику", time:10, coins:3, stat:"intelligence"},
    {id:"e3", icon:"🗣️", title:"Выучи фразу на необычном языке",
      desc:"Финский, суахили, японский. Одну фразу. Произнеси вслух.",
      tip:"Изучение языков — лучшая тренировка для мозга", time:3, coins:3, stat:"intelligence"},
    {id:"e4", icon:"🌍", title:"1 факт о незнакомой стране",
      desc:"Любая страна которая пришла в голову. Один интересный факт.",
      tip:"Любопытство — двигатель развития", time:5, coins:3, stat:"intelligence"},
    {id:"e5", icon:"🍜", title:"Попробуй еду которую не ела",
      desc:"В магазине, кафе или приготовь. Что-то новое.",
      tip:"Открытость к новому связана с эмоциональной гибкостью", time:5, coins:3, stat:"health"},
    {id:"e6", icon:"🎤", title:"TED Talk на случайную тему",
      desc:"Открой ted.com/talks и выбери рандомно. 15 минут.",
      tip:"Один новый взгляд меняет больше чем кажется", time:15, coins:5, stat:"intelligence"},
    {id:"e7", icon:"👥", title:"Узнай что-то новое о человеке рядом",
      desc:"Спроси что-то что никогда не спрашивала: любимое детское воспоминание, мечта.",
      tip:"Глубокие вопросы сближают быстрее small talk", time:2, coins:3, stat:"charisma"},
    {id:"e8", icon:"📚", title:"Случайная статья Википедии",
      desc:"Открой wikipedia.org/wiki/Special:Random Прочитай.",
      tip:"Случайные знания часто самые ценные", time:10, coins:3, stat:"intelligence"}
  ]
};

// ── МАГАЗИНЫ ───────────────────────────────
const SHOP = [
  {id:"crown",  icon:"👑", name:"Корона новичка",    desc:"Добавляет 👑 к аватару",              price:50,  once:true},
  {id:"flower", icon:"🌺", name:"Цветок в комнату",  desc:"+1 здоровье каждый день",             price:80,  once:true},
  {id:"treat",  icon:"🍖", name:"Угощение для пета", desc:"+30% сытости, +2 настроение",          price:20,  once:false},
  {id:"toy",    icon:"🎀", name:"Игрушка для пета",  desc:"Играть 1 раз в день, +3 настроение",  price:80,  once:true},
  {id:"dice",   icon:"🎲", name:"Кубик удачи",       desc:"Случайный стат +5",                   price:30,  once:false},
  {id:"shield", icon:"🛡️", name:"Щит от штрафа",    desc:"Защита от 1 штрафа",                  price:50,  once:false}
];

const SHOP_ANGEL = [
  {id:"a_nimb",   icon:"😇", name:"Нимб Милосердия",    desc:"Золотое свечение аватара",      price:15, currency:"angel", once:true},
  {id:"a_wings",  icon:"🕊️", name:"Крылья Рассвета",   desc:"Крылышки у аватара",            price:35, currency:"angel", once:true},
  {id:"a_armor",  icon:"🛡️", name:"Светлая броня",      desc:"-1 к требованию босса",         price:25, currency:"angel", once:true},
  {id:"a_bless",  icon:"💛", name:"Благословение",      desc:"Питомец +10 настроения",        price:10, currency:"angel", once:false},
  {id:"a_tiara",  icon:"👸", name:"Тиара Зари",         desc:"Головной убор аватара",         price:45, currency:"angel", once:true},
  {id:"a_staff",  icon:"🌟", name:"Посох Исцеления",    desc:"Защитить 1 день streak",        price:30, currency:"angel", once:false},
  {id:"a_skin",   icon:"☁️", name:"Светлый скин питомца", desc:"Небесный вид питомца",       price:75, currency:"angel", once:true}
];

const SHOP_DEVIL = [
  {id:"d_horns",  icon:"😈", name:"Рога Тени",          desc:"Рога у аватара",                price:15, currency:"devil", once:true},
  {id:"d_cloak",  icon:"🌑", name:"Теневой плащ",       desc:"Плащ у аватара",                price:35, currency:"devil", once:true},
  {id:"d_armor",  icon:"⚔️", name:"Тёмная броня",       desc:"+2 к одному стату на 24ч",      price:25, currency:"devil", once:false},
  {id:"d_treat",  icon:"🍖", name:"Теневое лакомство",  desc:"Питомец +10 сытости",           price:10, currency:"devil", once:false},
  {id:"d_crown",  icon:"👑", name:"Корона Полуночи",    desc:"Головной убор аватара",         price:45, currency:"devil", once:true},
  {id:"d_blade",  icon:"🗡️", name:"Клинок Дисциплины", desc:"x2 монеты за квесты на 1 день", price:30, currency:"devil", once:false},
  {id:"d_skin",   icon:"🌑", name:"Тёмный скин питомца", desc:"Теневой вид питомца",         price:75, currency:"devil", once:true}
];