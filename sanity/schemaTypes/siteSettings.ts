import { defineArrayMember, defineField, defineType } from 'sanity';
export const siteSettings = defineType({
  name: 'siteSettings',
  title: 'Configurações do site',
  type: 'document',
  fields: [
    defineField({
      name: 'companyName',
      title: 'Nome da empresa',
      type: 'string',
      validation: (r) => r.required(),
    }),
    defineField({ name: 'logo', title: 'Logo principal', type: 'image' }),
    defineField({
      name: 'alternateLogo',
      title: 'Logo alternativa',
      type: 'image',
    }),
    defineField({ name: 'favicon', title: 'Favicon', type: 'image' }),
    defineField({
      name: 'institutionalDescription',
      title: 'Descrição institucional',
      type: 'text',
      rows: 4,
    }),
    defineField({ name: 'instagram', title: 'Instagram', type: 'url' }),
    defineField({
      name: 'whatsapp',
      title: 'WhatsApp (somente números, com DDI)',
      type: 'string',
    }),
    defineField({ name: 'phone', title: 'Telefone', type: 'string' }),
    defineField({ name: 'email', title: 'E-mail', type: 'email' }),
    defineField({ name: 'address', title: 'Endereço', type: 'text' }),
    defineField({
      name: 'socialLinks',
      title: 'Redes sociais',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'object',
          fields: [
            defineField({ name: 'label', title: 'Nome', type: 'string' }),
            defineField({ name: 'url', title: 'Link', type: 'url' }),
          ],
        }),
      ],
    }),
    defineField({
      name: 'primaryCta',
      title: 'Texto principal do CTA',
      type: 'string',
    }),
    defineField({ name: 'aboutTitle', title: 'Título Sobre', type: 'string' }),
    defineField({
      name: 'aboutText',
      title: 'Texto Sobre',
      type: 'array',
      of: [defineArrayMember({ type: 'block' })],
    }),
    defineField({
      name: 'process',
      title: 'Processo',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'object',
          fields: [
            defineField({ name: 'title', title: 'Etapa', type: 'string' }),
            defineField({
              name: 'description',
              title: 'Descrição',
              type: 'text',
            }),
          ],
        }),
      ],
    }),
    defineField({
      name: 'defaultSeoTitle',
      title: 'Título SEO padrão',
      type: 'string',
    }),
    defineField({
      name: 'defaultSeoDescription',
      title: 'Descrição SEO padrão',
      type: 'text',
    }),
    defineField({
      name: 'defaultOgImage',
      title: 'Imagem Open Graph padrão',
      type: 'image',
      options: { hotspot: true },
    }),
  ],
});
