import { createTheme } from "@mui/material";

export const useAppTheme = () => {
  const theme = createTheme({
    palette: {
      background: {
        default: "#FFFFFF",
      },
      primary: {
        main: '#000000',
      },
      secondary: {
        main: '#FFFFFF',
      },
      success: {
        main: '#11823b'
      }
    },
    spacing: 8,
    shape: {
      borderRadius: 5,
    },
  });

  return theme;
}