import { Box, Flex, IconButton, useBreakpointValue } from '@chakra-ui/react';
import { NotificationsBox } from './NotificationsBox';
import { FiBell } from 'react-icons/fi';

interface Props {
  notificationsVisible: boolean;
  toggleNotifications: () => void;
}

export function NotificationsWrapper({
  notificationsVisible,
  toggleNotifications,
}: Props) {
  const isDesktop = useBreakpointValue({ base: false, md: true });

  return (
    <>
      <IconButton
        variant="outline"
        bg={notificationsVisible ? '#805AD5' : 'transparent'}
        border="none"
        aria-label="notifications"
        icon={<FiBell color="#fff" size={24} />}
        _hover={{ color: '#fff', bg: '#805AD5' }}
        marginRight="4"
        onClick={toggleNotifications}
      />
      {notificationsVisible && (
        <>
          <Flex
            zIndex={2}
            position="fixed"
            top="90px"
            left={0}
            w={'full'}
            justify={isDesktop ? 'right' : 'center'}
            paddingRight={isDesktop ? '5%' : 0}
          >
            <NotificationsBox toggleNotifications={toggleNotifications} />
          </Flex>
          <Box
            position="fixed"
            top="90px"
            left="0"
            width="100%"
            height="100%"
            bg="black"
            opacity="0.5"
            zIndex={1}
            onClick={toggleNotifications}
          />
        </>
      )}
    </>
  );
}
