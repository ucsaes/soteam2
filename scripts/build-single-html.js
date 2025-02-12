import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { load } from 'cheerio'; // cheerio의 named export load 사용

// 현재 파일 경로 설정 (ESM 환경)
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// dist 폴더와 assets 폴더 경로 설정
const distPath = path.join(__dirname, '../dist');
const assetsPath = path.join(distPath, 'assets');

// index.html 파일 읽기
let html = fs.readFileSync(path.join(distPath, 'index.html'), 'utf8');
// cheerio를 사용해 HTML 파싱
const $ = load(html);

/**
 * CSS 인라인 처리 및 CSS 내의 상대 경로 이미지 인코딩 처리
 */
const cssFileName = fs.readdirSync(assetsPath).find(file => file.endsWith('.css'));
if (cssFileName) {
  const cssFilePath = path.join(assetsPath, cssFileName);
  let cssContent = fs.readFileSync(cssFilePath, 'utf8');

  // CSS 내의 url(...) 구문에서 상대 경로를 data URI로 치환
  cssContent = cssContent.replace(/url\(\s*["']?([^"')]+)["']?\s*\)/g, (match, url) => {
    // 이미 data URI이거나 절대 URL이면 건너뜁니다.
    if (
      url.startsWith('data:') ||
      url.startsWith('http:') ||
      url.startsWith('https:') ||
      url.startsWith('//')
    ) {
      return match;
    }
    // css 파일 기준의 상대경로를 절대 경로로 변환
    const cssDir = path.dirname(cssFilePath);
    const filePath = path.resolve(cssDir, url);
    if (!fs.existsSync(filePath)) {
      console.warn(`CSS에서 참조한 이미지 파일 "${url}"을 찾을 수 없습니다.`);
      return match;
    }
    // 확장자에 따라 MIME 타입 결정 (필요시 더 추가 가능)
    const ext = path.extname(filePath).toLowerCase();
    let mimeType;
    if (ext === '.jpg' || ext === '.jpeg') {
      mimeType = 'image/jpeg';
    } else if (ext === '.png') {
      mimeType = 'image/png';
    } else if (ext === '.gif') {
      mimeType = 'image/gif';
    } else if (ext === '.svg') {
      mimeType = 'image/svg+xml';
    } else {
      mimeType = 'application/octet-stream';
    }
    // 파일을 읽어 base64 인코딩
    const fileData = fs.readFileSync(filePath);
    const base64 = fileData.toString('base64');
    return `url("data:${mimeType};base64,${base64}")`;
  });

  // 기존 <link> 태그를 <style> 태그로 대체
  const cssSelector = `link[rel="stylesheet"][href="./assets/${cssFileName}"]`;
  $(cssSelector).replaceWith(`<style>\n${cssContent}\n</style>`);
} else {
  console.warn('assets 폴더 내에 CSS 파일을 찾을 수 없습니다.');
}

/**
 * JS 인라인 처리
 */
const jsFileName = fs.readdirSync(assetsPath).find(file => file.endsWith('.js'));
if (jsFileName) {
  const jsFilePath = path.join(assetsPath, jsFileName);
  const jsContent = fs.readFileSync(jsFilePath, 'utf8');
  // 기존 <script> 태그를 인라인 스크립트로 대체
  const scriptSelector = `script[type="module"][src="./assets/${jsFileName}"]`;
  $(scriptSelector).replaceWith(`<script type="module">\n${jsContent}\n</script>`);
} else {
  console.warn('assets 폴더 내에 JS 파일을 찾을 수 없습니다.');
}

/**
 * <img> 태그의 src 처리 (상대 경로인 경우 data URI로 치환)
 */
$('img').each((i, el) => {
  const src = $(el).attr('src');
  // 이미 data URI이거나 src가 없거나 외부 URL이면 건너뜁니다.
  if (!src || src.startsWith('data:') || src.startsWith('http')) return;

  // src가 상대경로인 경우, dist 폴더를 기준으로 절대 경로를 만듭니다.
  let imgPath = path.join(distPath, src);
  if (!fs.existsSync(imgPath)) {
    // assets 폴더 기준으로도 시도
    imgPath = path.join(assetsPath, src);
  }
  if (!fs.existsSync(imgPath)) {
    console.warn(`이미지 파일 "${src}"을 찾을 수 없습니다.`);
    return;
  }
  // 확장자에 따라 MIME 타입 결정
  const ext = path.extname(imgPath).toLowerCase();
  let mimeType;
  if (ext === '.jpg' || ext === '.jpeg') {
    mimeType = 'image/jpeg';
  } else if (ext === '.png') {
    mimeType = 'image/png';
  } else if (ext === '.gif') {
    mimeType = 'image/gif';
  } else if (ext === '.svg') {
    mimeType = 'image/svg+xml';
  } else {
    mimeType = 'application/octet-stream';
  }
  const imgData = fs.readFileSync(imgPath);
  const base64 = imgData.toString('base64');
  const dataUri = `data:${mimeType};base64,${base64}`;
  $(el).attr('src', dataUri);
});

// 만약 HTML 내에 이미 인라인되어 있는 <style> 태그(예: 직접 작성한 스타일)도 처리하려면 아래와 같이 할 수 있습니다.
// $('style').each((i, el) => {
//   let styleContent = $(el).html();
//   styleContent = styleContent.replace(/url\(\s*["']?([^"')]+)["']?\s*\)/g, (match, url) => {
//     if (url.startsWith('data:') || url.startsWith('http:') || url.startsWith('https:') || url.startsWith('//')) {
//       return match;
//     }
//     // 여기서는 distPath를 기준으로 경로를 해결합니다.
//     const filePath = path.resolve(distPath, url);
//     if (!fs.existsSync(filePath)) {
//       console.warn(`스타일 내 이미지 파일 "${url}"을 찾을 수 없습니다.`);
//       return match;
//     }
//     const ext = path.extname(filePath).toLowerCase();
//     let mimeType;
//     if (ext === '.jpg' || ext === '.jpeg') mimeType = 'image/jpeg';
//     else if (ext === '.png') mimeType = 'image/png';
//     else if (ext === '.gif') mimeType = 'image/gif';
//     else if (ext === '.svg') mimeType = 'image/svg+xml';
//     else mimeType = 'application/octet-stream';
//     const fileData = fs.readFileSync(filePath);
//     const base64 = fileData.toString('base64');
//     return `url("data:${mimeType};base64,${base64}")`;
//   });
//   $(el).html(styleContent);
// });

// 최종 수정된 HTML을 single.html 파일로 저장
const outputFilePath = path.join(distPath, 'build-up-kaist-v0.0.6.html');
fs.writeFileSync(outputFilePath, $.html());
console.log('✅ build-up-kaist-v0.0.6.html 생성 완료! 모든 리소스(CSS, JS, 이미지)가 인라인되었습니다.');
