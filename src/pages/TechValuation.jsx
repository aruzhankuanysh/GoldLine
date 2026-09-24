import React, { useEffect, useMemo, useState } from "react";
import {
  CircleDollarSign,
  ShieldCheck,
  X,
  Search,
  ChevronDown,
} from "lucide-react";

const money = (n) =>
  new Intl.NumberFormat("ru-RU", {
    minimumFractionDigits: 0,
    maximumFractionDigits: 1,
  }).format(n) + " ₸";

/*
|--------------------------------------------------------------------------
| БАЗА МОДЕЛЕЙ
|--------------------------------------------------------------------------
*/

const TECH_MODELS = [
  {
    type: "Смартфон",
    brand: "Apple",
    model: "iPhone 11",
    memory: "64GB",
    price: 50000,
  },
  {
    type: "Смартфон",
    brand: "Apple",
    model: "iPhone 11",
    memory: "128GB",
    price: 60000,
  },
  {
    type: "Смартфон",
    brand: "Apple",
    model: "iPhone 11",
    memory: "256GB",
    price: 70000,
  },
  {
    type: "Смартфон",
    brand: "Apple",
    model: "iPhone 11 PRO",
    memory: "64GB",
    price: 60000,
  },
  {
    type: "Смартфон",
    brand: "Apple",
    model: "iPhone 11 PRO",
    memory: "256GB",
    price: 70000,
  },
  {
    type: "Смартфон",
    brand: "Apple",
    model: "iPhone 11 PRO",
    memory: "512GB",
    price: 70000,
  },
  {
    type: "Смартфон",
    brand: "Apple",
    model: "iPhone 11 PRO MAX",
    memory: "64GB",
    price: 70000,
  },
  {
    type: "Смартфон",
    brand: "Apple",
    model: "iPhone 11 PRO MAX",
    memory: "256GB",
    price: 80000,
  },
  {
    type: "Смартфон",
    brand: "Apple",
    model: "iPhone 11 PRO MAX",
    memory: "512GB",
    price: 80000,
  },
];

/*
|--------------------------------------------------------------------------
| АККУМУЛЯТОР
|--------------------------------------------------------------------------
*/

const BATTERY_DISCOUNTS = [
  { value: "100", label: "100%", discount: 0 },
  { value: "99", label: "99%", discount: 1 },
  { value: "98", label: "98%", discount: 2 },
  { value: "97", label: "97%", discount: 3 },
  { value: "96", label: "96%", discount: 4 },
  { value: "95", label: "95%", discount: 5 },
  { value: "94", label: "94%", discount: 6 },
  { value: "93", label: "93%", discount: 7 },
  { value: "92", label: "92%", discount: 8 },
  { value: "91", label: "91%", discount: 9 },
  { value: "90", label: "90%", discount: 15 },
  { value: "89", label: "89%", discount: 15 },
  { value: "88", label: "88%", discount: 15 },
  { value: "87", label: "87%", discount: 15 },
  { value: "86", label: "86%", discount: 15 },
  { value: "85", label: "85%", discount: 15 },
  { value: "84", label: "84%", discount: 20 },
  { value: "83", label: "83%", discount: 20 },
  { value: "82", label: "82%", discount: 20 },
  { value: "81", label: "81%", discount: 20 },
  { value: "80", label: "80%", discount: 20 },
  {
    value: "below80",
    label: "Менее 80%",
    discount: 30,
  },
];

/*
|--------------------------------------------------------------------------
| ДЕФЕКТЫ
|--------------------------------------------------------------------------
*/

const DEFECTS = [
  {
    id: "scratches",
    order: 1,
    name: "Царапины",
    levels: [
      {
        value: "small",
        label: "Небольшие",
        discount: 3,
      },
      {
        value: "medium",
        label: "Средние",
        discount: 7,
      },
      {
        value: "large",
        label: "Большие",
        discount: 17,
      },
    ],
  },
  {
    id: "chips",
    order: 2,
    name: "Сколы",
    levels: [
      {
        value: "small",
        label: "Небольшие",
        discount: 2,
      },
      {
        value: "medium",
        label: "Средние",
        discount: 8,
      },
      {
        value: "large",
        label: "Большие",
        discount: 17,
      },
    ],
  },
  {
    id: "displaySpots",
    order: 3,
    name: "Пятна на дисплее",
    levels: [
      {
        value: "small",
        label: "Небольшие",
        discount: 10,
      },
      {
        value: "medium",
        label: "Средние",
        discount: 25,
      },
      {
        value: "large",
        label: "Большие",
        discount: 50,
      },
    ],
  },
  {
    id: "backGlassBroken",
    order: 4,
    name: "Разбито заднее стекло",
    discount: 35,
  },
  {
    id: "screenCrack",
    order: 5,
    name: "Трещина на экране",
    levels: [
      {
        value: "small",
        label: "Небольшая",
        discount: 20,
      },
      {
        value: "medium",
        label: "Средняя",
        discount: 40,
      },
      {
        value: "large",
        label: "Большая",
        discount: 50,
      },
    ],
  },
  {
    id: "backPanelCrack",
    order: 6,
    name: "Трещина на задней панели",
    levels: [
      {
        value: "small",
        label: "Небольшая",
        discount: 20,
      },
      {
        value: "medium",
        label: "Средняя",
        discount: 35,
      },
      {
        value: "large",
        label: "Большая",
        discount: 50,
      },
    ],
  },
  {
    id: "screenBurn",
    order: 7,
    name: "Выгорание экрана",
    levels: [
      {
        value: "small",
        label: "Небольшое",
        discount: 5,
      },
      {
        value: "medium",
        label: "Среднее",
        discount: 10,
      },
      {
        value: "large",
        label: "Большое",
        discount: 20,
      },
    ],
  },
  {
    id: "deadPixels",
    order: 8,
    name: "Битые пиксели",
    discount: 10,
  },
  {
    id: "cameraDefect",
    order: 9,
    name: "Дефект камеры",
    discount: 15,
  },
  {
    id: "homeButton",
    order: 10,
    name: "Дефект кнопки Home",
    discount: 50,
  },
];

export default function TechValuation({
  type,
  onNotify,
  brand,
  setBrand,
  marketPrice,
  setMarketPrice,
  defects = [],
  setDefects,
}) {
  /*
  |--------------------------------------------------------------------------
  | STATE
  |--------------------------------------------------------------------------
  */

  const [techType, setTechType] =
    useState("Смартфон");

  const [modelSearch, setModelSearch] =
    useState("");

  const [modelOpen, setModelOpen] =
    useState(false);

  const [selectedModel, setSelectedModel] =
    useState("");

  const [memory, setMemory] =
    useState("");

  const [battery, setBattery] =
    useState("100");

  const [selectedDefect, setSelectedDefect] =
    useState("");

  const [selectedLevel, setSelectedLevel] =
    useState("");

  const [defectSearch, setDefectSearch] =
    useState("");

  const [defectOpen, setDefectOpen] =
    useState(false);

  const currentBrand =
    brand || "Apple";

  /*
  |--------------------------------------------------------------------------
  | ТИПЫ ТЕХНИКИ
  |--------------------------------------------------------------------------
  */

  const techTypes = [
    "Смартфон",
    "Ноутбук",
    "Смарт-часы",
    "Другое",
  ];

  /*
  |--------------------------------------------------------------------------
  | МОДЕЛИ
  |--------------------------------------------------------------------------
  */

  const availableModels = useMemo(() => {
    const query =
      modelSearch.trim().toLowerCase();

    return TECH_MODELS.filter((item) => {
      if (item.type !== techType)
        return false;

      if (item.brand !== currentBrand)
        return false;

      if (!query) return true;

      return item.model
        .toLowerCase()
        .includes(query);
    }).filter(
      (item, index, array) =>
        array.findIndex(
          (x) =>
            x.model === item.model,
        ) === index,
    );
  }, [
    techType,
    currentBrand,
    modelSearch,
  ]);

  /*
  |--------------------------------------------------------------------------
  | ПАМЯТЬ
  |--------------------------------------------------------------------------
  */

  const availableMemory =
    useMemo(() => {
      if (!selectedModel)
        return [];

      return TECH_MODELS.filter(
        (item) =>
          item.type === techType &&
          item.brand ===
          currentBrand &&
          item.model ===
          selectedModel,
      );
    }, [
      selectedModel,
      techType,
      currentBrand,
    ]);

  /*
  |--------------------------------------------------------------------------
  | ЦЕНА
  |--------------------------------------------------------------------------
  */

  const selectedPrice =
    useMemo(() => {
      if (
        !selectedModel ||
        !memory
      ) {
        return 0;
      }

      const item =
        TECH_MODELS.find(
          (model) =>
            model.type ===
            techType &&
            model.brand ===
            currentBrand &&
            model.model ===
            selectedModel &&
            model.memory ===
            memory,
        );

      return item?.price || 0;
    }, [
      selectedModel,
      memory,
      techType,
      currentBrand,
    ]);

  useEffect(() => {
    if (
      typeof setMarketPrice ===
      "function"
    ) {
      setMarketPrice(
        selectedPrice
          ? String(selectedPrice)
          : "",
      );
    }
  }, [
    selectedPrice,
    setMarketPrice,
  ]);

  /*
  |--------------------------------------------------------------------------
  | IPHONE
  |--------------------------------------------------------------------------
  */

  const isIPhone =
    techType === "Смартфон" &&
    currentBrand === "Apple" &&
    selectedModel
      .toLowerCase()
      .startsWith("iphone");

  /*
  |--------------------------------------------------------------------------
  | АККУМУЛЯТОР
  |--------------------------------------------------------------------------
  */

  const batteryInfo = useMemo(() => {
    return BATTERY_DISCOUNTS.find(
      (item) => item.value === battery,
    ) || BATTERY_DISCOUNTS[0];
  }, [battery]);

  /*
  |--------------------------------------------------------------------------
  | ДЕФЕКТ
  |--------------------------------------------------------------------------
  */

  const defectInfo =
    DEFECTS.find(
      (item) =>
        item.id ===
        selectedDefect,
    );

  const availableDefects = useMemo(() => {
    const query = defectSearch.trim().toLowerCase();

    if (!query) {
      return DEFECTS;
    }

    return DEFECTS.filter((item) =>
      item.name.toLowerCase().includes(query)
    );
  }, [defectSearch]);
  /*
  |--------------------------------------------------------------------------
  | ДОБАВЛЕНИЕ ДЕФЕКТА
  |--------------------------------------------------------------------------
  */

  const addDefect = () => {
    if (!defectInfo) return;

    let level = null;
    let levelLabel = null;
    let discount =
      defectInfo.discount;

    if (defectInfo.levels) {
      const selected =
        defectInfo.levels.find(
          (item) =>
            item.value ===
            selectedLevel,
        );

      if (!selected) return;

      level = selected.value;
      levelLabel =
        selected.label;
      discount =
        selected.discount;
    }

    const newDefect = {
      id: defectInfo.id,
      name: defectInfo.name,
      order: defectInfo.order,
      discount,
      level,
      levelLabel,
    };

    setDefects((prev) => {
      const list =
        Array.isArray(prev)
          ? prev
          : [];

      /*
      | Если этот дефект уже есть,
      | меняем его вариант.
      */

      const exists =
        list.some(
          (item) =>
            item.id ===
            newDefect.id,
        );

      if (exists) {
        return list.map(
          (item) =>
            item.id ===
              newDefect.id
              ? newDefect
              : item,
        );
      }

      return [
        ...list,
        newDefect,
      ];
    });

    setSelectedDefect("");
    setSelectedLevel("");
  };

  /*
  |--------------------------------------------------------------------------
  | УДАЛЕНИЕ
  |--------------------------------------------------------------------------
  */

  const removeDefect = (id) => {
    setDefects((prev) =>
      Array.isArray(prev)
        ? prev.filter(
          (item) =>
            item.id !== id,
        )
        : [],
    );
  };

  /*
  |--------------------------------------------------------------------------
  | РАСЧЁТ
  |
  | Всегда:
  |
  | 1. Цена модели
  | 2. Аккумулятор
  | 3. Дефект 1
  | 4. Дефект 2
  | ...
  |--------------------------------------------------------------------------
  */

  const calculation = useMemo(() => {
    const basePrice =
      Number(marketPrice) ||
      Number(selectedPrice) ||
      0;

    let amount = basePrice;

    const steps = [];

    // =====================================================
    // 1. АККУМУЛЯТОР — ВСЕГДА ПЕРВЫМ
    // =====================================================

    const batteryData = BATTERY_DISCOUNTS.find(
      (item) => String(item.value) === String(battery)
    );

    const batteryDiscount =
      Number(batteryData?.discount) || 0;

    const batteryLabel =
      batteryData?.label || `${battery}%`;

    if (batteryDiscount > 0 && amount > 0) {
      const before = amount;

      amount = amount * (1 - batteryDiscount / 100);

      steps.push({
        type: "battery",
        name: `Аккумулятор ${batteryLabel}`,
        discount: batteryDiscount,
        before,
        after: amount,
      });
    }

    // =====================================================
    // 2. ДЕФЕКТЫ — ПО ПОРЯДКУ order
    // =====================================================

    const sortedDefects = Array.isArray(defects)
      ? [...defects].sort(
        (a, b) =>
          Number(a.order || 0) -
          Number(b.order || 0)
      )
      : [];

    sortedDefects.forEach((defect) => {
      const discount =
        Number(defect.discount) || 0;

      if (discount <= 0) return;

      const before = amount;

      amount =
        amount * (1 - discount / 100);

      steps.push({
        type: "defect",
        name: defect.levelLabel
          ? `${defect.name} — ${defect.levelLabel}`
          : defect.name,
        discount,
        before,
        after: amount,
      });
    });

    return {
      basePrice,
      finalAmount: Math.max(0, amount),
      steps,
    };
  }, [
    marketPrice,
    selectedPrice,
    battery,
    defects,
  ]);

  /*
  |--------------------------------------------------------------------------
  | FORM
  |--------------------------------------------------------------------------
  */

  if (type === "form") {
    return (
      <>
        <div className="two">
          <label>
            Тип техники

            <select
              value={
                techType
              }
              onChange={(e) => {
                setTechType(
                  e.target
                    .value,
                );

                setModelSearch(
                  "",
                );

                setSelectedModel(
                  "",
                );

                setMemory(
                  "",
                );

                setModelOpen(
                  false,
                );

                setMarketPrice(
                  "",
                );
              }}
            >
              {techTypes.map(
                (item) => (
                  <option
                    key={item}
                    value={item}
                  >
                    {item}
                  </option>
                ),
              )}
            </select>
          </label>

          <label>
            Бренд

            <select
              value={
                currentBrand
              }
              onChange={(e) => {
                setBrand(
                  e.target
                    .value,
                );

                setModelSearch(
                  "",
                );

                setSelectedModel(
                  "",
                );

                setMemory(
                  "",
                );

                setModelOpen(
                  false,
                );

                setMarketPrice(
                  "",
                );
              }}
            >
              <option value="Apple">
                Apple
              </option>

              <option value="Samsung">
                Samsung
              </option>

              <option value="Sony">
                Sony
              </option>

              <option value="Other">
                Другой бренд
              </option>
            </select>
          </label>
        </div>

        {/* МОДЕЛЬ */}
        <label>
          Модель

          <div
            style={{
              position:
                "relative",
            }}
          >
            <div
              style={{
                position:
                  "relative",
              }}
            >
              <Search
                size={16}
                style={{
                  position:
                    "absolute",
                  left: "12px",
                  top: "50%",
                  transform:
                    "translateY(-50%)",
                  color:
                    "#9ca3af",
                  pointerEvents:
                    "none",
                }}
              />

              <input
                type="text"
                value={
                  selectedModel ||
                  modelSearch
                }
                onFocus={() =>
                  setModelOpen(
                    true,
                  )
                }
                onChange={(e) => {
                  setSelectedModel(
                    "",
                  );

                  setMemory(
                    "",
                  );

                  setModelSearch(
                    e.target
                      .value,
                  );

                  setModelOpen(
                    true,
                  );
                }}
                placeholder="Выберите или найдите модель..."
                style={{
                  paddingLeft:
                    "38px",
                  paddingRight:
                    "38px",
                }}
              />

              <ChevronDown
                size={17}
                style={{
                  position:
                    "absolute",
                  right: "12px",
                  top: "50%",
                  transform:
                    "translateY(-50%)",
                  color:
                    "#9ca3af",
                  pointerEvents:
                    "none",
                }}
              />
            </div>

            {modelOpen && (
              <div
                style={{
                  position:
                    "absolute",
                  left: 0,
                  right: 0,
                  top: "calc(100% + 4px)",
                  zIndex: 20,
                  background:
                    "#fff",
                  border:
                    "1px solid #e5e7eb",
                  borderRadius:
                    "10px",
                  boxShadow:
                    "0 10px 30px rgba(0,0,0,.1)",
                  maxHeight:
                    "240px",
                  overflowY:
                    "auto",
                }}
              >
                {availableModels.length >
                  0 ? (
                  availableModels.map(
                    (item) => (
                      <button
                        key={
                          item.model
                        }
                        type="button"
                        onMouseDown={(
                          e,
                        ) =>
                          e.preventDefault()
                        }
                        onClick={() => {
                          setSelectedModel(item.model);

                          setModelSearch("");

                          setMemory("");

                          setModelOpen(false);
                        }}
                        style={{
                          width:
                            "100%",
                          padding:
                            "11px 13px",
                          border:
                            "none",
                          borderBottom:
                            "1px solid #f1f1f1",
                          background:
                            "#fff",
                          textAlign:
                            "left",
                          cursor:
                            "pointer",
                        }}
                      >
                        {item.model}
                      </button>
                    ),
                  )
                ) : (
                  <div
                    style={{
                      padding:
                        "12px",
                      color:
                        "#6b7280",
                    }}
                  >
                    Модель не найдена
                  </div>
                )}
              </div>
            )}
          </div>
        </label>

        {/* ПАМЯТЬ */}
        <label>
          Память

          <select
            value={
              memory
            }
            disabled={
              !selectedModel
            }
            onChange={(e) =>
              setMemory(
                e.target
                  .value,
              )
            }
          >
            <option value="">
              Выберите память
            </option>

            {availableMemory.map(
              (item) => (
                <option
                  key={
                    item.memory
                  }
                  value={
                    item.memory
                  }
                >
                  {item.memory}
                </option>
              ),
            )}
          </select>
        </label>

        {/* ЦЕНА */}
        <label>
          Рыночная цена б/у этой модели

          <input
            type="text"
            readOnly
            value={
              selectedPrice
                ? money(
                  selectedPrice,
                )
                : ""
            }
            placeholder="Цена определится автоматически"
          />
        </label>

        {/* АККУМУЛЯТОР */}
        {isIPhone && (
          <label>
            Состояние аккумулятора

            <select
              value={
                battery
              }
              onChange={(e) => {
                const value = e.target.value;
                setBattery(value);
              }}
            >
              {BATTERY_DISCOUNTS.map(
                (item) => (
                  <option
                    key={
                      item.value
                    }
                    value={
                      item.value
                    }
                  >
                    {item.label}
                  </option>
                ),
              )}
            </select>
          </label>
        )}

        {/* ДЕФЕКТЫ */}
        <div
          className="defects-section"
          style={{
            margin:
              "1rem 0",
          }}
        >
          <h4
            style={{
              marginBottom:
                "0.6rem",
            }}
          >
            Дефекты
          </h4>

          <label>
            Дефект

            <div
              style={{
                position: "relative",
              }}
            >
              <div
                style={{
                  position: "relative",
                }}
              >
                <Search
                  size={16}
                  style={{
                    position: "absolute",
                    left: "12px",
                    top: "50%",
                    transform: "translateY(-50%)",
                    color: "#9ca3af",
                    pointerEvents: "none",
                  }}
                />

                <input
                  type="text"
                  value={
                    selectedDefect
                      ? defectInfo?.name || ""
                      : defectSearch
                  }
                  onFocus={() =>
                    setDefectOpen(true)
                  }
                  onChange={(e) => {
                    setSelectedDefect("");
                    setSelectedLevel("");
                    setDefectSearch(e.target.value);
                    setDefectOpen(true);
                  }}
                  placeholder="Выберите или найдите дефект..."
                  style={{
                    paddingLeft: "38px",
                    paddingRight: "38px",
                  }}
                />

                <ChevronDown
                  size={17}
                  style={{
                    position: "absolute",
                    right: "12px",
                    top: "50%",
                    transform: "translateY(-50%)",
                    color: "#9ca3af",
                    pointerEvents: "none",
                  }}
                />
              </div>

              {defectOpen && (
                <div
                  style={{
                    position: "absolute",
                    left: 0,
                    right: 0,
                    top: "calc(100% + 4px)",
                    zIndex: 20,
                    background: "#fff",
                    border: "1px solid #e5e7eb",
                    borderRadius: "10px",
                    boxShadow: "0 10px 30px rgba(0,0,0,.1)",
                    maxHeight: "240px",
                    overflowY: "auto",
                  }}
                >
                  {availableDefects.length > 0 ? (
                    availableDefects.map((defect) => (
                      <button
                        key={defect.id}
                        type="button"
                        onMouseDown={(e) =>
                          e.preventDefault()
                        }
                        onClick={() => {
                          setSelectedDefect(defect.id);
                          setSelectedLevel("");
                          setDefectSearch("");
                          setDefectOpen(false);
                        }}
                        style={{
                          width: "100%",
                          padding: "11px 13px",
                          border: "none",
                          borderBottom:
                            "1px solid #f1f1f1",
                          background: "#fff",
                          textAlign: "left",
                          cursor: "pointer",
                        }}
                      >
                        {defect.name}
                      </button>
                    ))
                  ) : (
                    <div
                      style={{
                        padding: "12px",
                        color: "#6b7280",
                      }}
                    >
                      Дефект не найден
                    </div>
                  )}
                </div>
              )}
            </div>
          </label>

          {defectInfo?.levels && (
            <label
              style={{
                marginTop:
                  "0.7rem",
              }}
            >
              Степень

              <select
                value={
                  selectedLevel
                }
                onChange={(e) =>
                  setSelectedLevel(
                    e.target
                      .value,
                  )
                }
              >
                <option value="">
                  Выберите степень
                </option>

                {defectInfo.levels.map(
                  (level) => (
                    <option
                      key={
                        level.value
                      }
                      value={
                        level.value
                      }
                    >
                      {
                        level.label
                      }
                    </option>
                  ),
                )}
              </select>
            </label>
          )}

          <button
            type="button"
            className="secondary"
            style={{
              width:
                "100%",
              marginTop:
                "0.7rem",
            }}
            disabled={
              !selectedDefect ||
              Boolean(
                defectInfo?.levels &&
                !selectedLevel,
              )
            }
            onClick={
              addDefect
            }
          >
            Добавить дефект
          </button>

          {/* ВЫБРАННЫЕ ДЕФЕКТЫ */}
          {Array.isArray(
            defects,
          ) &&
            defects.length >
            0 && (
              <div
                style={{
                  marginTop:
                    "1rem",
                  display:
                    "flex",
                  flexDirection:
                    "column",
                  gap:
                    "7px",
                }}
              >
                {defects.map(
                  (defect) => (
                    <div
                      key={
                        defect.id
                      }
                      style={{
                        display:
                          "flex",
                        alignItems:
                          "center",
                        justifyContent:
                          "space-between",
                        padding:
                          "9px 11px",
                        border:
                          "1px solid #e5e7eb",
                        borderRadius:
                          "9px",
                        background:
                          "#f9fafb",
                      }}
                    >
                      <div>
                        <b>
                          {
                            defect.name
                          }
                        </b>

                        {defect.levelLabel && (
                          <small
                            style={{
                              display:
                                "block",
                              color:
                                "#6b7280",
                              marginTop:
                                "2px",
                            }}
                          >
                            {
                              defect.levelLabel
                            }
                          </small>
                        )}
                      </div>

                      <button
                        type="button"
                        className="row-btn"
                        onClick={() =>
                          removeDefect(
                            defect.id,
                          )
                        }
                        title="Удалить"
                      >
                        <X
                          size={
                            16
                          }
                        />
                      </button>
                    </div>
                  ),
                )}
              </div>
            )}
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
          disabled={
            calculation.basePrice <=
            0
          }
          onClick={() =>
            onNotify(
              `Билет на технику на сумму ${money(
                calculation.finalAmount,
              )} сформирован`,
            )
          }
        >
          Оформить залоговый билет
        </button>
      </>
    );
  }

  /*
  |--------------------------------------------------------------------------
  | RESULT
  |--------------------------------------------------------------------------
  */

  return (
    <div className="card result">
      <div className="result-icon">
        <CircleDollarSign
          size={30}
        />
      </div>

      <span>
        Сумма выдачи за технику
      </span>

      <strong
        style={{
          color: "#2563eb",
        }}
      >
        {money(
          calculation.finalAmount,
        )}
      </strong>

      <div className="result-row">
        <span>
          Рыночная цена б/у
        </span>

        <b>
          {money(
            calculation.basePrice,
          )}
        </b>
      </div>

      {calculation.steps.length >
        0 && (
          <div
            style={{
              marginTop:
                "1rem",
              paddingTop:
                "1rem",
              borderTop:
                "1px solid #e5e7eb",
            }}
          >
            <div
              style={{
                fontWeight:
                  700,
                marginBottom:
                  "0.5rem",
              }}
            >
              Расчёт
            </div>

            {calculation.steps.map(
              (step, index) => (
                <div
                  key={
                    `${step.name}-${index}`
                  }
                  style={{
                    padding:
                      "8px 0",
                    borderBottom:
                      "1px solid #f1f1f1",
                  }}
                >
                  <div>
                    {index + 1}.{" "}
                    {step.name}
                  </div>

                  <small
                    style={{
                      display:
                        "block",
                      marginTop:
                        "3px",
                      color:
                        "#6b7280",
                    }}
                  >
                    {money(
                      step.before,
                    )}{" "}
                    →{" "}
                    {money(
                      step.after,
                    )}
                  </small>
                </div>
              ),
            )}
          </div>
        )}

      <div className="notice">
        <ShieldCheck
          size={17}
        />

        <span>
          Итоговая сумма рассчитывается
          последовательно: сначала
          аккумулятор, затем дефекты
          в установленном порядке.
        </span>
      </div>
    </div>
  );
}
