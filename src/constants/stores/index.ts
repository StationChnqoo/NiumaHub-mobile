import {create} from 'zustand';
import {createJSONStorage, devtools, persist} from 'zustand/middleware';
import {User, UserSchema} from '../t';

import {MMKV} from 'react-native-mmkv';
import {StateStorage} from 'zustand/middleware';

// const mmkv = new MMKV({
//   id: 'useMMKV',
//   encryptionKey: 'net.cctv3.iCloud',
// });
const mmkv = new MMKV();
const mmkvStorage: StateStorage = {
  setItem: (key, value) => mmkv.set(key, value),
  getItem: key => mmkv.getString(key) || null,
  removeItem: key => mmkv.delete(key),
};

interface States {
  user: User;
  setUser: (user: User) => void;
  bears: number;
  increase: (by: number) => void;
}

const initialState = {
  bears: 0,
  user: UserSchema.parse({}),
};

const useCaches = create<States>()(
  devtools(
    persist(
      set => ({
        ...initialState,
        increase: by => set(state => ({bears: state.bears + by})),
        setUser: user => set({user}),
      }),
      {
        storage: createJSONStorage(() => mmkvStorage),
        name: 'useCaches.ts',
        /** 白名单 */
        partialize: state => ({
          bears: state.bears,
          user: state.user,
        }),
      },
    ),
  ),
);

export {useCaches};
