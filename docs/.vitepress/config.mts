import { defineConfig } from 'vitepress'

const base = process.env.DOCS_BASE || '/'

export default defineConfig({
  lang: 'ru-RU',
  title: 'EXIM Product OS',
  description: 'Единый источник правды и визуальная спецификация продукта EXIM',
  base,
  cleanUrls: true,
  lastUpdated: true,
  head: [
    ['meta', { name: 'theme-color', content: '#0f766e' }],
    ['meta', { name: 'robots', content: 'noindex,nofollow' }]
  ],
  themeConfig: {
    logo: '/brand/exim-mark.svg',
    siteTitle: 'EXIM Product OS',
    search: { provider: 'local' },
    nav: [
      { text: 'Основа', link: '/01-foundation/product-foundation' },
      { text: 'Карта', link: '/03-product-map/app-map' },
      { text: 'Страницы', link: '/04-pages/page-registry' },
      { text: 'MVP', link: '/07-mvp/mvp-v1' },
      { text: 'Требования', link: '/06-requirements/REQ-003-configurable-workflow-mvp' },
      { text: 'Вопросы', link: '/09-decisions/open-questions' }
    ],
    sidebar: [
      {
        text: 'Начало',
        items: [
          { text: 'Главная', link: '/' },
          { text: 'Как работать', link: '/11-workflow/how-to-work' },
          { text: 'Cursor playbook', link: '/11-workflow/cursor-playbook' }
        ]
      },
      {
        text: '01. Основа',
        items: [
          { text: 'Product Foundation', link: '/01-foundation/product-foundation' },
          { text: 'Configurable Workflow', link: '/01-foundation/configurable-workflow-foundation' },
          { text: 'Терминология', link: '/01-foundation/terminology' },
          { text: 'Решения', link: '/01-foundation/decisions' }
        ]
      },
      {
        text: '02. Процесс',
        items: [
          { text: 'От лида до перевозки', link: '/02-process/lead-to-shipment' },
          { text: 'Роли', link: '/02-process/roles' }
        ]
      },
      {
        text: '03. Карта продукта',
        items: [
          { text: 'Карта приложения', link: '/03-product-map/app-map' },
          { text: 'Два слоя данных', link: '/03-product-map/data-layers' },
          { text: 'Права и видимость', link: '/03-product-map/permissions' },
          { text: 'Доменная модель', link: '/03-product-map/domain-model' }
        ]
      },
      {
        text: '04. Страницы',
        items: [
          { text: 'Реестр страниц', link: '/04-pages/page-registry' },
          { text: 'Кабинет клиента', link: '/04-pages/client-cabinet' },
          { text: 'Кабинет менеджера', link: '/04-pages/manager-cabinet' },
          { text: 'Кабинет логиста', link: '/04-pages/logistics-cabinet' },
          { text: 'Dashboard руководителя логистики', link: '/04-pages/logistics-head-cabinet' },
          { text: 'Кабинет администратора', link: '/04-pages/admin-cabinet' }
        ]
      },
      {
        text: '05. Статусы',
        items: [
          { text: 'Запрос и перевозка', link: '/05-statuses/lifecycles' },
          { text: 'События рейса', link: '/05-statuses/trip-events' }
        ]
      },
      {
        text: '06. Требования',
        items: [
          { text: 'REQ-003: workflow MVP', link: '/06-requirements/REQ-003-configurable-workflow-mvp' }
        ]
      },
      {
        text: '06a. Wireframe',
        items: [
          { text: 'Перевозка клиента', link: '/06-wireframes/client-shipment' },
          { text: 'Запрос менеджера', link: '/06-wireframes/manager-request' }
        ]
      },
      {
        text: '07. MVP',
        items: [
          { text: 'MVP v1', link: '/07-mvp/mvp-v1' },
          { text: 'Roadmap', link: '/07-mvp/roadmap' }
        ]
      },
      {
        text: '08. ТЗ интегратору',
        items: [
          { text: 'REQ-001: расчёт', link: '/08-requirements/REQ-001-request-to-calculation' },
          { text: 'REQ-002: tracking', link: '/08-requirements/REQ-002-shipment-tracking' }
        ]
      },
      {
        text: '09. Решения',
        items: [
          { text: 'Открытые вопросы', link: '/09-decisions/open-questions' }
        ]
      },
      {
        text: '10. Реализация',
        items: [
          { text: 'Текущее состояние', link: '/10-implementation/current-state' },
          { text: 'Матрица функций', link: '/10-implementation/feature-matrix' },
          { text: 'Known bugs', link: '/10-implementation/known-bugs' },
          { text: 'Bug registry', link: '/10-implementation/bug-registry' },
          { text: 'Gap registry', link: '/10-implementation/gap-registry' },
          { text: 'Gap analysis', link: '/10-implementation/gap-analysis' },
          { text: 'Vercel audit 2026-07-27', link: '/10-implementation/audits/2026-07-27-vercel-audit' },
          { text: 'Production technical recon 2026-07-27', link: '/10-implementation/audits/2026-07-27-production-technical-recon' }
        ]
      },
      {
        text: '11. Исходники',
        items: [
          { text: 'Текущий MVP', link: '/10-sources/current-mvp' },
          { text: 'Исходная концепция', link: '/10-sources/original-brief' }
        ]
      }
    ],
    footer: {
      message: 'Внутренняя продуктовая документация EXIM',
      copyright: 'EXIM Product OS'
    },
    outline: { level: [2, 4], label: 'На странице' },
    docFooter: { prev: 'Предыдущая', next: 'Следующая' },
    lastUpdated: { text: 'Обновлено' }
  }
})
