import { Input, InputLeftElement } from '@chakra-ui/react';
import { InputGroup } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { FiSearch } from 'react-icons/fi';

export function SearchInput() {
  const [query, setQuery] = useState<string>('');
  const [debouncedQuery, setDebouncedQuery] = useState<string>('');

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedQuery(query); // Atualiza o valor com debounce após o tempo
    }, 300);

    return () => {
      clearTimeout(handler);
    };
  }, [query]);

  useEffect(() => {
    if (debouncedQuery) {
      console.log(debouncedQuery);
    }
  }, [debouncedQuery]);
  return (
    <>
      <InputGroup>
        <InputLeftElement children={<FiSearch color="#000" />} />
        <Input
          bg="white"
          borderRadius={6}
          focusBorderColor="#805AD5"
          placeholder="Buscar"
          _placeholder={{ color: '#A0AEC0' }}
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
      </InputGroup>
    </>
  );
}
