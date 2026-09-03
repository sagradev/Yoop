# Agência Yoop — site institucional

Site institucional estático, rápido e administrável da Agência Yoop. O frontend usa Astro, TypeScript estrito e Tailwind CSS 4; o conteúdo vem do Sanity via integração oficial `@sanity/astro`, GROQ centralizado e Studio protegido pela autenticação do próprio Sanity em `/admin`.

## Estrutura

- `src/pages`: home, portfólio, cases dinâmicos, 404, robots e sitemap.
- `src/components`: navegação, rodapé, marca e cards reutilizáveis.
- `src/lib/sanity`: cliente, consultas GROQ e imagens responsivas.
- `sanity/schemaTypes`: projetos, serviços, categorias e configurações gerais.
- `src/styles/global.css`: design tokens, layout, animações e responsividade.

## Instalação e uso local

```bash
npm install
copy .env.example .env
npm run dev
```

O site abre em `http://localhost:4321` e o Studio em `http://localhost:4321/admin`. Sem variáveis configuradas, o site continua compilando com um estado inicial seguro e sem cases, clientes ou contatos fictícios.

## Variáveis

```env
PUBLIC_SANITY_PROJECT_ID=seu_project_id
PUBLIC_SANITY_DATASET=production
PUBLIC_SANITY_API_VERSION=2026-09-03
SITE_URL=https://seudominio.com.br
```

Project ID e dataset são identificadores públicos do Sanity. Não adicione tokens privados ao frontend. Use segredos apenas no provedor de deploy quando algum fluxo futuro realmente exigir escrita autenticada.

## Configurar o Sanity

1. Crie ou escolha um projeto em `sanity.io/manage`.
2. Copie o Project ID e o dataset para `.env`.
3. Em **API > CORS Origins**, autorize `http://localhost:4321` e o domínio de produção, com credenciais habilitadas para o Studio.
4. Execute `npm run dev` e entre em `/admin` com sua conta Sanity.
5. Em **Manage > Members**, convide os integrantes da Yoop e atribua a função editorial adequada.
6. Crie um único documento em **Configurações do site** para logo, textos, redes e contatos.

### Cadastrar um projeto

Em `/admin`, abra **Projetos > Criar**, preencha título e slug, envie capa/galeria com textos alternativos, relacione categoria e serviços e complete o SEO. Ative **Projeto em destaque** para exibi-lo na home. Salve como rascunho enquanto estiver incompleto e publique quando estiver pronto.

### Cadastrar serviços e categorias

Crie categorias primeiro. Em **Serviços**, cadastre apenas ofertas reais, defina a ordem e mantenha **Ativo** ligado. Serviços inativos deixam de aparecer no site no próximo build.

## Qualidade e build

```bash
npm run format
npm run check
npm run build
npm run preview
```

O projeto gera HTML estático em `dist/`. Cases são criados a partir dos slugs publicados no momento do build.

## Deploy e atualização automática

Publique a pasta `dist/` em um host estático. Configure `SITE_URL` com o domínio final.

Para atualizar o site sempre que conteúdo for publicado:

1. No provedor de hospedagem, crie um **Deploy Hook** protegido.
2. No Sanity, acesse **API > Webhooks** e crie um webhook para eventos `create`, `update` e `delete` de documentos publicados.
3. Aponte-o para o Deploy Hook do host.
4. Teste: publicação no Sanity → webhook → novo build → conteúdo atualizado.

O segredo do Deploy Hook fica somente no painel do Sanity/provedor; nunca no código ou no navegador.

## Conteúdo e assets pendentes

Substitua no Sanity o logo provisório tipográfico pelas versões oficiais, confirme paleta/fontes, cadastre WhatsApp/e-mail, textos institucionais, serviços, categorias e projetos reais. Nenhum cliente, depoimento, prêmio, métrica ou resultado foi inventado.
