import { TitleRes } from "@/apis/page";
import { Image, Text, View } from "@tarojs/components";
import moment from "moment";
import { Link } from "react-router-dom";
import { AtIcon } from "taro-ui";

export default function PageItem({ item }: { item: TitleRes }) {
  return (
    <Link to={`/pages/article/index?pageId=${item.pageid}`}>
      <View
        className="flex flex-row my-2 mx-2 py-2"
        style={{
          borderBottom: "4px solid rgba(0,0,0,.4)",
        }}
      >
        <Image
          src={item?.coverUrl}
          className="w-40 h-28 rounded-xl flex-shrink-0"
        />
        <View className=" flex flex-col w-full px-4 flex-grow-0">
          <View className="page-item-title">{item.title}</View>
          <Text
            className="my-1 flex-grow-0"
            style={{
              fontSize: "12px",
              textIndent: "1rem",
              height: "60%",
            }}
          >
            {item.description.slice(0, 50)}
          </Text>
          <View
            className=" flex flex-row text-xs"
            style={{ height: "20%", color: "#6190e8" }}
          >
            <Text>
              {moment(Number(item.createTime)).format("YYYY-MM-DD HH:mm")}
            </Text>
            <Text style={{ color: "black", marginLeft: "30px" }}>
              <AtIcon value="eye" size={12} />
              {item.viewCount}
            </Text>
          </View>
        </View>
      </View>
    </Link>
  );
}
