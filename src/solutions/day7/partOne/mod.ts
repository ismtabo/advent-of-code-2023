import { Hand as IHand, Input } from "../types.ts";
import groupBy from "https://deno.land/x/denodash@0.1.3/src/collection/groupBy.ts";
import identity from "https://deno.land/x/denodash@0.1.3/src/utils/identity.ts";

export function partOne(input: Input) {
  const hands = input.slice()
    .map((hand) => new Hand(hand.cards, hand.bid))
    .sort((a, b) => a.compareTo(b));
  return hands
    .map((hand) => hand.bid)
    .reduce((acc, bid, i) => acc + bid * (i + 1), 0);
}

enum CardType {
  HIGH_CARD,
  ONE_PAIR,
  TWO_PAIR,
  THREE_OF_A_KIND,
  FULL_HOUSE,
  FOUR_OF_A_KIND,
  FIVE_OF_A_KIND,
}

const CARD_PRECEDENCE = "23456789TJQKA";

class Hand implements IHand {
  private _type: CardType;

  constructor(public cards: string, public bid: number) {
    this._type = this.getCardType();
  }

  public compareTo(other: Hand): number {
    const typeCompare = this._type - other._type;
    if (typeCompare !== 0) return typeCompare;
    for (let i = 0; i < this.cards.length; i++) {
      const thisCardPrecedence = CARD_PRECEDENCE.indexOf(this.cards[i]);
      const otherCardPrecedence = CARD_PRECEDENCE.indexOf(other.cards[i]);
      const cardCompare = thisCardPrecedence - otherCardPrecedence;
      if (cardCompare !== 0) return cardCompare;
    }
    return 0;
  }

  private getCardType(): CardType {
    const groups = groupBy(identity, Array.from(this.cards));
    const groupsMap = new Map(Object.entries(groups));
    if (groupsMap.size === 1) return CardType.FIVE_OF_A_KIND;
    if (groupsMap.size === 2) {
      const values = Array.from(groupsMap.values());
      if (values.some((value) => value.length === 4)) {
        return CardType.FOUR_OF_A_KIND;
      }
      return CardType.FULL_HOUSE;
    }
    if (groupsMap.size === 3) {
      const values = Array.from(groupsMap.values());
      if (values.some((value) => value.length === 3)) {
        return CardType.THREE_OF_A_KIND;
      }
      return CardType.TWO_PAIR;
    }
    if (groupsMap.size === 4) return CardType.ONE_PAIR;
    return CardType.HIGH_CARD;
  }
}
