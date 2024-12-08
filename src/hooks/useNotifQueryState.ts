import { parseAsBoolean, useQueryState } from "nuqs";

export default function useNotifQueryState() {
  const [isNotificationsOpen, setIsNotificationsOpen] = useQueryState(
    "notifWindow",
    parseAsBoolean
  );

  return { isNotificationsOpen, setIsNotificationsOpen };
}
