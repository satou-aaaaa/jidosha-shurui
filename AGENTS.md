# AGENTS.md

自動車の種類あて：車両総重量・最大積載量・乗車定員・総排気量・大きさと速さを見て、道路交通法施行規則 第2条の8つの自動車の種類のどれかを当てる1日5問の学習ゲーム。正解したら、その種類のなかま（重さ・人数で分けるなかま・二輪・特殊な形）も選ぶ。`index.html` と `data.js`（問題の種類）を GitHub Pages で公開する。

## 準備（最初に一度）

```bash
bash scripts/setup.sh   # Node.js（版は .nvmrc）を確かめ、検査の依存とブラウザを入れる。何度実行してもよい
```

Claude Code のクラウドセッションでは `.claude/settings.json` のフックが自動で実行する。

## push する前の確認

```bash
node qa/run.mjs   # 問題（22種類×3000問：選び肢・答えは1つ・答えが表を別に書いた計算どおり・出典）・今日の5問と上級（3年分）・とことん・通しで遊ぶ・続きから・2段目・復習・幅320px・PWA・引き継ぎ・見やすさ（CI の QA と同じ）
```

## このリポジトリの決まり

- 中身は e-Gov 法令検索の道路交通法施行規則 第2条（自動車の種類の表）に書いてあることだけ（2026-11-17 に読んだ）。問題の数（重さ・定員・排気量・大きさ）は `spec` から文にし、`qa/run.mjs` の `classify`（表を別に書いた計算）で答えを解き直す。表の境目（以上・未満・超え）を変えたら両方を直す。
- 運転免許で運転できる車の範囲・免許の取り方・試験の対策は出さない（説明・ヒントに「免許」を書かない。QA が見る）。内閣総理大臣が指定する車（三輪など）は出さない。
- 公式の情報の代わりにしない：遊び方と「このゲームについて」と README に、条文を言いかえた文であること・運転免許のことは警察（運転免許センター）の案内で確かめることを置く（QA が見る）。
- 問題は、やさしいが選び肢3つ（まぎらわしい種類 `near` を入れない）、ふつうが4つ、むずかしいが4つ（`near` を1つ必ず入れる。11,000kg・7,500kg・3,500kg・定員30人・11人・0.400L ちょうどの境目、最大積載量だけで上がる車など）。2回目のヒントはまちがいを消して2つにしぼり、条文の言葉（`key`）も見せる。2段目は「この種類は、どのなかま？」（3つ）で `GRP_OF` で決まる。
- 今日の5問（やさしい2・ふつう2・むずかしい1、種類は重ねない）・上級（むずかしい3、今日のむずかしいと別）は日本時間の日付の種で決まり、だれでも同じ。`Math.random()` は練習・とことんの種だけ。乱数は `sort` の比較の中で引かない。`KINDS`・言い回しの並びは最後に足すだけ（QA の `PIN` が第1回の1問目を見る）。`data.js` を変える PR は自動ではマージされない（`hold_paths`）。
- ★はまちがい＋ヒントの数（0で★3・1で★2・2以上で★1）。上級はヒントなし。時間制限なし。
- 好きなだけ遊べる：チケット・ライフ・回数制限・🔒で開くモードを入れない（shared-workflows `routines/game-dev.md` F1〜F7。QA が見る）。とことん（`runs.e`）はまちがえても続き、「ここで降りる」で終わる。
- 1問を深くする：`depth.js` と `qa/depth-check.mjs` は shared-workflows `template/` の写しで、ここでは直さない。自信あり・2段目「この種類は、どのなかま？」・復習（1→3→7日後）。記録 `jds-v1`・文字 `jds-fs`・復習 `jds-depth`。
- 共有は遊ぶ人が押したときに開くリンクだけ。シェアの文に問題・答えを出さない。感想は Issue フォーム（`.github/ISSUE_TEMPLATE/feedback.yml`）を開くだけ。応援は Ko-fi へのただのリンクだけ。
- 外へ通信しない（CSP の `connect-src 'self'` を広げない）。見やすさ（`<!-- a11y:begin -->`〜`end`・`qa/a11y.mjs`）と引き継ぎ（`transfer.js`・`qa/transfer-check.mjs`）は shared-workflows `template/` の写しで、ここでは直さない。
- 画面の土台は 危険物の類あて（kikenbutsu-rui。その元は 用途地域あて・岩石なかま分け）から写した。写し元の言葉が残っていないかを QA が見る。
- PWA：画面のファイルを足したら `sw.js` の `SHELL` にも足し、中身を大きく変えたら `CACHE` の版を上げる。アイコンは `node tools/make-icons.cjs`、`og.png` は `node tools/make-og.cjs`。
- 公開リポジトリなので、個人情報・鍵を入れない。

## 公開

- GitHub Pages は `main` のルート（`/`）を公開する。PR の QA と Secret scan が ✅ になると `automerge.yml` が自動でマージする。止めたいときは下書きにするか、ラベル「自動マージしない」を付ける。
- `sw.js`・`manifest.webmanifest`・`data.js` を変える PR は自動ではマージされない（`hold_paths`）。CodeRabbit のレビューを読み、手でマージする直前に今の head へのレビューを読み直す。CodeRabbit は PR に `@coderabbitai review` とコメントして頼む。

## 共通のきまり

- PR の作り方・マージの仕方は satou-aaaaa/shared-workflows の `routines/pr.md`、全体のきまりは `routines/common.md` に従う。
- CI の部品は shared-workflows の共通部品を呼ぶ。リポジトリ側の .github/workflows には呼び出しと設定値だけを書く。
- Claude 以外の AI・人が作業するときは、shared-workflows の `routines/tool-map.md` と `routines/without-claude.md` を読む。
