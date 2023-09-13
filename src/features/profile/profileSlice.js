import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  value: null,
}

export const programDataSlice = createSlice({
  name: 'profile',
  initialState,
  reducers: {
    setProfile: (state, action) => {
        state.value = action.payload
      },
  },
})

export const { setProfile } = programDataSlice.actions

export default programDataSlice.reducer