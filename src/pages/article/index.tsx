import {
  fetchMdContent,
  fetchPageCommentList,
  fetchUserInfo,
} from "@/apis/page";
import CustomNavBar from "@/components/CustomNavBar";
import { Button, Image, ScrollView, Text, View } from "@tarojs/components";
import { useQuery } from "react-query";
import { useLocation } from "react-router-dom";
import ReactMarkdown from "react-markdown"; //引入
import remarkGfm from "remark-gfm";
import row from "rehype-raw";
import "./index.less";
import { useState } from "react";
import { AtIcon, AtDrawer } from "taro-ui";
import Taro from "@tarojs/taro";
import CommentList from "./CommentList";
import useTopSecure from "@/hooks/useTopSecure";

definePageConfig({
  navigationBarTitleText: "文章",
});

export default function Article() {
  const [isShowComment, setIsShowComment] = useState<boolean>(false);
  const [isShowDrawer, setIsShowDrawer] = useState<boolean>(false);
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const [_, setTop] = useState<number>();
  const pageId = params.get("pageId") || "";
  const qq = pageId?.slice(0, -13);
  const { marginTop } = useTopSecure();
  const { data } = useQuery(
    ["pageData", pageId],
    async () => {
      const [{ content }, { sqlRes }, { data }] = await Promise.all([
        fetchMdContent(pageId),
        fetchUserInfo(qq),
        fetchPageCommentList(pageId),
      ]);
      return {
        content,
        userInfo: sqlRes,
        commentList: data,
      };
    },
    {
      refetchOnWindowFocus: false,
    }
  );
  return (
    <View
      className="relative"
      style={{
        background: "#f3f2ee",
      }}
    >
      <CustomNavBar showSearch={false} setTop={setTop} />
      <View className="p-2 px-4 box-border page-box">
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
      </View>
      <View
        className="fixed right-8 bottom-8 flex flex-col rounded-full p-2"
        style={{
          background: "#f7f7f7",
        }}
      >
        <AtIcon
          value="chevron-up"
          size={30}
          onClick={() =>
            Taro.pageScrollTo({
              scrollTop: 0,
              duration: 300,
            })
          }
          color="#6190e8"
        />
        <View className="my-4" style={{ borderBottom: "1px solid #ccc" }} />
        <AtIcon
          value="user"
          size={30}
          onClick={() => setIsShowDrawer(true)}
          color="#6190e8"
        />
        <View className="my-4" style={{ borderBottom: "1px solid #ccc" }} />
        <AtIcon
          value="message"
          size={30}
          onClick={() => setIsShowComment(true)}
          color="#6190e8"
        />
      </View>
      <AtDrawer
        show={isShowDrawer}
        mask
        right
        onClose={() => setIsShowDrawer(false)}
      >
        <View style={{ marginTop }} className="box-border p-4">
          <View className="text-center">
            <Image
              src={data?.userInfo.userImg!}
              className="rounded-full h-20 w-20"
            />
          </View>
          <View
            className="h-10 text-2xl pb-2"
            style={{ lineHeight: "40px", borderBottom: "1px solid #ccc" }}
          >
            <Text className="font-bold">{data?.userInfo.userName}</Text>
          </View>
          <View
            className="h-10 text-2xl pb-2"
            style={{ lineHeight: "40px", borderBottom: "1px solid #ccc" }}
          >
            <Text className="font-bold">{data?.userInfo.qq}</Text>
          </View>
        </View>
      </AtDrawer>
      <AtDrawer show={isShowComment} onClose={() => setIsShowComment(false)}>
        <CommentList data={data?.commentList!} />
      </AtDrawer>
    </View>
  );
}
