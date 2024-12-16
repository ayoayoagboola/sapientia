type FlashCard = {
  id: string;
  userId: string;
  dateAdded: string;
  setId: string;
  term: string;
  definitions: string[];
};

type FlashCardSet = {
  id: string;
  userId: string;
  dateAdded: string;
  title: string;
  description: string | null;
  cards: FlashCard[];
};
