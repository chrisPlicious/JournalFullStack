export interface Journal {
  id: number;
  title: string;
  content: string;
  category: string;
  createdAt: string;
  updatedAt: string;
}

export type CreateJournalDto = {
  title: string;
  content: string;
  category: string;
};

export type UpdateJournalDto = Partial<CreateJournalDto>;
