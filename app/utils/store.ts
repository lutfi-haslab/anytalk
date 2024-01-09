import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";

export interface Profile {
  profile: {
    userName: string;
    fullName: string | null;
    imgUrl: string | null;
    email: string;
    following: [] | null | any
    follower: [] | null | any
    about: string;
    id?: string;
    clerkUserId?: string;
  };
  setProfile: (data: any) => void;
}

export const useProfileStore = create<Profile>()(
  devtools(
    persist(
      (set) => ({
        profile: {
          userName: "",
          fullName: "",
          imgUrl: "",
          email: "",
          about: "",
          id: "",
          clerkUserId: "",
          following: undefined,
          follower: undefined
        },
        setProfile: (data: any) => set({ profile: data }),
      }),
      { name: "profile-store" }
    )
  )
);
