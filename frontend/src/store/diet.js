import { create } from 'zustand'

export const useYourStore = create((set)=>({
  yourState : 'VALUE',
  yourAction : (val) => set( (state) => ({ yourState : state.yourState }) )
}))
