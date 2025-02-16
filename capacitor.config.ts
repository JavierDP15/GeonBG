import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'io.ionic.starter',
  appName: 'GeonBG',
  webDir: 'www',
  bundledWebRuntime: false,
  plugins: {
    SplashScreen: {
      launchShowDuration: 0,
      launchAutoHide: false,
    },
    ScreenOrientation: {
      orientation: 'landscape' // Fijar a horizontal
    },
    CapacitorSQLite: {
      "iosDatabaseLocation": "Library",
      "androidDatabaseLocation": "databases"
    }
  },
  android: {
    webContentsDebuggingEnabled: true,
  }
};

export default config;
