// added attributes

type FlashCard = {
  id: string;
  userId: string | null;
  dateAdded: string;
  setId: string;
  term: string;
  definitions: string;
};

type FlashCardSet = {
  id: string;
  userId: string | null;
  dateAdded: string;
  title: string;
  description: string | null;
  isCustom: boolean;
  isPinned: boolean;
  cards: FlashCard[];
};
