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

export function fetchIndexPage() {
  return get<IndexMdType>("/page/indexmd");
}

export function fetchMdContent(pageId: string) {
  return get<{ content: string }>(`/page/md?pageId=${pageId}`);
}
