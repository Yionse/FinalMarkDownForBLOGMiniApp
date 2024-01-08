import { Input, Text, View } from "@tarojs/components";
import Taro from "@tarojs/taro";
import { useEffect, useState } from "react";
import { AtSearchBar } from "taro-ui";

export default function CustomNavBar() {
  const [marginTop, setMarginTop] = useState<Number>();
  const [key, setKey] = useState<string>("");
  useEffect(() => {
    async function initBarHeight() {
      const { statusBarHeight } = await Taro.getSystemInfo();
      setMarginTop(statusBarHeight!);
    }
    initBarHeight();
  }, []);
  return (
    <>
      <View
        style={{
          background: "#f3f2ee",
          marginTop: marginTop + "px",
          height: "50px",
          lineHeight: "50px",
          padding: "0 10px",
        }}
      >
        <Text>Z-BLOG</Text>
      </View>
      <AtSearchBar
        placeholder="搜一下"
        actionName="搜一下"
        value={key}
        onChange={setKey}
        onActionClick={() => {
          console.log(key);
        }}
      />
    </>
  );
}
