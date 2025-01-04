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

export default define<OpenAPIV3_1.PathItemObject>({});

```
