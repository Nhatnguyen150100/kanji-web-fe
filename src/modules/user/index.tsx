import { Outlet } from 'react-router-dom';
import BaseContainer from '../../components/base/BaseContainer';
import TheLayout from '../../components/layout/TheLayout';
import ListKanjis from './list-kanjis';

interface IProps {}

export default function UserPage({}: IProps) {
  return (
    <TheLayout>
      <BaseContainer>
        <Outlet />
      </BaseContainer>
    </TheLayout>
  );
}
