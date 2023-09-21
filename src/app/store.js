import { configureStore } from '@reduxjs/toolkit'
import setProfile from '../features/profile/profileSlice'
import setRecordID from '../features/recordID/recordIDSlice'
import setUserInfo from '../features/userInfo/userInfoSlice'

export const store = configureStore({
  reducer: {
    profile: setProfile,
    recordID: setRecordID,
    user: setUserInfo,
  },
})