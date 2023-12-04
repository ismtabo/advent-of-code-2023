import { Input, ScratchCard } from "../types.ts";

export function partTwo(input: Input) {
  const cardDb = new Map<number, ScratchCard>(
    input.map((card) => [card.id, card]),
  );
  const cardsWinningCards = new Map<number, ScratchCard[]>();
  const cardStack = new Map<number, number>(
    Array.from(cardDb.keys()).map((k) => [k, 1]),
  );
  for (const card of input) {
    const winningCards = getCardWinninCards(cardDb, card, cardsWinningCards);
    cardsWinningCards.set(card.id, winningCards);
  }
  for (const card of input) {
    const winningCards = cardsWinningCards.get(card.id)!;
    const nCardsOfId = cardStack.get(card.id)!;
    for (const winningCard of winningCards) {
      const nCardsOfWinningCard = cardStack.get(winningCard.id)!;
      cardStack.set(winningCard.id, nCardsOfWinningCard + nCardsOfId);
    }
  }
  return Array.from(cardStack.values()).reduce((a, b) => a + b, 0);
}

function getCardWinninCards(
  cardDb: Map<number, ScratchCard>,
  card: ScratchCard,
  cache: Map<number, ScratchCard[]> = new Map(),
): ScratchCard[] {
  if (cache.has(card.id)) {
    return cache.get(card.id)!;
  }
  const nWinningNumbers = getCardWinningNumbers(card).length;
  if (nWinningNumbers === 0) {
    return [];
  }
  const winningCards = getCardWinningCardsFromNumbers(
    cardDb,
    card,
    nWinningNumbers,
  );
  cache.set(card.id, winningCards);
  return winningCards;
}

function getCardWinningNumbers(
  card: ScratchCard,
): number[] {
  return card.winningNumbers.filter((n) => card.myNumbers.includes(n));
}

function getCardWinningCardsFromNumbers(
  cardDb: Map<number, ScratchCard>,
  card: ScratchCard,
  nWinningNumbers: number,
): ScratchCard[] {
  const ids = new Array(nWinningNumbers).fill(0).map((_, i) => card.id + i + 1);
  return ids.map((id) => cardDb.get(id)!);
}
