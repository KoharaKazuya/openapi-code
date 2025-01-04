---
name: "Webhook (src/webhooks/ 以下のファイル)"
root: "src/webhooks/"
output: "./"
questions:
  name: "作成するファイルの名前 (= Webhook の名前) を入力してください。"
---

# `{{ inputs.name | regExpTest "^[a-z_][a-z0-9_]*$" "i" "Webhook の名前には半角英数字とアンダースコア (_) しか使えません。" }}.ts`

```typescript
import { type OpenAPIV3_1, define } from "openapi-code/openapi/v3.1";

export default define<OpenAPIV3_1.PathItemObject>({});

```
