import React, { useMemo } from "react";
import { CircleDollarSign, ShieldCheck } from "lucide-react";

const money = (n) => new Intl.NumberFormat("ru-RU").format(n) + " ₸";

export default function TechValuation({
  type,
  onNotify,
  brand,
  setBrand,
  marketPrice,
  setMarketPrice,
  defects,
  setDefects,
}) {
  const toggleDefect = (key) => {
    setDefects((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const { totalDiscount, finalAmount } = useMemo(() => {
    let discountPercent = 15;
    if (defects.scratches) discountPercent += 10;
    if (defects.screenChips) discountPercent += 25;
    if (defects.batteryBad) discountPercent += 15;
    if (defects.noBox) discountPercent += 10;
    if (defects.repaired) discountPercent += 20;

    const price = parseFloat(marketPrice) || 0;
    const discountSum = Math.round(price * (discountPercent / 100));

    return {
      totalDiscount: discountPercent,
      finalAmount: Math.max(0, price - discountSum),
    };
  }, [marketPrice, defects]);

  if (type === "form") {
    return (
      <>
        <div className="two">
          <label>
            Бренд
            <select value={brand} onChange={(e) => setBrand(e.target.value)}>
              <option value="Apple">Apple (iPhone, MacBook)</option>
              <option value="Samsung">Samsung</option>
              <option value="Sony">Sony / PlayStation</option>
              <option value="Other">Другой бренд</option>
            </select>
          </label>
          <label>
            Рыночная цена б/у (₸)
            <input
              type="number"
              value={marketPrice}
              onChange={(e) => setMarketPrice(e.target.value)}
            />
          </label>
        </div>

        <div className="defects-section" style={{ margin: "1rem 0" }}>
          <h4 style={{ marginBottom: "0.5rem" }}>
            Визуальное и technical состояние:
          </h4>
          <div
            style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}
          >
            <label
              style={{
                display: "flex",
                alignItems: "center",
                gap: "0.5rem",
                cursor: "pointer",
              }}
            >
              <input
                type="checkbox"
                checked={defects.scratches}
                onChange={() => toggleDefect("scratches")}
              />
              <span>Есть явные царапины или потертости (-10%)</span>
            </label>
            <label
              style={{
                display: "flex",
                alignItems: "center",
                gap: "0.5rem",
                cursor: "pointer",
              }}
            >
              <input
                type="checkbox"
                checked={defects.screenChips}
                onChange={() => toggleDefect("screenChips")}
              />
              <span>Трещины, глубокие сколы на стекле (-25%)</span>
            </label>
            <label
              style={{
                display: "flex",
                alignItems: "center",
                gap: "0.5rem",
                cursor: "pointer",
              }}
            >
              <input
                type="checkbox"
                checked={defects.batteryBad}
                onChange={() => toggleDefect("batteryBad")}
              />
              <span>Батарея изношена / требует замены (-15%)</span>
            </label>
            <label
              style={{
                display: "flex",
                alignItems: "center",
                gap: "0.5rem",
                cursor: "pointer",
              }}
            >
              <input
                type="checkbox"
                checked={defects.noBox}
                onChange={() => toggleDefect("noBox")}
              />
              <span>Нет оригинальной коробки и комплекта (-10%)</span>
            </label>
            <label
              style={{
                display: "flex",
                alignItems: "center",
                gap: "0.5rem",
                cursor: "pointer",
              }}
            >
              <input
                type="checkbox"
                checked={defects.repaired}
                onChange={() => toggleDefect("repaired")}
              />
              <span>Устройство вскрывалось в ремонте (-20%)</span>
            </label>
          </div>
        </div>

        <label>
          Серийный номер / IMEI
          <input
            type="text"
            placeholder="Заполните для проверки по базам утери"
          />
        </label>

        <button
          className="primary wide"
          type="button"
          onClick={() =>
            onNotify(
              `Билет на технику на сумму ${money(finalAmount)} сформирован`,
            )
          }
          disabled={finalAmount === 0}
        >
          Оформить залоговый билет
        </button>
      </>
    );
  }

  return (
    <div className="card result">
      <div className="result-icon">
        <CircleDollarSign size={30} />
      </div>
      <span>Сумма выдачи за технику</span>
      <strong style={{ color: "#2563eb" }}>{money(finalAmount)}</strong>
      <div className="result-row">
        <span>Общая уценка</span>
        <b style={{ color: "#dc2626" }}>-{totalDiscount}%</b>
      </div>
      <div className="result-row">
        <span>Рыночный базис</span>
        <b>{money(parseFloat(marketPrice) || 0)}</b>
      </div>
      <div className="notice">
        <ShieldCheck size={17} />
        <span>
          Сумма неокончательная, требуется проверка по базам утери и IMEI.
        </span>
      </div>
    </div>
  );
}
