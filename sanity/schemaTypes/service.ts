import { defineField, defineType } from 'sanity';
import { richText } from './shared';
export const service = defineType({
  name: 'service',
  title: 'Serviços',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Nome',
      type: 'string',
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: { source: 'name' },
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'shortDescription',
      title: 'Descrição curta',
      type: 'text',
      rows: 3,
    }),
    richText,
    defineField({
      name: 'icon',
      title: 'Ícone ou referência visual',
      type: 'string',
    }),
    defineField({
      name: 'image',
      title: 'Imagem',
      type: 'image',
      options: { hotspot: true },
      fields: [
        defineField({
          name: 'alt',
          title: 'Texto alternativo',
          type: 'string',
        }),
      ],
    }),
    defineField({ name: 'order', title: 'Ordem', type: 'number' }),
    defineField({
      name: 'active',
      title: 'Ativo',
      type: 'boolean',
      initialValue: true,
    }),
  ],
});
