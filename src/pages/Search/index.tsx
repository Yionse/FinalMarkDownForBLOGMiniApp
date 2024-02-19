import { fetchQueryKey } from "@/apis/page";
import CustomNavBar from "@/components/CustomNavBar";
import PageItem from "@/components/PageItem";
import { Text, View } from "@tarojs/components";
import { URLSearchParams } from "@tarojs/runtime";
import { useQuery } from "react-query";
import { useLocation } from "react-router-dom";

export default function Search() {
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const key = params.get("key");
  const { data } = useQuery(["query", key], async () => fetchQueryKey(key));
  return (
    <View>
      <CustomNavBar showSearch={false} />
      <Text
        className="p-4 text-xl mt-2"
        style={{ height: "40px", lineHeight: "40px" }}
      >
        <Text style={{ color: "red" }}>{key}</Text> 相关的文章
      </Text>
      {data?.titleRes.map((item) => (
        <PageItem item={item} />
      ))}
      <View>{data?.titleRes.length === 0 && <Text>当前暂无结果</Text>}</View>
      {/* 暂时不显示用户吧 */}
      {/* <Text
        className="p-4 text-xl mt-2"
        style={{ height: "40px", lineHeight: "40px" }}
      >
        <Text style={{ color: "red" }}>{key}</Text> 相关的用户
      </Text>
      {data?.userRes.map((item) => (
        <View className="flex flex-row px-1 my-2">
          <Image src={item.userImg} className="w-16 h-16 rounded-full" />
          <View className="flex flex-col">
            <Text
              style={{ height: "44px", lineHeight: "44px" }}
              className="ml-2 text-xl font-bold"
            >
              {item.userName}
            </Text>
            <Text
              style={{ height: "12px", lineHeight: "12px", color: "#ccc" }}
              className="ml-2 text-sm"
            >
              {item.description}
            </Text>
          </View>
        </View>
      ))} */}
    </View>
  );
}
