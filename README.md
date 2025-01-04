# OpenAPI Code

OpenAPI Document (Swagger) を書くための開発環境を提供します。
JSON や YAML を書くのではなく、TypeScript のコードを書くことで OpenAPI Document を記述できます (成果物として YAML ファイルが出力できます)。

https://github.com/KoharaKazuya/openapi-code/assets/1829589/89402cca-7778-4a38-a610-fd1b9eee15e0

## 特徴

- OpenAPI Document as Code
- VS Code ベースの事前設定済み開発環境
- TypeScript によるリアルタイムの型チェック
- TypeScript で柔軟な構造化が可能 (ファイル分割や共通化など)
- Preview on Save
- 既存の OpenAPI Document の自動インポート

## 前提

OpenAPI Specification は v3.1.0 を使用します。

以下のソフトウェアがインストールされていることを前提とします。

- Docker ([Docker Desktop](https://www.docker.com/products/docker-desktop/))
- [Visual Studio Code](https://code.visualstudio.com/) (以下 `VS Code`)
- [Dev Containers](https://marketplace.visualstudio.com/items?itemName=ms-vscode-remote.remote-containers) (VS Code 拡張)

## 使い方

以下の手順でセットアップしてください。

1. このリポジトリをルートディレクトリごとコピーします
   - GitHub テンプレートリポジトリの機能を使って新しいリポジトリを作成できます
   - `git clone` でコピーできます
   - ディレクトリごと手動コピーできます
1. このリポジトリのルートディレクトリを VS Code で開きます
1. `開発コンテナー: コンテナーで再度開く` コマンドを実行します
   - VS Code を開いた直後に通知欄のポップアップの `コンテナーで再度開く` ボタンで実行できます
   - `表示` > `コマンドパレット` から `Dev Containers: Reopen in Container` を入力することで実行できます
1. ステータスバー (画面下) に表示される各種通知が表示されなくなるまで待機します
1. `タスク: タスクの実行` コマンドを実行し、`Preview OpenAPI Document` を実行します
   - `表示` > `コマンドパレット` から `Task: Run Task` を入力し、`Preview OpenAPI Document` を選択することで実行できます
   - 実行したタスクによりバックグラウンドでサーバーが実行されます。開かれたタブを閉じることで終了できます
   - `シンプルブラウザー` のタブに OpenAPI Document が表示されます
     - 何も表示されない場合は上部のリロードボタンを押してください
     - ソースコードを編集＆保存すると自動で再読み込みされます
     - タブを移動し、ソースコードと 2 カラムレイアウトにすることで開発しやすくできます
1. ソースコードの一部を変更し、保存するとファイルの変更が `シンプルブラウザー` のタブの表示に自動的に反映されていることを確認できればセットアップ完了となります
1. (オプショナル) カスタムされた Git Hooks を登録します
   - `git config --local core.hooksPath .githooks` コマンドを実行します
   - 以降の Git コミット時に自動で `npm run lint` などのチェックが実行されるようになります

以下の手順でコマンドを実行します。

1. ターミナルを開きます
   - `ターミナル` > `新しいターミナル` を選択することで開けます
1. 任意のコマンドを実行します
   - Dev Containers を使用しているため、外部のターミナルからではなくこの方法で Dev Containers の Linux 環境を操作ください

新しい Path や Component を追加する場合は以下の手順でコマンドを実行できます。

1. `npm run gen` コマンドを実行します
   - VS Code の NPM スクリプト欄 (サイドバーのエクスプローラー下部) から実行できます
   - 手動でファイルを追加することもできますが、定型のソースコードを自動で生成してくれるため、このコマンドを使うことを推奨します

以下の手順でビルドしてください。

1. `npm run build` コマンドを実行します
   - VS Code の NPM スクリプト欄 (サイドバーのエクスプローラー下部) から実行できます
1. ルートディレクトリ直下に `openapi.yaml` ファイルが出力されていればビルド完了となります

## 自動インポート

すでに OpenAPI Document が JSON または YAML ファイルで存在する場合、そのファイルをソースコード (src/ 以下の全ファイル) を自動で生成することができます。

ターミナルで以下のコマンドを実行してください。

```sh
rm -rf src/ # 既存のソースコードはすべて削除する必要があるためご注意ください。
npm run import -- ${既存のopenapi.json/openapi.yaml}
npm run fix # 生成されたソースコードを整形します
```

既存の OpenAPI Document と生成されたソースコードの差分が心配な場合は以下のようなコマンドで確かめることができます。

```sh
npm run build
npx js-yaml ${既存のopenapi.yaml} > old.json # YAML の場合
npx js-yaml ./openapi.yaml > new.json
npx json-diff ./old.json ./new.json # 何も表示されなければ差分はありません
```

## 記述ルール

この開発環境では OpenAPI Document を TypeScript のコードとして記述します。OpenAPI Document を出力するプログラムを作成してください。もっともシンプルな書き方では openapi.yaml を記述するのと同じように記述できます。

いくつかの規約があります。次の規約にしたがって OpenAPI Document を記述してください。

ただし ESLint によるリアルタイムの自動チェッカーが導入されているため、規約を細かく覚えなくても [サンプル](https://github.com/KoharaKazuya/openapi-code-toolchain/tree/main/examples/) などを真似しつつ書いていけば概ね問題ありません。

- OpenAPI Document の型定義の変更
  - OpenAPI Code が使用する OpenAPI Document の型定義は OpenAPI Spec v3.1 のものからミスを防ぐ目的などから一部変更されています
    - OpenAPI Object (OpenAPI Document ルート) の `openapi` には v3.1 系である `3.1.x` の形式のみを指定できます
    - OpenAPI Object (OpenAPI Document ルート) の `paths`, `webhooks`, `components` は指定できません。OpenAPI Code が自動で実装します
    - Reference Object (`$ref` を含むオブジェクト) を指定する箇所では `referable` 関数で定義した値のみ受け付けます
    - Security Requirement Object (`security` に指定する値) のキーには `nameReferable` 関数で定義した値のみ受け付けます
  - 変更された型定義は名前空間 `OpenAPIV3_1` 以下に配置されており、`import type { OpenAPIV3_1 } from "openapi-code/openapi/v3.1";` でインポートできます
- 事前に定義されたファイル構造
  - `src/index.tx`: このファイルの export default が OpenAPI Document として出力されます
  - `src/paths/` 以下: このディレクトリ以下のファイルが OpenAPI Document の `paths` に出力されます。ディレクトリ構造が URL のパスになります
    - ただし、ファイル名が `index.ts` の場合はパスからファイル名が取り除かれます
    - 例:
      - `src/paths/users/{userId}.ts` → `/users/{userId}`
      - `src/paths/index.ts` → `/`
  - `src/webhooks/` 以下: このディレクトリ以下のファイルが OpenAPI Document の `webhooks` に出力されます。ファイル名が Webhook の名前になります
  - `src/components/` 以下: このディレクトリ以下のファイルが OpenAPI Document の `components` に出力されます。`src/components/<type>/<name>.ts` という形で定義してください。`<type>` は OpenAPI Spec をで定義されている Components Object の Field Name です。例: `src/components/schemas/User.ts`
  - 上記以外の `src/` 以下は自由に使用できます
- ファイルの export 指定
  - `src/index.ts` では `export default define<OpenAPIV3_1.Document>(…)` をかならず含めてください ※1
  - `src/paths/<path>.ts`, `src/webhooks/<name>.ts` では `export default define<OpenAPIV3_1.PathItemObject>(…)` をかならず含めてください ※1
  - `src/components/<type>/<name>.ts` では `export default referable<OpenAPIV3_1.Xxx>(…)` をかならず含めてください。`Xxx` は `<type>` に対応する型です ※1
    - `src/components/securitySchemes/<name>.ts` のみ `referable` ではなく `nameReferable` を使ってください
- Reference Object としての import
  - `src/components/` 以下のファイルは `import User from "#/components/schemas/User";` のように `#/` から始まるパスで import できます。これ以外の形で import することはできません
  - 上記の方法で import した値は Reference Object になります。これは OpenAPI Document を記載する際に用いる `$ref` の直感的な代替となります
    - `#/components/securitySchemes/` 以下のファイルのみ Reference Object ではなく `string` となります。これは `security` フィールドに使用する際に `security: [{ [BearerTokenScheme]: [] }]` のように使うことができます
- このリポジトリのルートディレクトリ直下に `openapi.yaml` ファイルとして OpenAPI Document が出力されます

※1: 定義関数 `define`, `referable`, `nameReferable` と名前空間 `OpenAPIV3_1` は `import { define, type OpenAPIV3_1 } from "openapi-code/openapi/v3.1";` などの形でインポートできます

## 更新履歴

[openapi-code-toolchain](https://github.com/KoharaKazuya/openapi-code-toolchain/blob/main/CHANGELOG.md) を参照してください。
