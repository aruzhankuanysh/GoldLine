import React, { useState } from "react";
import { Gem, Smartphone } from "lucide-react";
import GoldValuation from "./GoldValuation";
import TechValuation from "./TechValuation";

export default function Valuation({ onNotify }) {
  const [type, setType] = useState("gold");

  // ОБЩИЙ СТЕЙТ ДЛЯ ЗОЛОТА
  const [goldProb, setGoldProb] = useState("585");
  const [goldWeight, setGoldWeight] = useState("13.1");
  const [goldCondition, setGoldCondition] = useState("Хорошее");

  // ОБЩИЙ СТЕЙТ ДЛЯ ТЕХНИКИ
  const [techBrand, setTechBrand] = useState("Apple");
  const [techPrice, setTechPrice] = useState("450000");
  const [techDefects, setTechDefects] = useState({
    scratches: false,
    screenChips: false,
    batteryBad: false,
    noBox: false,
    repaired: false,
  });

  return (
    <>
      <div className="page-head">
        <div>
          <h1>Быстрая оценка</h1>
          <p>Предварительный расчет суммы залога для клиента</p>
        </div>
      </div>

      <div className="valuation-layout">
        {/* ЛЕВАЯ КОЛОНКА: КАРТОЧКА ФОРМЫ */}
        <div className="card valuation-form">
          <h3>Что оцениваем?</h3>

          <div className="type-switch" style={{ marginBottom: "1rem" }}>
            <button
              className={type === "gold" ? "selected" : ""}
              onClick={() => setType("gold")}
              type="button"
            >
              <Gem size={19} /> Золото
            </button>
            <button
              className={type === "tech" ? "selected" : ""}
              onClick={() => setType("tech")}
              type="button"
            >
              <Smartphone size={19} /> Техника
            </button>
          </div>

          {type === "gold" ? (
            <GoldValuation
              type="form"
              onNotify={onNotify}
              prob={goldProb}
              setProb={setGoldProb}
              weight={goldWeight}
              setWeight={setGoldWeight}
              condition={goldCondition}
              setCondition={setGoldCondition}
            />
          ) : (
            <TechValuation
              type="form"
              onNotify={onNotify}
              brand={techBrand}
              setBrand={setTechBrand}
              marketPrice={techPrice}
              setMarketPrice={setTechPrice}
              defects={techDefects}
              setDefects={setTechDefects}
            />
          )}
        </div>

        {/* ПРАВАЯ КОЛОНКА: КАРТОЧКА РЕЗУЛЬТАТА */}
        {type === "gold" ? (
          <GoldValuation
            type="result"
            prob={goldProb}
            weight={goldWeight}
            condition={goldCondition}
          />
        ) : (
          <TechValuation
            type="result"
            brand={techBrand}
            marketPrice={techPrice}
            defects={techDefects}
          />
        )}
      </div>
    </>
  );
}
