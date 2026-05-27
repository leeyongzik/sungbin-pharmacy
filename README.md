# 성빈약국 · Sungbin Pharmacy

동네 편집샵 약국 — 모던 아포테카리 컨셉의 사이버 약국 V1.

## 📁 파일 구조

```
sungbin-pharmacy/
├── index.html        ← 메인 페이지 (7개 화면)
├── styles.css        ← 디자인 (컬러·폰트·레이아웃)
├── script.js         ← 화면 전환 + 약사 응답 로직
├── data/
│   └── faq.json      ← 자주 묻는 질문 (수정 가능!)
└── images/
    ├── exterior.png       ← 외관
    ├── pharmacist.png     ← 약사 상반신
    ├── new.png            ← 새로 온 약
    ├── popular.png        ← 잘 팔리는 약
    └── all-products.png   ← 약국 내부 전체
```

## 🖼️ 이미지 업로드 필수

GitHub에 `images/` 폴더 만들고 5장 업로드:
- `exterior.png`
- `pharmacist.png`
- `new.png`
- `popular.png`
- `all-products.png`

## ✏️ FAQ 수정 방법

`data/faq.json` 파일 편집:

```json
{
  "id": "고유아이디",
  "question": "표시될 질문",
  "keywords": ["검색용", "키워드", "여러개"],
  "answer": "답변 내용"
}
```

- `keywords`: 사용자가 입력한 단어와 매칭됨. 많이 넣을수록 매칭률 ↑
- `answer`: `\n`로 줄바꿈
- 새 질문 추가는 같은 형식으로 객체 하나 더 추가

## 📞 전화번호 변경

두 곳에서 수정:
1. `index.html`: `tel:031-719-0936` 검색해서 모두 변경
2. `script.js`: `PHARMACY_PHONE = '031-719-0936'` 한 줄 변경

## 🚀 배포

GitHub에 푸시 → Vercel이 자동 재배포 (1~2분).

## 🎨 컬러 팔레트

CSS 변수로 관리 (`styles.css` 상단):
- 메인 그린: `#6B7F62`
- 다크 그린: `#3A4A35`
- 웜 크림: `#F5F1E8`
- 베이지: `#E8DFD0`
- 골드: `#A68B5B`

## 📋 V2 확장 예정

- 회원 가입 / 카톡 채널 연동
- 제품 상세 페이지 (사진 + 약사 노트)
- 정기 케어 구독
- Claude AI 약사 추가 (현재는 키워드 매칭)
