import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  value: null,
}

export const recordIDSlice = createSlice({
  name: 'recordID',
  initialState,
  reducers: {
    setrecordID: (state, action) => {
        state.value = action.payload
      },
  },
})

export const { setrecordID } = recordIDSlice.actions

export default recordIDSlice.reducer