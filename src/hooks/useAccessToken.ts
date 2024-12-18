import { useLocalStorage } from "./useLocalStorage";

export default function useAccessToken() {
  const [accessToken, setAccessToken, clearAccessToken] =
    useLocalStorage<string>("accessToken", "");

  return { accessToken, setAccessToken, clearAccessToken };
}
