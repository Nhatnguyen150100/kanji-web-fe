export interface IKanji {
  id: string;
  character: string;
  level: ILevelKanji;
  meaning: string;
  mnemonic: string;
  reading: string;
  createdAt: string;
  updatedAt: string;
  exampleKanjis: IExampleKanjis[];
}

export interface IExampleKanjis {
  id: string;
  idKanji: string;
  example: string;
  createdAt: string;
  updatedAt: string;
}

export interface IQueryKanji {
  page: number;
  limit: number;
  nameLike: string;
  level: ILevelKanji;
}

export type ILevelKanji = 'N5' | 'N4' | 'N3' | 'N2' | 'N1';
