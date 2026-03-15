import { useContext } from 'react';
import { ListsContext } from '../store/listsContext';

export function useLists() {
  return useContext(ListsContext);
}
