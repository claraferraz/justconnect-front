import { Grid, GridItem, Link, Text } from '@chakra-ui/react';
import { UUID } from 'crypto';
import { useEffect, useState } from 'react';
import { formatDistanceToNowStrict } from 'date-fns';
import { ptBR } from 'date-fns/locale';

interface Props {
  username: string;
  user_id: UUID | string;
  created_at: string | Date;
  content: string;
  post_id: UUID | string;
}

export function NotificationItem({
  username,
  user_id,
  created_at,
  content,
  post_id,
}: Props) {
  const [dateText, setDateText] = useState('');

  const getPostDate = (d: string | Date) => {
    const date = new Date(d);
    setDateText(
      formatDistanceToNowStrict(date, { locale: ptBR })
        .replace('segundos', 's')
        .replace('segundo', 's')
        .replace('minutos', 'min')
        .replace('minuto', 'min')
        .replace('horas', 'h')
        .replace('hora', 'h')
        .replace('dias', 'd')
        .replace('dia', 'd')
        .replace('anos', 'a')
        .replace('ano', 'a')
    );
  };

  useEffect(() => {
    getPostDate(created_at);
    const id = setInterval(() => {
      getPostDate(created_at);
    }, 30000);

    return () => clearInterval(id);
  }, [created_at]);
  return (
    <>
      <Grid alignItems="center" minH="20px" gridTemplateColumns="7fr 1fr">
        <GridItem>
          <Text fontSize="14px" fontWeight="500">
            <Link href={`/profile/${user_id}`} color="#805AD5">
              @{username}
            </Link>
            <Link href={`/post/${post_id}`}> {content}</Link>
          </Text>
        </GridItem>
        <Text fontSize="12px">{dateText}</Text>
      </Grid>
    </>
  );
}
