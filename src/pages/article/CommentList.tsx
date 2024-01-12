import { MessageType } from "@/apis/page";
import useTopSecure from "@/hooks/useTopSecure";
import { ScrollView, View } from "@tarojs/components";

export default function CommentList({ data }: { data: MessageType[] }) {
  const { marginTop } = useTopSecure();
  return (
    <ScrollView
      className="box-border p-4"
      style={{
        marginTop,
        height: `calc(100vh - ${marginTop}px)`,
      }}
      scrollY
    >
      {data?.map((item) => (
        <View className="h-11">{item.content}</View>
      ))}
    </ScrollView>
  );
}
