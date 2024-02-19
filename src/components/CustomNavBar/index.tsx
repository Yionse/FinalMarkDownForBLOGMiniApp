import useTopSecure from "@/hooks/useTopSecure";
import { Image, Input, View } from "@tarojs/components";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

type TProps = {
  showSearch?: boolean;
  setTop?: React.Dispatch<React.SetStateAction<number>>;
};

export default function CustomNavBar({ showSearch = true, setTop }: TProps) {
  const navigate = useNavigate();
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
        <Input
          confirmType="search"
          onConfirm={(e) =>
            navigate(`/pages/search/index?key=${e.detail.value}`)
          }
          type="text"
          placeholder="请输入关键字"
          maxlength={10}
          style={{
            border: "1px solid #ccc",
            margin: "10px 20px",
            borderRadius: "10px",
            height: "30px",
            paddingLeft: "20px",
          }}
        />
      )}
    </>
  );
}
