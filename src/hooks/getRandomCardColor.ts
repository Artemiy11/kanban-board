export function getRandomCardColor() {
  const colors = [
    "#FFD700",
    "#90EE90",
    "#87CEEB",
    "#FFB6C1",
    "#FFA07A",
    "#ADD8E6",
    "#F08080",
    "#B0C4DE",
    "#98FB98",
    "#FFDAB9",
  ];

  const index = Math.floor(Math.random() * 10);
  return colors[index];
}
