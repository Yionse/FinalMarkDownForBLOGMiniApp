import { QueryClient, QueryClientProvider, useQuery } from "react-query";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import CustomNavBar from "@/components/CustomNavBar";
import { Image, Swiper, SwiperItem, Text, View } from "@tarojs/components";
import th from "@/assets/th.jpg";
import th1 from "@/assets/th1.jpg";
import th2 from "@/assets/th2.jpg";
import th3 from "@/assets/th3.jpg";
import { fetchIndexPage } from "@/apis/page";
import moment from "moment";
import { AtIcon } from "taro-ui";
import Article from "../Article";

const list = [
  { title: "Umi3", url: th, pageId: "1111" },
  { title: "React", url: th1, pageId: "2222" },
  { title: "Vue", url: th2, pageId: "3333" },
  { title: "Js", url: th3, pageId: "4444" },
];
definePageConfig({
  navigationStyle: "custom",
});

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
      refetchOnWindowFocus: false,
    },
  },
});

function Home() {
  const { data } = useQuery(["indexmd"], () => fetchIndexPage());
  return (
    <View style={{ background: "#f7f7f7" }}>
      <CustomNavBar />
      <Swiper
        className="test-h"
        indicatorColor="#f3f2ee"
        indicatorActiveColor="#1677ff"
        autoplay
        circular
        indicatorDots
        interval={3000}
      >
        {list.map((item) => (
          <SwiperItem>
            <View
              style={{ position: "relative", height: "100%", width: "100%" }}
            >
              <Text
                className="absolute bottom-0 w-full pl-5"
                style={{
                  background: "rgba(0,0,0,.6)",
                  height: "40px",
                  lineHeight: "40px",
                  color: "white",
                }}
              >
                {item.title}
              </Text>
              <Image src={item.url} style={{ width: "100%", height: "100%" }} />
            </View>
          </SwiperItem>
        ))}
      </Swiper>
      <View style={{ background: "#f7f7f7" }}>
        {data?.data.map((item) => (
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
                  className=" flex flex-row text-xs justify-around"
                  style={{ height: "20%", color: "#6190e8" }}
                >
                  <Text>
                    {moment(Number(item.createTime)).format("YYYY-MM-DD")}
                  </Text>
                  <View className="flex-grow pl-1">
                    <Text style={{ color: "black" }}>
                      <AtIcon value="eye" size={12} />
                      {item.viewCount}
                    </Text>
                    &nbsp;
                    <Text style={{ color: "#6190e8" }}>
                      <AtIcon value="heart-2" size={12} />
                      {item.likeCount}
                    </Text>
                    &nbsp;
                    <Text style={{ color: "black" }}>
                      <AtIcon value="heart" size={12} />
                      {item.unlikeCount}
                    </Text>
                  </View>
                </View>
              </View>
            </View>
          </Link>
        ))}
      </View>
    </View>
  );
}

export default function Index() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Routes>
          <Route path="pages/index/index" index element={<Home />} />
          <Route path="pages/article/index" element={<Article />} />
        </Routes>
      </BrowserRouter>
    </QueryClientProvider>
  );
}
