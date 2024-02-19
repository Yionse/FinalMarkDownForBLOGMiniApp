import { QueryClient, QueryClientProvider, useQuery } from "react-query";
import { BrowserRouter, Routes, Route, useNavigate } from "react-router-dom";
import CustomNavBar from "@/components/CustomNavBar";
import { Image, Swiper, SwiperItem, Text, View } from "@tarojs/components";
import { fetchIndexPage } from "@/apis/page";
import Article from "../Article";
import PageItem from "@/components/PageItem";
import { useMemo } from "react";
import Search from "../Search";
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
  const navigate = useNavigate();
  const { data } = useQuery(["indexmd"], () => fetchIndexPage());
  const swipe =
    useMemo(
      () => data?.data.filter((item) => item.position === "swipe"),
      [data]
    ) || [];
  const home =
    useMemo(
      () => data?.data.filter((item) => item.position === "home"),
      [data]
    ) || [];
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
        {swipe!.map((item) => (
          <SwiperItem
            onClick={() =>
              navigate(`/pages/article/index?pageId=${item.pageid}`)
            }
          >
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
              <Image
                src={item.coverUrl}
                style={{ width: "100%", height: "100%" }}
              />
            </View>
          </SwiperItem>
        ))}
      </Swiper>
      <View style={{ background: "#f7f7f7" }}>
        {home.map((item) => (
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
