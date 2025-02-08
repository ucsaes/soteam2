# 빌드업! 카이스트
2025 전기 새내기새로배움터 소팀2 프로그램에 사용되는 코드입니다.
<br>React + Vite 로 작성되어 있고, Electron 으로 application 을 build 합니다.

## Windows Application Packaging 방법
```powershell
npm run build
npm run make
```

## macOS Application Packaging 방법
Windows Application Packaging 과 기본적인 명령어는 동일합니다.<br>
하지만 현재 PC와 칩셋이 다른 macOS 용 dmg 파일을 생성하기 위해서는 `--arch` 옵션을 추가하여 실행해주셔야 합니다.<br>
```bash
npm run build
# ARM mac 에서 intel 용 dmg 생성
npm run make -- --arch=x64
# intel mac 에서 ARM 용 dmg 생성
npm run make -- --arch=arm64
```

### ⚠️ **Caution**
Windows Application 은 Windows PC 에서, macOS Application 은 macOS 에서 명령어를 실행해주셔야 합니다.
