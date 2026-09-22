import React, { useMemo } from "react";
import { CircleDollarSign, ShieldCheck } from "lucide-react";

const money = (n) => new Intl.NumberFormat("ru-RU").format(n) + " ₸";

export default function GoldValuation({
  type,
  onNotify,
  prob,
  setProb,
  weight,
  setWeight,
  condition,
  setCondition,
}) {
  const basePricePerGram = useMemo(() => {
    switch (prob) {
      case "750":
        return 30500;
      case "999":
        return 40500;
      case "585":
      default:
        return 23800;
    }
  }, [prob]);

  const { finalPricePerGram, totalAmount } = useMemo(() => {
    const numWeight = parseFloat(weight) || 0;
    let modifier = 1.0;
    if (condition === "Новое") modifier = 1.05;
    if (condition === "Есть дефекты") modifier = 0.85;

    const currentGramPrice = Math.round(basePricePerGram * modifier);
    return {
      finalPricePerGram: currentGramPrice,
      totalAmount: Math.round(numWeight * currentGramPrice),
    };
  }, [weight, basePricePerGram, condition]);

  if (type === "form") {
    return (
      <>
        <label>
          Категория изделия
          <select>
            <option>Золотые ювелирные изделия</option>
            <option>Золотые часы</option>
            <option>Золотой лом</option>
          </select>
        </label>

        <div className="two">
          <label>
            Проба
            <select value={prob} onChange={(e) => setProb(e.target.value)}>
              <option value="585">585 проба</option>
              <option value="750">750 проба</option>
              <option value="999">999 проба</option>
            </select>
          </label>
          <label>
            Вес, грамм
            <input
              type="number"
              step="0.01"
              value={weight}
              onChange={(e) => setWeight(e.target.value)}
            />
          </label>
        </div>

        <div className="two">
          <label>
            Состояние
            <select
              value={condition}
              onChange={(e) => setCondition(e.target.value)}
            >
              <option value="Хорошее">Хорошее</option>
              <option value="Новое">Новое (С биркой)</option>
              <option value="Есть дефекты">Есть дефекты / Лом</option>
            </select>
          </label>
          <label>
            Клеймо
            <select>
              <option>Барс (Пробирная палата РК)</option>
              <option>Иное клеймо</option>
              <option>Нет клейма</option>
            </select>
          </label>
        </div>

        <label>
          Комплектация
          <textarea placeholder="Например: фирменная коробка, сертификат, чеки"></textarea>
        </label>

        <button
          className="primary wide"
          type="button"
          onClick={() =>
            onNotify(`Расчет залога на сумму ${money(totalAmount)} сохранен`)
          }
          disabled={totalAmount === 0}
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
      <span>Предварительная оценка</span>
      <strong>{money(totalAmount)}</strong>
      <div className="result-row">
        <span>Расчетный вес</span>
        <b>{parseFloat(weight) || 0} г</b>
      </div>
      <div className="result-row">
        <span>Цена за грамм</span>
        <b>{money(finalPricePerGram)}</b>
      </div>
      <div className="result-row">
        <span>Сумма выдачи</span>
        <b>до {money(totalAmount)}</b>
      </div>
      <div className="notice">
        <ShieldCheck size={17} />
        <span>Итоговая сумма зависит от очной проверки изделия экспертом.</span>
      </div>
    </div>
  );
}
