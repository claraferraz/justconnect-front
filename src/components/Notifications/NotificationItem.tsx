import { Grid, GridItem, Link, Text } from '@chakra-ui/react';
import { UUID } from 'crypto';

import { DataText } from '../DataText/DataText';

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
  return (
    <>
      <Grid
        alignItems="center"
        minH="20px"
        gridTemplateColumns="11fr 1fr"
        overflow="scroll"
      >
        <GridItem>
          <Text fontSize="14px" fontWeight="500">
            <Link href={`/profile/${user_id}`} color="#805AD5">
              @{username}
            </Link>
            <Link href={`/post/${post_id}`}> {content}</Link>
          </Text>
        </GridItem>
        <DataText created={created_at} updated={created_at} sufix={false} />
      </Grid>
    </>
  );
}
