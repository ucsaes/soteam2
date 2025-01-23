const { FusesPlugin } = require('@electron-forge/plugin-fuses');
const { FuseV1Options, FuseVersion } = require('@electron/fuses');

module.exports = {
  packagerConfig: {
    platform: "win32",
    arch: "x64",
  },
  makers: [
    {
      name: '@electron-forge/maker-squirrel',
      config: {
        name: "build-up-kaist",
        setupExe: "build-up-kaist-v0.0.2.exe"
      },
    }
  ]
};
