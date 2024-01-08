import CustomNavBar from "@/components/CustomNavBar";
import { Image, Swiper, SwiperItem, Text, View } from "@tarojs/components";
import th from "@/assets/th.jpg";
import th1 from "@/assets/th1.jpg";
import th2 from "@/assets/th2.jpg";
import th3 from "@/assets/th3.jpg";

const list = [
  { title: "Umi3", url: th, pageId: "1111" },
  { title: "React", url: th1, pageId: "2222" },
  { title: "Vue", url: th2, pageId: "3333" },
  { title: "Js", url: th3, pageId: "4444" },
];
definePageConfig({
  navigationStyle: "custom",
});

export default function Index() {
  return (
    <View>
      <CustomNavBar />
      <Swiper
        className="test-h"
        indicatorColor="#f3f2ee"
        indicatorActiveColor="#1677ff"
        autoplay
        interval={3000}
      >
        {list.map((item) => (
          <SwiperItem>
            <View
              style={{ position: "relative", height: "100%", width: "100%" }}
            >
              <Text
                style={{
                  position: "absolute",
                  bottom: "0px",
                  background: "rgba(0,0,0,.6)",
                  width: "100%",
                  height: "40px",
                  lineHeight: "40px",
                  color: "white",
                  paddingLeft: "20px",
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
