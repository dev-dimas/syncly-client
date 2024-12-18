import { projectApi } from "@/api/projects/projectApi";
import { RootState } from "@/app/store";
import { addMessage, Message, setError, setRedDotNotification } from "@/slices/notificationSlice";
import { EventSource } from "eventsource";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import useAccessToken from "./useAccessToken";

export default function useNotification(url: string) {
  const dispatch = useDispatch();
  const messages = useSelector((state: RootState) => state.notification.messages);
  const { accessToken } = useAccessToken();

  useEffect(() => {
    const eventSource = new EventSource(url, {
      fetch: (input, init) =>
        fetch(input, {
          ...init,
          headers: {
            ...init!.headers,
            Authorization: `Bearer ${accessToken}`,
          },
        }),
    });

    eventSource.onmessage = (event: MessageEvent) => {
      try {
        let hasUnreadMessage: boolean = false;
        const parsedData = JSON.parse(event.data);
        const isArray = Array.isArray(parsedData);

        if (messages.length) {
          dispatch(projectApi.util.invalidateTags(["Project"]));
        }

        if (isArray) {
          const data: Message[] = parsedData;
          hasUnreadMessage = !!data.find((message) => message.seen === false);
          dispatch(addMessage(data));
        } else {
          const data: Message = parsedData;
          hasUnreadMessage = data.seen === false;
          dispatch(addMessage([data]));
        }

        if (hasUnreadMessage) {
          dispatch(setRedDotNotification());
        }
      } catch (err) {
        console.error("Error parsing Notification message:", err);
      }
    };

    eventSource.onerror = () => {
      dispatch(setError("An error occurred while connecting to the server."));
      eventSource.close();
    };

    return () => {
      eventSource.close();
    };
  }, [url, dispatch, accessToken]);
}
