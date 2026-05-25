import { useAuth } from '@/src/data/contexts/AuthProvider';
import { getLists } from '@/src/services/firebase/lists/getLists';
import { keys } from '@/src/services/keys';
import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';

export const useListTabContent = () => {
  const { user } = useAuth();
  const [searchText, setSearchText] = useState('');

  const { data, isLoading: isListsLoading } = useQuery({
    queryKey: [keys.queryKeys.lists],
    queryFn: getLists,
    enabled: !!user,
  });

  const lists =
    searchText === ''
      ? data
      : data?.filter((list) =>
          list.name.toLowerCase().includes(searchText.toLowerCase())
        );

  return {
    lists,
    isListsLoading,
    user,
    setSearchText,
  };
};
