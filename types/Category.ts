import { Color } from "./Color";

export type Category = {
  // All properties with an underscore are generated automatically by Sanity
  _id: string;
  _createdAt: Date;

  // The rest of the properties are defined in the schema by us
  title: string;
  slug: {
    current: string;
  };
  color: Color;
  description?: string;
};
