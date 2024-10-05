import React from 'react';
import { IKanji } from '../../types/kanji.types';
import TagN5 from '../../components/base/TagN5';
import TagN4 from '../../components/base/TagN4';
import TagN3 from '../../components/base/TagN3';
import TagN2 from '../../components/base/TagN2';
import TagN1 from '../../components/base/TagN1';

export function onChooseLevelKanji(kanJi: IKanji | undefined): React.ReactNode {
  if (!kanJi) return null;
  let level;
  switch (kanJi.level) {
    case 'N5':
      level = <TagN5 level="N5" />;
      break;
    case 'N4':
      level = <TagN4 level="N4" />;
      break;
    case 'N3':
      level = <TagN3 level="N3" />;
      break;
    case 'N2':
      level = <TagN2 level="N2" />;
      break;
    case 'N1':
      level = <TagN1 level="N1" />;
      break;
    default:
      level = <TagN5 level="N5" />;
      break;
  }
  return level;
}
