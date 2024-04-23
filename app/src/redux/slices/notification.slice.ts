import { AlertColor } from '@mui/material';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type NotificationState = {
  message: string | null;
  severity: AlertColor;
  isActive?: boolean;
};

export const initialState: NotificationState = {
  message: null,
  severity: 'info',
  isActive: false,
};

export const notificationSlice = createSlice({
  name: 'notification',
  initialState,
  reducers: {
    openSnackBar: (state, action: PayloadAction<NotificationState>) => {
      (state.message = action.payload.message), (state.severity = action.payload.severity), (state.isActive = true);
    },
    closeSnackBar: (state) => {
      state.message = null;
      state.isActive = false;
    },
  },
});

export const { openSnackBar, closeSnackBar } = notificationSlice.actions;
export default notificationSlice.reducer;
