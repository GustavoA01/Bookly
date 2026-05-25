import { useEffect, useRef } from 'react';
import { ChatScrollType } from '../types';

export const useChatScroll = ({
  messages,
  isRequestPending,
  temporaryMessage,
}: ChatScrollType) => {
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTo({
        top: scrollRef.current.scrollHeight,
        behavior: 'smooth',
      });
    }
  }, [messages, isRequestPending, temporaryMessage]);

  return scrollRef;
};
