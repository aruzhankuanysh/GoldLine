import React, { useMemo, useState } from "react";
import { createRoot } from "react-dom/client";
import {
  LayoutDashboard,
  Users,
  Calculator,
  Ticket,
  Gavel,
  Wallet,
  Archive,
  Search,
  Bell,
  Plus,
  ChevronRight,
  ArrowUpRight,
  ArrowDownRight,
  Smartphone,
  Gem,
  Clock3,
  MoreHorizontal,
  Eye,
  X,
  Check,
  Menu,
  LogOut,
  CircleDollarSign,
  FileText,
  Settings,
  BarChart3,
  ShieldCheck,
} from "lucide-react";
import "./styles.css";

import Valuation from "./pages/Valuation";

const money = (n) => new Intl.NumberFormat("ru-RU").format(n) + " ₸";

const clients = [
  {
    id: "920315450011",
    name: "Иванова Алина Сергеевна",
    phone: "+7 777 321 45 12",
    status: "Активен",
    loan: "184 500 ₸",
    item: "Золотая цепь",
  },
  {
    id: "890722350022",
    name: "Ахметов Данияр Маратович",
    phone: "+7 701 882 14 20",
    status: "Активен",
    loan: "320 000 ₸",
    item: "iPhone 15 Pro",
  },
  {
    id: "010126600033",
    name: "Садыкова Мадина Ерлановна",
    phone: "+7 705 442 91 08",
    status: "Закрыт",
    loan: "0 ₸",
    item: "Золотые серьги",
  },
  {
    id: "950804500044",
    name: "Ким Артём Викторович",
    phone: "+7 747 110 27 41",
    status: "Ожидание",
    loan: "95 000 ₸",
    item: "MacBook Air",
  },
];

const tickets = [
  {
    id: "ЗБ-10482",
    client: "Иванова Алина",
    item: "Золотая цепь, 13.1 г",
    amount: 510720,
    status: "Ожидание погашения",
    date: "19.09.2026",
  },
  {
    id: "ЗБ-10481",
    client: "Ахметов Данияр",
    item: "iPhone 15 Pro 256GB",
    amount: 320000,
    status: "Готов к выдаче",
    date: "19.09.2026",
  },
  {
    id: "ЗБ-10477",
    client: "Ким Артём",
    item: "MacBook Air M2",
    amount: 95000,
    status: "Ожидание проверки",
    date: "18.09.2026",
  },
  {
    id: "ЗБ-10462",
    client: "Садыкова Мадина",
    item: "Золотые серьги, 4.8 г",
    amount: 168000,
    status: "Закрыт",
    date: "17.09.2026",
  },
];

const trades = [
  {
    lot: "LOT-2381",
    name: "Золотая цепь 13.1 г",
    category: "Ювелирные изделия",
    price: 525000,
    days: 2,
  },
  {
    lot: "LOT-2377",
    name: "iPhone 14 Pro 256GB",
    category: "Техника",
    price: 265000,
    days: 5,
  },
  {
    lot: "LOT-2372",
    name: "MacBook Pro 14 M2",
    category: "Техника",
    price: 490000,
    days: 7,
  },
];

function App() {
  const [page, setPage] = useState("dashboard");
  const [mobile, setMobile] = useState(false);
  const [showQuick, setShowQuick] = useState(false);
  const [search, setSearch] = useState("");
  const [toast, setToast] = useState("");

  const nav = [
    { id: "dashboard", icon: LayoutDashboard, label: "Главная" },
    { id: "clients", icon: Users, label: "Контрагенты" },
    { id: "valuation", icon: Calculator, label: "Быстрая оценка" },
    { id: "tickets", icon: Ticket, label: "Залоговые билеты" },
    { id: "trades", icon: Gavel, label: "Торги" },
    { id: "cash", icon: Wallet, label: "Касса" },
    { id: "archive", icon: Archive, label: "Архив" },
  ];
  const go = (id) => {
    setPage(id);
    setMobile(false);
  };
  const notify = (msg) => {
    setToast(msg);
    setTimeout(() => setToast(""), 2500);
  };

  return (
    <div className="app">
      <aside className={"sidebar " + (mobile ? "open" : "")}>
        <div className="brand">
          <div className="brand-mark">G</div>
          <div>
            <b>GoldLine</b>
            <span>ЛОМБАРД</span>
          </div>
        </div>
        <div className="point">
          <span className="dot"></span>
          <div>
            <small>Точка продаж</small>
            <strong>Алматы · Абая 42</strong>
          </div>
        </div>
        <nav>
          {nav.map((n) => {
            const Icon = n.icon;
            return (
              <button
                key={n.id}
                className={page === n.id ? "active" : ""}
                onClick={() => go(n.id)}
              >
                <Icon size={19} />
                <span>{n.label}</span>
                {n.id === "tickets" && <em>4</em>}
              </button>
            );
          })}
        </nav>
        <div className="sidebar-bottom">
          <button>
            <Settings size={18} />
            Настройки
          </button>
          <button>
            <LogOut size={18} />
            Выйти
          </button>
        </div>
      </aside>

      <main className="main">
        <header className="topbar">
          <button className="mobile-menu" onClick={() => setMobile(!mobile)}>
            <Menu />
          </button>
          <div className="crumb">
            <span>Ломбард</span>
            <ChevronRight size={15} />
            <b>{nav.find((x) => x.id === page)?.label}</b>
          </div>
          <div className="top-actions">
            <button
              className="icon-btn"
              onClick={() => notify("Новых уведомлений нет")}
            >
              <Bell size={19} />
              <i></i>
            </button>
            <div className="user">
              <div className="avatar">RE</div>
              <div>
                <b>Rustem E.</b>
                <span>Менеджер</span>
              </div>
            </div>
          </div>
        </header>

        <section className="content">
          {page === "dashboard" && (
            <Dashboard onQuick={() => setShowQuick(true)} onGo={go} />
          )}
          {page === "clients" && (
            <Clients
              search={search}
              setSearch={setSearch}
              onQuick={() => setShowQuick(true)}
            />
          )}
          {page === "valuation" && <Valuation onNotify={notify} />}
          {page === "tickets" && (
            <Tickets search={search} setSearch={setSearch} onNotify={notify} />
          )}
          {page === "trades" && <Trades onNotify={notify} />}
          {page === "cash" && <Cash onNotify={notify} />}
          {page === "archive" && <ArchivePage />}
        </section>
      </main>

      {showQuick && (
        <QuickModal
          onClose={() => setShowQuick(false)}
          onDone={() => {
            setShowQuick(false);
            notify("Оценка сохранена");
          }}
        />
      )}
      {toast && (
        <div className="toast">
          <Check size={18} />
          {toast}
        </div>
      )}
    </div>
  );
}

function PageHead({ title, subtitle, children }) {
  return (
    <div className="page-head">
      <div>
        <h1>{title}</h1>
        <p>{subtitle}</p>
      </div>
      <div className="head-actions">{children}</div>
    </div>
  );
}

function Dashboard({ onQuick, onGo }) {
  return (
    <>
      <PageHead
        title="Добрый день, Erlan 👋"
        subtitle="Сводка по вашей точке продаж на 19 сентября 2026"
      >
        <button className="primary" onClick={onQuick}>
          <Plus size={18} />
          Быстрая оценка
        </button>
      </PageHead>
      <div className="stats">
        <Stat
          icon={CircleDollarSign}
          label="Выдано сегодня"
          value="1 284 500 ₸"
          delta="+12.4%"
          up
        />
        <Stat
          icon={Ticket}
          label="Активные билеты"
          value="128"
          delta="+8 сегодня"
          up
        />
        <Stat icon={Gavel} label="На торгах" value="24" delta="3 новых" />
        <Stat
          icon={Wallet}
          label="Касса"
          value="2 486 200 ₸"
          delta="Сверено"
          up
        />
      </div>
      <div className="grid2">
        <div className="card">
          <div className="card-title">
            <div>
              <h3>Операции сегодня</h3>
              <p>Динамика за последние 7 дней</p>
            </div>
            <button className="ghost">7 дней⌄</button>
          </div>
          <div className="chart">
            <div className="chart-y">
              <span>2M</span>
              <span>1.5M</span>
              <span>1M</span>
              <span>500K</span>
              <span>0</span>
            </div>
            <div className="bars">
              {[42, 58, 48, 74, 62, 88, 70].map((h, i) => (
                <div key={i} className="bar-col">
                  <div className="bar" style={{ height: h + "%" }}></div>
                  <span>{["Пн", "Вт", "Ср", "Чт", "Пт", "Сб", "Вс"][i]}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="card">
          <div className="card-title">
            <div>
              <h3>Быстрые действия</h3>
              <p>Часто используемые операции</p>
            </div>
          </div>
          <div className="quick-grid">
            <Action
              icon={Calculator}
              title="Оценить залог"
              text="Золото или техника"
              onClick={onQuick}
            />
            <Action
              icon={Users}
              title="Новый клиент"
              text="Создать анкету"
              onClick={() => onGo("clients")}
            />
            <Action
              icon={Ticket}
              title="Найти билет"
              text="По номеру или ИИН"
              onClick={() => onGo("tickets")}
            />
            <Action
              icon={Wallet}
              title="Экспресс-оплата"
              text="Платежи клиента"
              onClick={() => onGo("cash")}
            />
          </div>
        </div>
      </div>
      <div className="card">
        <div className="card-title">
          <div>
            <h3>Последние залоговые билеты</h3>
            <p>Последние операции вашей точки</p>
          </div>
          <button className="link-btn" onClick={() => onGo("tickets")}>
            Все билеты <ArrowUpRight size={15} />
          </button>
        </div>
        <TicketTable rows={tickets.slice(0, 4)} />
      </div>
    </>
  );
}

function Stat({ icon: Icon, label, value, delta, up }) {
  return (
    <div className="stat">
      <div className="stat-icon">
        <Icon size={20} />
      </div>
      <div>
        <span>{label}</span>
        <strong>{value}</strong>
        <small className={up ? "green" : ""}>
          {up && <ArrowUpRight size={13} />} {delta}
        </small>
      </div>
    </div>
  );
}
function Action({ icon: Icon, title, text, onClick }) {
  return (
    <button className="action" onClick={onClick}>
      <div>
        <Icon size={21} />
      </div>
      <span>
        <b>{title}</b>
        <small>{text}</small>
      </span>
      <ChevronRight size={16} />
    </button>
  );
}

function SearchBox({ value, setValue, placeholder = "Поиск..." }) {
  return (
    <div className="searchbox">
      <Search size={17} />
      <input
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder={placeholder}
      />
    </div>
  );
}

function Clients({ search, setSearch, onQuick }) {
  const filtered = clients.filter((c) =>
    (c.name + c.id + c.phone).toLowerCase().includes(search.toLowerCase()),
  );
  return (
    <>
      <PageHead title="Контрагенты" subtitle="Клиенты и их залоговые операции">
        <button className="secondary" onClick={onQuick}>
          <Calculator size={17} />
          Быстрая оценка
        </button>
        <button className="primary">
          <Plus size={17} />
          Новый клиент
        </button>
      </PageHead>
      <div className="card">
        <div className="toolbar">
          <SearchBox
            value={search}
            setValue={setSearch}
            placeholder="ИИН, ФИО или телефон"
          />
          <button className="filter">Все статусы⌄</button>
        </div>
        <div className="table-wrap">
          <table>
            <thead>
              <tr>
                <th>Клиент</th>
                <th>ИИН</th>
                <th>Телефон</th>
                <th>Залог</th>
                <th>Статус</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((c) => (
                <tr key={c.id}>
                  <td>
                    <div className="person">
                      <div className="mini-avatar">
                        {c.name
                          .split(" ")
                          .map((x) => x[0])
                          .slice(0, 2)
                          .join("")}
                      </div>
                      <div>
                        <b>{c.name}</b>
                        <small>{c.item}</small>
                      </div>
                    </div>
                  </td>
                  <td>{c.id}</td>
                  <td>{c.phone}</td>
                  <td>
                    <b>{c.loan}</b>
                  </td>
                  <td>
                    <Status text={c.status} />
                  </td>
                  <td>
                    <button className="row-btn">
                      <Eye size={17} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}

function Status({ text }) {
  let cls = text.includes("Закрыт")
    ? "closed"
    : text.includes("Готов")
      ? "ready"
      : text.includes("Ожидание")
        ? "waiting"
        : "active";
  return (
    <span className={"status " + cls}>
      <i></i>
      {text}
    </span>
  );
}

function TicketTable({ rows }) {
  return (
    <div className="table-wrap">
      <table>
        <thead>
          <tr>
            <th>№ билета</th>
            <th>Клиент</th>
            <th>Залог</th>
            <th>Сумма</th>
            <th>Статус</th>
            <th>Дата</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((r) => (
            <tr key={r.id}>
              <td>
                <b className="ticket-id">{r.id}</b>
              </td>
              <td>{r.client}</td>
              <td>{r.item}</td>
              <td>
                <b>{money(r.amount)}</b>
              </td>
              <td>
                <Status text={r.status} />
              </td>
              <td>{r.date}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function Tickets({ search, setSearch, onNotify }) {
  const filtered = tickets.filter((t) =>
    (t.id + t.client + t.item).toLowerCase().includes(search.toLowerCase()),
  );
  return (
    <>
      <PageHead
        title="Залоговые билеты"
        subtitle="Поиск и управление действующими договорами"
      >
        <button
          className="primary"
          onClick={() => onNotify("Открыта форма нового залога")}
        >
          <Plus size={17} />
          Новый залог
        </button>
      </PageHead>
      <div className="card">
        <div className="toolbar">
          <SearchBox
            value={search}
            setValue={setSearch}
            placeholder="Номер билета, ИИН или клиент"
          />
          <button className="filter">Все статусы⌄</button>
          <button className="filter">Сегодня⌄</button>
        </div>
        <TicketTable rows={filtered} />
      </div>
    </>
  );
}

//function Valuation({onNotify}){return <><PageHead title="Быстрая оценка" subtitle="Предварительный расчет суммы залога для клиента"></PageHead><div className="valuation-layout"><div className="card valuation-form"><h3>Что оцениваем?</h3><div className="type-switch"><button className="selected"><Gem size={19}/>Золото</button><button><Smartphone size={19}/>Техника</button></div><label>Категория изделия<select><option>Золотые ювелирные изделия</option><option>Золотые часы</option><option>Золотой лом</option></select></label><div className="two"><label>Проба<select><option>585</option><option>750</option><option>999</option></select></label><label>Вес, грамм<input defaultValue="13.1"/></label></div><div className="two"><label>Состояние<select><option>Хорошее</option><option>Новое</option><option>Есть дефекты</option></select></label><label>Клеймо<select><option>Барс</option><option>Иное клеймо</option><option>Нет</option></select></label></div><label>Комплектация<textarea placeholder="Например: коробка, документы, без повреждений"></textarea></label><div className="photo-drop"><Gem size={24}/><b>Добавьте фото изделия</b><span>Фото на весах и крупным планом</span><button className="secondary">Выбрать фото</button></div><button className="primary wide" onClick={()=>onNotify('Оценка рассчитана')}>Рассчитать оценку</button></div><div className="card result"><div className="result-icon"><CircleDollarSign size={30}/></div><span>Предварительная оценка</span><strong>510 720 ₸</strong><div className="result-row"><span>Расчетный вес</span><b>12.8 г</b></div><div className="result-row"><span>Цена за грамм</span><b>39 900 ₸</b></div><div className="result-row"><span>Сумма выдачи</span><b>до 510 720 ₸</b></div><div className="notice"><ShieldCheck size={17}/><span>Итоговая сумма зависит от проверки изделия и заполненных характеристик.</span></div></div></div></>}

function Trades({ onNotify }) {
  return (
    <>
      <PageHead title="Торги" subtitle="Имущество, выставленное на реализацию">
        <button className="secondary">
          <BarChart3 size={17} />
          Отчет о продажах
        </button>
      </PageHead>
      <div className="trade-tabs">
        <button className="selected">
          Торги <b>24</b>
        </button>
        <button>
          Уведомления <b>3</b>
        </button>
        <button>
          Аффинаж <b>7</b>
        </button>
      </div>
      <div className="trade-grid">
        {trades.map((t) => (
          <div className="trade-card" key={t.lot}>
            <div className="trade-image">
              <Gem size={42} />
              <span>{t.days} дн.</span>
            </div>
            <div className="trade-body">
              <small>
                {t.lot} · {t.category}
              </small>
              <h3>{t.name}</h3>
              <div className="trade-price">{money(t.price)}</div>
              <div className="trade-footer">
                <button className="ghost">
                  <Eye size={16} />
                  Просмотр
                </button>
                <button
                  className="primary"
                  onClick={() => onNotify("Товар добавлен в корзину")}
                >
                  В корзину
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

function Cash({ onNotify }) {
  return (
    <>
      <PageHead
        title="Касса"
        subtitle="Контроль денежных средств и операции за сегодня"
      >
        <button
          className="primary"
          onClick={() => onNotify("Касса закрыта успешно")}
        >
          <Check size={17} />
          Закрыть день
        </button>
      </PageHead>
      <div className="stats">
        <Stat
          icon={Wallet}
          label="Остаток кассы"
          value="2 486 200 ₸"
          delta="Сверено"
          up
        />
        <Stat
          icon={ArrowUpRight}
          label="Приход"
          value="1 624 500 ₸"
          delta="32 операции"
          up
        />
        <Stat
          icon={ArrowDownRight}
          label="Расход"
          value="340 200 ₸"
          delta="12 операций"
        />
        <Stat
          icon={FileText}
          label="Кассовая книга"
          value="Готова"
          delta="PDF"
        />
      </div>
      <div className="card">
        <div className="card-title">
          <div>
            <h3>Последние движения</h3>
            <p>Операции кассы за текущий день</p>
          </div>
          <button className="secondary">Кассовая книга</button>
        </div>
        <div className="cash-list">
          {[
            ["14:32", "Полный выкуп", "ЗБ-10462", "+168 000 ₸", true],
            ["13:48", "Выдача займа", "ЗБ-10481", "-320 000 ₸", false],
            ["12:15", "Продление", "ЗБ-10477", "+18 500 ₸", true],
            ["11:42", "Пополнение кассы", "Операция №184", "+500 000 ₸", true],
          ].map((x) => (
            <div className="cash-row" key={x[0]}>
              <span className="time">{x[0]}</span>
              <div>
                <b>{x[1]}</b>
                <small>{x[2]}</small>
              </div>
              <strong className={x[4] ? "plus" : ""}>{x[3]}</strong>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

function ArchivePage() {
  return (
    <>
      <PageHead title="Архив" subtitle="Закрытые билеты и документы"></PageHead>
      <div className="empty card">
        <Archive size={42} />
        <h3>Архив документов</h3>
        <p>
          Здесь будут храниться закрытые залоговые билеты, чеки, ПКО и документы
          выкупа.
        </p>
        <button className="secondary">Открыть архив</button>
      </div>
    </>
  );
}

function QuickModal({ onClose, onDone }) {
  const [tab, setTab] = useState("gold");
  const [weight, setWeight] = useState("13.1");
  const [price, setPrice] = useState("39900");
  const result = Math.max(
    0,
    (parseFloat(weight) || 0) * 0.98 * (parseFloat(price) || 0),
  );
  return (
    <div className="modal-bg" onMouseDown={onClose}>
      <div className="modal" onMouseDown={(e) => e.stopPropagation()}>
        <div className="modal-head">
          <div>
            <h2>Быстрая оценка</h2>
            <p>Предварительная оценка для нового клиента</p>
          </div>
          <button className="row-btn" onClick={onClose}>
            <X />
          </button>
        </div>
        <div className="modal-tabs">
          <button
            className={tab === "gold" ? "active" : ""}
            onClick={() => setTab("gold")}
          >
            <Gem size={18} />
            Золото
          </button>
          <button
            className={tab === "tech" ? "active" : ""}
            onClick={() => setTab("tech")}
          >
            <Smartphone size={18} />
            Техника
          </button>
        </div>
        {tab === "gold" ? (
          <>
            <label>
              Телефон клиента
              <input placeholder="+7 7XX XXX XX XX" />
            </label>
            <div className="two">
              <label>
                Вес, г
                <input
                  value={weight}
                  onChange={(e) => setWeight(e.target.value)}
                />
              </label>
              <label>
                Цена за грамм
                <input
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                />
              </label>
            </div>
            <div className="estimate">
              <span>Предварительная сумма</span>
              <strong>{money(Math.round(result))}</strong>
              <small>Вес с учетом 2% на загрязнение/механизм</small>
            </div>
          </>
        ) : (
          <>
            <label>
              Категория
              <select>
                <option>Смартфон</option>
                <option>Ноутбук</option>
                <option>Планшет</option>
                <option>Другая техника</option>
              </select>
            </label>
            <label>
              Модель
              <input placeholder="Например, iPhone 15 Pro 256GB" />
            </label>
            <label>
              Состояние
              <select>
                <option>Хорошее</option>
                <option>Отличное</option>
                <option>Есть дефекты</option>
              </select>
            </label>
            <div className="estimate">
              <span>Предварительная сумма</span>
              <strong>до 320 000 ₸</strong>
            </div>
          </>
        )}
        <div className="modal-actions">
          <button className="secondary" onClick={onClose}>
            Отмена
          </button>
          <button className="primary" onClick={onDone}>
            Создать оценку <ChevronRight size={17} />
          </button>
        </div>
      </div>
    </div>
  );
}
createRoot(document.getElementById("root")).render(<App />);
