import { useEffect, useState } from "react";

export function useInsecureBrowser() {
  const [isInsecure, setIsInsecure] = useState(false);

  useEffect(() => {
    const ua = navigator.userAgent || "";
    const isWebView = /Instagram|FBAN|FBAV|TikTok|Messenger/i.test(ua);
    setIsInsecure(isWebView);
  }, []);

  return isInsecure;
}
