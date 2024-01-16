import { get } from ".";

type IndexMdType = {
  data: {
    qq: string;
    pageid: string;
    title: string;
    coverUrl: string;
    createTime: string;
    likeCount: number;
    unlikeCount: number;
    description: string;
    viewCount: number;
  }[];
};

type UserInfoType = {
  sqlRes: {
    qq: string;
    userImg: string;
    userName: string;
    registerDate: string;
    vermicelliCount: string;
    pagesNumber: string;
    school: string;
    prefession: string;
    sex: string;
    description: string;
    messageDataName: string;
  };
};

export type MessageType = {
  username: string;
  userimg: string;
  content: string;
  createTime: string;
};

export interface UserRes {
  qq: string;
  userImg: string;
  userName: string;
  description: string;
}

export interface TitleRes {
  qq: string;
  pageid: string;
  title: string;
  coverUrl: string;
  createTime: string;
  likeCount: number;
  unlikeCount: number;
  description: string;
  viewCount: number;
}

export type SearchResType = {
  titleRes: TitleRes[];
  userRes: UserRes[];
};

export function fetchIndexPage() {
  return get<IndexMdType>("/page/indexmd", { platform: 0 });
}

export function fetchMdContent(pageId: string) {
  return get<{ content: string }>(`/page/md`, { pageId });
}

export function fetchUserInfo(qq: string) {
  return get<UserInfoType>("/user/getuserinfo", { qq });
}

export function fetchPageCommentList(pageid: string) {
  return get<{
    data: MessageType[];
  }>("/page/commentlist", { pageid });
}

export function fetchQueryKey(key: string) {
  return get<SearchResType>("/page/query", { key });
}
