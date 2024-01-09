import { fetchMdContent } from "@/apis/page";
import CustomNavBar from "@/components/CustomNavBar";
import { Text, View } from "@tarojs/components";
import { useQuery } from "react-query";
import { useLocation } from "react-router-dom";

definePageConfig({
  navigationBarTitleText: "文章",
});

export default function Article() {
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const pageId = params.get("pageId") || "";
  const { data } = useQuery(
    ["pageData", pageId],
    async () => fetchMdContent(pageId),
    {
      refetchOnWindowFocus: false,
    }
  );
  return (
    <>
      <CustomNavBar showSearch={false} />
      <View>
        <Text>文章</Text>
        {pageId}
      </View>
    </>
  );
}
