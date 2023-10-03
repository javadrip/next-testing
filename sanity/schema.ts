import { type SchemaTypeDefinition } from "sanity";

import author from "./schemas/author";
import blockContent from "./schemas/blockContent";
import category from "./schemas/category";
import post from "./schemas/post";
import settings from "./schemas/settings";
import tag from "./schemas/tag";

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [settings, post, author, category, tag, blockContent],
};
