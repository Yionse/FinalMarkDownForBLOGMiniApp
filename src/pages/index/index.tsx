import { QueryClient, QueryClientProvider, useQuery } from "react-query";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import CustomNavBar from "@/components/CustomNavBar";
import { Image, Swiper, SwiperItem, Text, View } from "@tarojs/components";
import th from "@/assets/th.jpg";
import th1 from "@/assets/th1.jpg";
import th2 from "@/assets/th2.jpg";
import th3 from "@/assets/th3.jpg";
import { get } from "@/apis";

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
  const { data } = useQuery(["indexmd"], () => get("/page/indexmd"));
  return (
    <View>
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
    </View>
  );
}

export default function Index() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Routes>
          <Route path="pages/index/index" element={<Home />} />
        </Routes>
      </BrowserRouter>
    </QueryClientProvider>
  );
}
