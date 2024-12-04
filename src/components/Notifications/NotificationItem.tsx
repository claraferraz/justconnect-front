import { Center, Grid, GridItem, Link, Text } from '@chakra-ui/react';
import { UUID } from 'crypto';

import { DataText } from '../DataText/DataText';
import { useEffect, useState } from 'react';
import { markAsRead } from '../../service/Notifications';

interface Props {
  id: string;
  username: string;
  created_at: Date;
  content: string;
  post_id: UUID | string;
  isNew: boolean;
}

export function NotificationItem({
  id,
  username,
  created_at,
  content,
  post_id,
  isNew: initialNew,
}: Props) {
  const [isNew, setIsNew] = useState(initialNew);

  useEffect(() => {
    if (isNew !== initialNew) {
      setIsNew(initialNew);
    }
  }, [initialNew, isNew]);

  const handleMouseOver = async () => {
    setIsNew(false);

    try {
      await markAsRead(id);
    } catch {
      setIsNew(true);
    }
  };

  return (
    <>
      <Grid
        onMouseOver={handleMouseOver}
        alignItems="center"
        minH="20px"
        gridTemplateColumns="1fr 13fr 2fr"
      >
        <GridItem>
          {isNew && (
            <Center
              background="#805AD5"
              height={'8px'}
              width={'8px'}
              rounded={'100px'}
            />
          )}
        </GridItem>
        <GridItem>
          <Text fontSize="14px" fontWeight="500">
            <Link href={`/profile/${username}`} color="#805AD5">
              {username}
            </Link>
            <Link href={`/post/${post_id}`} wordBreak={'break-word'}>
              {' '}
              {content}
            </Link>
          </Text>
        </GridItem>
        <GridItem marginLeft={'10px'}>
          {created_at && (
            <DataText created={created_at} updated={created_at} sufix={false} />
          )}
        </GridItem>
      </Grid>
    </>
  );
}
