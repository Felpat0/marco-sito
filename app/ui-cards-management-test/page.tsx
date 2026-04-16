"use client";
import { Hand } from "@/components/gameplay-ui/Hand";
import { useState } from "react";

export default function CardsManagementTest() {
  const [cards, setCards] = useState([
    {
      id: 1,
      name: "Trallallero Trallallà",
      imageUrl:
        "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ffbi.cults3d.com%2Fuploaders%2F29774652%2Fillustration-file%2Fa22b00ae-4009-442a-8272-51c64b34c72a%2Fimagen_2025-03-21_001238651.png",
      type: "Boh",
      power: 100,
    },
    {
      id: 2,
      name: "Trallallero Trallallà",
      imageUrl:
        "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ffbi.cults3d.com%2Fuploaders%2F29774652%2Fillustration-file%2Fa22b00ae-4009-442a-8272-51c64b34c72a%2Fimagen_2025-03-21_001238651.png",
      type: "Boh",
      power: 100,
    },
    {
      id: 3,
      name: "Trallallero Trallallà",
      imageUrl:
        "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ffbi.cults3d.com%2Fuploaders%2F29774652%2Fillustration-file%2Fa22b00ae-4009-442a-8272-51c64b34c72a%2Fimagen_2025-03-21_001238651.png",
      type: "Boh",
      power: 100,
    },
    {
      id: 4,
      name: "Trallallero Trallallà",
      imageUrl:
        "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ffbi.cults3d.com%2Fuploaders%2F29774652%2Fillustration-file%2Fa22b00ae-4009-442a-8272-51c64b34c72a%2Fimagen_2025-03-21_001238651.png",
      type: "Boh",
      power: 100,
    },
    {
      id: 5,
      name: "Trallallero Trallallà",
      imageUrl:
        "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ffbi.cults3d.com%2Fuploaders%2F29774652%2Fillustration-file%2Fa22b00ae-4009-442a-8272-51c64b34c72a%2Fimagen_2025-03-21_001238651.png",
      type: "Boh",
      power: 100,
    },
  ]);
  return (
    <div style={{ display: "flex", alignItems: "flex-end", height: "100vh" }}>
      <Hand cards={cards} setCards={setCards} />
    </div>
  );
}
