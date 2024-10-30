export type videoTypes = {
  $id: string;
  $title: string;
  $thumbnail: string;
  $prompt: string;
  $video: string;
  $isPrivate: boolean;
  $likes: string[];
  creator: {
    $avatar: string;
    $name: string;
  };
};
const useGetVideoFormatted = (item: any) => {
  const videoData: videoTypes[] = item
    ? item?.map((post: any) => ({
        $id: post.$id,
        $title: post?.title,
        $thumbnail: post?.thumbnail,
        $prompt: post?.prompt,
        $video: post?.video,
        $isPrivate: post?.isPrivate,
        $likes: post?.likes,
        creator: {
          $avatar: post?.creator?.avatar,
          $name: post?.creator?.username,
        },
      }))
    : [];

  return videoData;
};

export default useGetVideoFormatted;
