import { fetchMdContent } from "@/apis/page";
import CustomNavBar from "@/components/CustomNavBar";
import { Image, Text, View } from "@tarojs/components";
import { useQuery } from "react-query";
import { useLocation } from "react-router-dom";
import ReactMarkdown from "react-markdown"; //引入
import remarkGfm from "remark-gfm";
import row from "rehype-raw";
import "./index.less";
import { AtFab, AtIcon } from "taro-ui";

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
      <View
        className="p-2 px-4"
        style={{ background: "#f3f2ee" }}
        id="PageContent"
        onTouchMove={(e) => {
          console.log(e);
        }}
      >
        <ReactMarkdown
          children={data?.content}
          remarkPlugins={[remarkGfm]}
          rehypePlugins={[row]}
          components={{
            code(props) {
              const { children, className, node, ...rest } = props;
              return (
                <code {...rest} className={className}>
                  {children}
                </code>
              );
            },
            img(props) {
              if (props.src?.includes("http")) {
                return <Image src={props.src} />;
              }
              return (
                <>
                  <Image
                    src="http://localhost:9876/systemImgs/notfound.jpg"
                    style={{ width: "100%", height: "100px" }}
                  />
                  <Text style={{ color: "red", textAlign: "center" }}>
                    无法访问该图片,可能是由于照片未上传至服务器
                  </Text>
                </>
              );
            },
            table({ node }) {
              return (
                <View
                  className="my-1"
                  style={{ border: "1px solid #ccc", borderBottom: "none" }}
                >
                  {node?.children!?.map((tbody: any) =>
                    tbody?.children.map((tr) => {
                      const cusWidth = (1 / tr.children.length) * 100 + "%";
                      return (
                        <View
                          style={{
                            borderBottom: "1px solid #ccc",
                            lineHeight: "2rem",
                          }}
                          className="h-8 flex flex-row flex-nowrap"
                        >
                          {tr.children.map((td) =>
                            td.tagName === "th" ? (
                              <Text
                                className="mx-1 overflow-hidden"
                                style={{ fontWeight: "bold", width: cusWidth }}
                              >
                                {td?.children?.[0]?.value}
                              </Text>
                            ) : (
                              <Text
                                className="mx-1 overflow-hidden"
                                style={{ width: cusWidth }}
                              >
                                {td?.children?.[0]?.value}
                              </Text>
                            )
                          )}
                        </View>
                      );
                    })
                  )}
                </View>
              );
            },
          }}
        />
        <AtFab>
          <Text className="at-fab__icon at-icon at-icon-menu"></Text>
        </AtFab>
      </View>
    </>
  );
}
