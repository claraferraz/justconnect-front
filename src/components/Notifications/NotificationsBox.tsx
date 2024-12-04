import {
  CloseButton,
  Card,
  CardHeader,
  Heading,
  useBreakpointValue,
  Flex,
  CardBody,
  Box,
  Text,
} from '@chakra-ui/react';
import { NotificationItem } from './NotificationItem';
import { UserNotification } from '../../interface/UserInterface';

interface Props {
  handleClose: () => void;
  notifications: UserNotification[];
}
export function NotificationsBox({ handleClose, notifications }: Props) {
  const isDesktop = useBreakpointValue({ base: false, md: true });

  return (
    <>
      <Card
        bg="gray.50"
        width={isDesktop ? '400px' : '330px'}
        maxHeight={isDesktop ? '450px' : '400px'}
        overflowY={'auto'}
      >
        <CardHeader paddingBottom={0}>
          <Flex justify="space-between">
            <Heading size="lg">Notificações</Heading>
            <CloseButton onClick={handleClose} />
          </Flex>
        </CardHeader>
        <CardBody>
          {notifications.length === 0 && (
            <Text textAlign="center" color="gray.500">
              Você não tem notificações
            </Text>
          )}
          {notifications
            .filter((n) => n.username && n.related_id)
            .map((n: UserNotification) => {
              return (
                <Box
                  borderBottom="1px solid #DEDEDE"
                  paddingY="15px"
                  _hover={{
                    background:
                      'hsl(258.5365853658536, 70.42028985507248%, 95.411764705882355%)',
                  }}
                >
                  <NotificationItem
                    id={n.id}
                    username={n.username as string}
                    created_at={n.created_at}
                    content={n.message}
                    post_id={n.related_id as string}
                    isNew={!n.is_read}
                  />
                </Box>
              );
            })}
        </CardBody>
      </Card>
    </>
  );
}
