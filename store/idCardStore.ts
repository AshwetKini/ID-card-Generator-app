// import { create } from 'zustand';
// import { persist, createJSONStorage } from 'zustand/middleware';
// import AsyncStorage from '@react-native-async-storage/async-storage';

// export interface IDCardData {
//   memberNumber: string;
//   name: string;
//   village: string;
//   district: string;
//   districtMarathi: string;
//   taluka: string;
//   talukaMarathi: string;
//   pincode: string;
//   receiptNumber: string;
//   date: string;
//   photo: string;
// }

// interface IDCardStore {
//   idCardData: IDCardData;
//   updateIDCardData: (data: Partial<IDCardData>) => void;
//   clearIDCardData: () => void;
// }

// const initialData: IDCardData = {
//   memberNumber: '',
//   name: '',
//   village: '',
//   district: '',
//   districtMarathi: '',
//   taluka: '',
//   talukaMarathi: '',
//   pincode: '',
//   receiptNumber: '',
//   date: '',
//   photo: '',
// };

// export const useIDCardStore = create<IDCardStore>()(
//   persist(
//     (set) => ({
//       idCardData: initialData,
//       updateIDCardData: (data) =>
//         set((state) => ({
//           idCardData: { ...state.idCardData, ...data },
//         })),
//       clearIDCardData: () =>
//         set(() => ({
//           idCardData: initialData,
//         })),
//     }),
//     {
//       name: 'id-card-storage',
//       storage: createJSONStorage(() => AsyncStorage),
//     }
//   )
// );
import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';

export interface IDCardData {
  memberNumber: string;
  name: string;
  village: string;
  district: string;
  districtMarathi: string;
  taluka: string;
  talukaMarathi: string;
  pincode: string;
  receiptNumber: string;
  date: string;
  photo: string;
}

interface IDCardStore {
  idCardData: IDCardData;
  idList: IDCardData[];
  updateIDCardData: (data: Partial<IDCardData>) => void;
  clearIDCardData: () => void;
  generateID: () => void;
  clearAllIDs: () => void;
}

const initialData: IDCardData = {
  memberNumber: '',
  name: '',
  village: '',
  district: '',
  districtMarathi: '',
  taluka: '',
  talukaMarathi: '',
  pincode: '',
  receiptNumber: '',
  date: '',
  photo: '',
};

export const useIDCardStore = create<IDCardStore>()(
  persist(
    (set, get) => ({
      idCardData: initialData,
      idList: [],
      updateIDCardData: (data) =>
        set((state) => ({ idCardData: { ...state.idCardData, ...data } })),
      clearIDCardData: () => set(() => ({ idCardData: initialData })),
      generateID: () => {
        const newCard = get().idCardData;
        set((state) => ({
          idList: [...state.idList, newCard],
          idCardData: initialData,
        }));
      },
      clearAllIDs: () => set(() => ({ idList: [] })),
    }),
    {
      name: 'id-card-storage',
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);
