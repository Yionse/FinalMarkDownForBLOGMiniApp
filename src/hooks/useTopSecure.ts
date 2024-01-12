import Taro from "@tarojs/taro";
import { useEffect, useState } from "react";

export default function useTopSecure() {
  const [marginTop, setMarginTop] = useState<number>();
  useEffect(() => {
    async function initBarHeight() {
      const { statusBarHeight } = await Taro.getSystemInfo();
      setMarginTop(statusBarHeight!);
    }
    initBarHeight();
  }, []);
  return {
    marginTop,
  };
}
