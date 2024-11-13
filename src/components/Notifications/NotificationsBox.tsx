import {
  CloseButton,
  Card,
  CardHeader,
  Heading,
  useBreakpointValue,
  Flex,
  CardBody,
  Box,
} from '@chakra-ui/react';
import { NotificationItem } from './NotificationItem';

interface Props {
  toggleNotifications: () => void;
}
export function NotificationsBox({ toggleNotifications }: Props) {
  const isDesktop = useBreakpointValue({ base: false, md: true });
  //alterar aqui com a integração do backend
  const notifications = [
    {
      username: 'Teste',
      user_id: '6fcddbcb-d48f-4f6c-b7ad-0bfd44b99ac5',
      created_at: '2024-11-13T15:09:16.607Z',
      content: 'respondeu seu post',
      post_id: '6832a721-3d62-41e7-b69-a843261c00cb',
    },
    {
      username: 'juninhoplayboy',
      user_id: '6fcddbcb-d48f-4f6c-b7ad-0bfd44b99ac5',
      created_at: '2024-11-13T17:27:51.745Z',
      content: 'curtiu seu comentário',
      post_id: '6832a721-3d62-41e7-b69-a843261c00cb',
    },
    {
      username: 'juninhoplayboy',
      user_id: '6fcddbcb-d48f-4f6c-b7ad-0bfd44b99ac5',
      created_at: '2024-11-13T17:27:51.745Z',
      content: 'curtiu seu comentário',
      post_id: '6832a721-3d62-41e7-b69-a843261c00cb',
    },
    {
      username: 'juninhoplayboy',
      user_id: '6fcddbcb-d48f-4f6c-b7ad-0bfd44b99ac5',
      created_at: '2024-11-13T17:27:51.745Z',
      content: 'curtiu seu comentário',
      post_id: '6832a721-3d62-41e7-b69-a843261c00cb',
    },
    {
      username: 'juninhoplayboy',
      user_id: '6fcddbcb-d48f-4f6c-b7ad-0bfd44b99ac5',
      created_at: '2024-11-13T17:27:51.745Z',
      content: 'curtiu seu comentário',
      post_id: '6832a721-3d62-41e7-b69-a843261c00cb',
    },
    {
      username: 'juninhoplayboy',
      user_id: '6fcddbcb-d48f-4f6c-b7ad-0bfd44b99ac5',
      created_at: '2024-11-13T17:27:51.745Z',
      content: 'curtiu seu comentário',
      post_id: '6832a721-3d62-41e7-b69-a843261c00cb',
    },
  ];
  return (
    <>
      <Card
        bg="gray.50"
        width={isDesktop ? '400px' : '330px'}
        height={isDesktop ? '450px' : '400px'}
      >
        <CardHeader>
          <Flex justify="space-between">
            <Heading size="lg">Notificações</Heading>
            <CloseButton onClick={toggleNotifications} />
          </Flex>
        </CardHeader>
        <CardBody>
          {notifications.map((n) => {
            return (
              <>
                <NotificationItem
                  username={n.username}
                  user_id={n.user_id}
                  created_at={n.created_at}
                  content={n.content}
                  post_id={n.post_id}
                />
                <Box borderBottom="1px solid #DEDEDE" marginY="15px"></Box>
              </>
            );
          })}
        </CardBody>
      </Card>
    </>
  );
}
