---
name: "Component (src/components/ 以下のファイル)"
root: "src/components/"
output: "./"
questions:
  type:
    message: "作成するコンポーネントの種類を入力してください。"
    choices:
      - "Schema"
      - "Response"
      - "Parameter"
      - "Example"
      - "RequestBody"
      - "Header"
      - "SecurityScheme"
      - "Link"
      - "Callback"
      - "PathItem"
    initial: "Schema"
  name: "作成するコンポーネントの名前を入力してください。"
---

# `{{ inputs.type | componentTypePath }}/{{ inputs.name | regExpTest "^[a-z_][a-z0-9_]*$" "i" "コンポーネントの名前には半角英数字とアンダースコア (_) しか使えません。" }}.ts`

```typescript
{{ defFn := inputs.type == "SecurityScheme" ? "nameReferable" : "referable" }}import { type OpenAPIV3_1, {{ defFn }} } from "openapi-code/openapi/v3.1";

export default {{ defFn }}<OpenAPIV3_1.{{ inputs.type }}Object>({});

```
