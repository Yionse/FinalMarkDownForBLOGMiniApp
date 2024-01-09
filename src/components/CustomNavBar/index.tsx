import { Input, Text, View } from "@tarojs/components";
import Taro from "@tarojs/taro";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { AtSearchBar } from "taro-ui";

type TProps = {
  showSearch?: boolean;
};

export default function CustomNavBar({ showSearch = true }: TProps) {
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
          background: "#f7f7f7",
          marginTop: marginTop + "px",
          height: "50px",
          lineHeight: "50px",
          padding: "0 10px",
        }}
      >
        <Link to={"/pages/index/index"}>
          <Text>Z-BLOG</Text>
        </Link>
      </View>
      {showSearch && (
        <AtSearchBar
          placeholder="搜一下"
          actionName="搜一下"
          value={key}
          onChange={setKey}
          onActionClick={() => {
            console.log(key);
          }}
        />
      )}
    </>
  );
}
