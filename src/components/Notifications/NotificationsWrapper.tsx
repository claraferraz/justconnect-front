import { Box, Flex, IconButton, useBreakpointValue } from '@chakra-ui/react';
import { NotificationsBox } from './NotificationsBox';
import { LuBellDot, LuBell } from 'react-icons/lu';
import { UserNotification } from '../../interface/UserInterface';
import { useEffect, useRef, useState } from 'react';
import { fetchNotifications } from '../../service/Notifications';

interface Props {
  notificationsVisible: boolean;
  toggleNotifications: () => void;
}

const INTERVAL = 5000;

export function NotificationsWrapper({
  notificationsVisible,
  toggleNotifications,
}: Props) {
  const [hasNew, setHasNew] = useState(false);
  const isDesktop = useBreakpointValue({ base: false, md: true });
  const [notifications, setNotifications] = useState<UserNotification[]>([]);
  const timer = useRef<number | undefined>(undefined);

  const handleClose = () => {
    toggleNotifications();
  };

  useEffect(() => {
    setHasNew(notifications.some((notification) => !notification.is_read));
  }, [notifications]);

  useEffect(() => {
    const updateNotifications = async () => {
      const result = await fetchNotifications();
      setNotifications(result);
    };

    if (!timer.current && window) {
      timer.current = window.setInterval(async () => {
        updateNotifications();
      }, INTERVAL);
    }

    return () => {
      if (timer.current && window) {
        window.clearInterval(timer.current);
        timer.current = undefined;
      }
    };
  }, []);

  return (
    <>
      <IconButton
        variant="outline"
        bg={notificationsVisible ? '#805AD5' : 'transparent'}
        border="none"
        aria-label="notifications"
        icon={
          hasNew ? (
            <LuBellDot color="#fff" size={24} />
          ) : (
            <LuBell color="#fff" size={24} />
          )
        }
        _hover={{ color: '#fff', bg: '#805AD5' }}
        marginRight="4"
        onClick={notificationsVisible ? handleClose : toggleNotifications}
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
            <NotificationsBox
              handleClose={handleClose}
              notifications={notifications}
            />
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
