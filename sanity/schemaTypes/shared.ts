import { defineArrayMember, defineField } from 'sanity';
export const seoFields = [
  defineField({
    name: 'seoTitle',
    title: 'Título SEO',
    type: 'string',
    validation: (r) => r.max(60),
  }),
  defineField({
    name: 'seoDescription',
    title: 'Descrição SEO',
    type: 'text',
    rows: 3,
    validation: (r) => r.max(160),
  }),
  defineField({
    name: 'ogImage',
    title: 'Imagem Open Graph',
    type: 'image',
    options: { hotspot: true },
    fields: [
      defineField({ name: 'alt', title: 'Texto alternativo', type: 'string' }),
    ],
  }),
];
export const richText = defineField({
  name: 'description',
  title: 'Descrição completa',
  type: 'array',
  of: [defineArrayMember({ type: 'block' })],
});
