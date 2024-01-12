import { QueryClient, QueryClientProvider, useQuery } from "react-query";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import CustomNavBar from "@/components/CustomNavBar";
import { Image, Swiper, SwiperItem, Text, View } from "@tarojs/components";
import { fetchIndexPage } from "@/apis/page";
import moment from "moment";
import { AtIcon } from "taro-ui";
import Article from "../Article";
import Search from "../Search";
import PageItem from "@/components/PageItem";

const list = [
  {
    title: "Umi3",
    url: "http://localhost:9876/systemImgs/th.jpg",
    pageId: "1111",
  },
  {
    title: "React",
    url: "http://localhost:9876/systemImgs/th.jpg",
    pageId: "2222",
  },
  {
    title: "Vue",
    url: "http://localhost:9876/systemImgs/th.jpg",
    pageId: "3333",
  },
  {
    title: "Js",
    url: "http://localhost:9876/systemImgs/th.jpg",
    pageId: "4444",
  },
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
          <PageItem item={item} />
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
          <Route path="pages/search/index" element={<Search />} />
        </Routes>
      </BrowserRouter>
    </QueryClientProvider>
  );
}
