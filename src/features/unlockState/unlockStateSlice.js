import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  value: false,
}

export const unlockStateSlice = createSlice({
  name: 'unlockState',
  initialState,
  reducers: {
    setUnlockState: (state, action) => {
        state.value = action.payload
        // console.log("unlock state is set to: ", action.payload)
      },
  },
})

export const { setUnlockState } = unlockStateSlice.actions

export default unlockStateSlice.reducer