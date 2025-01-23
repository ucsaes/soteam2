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
