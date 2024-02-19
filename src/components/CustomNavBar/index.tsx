import useTopSecure from "@/hooks/useTopSecure";
import { Image, Input, Text, View } from "@tarojs/components";
import { useState } from "react";
import { Link } from "react-router-dom";
import { AtSearchBar } from "taro-ui";
import { useNavigate } from "react-router-dom";

type TProps = {
  showSearch?: boolean;
  setTop?: React.Dispatch<React.SetStateAction<number>>;
};

export default function CustomNavBar({ showSearch = true, setTop }: TProps) {
  const navigate = useNavigate();
  const [key, setKey] = useState<string>("");
  const { marginTop } = useTopSecure();
  if (setTop) {
    setTop(marginTop!);
  }
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
          <Image
            src="https://blog.end.zhangtc.online/systemImgs/logo.png"
            style={{ height: "50px" }}
          />
        </Link>
      </View>
      {showSearch && (
        <AtSearchBar
          placeholder="搜一下"
          actionName="搜一下"
          value={key}
          onChange={setKey}
          onActionClick={() => navigate(`/pages/search/index?key=${key}`)}
        />
      )}
    </>
  );
}
