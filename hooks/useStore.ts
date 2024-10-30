import { create } from "zustand";
import { videoTypes } from "./useGetVideoFormatted";

type VideoStore = {
  selectedVideo: any;
  setSelectedVideo: (video: videoTypes) => void;
};

export const useVideoStore = create<VideoStore>((set) => ({
  selectedVideo: null,
  setSelectedVideo: (video: videoTypes) => set({ selectedVideo: video }),
}));
