export const trains = [
  {
    id: 1,
    number: "743-Ш",
    from: "Київ",
    to: "Львів",
    departure: "2025-06-01T08:00:00",
    arrival: "2025-06-01T13:30:00",
    duration: "5г 30хв",
    wagons: [
      { id: 1, type: "Купе", seats: 36 },
      { id: 2, type: "Плацкарт", seats: 54 },
    ],
  },
  {
    id: 2,
    number: "091-К",
    from: "Харків",
    to: "Одеса",
    departure: "2025-06-01T14:00:00",
    arrival: "2025-06-01T22:00:00",
    duration: "8г 00хв",
    wagons: [
      { id: 1, type: "СВ", seats: 18 },
      { id: 2, type: "Купе", seats: 36 },
    ],
  },
  {
    id: 3,
    number: "155-Л",
    from: "Дніпро",
    to: "Київ",
    departure: "2025-06-02T06:30:00",
    arrival: "2025-06-02T10:00:00",
    duration: "3г 30хв",
    wagons: [
      { id: 1, type: "Плацкарт", seats: 54 },
      { id: 2, type: "Купе", seats: 36 },
    ],
  },
];