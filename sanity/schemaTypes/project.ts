import { defineArrayMember, defineField, defineType } from 'sanity';
import { richText, seoFields } from './shared';
export const project = defineType({
  name: 'project',
  title: 'Projetos',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Título',
      type: 'string',
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: { source: 'title' },
      validation: (r) => r.required(),
    }),
    defineField({ name: 'client', title: 'Cliente', type: 'string' }),
    defineField({
      name: 'coverImage',
      title: 'Imagem de capa',
      type: 'image',
      options: { hotspot: true },
      fields: [
        defineField({
          name: 'alt',
          title: 'Texto alternativo',
          type: 'string',
          validation: (r) => r.required(),
        }),
      ],
    }),
    defineField({
      name: 'gallery',
      title: 'Galeria',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'image',
          options: { hotspot: true },
          fields: [
            defineField({
              name: 'alt',
              title: 'Texto alternativo',
              type: 'string',
              validation: (r) => r.required(),
            }),
          ],
        }),
      ],
    }),
    defineField({
      name: 'videos',
      title: 'Vídeos',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'object',
          fields: [
            defineField({ name: 'title', title: 'Título', type: 'string' }),
            defineField({
              name: 'url',
              title: 'Link do vídeo',
              type: 'url',
              validation: (r) => r.required(),
            }),
          ],
        }),
      ],
    }),
    defineField({
      name: 'shortDescription',
      title: 'Descrição curta',
      type: 'text',
      rows: 3,
    }),
    richText,
    defineField({
      name: 'category',
      title: 'Categoria',
      type: 'reference',
      to: [{ type: 'category' }],
    }),
    defineField({
      name: 'services',
      title: 'Serviços realizados',
      type: 'array',
      of: [defineArrayMember({ type: 'reference', to: [{ type: 'service' }] })],
    }),
    defineField({
      name: 'tags',
      title: 'Tags',
      type: 'array',
      of: [defineArrayMember({ type: 'string' })],
      options: { layout: 'tags' },
    }),
    defineField({
      name: 'projectDate',
      title: 'Data do projeto',
      type: 'date',
    }),
    defineField({
      name: 'featured',
      title: 'Projeto em destaque',
      type: 'boolean',
      initialValue: false,
    }),
    defineField({ name: 'manualOrder', title: 'Ordem manual', type: 'number' }),
    defineField({ name: 'externalUrl', title: 'Link externo', type: 'url' }),
    defineField({
      name: 'instagramUrl',
      title: 'Post relacionado no Instagram',
      type: 'url',
    }),
    ...seoFields,
  ],
  preview: {
    select: { title: 'title', subtitle: 'client', media: 'coverImage' },
  },
});
