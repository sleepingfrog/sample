import { defaultSchema } from '@atlaskit/adf-schema/dist/cjs/schema/default-schema.js';
import { JSONTransformer } from '@atlaskit/editor-json-transformer';
import { MarkdownTransformer } from '@atlaskit/editor-markdown-transformer';

const jsonTransformer = new JSONTransformer()
const markdownTransformer = new MarkdownTransformer(defaultSchema)

export const mdToAdf = (str) => {
  const result = jsonTransformer.encode(markdownTransformer.parse(str))
  return result;
}
