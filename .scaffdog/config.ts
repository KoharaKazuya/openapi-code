import { kebabCase } from "change-case";
import { type Config } from "scaffdog";

export default {
  files: ["*"],

  helpers: [
    {
      /**
       * PathItemObject を定義するときに `/test/example-path` などの
       * 直感的な入力をファイル名に変換できるようにする
       */
      pathToCodePath: (context, value: unknown) => {
        let result = String(value);

        // 末尾がスラッシュなら index という名前のファイルにする
        result = result.replace(/\/$/, "/index");

        // 先頭のスラッシュは除去する
        result = result.replace(/^\//, "");

        // パスのパーツごとにケバブケースにする
        result = result
          .split("/")
          .map((part) => kebabCase(part))
          .join("/");

        return result;
      },

      /**
       * 任意の正規表現にマッチするかどうか検証する
       */
      regExpTest: (
        context,
        value,
        /** マッチしなければならない正規表現パターン */
        pattern: unknown,
        /** 正規表現フラグ */
        flags: unknown,
        /** マッチしないときに表示するエラーメッセージ */
        errorMessage: unknown,
      ) => {
        const re = new RegExp(String(pattern), String(flags));
        if (!re.test(value))
          throw new Error(`regExpTest failed: ${errorMessage}`);
        return value;
      },

      /**
       * コンポーネント種類から設置するパスを取得する
       */
      componentTypePath: (context, value: unknown) => {
        const types = {
          Schema: "schemas",
          Response: "responses",
          Parameter: "parameters",
          Example: "examples",
          RequestBody: "requestBodies",
          Header: "headers",
          SecurityScheme: "securitySchemes",
          Link: "links",
          Callback: "callbacks",
          PathItem: "pathItems",
        } as const;
        const path = types[String(value)];
        if (!path) throw new Error(`Unknown component type: ${value}`);
        return path;
      },
    },
  ],
} satisfies Config;
