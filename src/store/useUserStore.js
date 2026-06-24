import { create } from 'zustand';
import { persist } from 'zustand/middleware';

const useUserStore = create(
  persist(
    (set) => ({
      user: null,
      isRegistered: false,

      setUser: (userData) =>
        set({
          user: {
            name: userData.name,
            username: userData.username,
            email: userData.email,
            mobile: userData.mobile,
          },
          isRegistered: true,
        }),

      logout: () =>
        set({
          user: null,
          isRegistered: false,
        }),
    }),
    {
      name: 'super-app-user',
    }
  )
);

export default useUserStore;
