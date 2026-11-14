# 단풍 표본실

하루에 한 잎씩, 주운 낙엽을 오리고 색에 이름을 붙이고 조각조각 이어 붙이는 가을 표본장.
'굳이 만든 웹사이트' 시리즈.

## 구성
- Vite + 순수 자바스크립트 (`src/main.js`)
- Supabase: 로그인(구글·카카오), 표본 표(`leaves`), 사진 저장소(`leaves` 버킷)
- 로그인 전에는 브라우저(IndexedDB)에 저장, 로그인하면 계정으로 옮김

## 처음 설정
1. Supabase SQL Editor에서 `supabase/schema.sql` 실행
2. Vercel에서 이 저장소를 가져오면 자동으로 빌드돼요 (Framework: Vite)
3. 환경변수는 `.env.example` 참고 (공개 키라 비워둬도 기본값으로 동작)

## 로컬 실행
```
npm install
npm run dev
```

## 폰트
- 깍두기 도면체, 차이 활짝체: OFL. 필요한 글자만 줄여서 `public/fonts`에 담고 이름을 바꿈
- 오이냉체, 조선100년체: 폰트 파일은 넣지 않고 필요한 글자의 윤곽선만 `src/glyphs.js`에 담음
