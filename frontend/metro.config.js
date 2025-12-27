// metro.config.js
const path = require("path");
const { getDefaultConfig } = require("expo/metro-config");
const { withNativeWind } = require("nativewind/metro");

// Base Expo config
/** @type {import('expo/metro-config').MetroConfig} */
const config = getDefaultConfig(__dirname);

// Alias tslib to the ESM build so __extends exists
const ALIASES = {
  tslib: require.resolve("tslib/tslib.es6.js"),
};

// Ensure we call the default resolver but rewrite tslib
config.resolver = {
  ...config.resolver,
  resolveRequest: (context, moduleName, platform) => {
    return context.resolveRequest(
      context,
      ALIASES[moduleName] ?? moduleName,
      platform
    );
  },
};

// Keep NativeWind integration with your CSS entry
module.exports = withNativeWind(config, { input: "./global.css" });
