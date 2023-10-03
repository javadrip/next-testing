import { defineField, defineType } from "sanity";

// Shows up as an editor on the right panel after selecting a post
export default defineType({
  name: "post",
  title: "Post",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      description: "Ideally between 15 and 70 characters",
      validation: Rule => [
        Rule.required().min(15).warning("The title is probably too short."),
        Rule.max(70).warning("Shorter titles are usually better."),
      ],
    }),
    defineField({
      name: "metaDescription",
      title: "Meta description",
      type: "text",
      description: "Ideally between 70 and 160 characters",
      validation: Rule => [
        Rule.required().min(70).warning("Add in more details."),
        Rule.max(160).warning(
          "Content beyond 160 characters might be truncated."
        ),
      ],
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: {
        source: "title",
        maxLength: 96,
      },
    }),
    defineField({
      name: "excerpt",
      title: "Excerpt",
      description:
        "The excerpt is used in blog feeds, and also for search results",
      type: "text",
      rows: 3,
      validation: Rule => Rule.max(200),
    }),
    defineField({
      name: "author",
      title: "Author",
      type: "reference",
      to: { type: "author" },
    }),
    defineField({
      name: "mainImage",
      title: "Main image",
      type: "image",
      options: {
        hotspot: true,
      },
      fields: [
        {
          name: "alt",
          type: "string",
          title: "Alternative Text",
        },
      ],
    }),
    defineField({
      name: "categories",
      title: "Categories",
      type: "array",
      of: [{ type: "reference", to: { type: "category" } }],
    }),
    defineField({
      name: "tags",
      title: "Tags",
      type: "array",
      of: [{ type: "reference", to: { type: "tag" } }],
    }),
    defineField({
      name: "publishedAt",
      title: "Published at",
      type: "datetime",
    }),
    defineField({
      name: "featured",
      title: "Mark as Featured",
      type: "boolean",
    }),
    defineField({
      name: "body",
      title: "Body",
      type: "blockContent",
    }),
  ],

  // Determines how the post list to the left of the editor looks
  preview: {
    select: {
      title: "title",
      author: "author.name",
      media: "mainImage",
    },
    prepare(selection) {
      const { author } = selection;
      return { ...selection, subtitle: author && `by ${author}` };
    },
  },
});
