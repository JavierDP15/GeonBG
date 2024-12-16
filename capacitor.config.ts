import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'io.ionic.starter',
  appName: 'GeonBG',
  webDir: 'www',
  bundledWebRuntime: false,
  plugins: {
    SplashScreen: {
      launchShowDuration: 0,
    },
    ScreenOrientation: {
      orientation: 'landscape' // Fijar a horizontal
    }
  },
  android: {
    webContentsDebuggingEnabled: true,
  }
};

export default config;
