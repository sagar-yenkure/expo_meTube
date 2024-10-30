import { CommentType } from "@/features/comments/getCommentApi";
import timeAgo from "@/hooks/useTimeAgo";
import useAddComments from "@/services/comments/useAddComments";
import { useState } from "react";
import {
  ScrollView,
  Text,
  View,
  Image,
  TextInput,
  TouchableOpacity,
} from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";
import Spinner from "./Spinner";
import { useGlobalContext } from "@/context/GlobalProvider";
import useDeleteComment from "@/services/comments/useDeleteComment";
import useUpdateComment from "@/services/comments/useUpdateComment";

interface CommentProps {
  comments: CommentType[] | undefined;
  commentsIsLoading: boolean;
  videoId: string;
}

const CommentDivider = ({
  comments,
  commentsIsLoading,
  videoId,
}: CommentProps) => {
  const { user } = useGlobalContext();
  const userId = user?.$id;
  const [commentInput, setCommentInput] = useState({ text: "", id: "" });
  const [deletingCommentId, setDeletingCommentId] = useState<string | null>(
    null
  );

  const { addComments, addCommentsPending } = useAddComments();
  const { deleteComment, deleteCommentPending } = useDeleteComment();
  const { updateComment, updateCommentPending } = useUpdateComment();

  const handleSendComment = () => {
    if (!commentInput.text.trim()) return;

    if (commentInput.id) {
      updateComment({ videoId: commentInput.id, comment: commentInput.text });
    } else {
      addComments({ comments: commentInput.text, videoId });
    }
    setCommentInput({ text: "", id: "" });
  };

  const startEditComment = (id: string, text: string) => {
    setCommentInput({ text, id });
  };

  const handleDeleteComment = async (commentId: string) => {
    setDeletingCommentId(commentId);
    await deleteComment(commentId);
    setDeletingCommentId(null);
  };

  if (commentsIsLoading) return <Text>Loading comments...</Text>;

  return (
    <View className="flex-1 bg-gray-900 rounded-lg m-2 p-2">
      <ScrollView
        style={{ height: 250 }}
        contentContainerStyle={{ flex: 0 }}
        overScrollMode="always"
      >
        {comments?.map((comment) => (
          <View
            key={comment.$id}
            className="flex-row items-start p-2 border-b border-gray-700"
          >
            <Image
              source={{ uri: comment.avatar }}
              className="w-6 h-6 rounded-full mr-3"
              alt="User Avatar"
            />
            <View className="flex-1">
              <Text className="text-white text-sm font-semibold">
                {comment.username}
              </Text>
              <Text className="text-gray-300 mt-1">{comment.comments}</Text>
              <Text className="text-gray-500 mt-1 text-xs">
                {timeAgo(comment.createdAt)}
              </Text>
            </View>

            {comment.userId === userId && (
              <View className="flex flex-row justify-end gap-2">
                <TouchableOpacity
                  disabled={
                    addCommentsPending || deletingCommentId === comment.$id
                  }
                  onPress={() => handleDeleteComment(comment.$id)}
                  activeOpacity={0.9}
                >
                  {deletingCommentId === comment.$id ? (
                    <Spinner />
                  ) : (
                    <Icon name="delete" size={24} color="#00BFFF" />
                  )}
                </TouchableOpacity>

                <TouchableOpacity
                  disabled={addCommentsPending || updateCommentPending}
                  onPress={() =>
                    startEditComment(comment.$id, comment.comments)
                  }
                  activeOpacity={0.9}
                >
                  <Icon name="edit" size={24} color="#00BFFF" />
                </TouchableOpacity>
              </View>
            )}
          </View>
        ))}
      </ScrollView>

      <View className="flex-row items-center mt-1 bg-gray-800 rounded-lg p-2">
        <TextInput
          className="text-base text-white flex-1 font-regular mr-2"
          value={commentInput.text}
          placeholder="Add a comment..."
          placeholderTextColor="#CDCDE0"
          onChangeText={(text) =>
            setCommentInput((prev) => ({ ...prev, text }))
          }
        />
        <TouchableOpacity
          disabled={addCommentsPending || updateCommentPending}
          onPress={handleSendComment}
          activeOpacity={0.9}
        >
          {addCommentsPending || updateCommentPending ? (
            <Spinner />
          ) : (
            <Icon name="send" size={24} color="#00BFFF" />
          )}
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default CommentDivider;
