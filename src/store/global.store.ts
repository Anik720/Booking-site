import { create } from "zustand";

export const useGlobalStore = create<globalStoreProps>((set: any) => ({


  hotelDataGlobal: {},
  sethotelDataGlobal: (data: string) => set(() => ({ hotelDataGlobal: data })),


  flightDataGlobal: {},
  setflightDataGlobal: (data: string) => set(() => ({ flightDataGlobal: data })),

  showForm: true,
  setShowForm: (data: string) => set(() => ({ showForm: data })),



}));

export interface globalStoreProps {


  hotelDataGlobal: any;
  sethotelDataGlobal: (data: string) => any;

  flightDataGlobal: any;
  setflightDataGlobal: (data: string) => any;

  showForm: any;
  setShowForm: (data: any) => any;


}

type data = null | any;