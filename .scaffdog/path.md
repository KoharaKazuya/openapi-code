---
name: "Path (src/paths/ 以下のファイル)"
root: "src/paths/"
output: "./"
questions:
  path: "作成するファイルのパス (= URL のパス) を入力してください。"
---

# `{{ inputs.path | pathToCodePath }}.ts`

```typescript
import { type OpenAPIV3_1, define } from "openapi-code/openapi/v3.1";
import { dedent } from "ts-dedent";

export default define<OpenAPIV3_1.PathItemObject>({
  get: {
    responses: {
      200: {
        description: dedent`
          TODO:
          ここに 200 レスポンスの説明を追加してください。
          __Markdown__ で記載できます。

          ソースコード上のインデントは ts-dedent によって取り除かれます。
        `,
        content: {
          "application/json": {
            // TODO: ここに SchemaObject を指定してください。
            //       インラインで定義するのではなく npm run gen で生成した
            //       別ファイル上の定義を import して参照してください。
            schema: {},
            // TODO: ここにレスポンス値の代表例を指定してください。
            example: {},
          },
        },
      },
    },
  },
});

```
