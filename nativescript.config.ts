import { NativeScriptConfig } from '@nativescript/core'

export default {
  id: 'com.questnr.android',
  appResourcesPath: 'App_Resources',
  android: {
    v8Flags: '--expose_gc',
    markingMode: 'none',
    id: 'com.questnr.android',
  },
  appPath: 'src',
  ios: {
    id: 'com.questnr.ios',
  },
} as NativeScriptConfig
