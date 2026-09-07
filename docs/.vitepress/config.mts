import { defineConfig } from 'vitepress'

const base = process.env.DOCS_BASE || '/'

export default defineConfig({
  lang: 'ru-RU',
  title: 'EXIM Super App Product OS',
  description: 'Единый источник правды и спецификация multi-tenant логистической платформы EXIM Super App',
  base,
  cleanUrls: true,
  lastUpdated: true,
  head: [
    ['meta', { name: 'theme-color', content: '#0f766e' }],
    ['meta', { name: 'robots', content: 'noindex,nofollow' }]
  ],
  themeConfig: {
    logo: '/brand/exim-mark.svg',
    siteTitle: 'EXIM Super App Product OS',
    search: { provider: 'local' },
    nav: [
      { text: 'Платформа', link: '/01-foundation/super-app-platform-foundation' },
      { text: 'Карта', link: '/03-product-map/app-map' },
      { text: 'Требования', link: '/06-requirements/index' },
      { text: 'Foundation Gate', link: '/07-mvp/foundation-gate' },
      { text: 'Реализация', link: '/10-implementation/current-state' },
      { text: 'Вопросы', link: '/09-decisions/open-questions' }
    ],
    sidebar: [
      {
        text: 'Начало',
        items: [
          { text: 'Главная', link: '/' },
          { text: 'Как работать', link: '/11-workflow/how-to-work' },
          { text: 'AI playbook', link: '/11-workflow/ai-agent-playbook' }
        ]
      },
      {
        text: '01. Основа',
        items: [
          { text: 'Super App Platform', link: '/01-foundation/super-app-platform-foundation' },
          { text: 'Product Foundation', link: '/01-foundation/product-foundation' },
          { text: 'Configurable Workflow', link: '/01-foundation/configurable-workflow-foundation' },
          { text: 'Терминология', link: '/01-foundation/terminology' },
          { text: 'Решения', link: '/01-foundation/decisions' }
        ]
      },
      {
        text: '02. Процессы',
        items: [
          { text: 'Private OS: от лида до перевозки', link: '/02-process/lead-to-shipment' },
          { text: 'Exchange flow', link: '/02-process/exchange-flow' },
          { text: 'Роли и capabilities', link: '/02-process/roles' }
        ]
      },
      {
        text: '03. Карта и модель',
        items: [
          { text: 'Карта приложения', link: '/03-product-map/app-map' },
          { text: 'Модули', link: '/03-product-map/super-app-modules' },
          { text: 'Tenant-модель', link: '/03-product-map/tenant-model' },
          { text: 'Области данных', link: '/03-product-map/data-layers' },
          { text: 'Безопасность и изоляция', link: '/03-product-map/security-and-data-isolation' },
          { text: 'Права и видимость', link: '/03-product-map/permissions' },
          { text: 'Доменная модель', link: '/03-product-map/domain-model' }
        ]
      },
      {
        text: '04. Страницы',
        items: [
          { text: 'Реестр страниц', link: '/04-pages/page-registry' },
          { text: 'Контракты Foundation Gate', link: '/04-pages/foundation-gate-contracts' },
          { text: 'Платформа и Exchange', link: '/04-pages/platform-and-exchange' },
          { text: 'Кабинет клиента', link: '/04-pages/client-cabinet' },
          { text: 'Кабинет менеджера', link: '/04-pages/manager-cabinet' },
          { text: 'Кабинет логиста', link: '/04-pages/logistics-cabinet' },
          { text: 'Руководитель логистики', link: '/04-pages/logistics-head-cabinet' },
          { text: 'Кабинет администратора', link: '/04-pages/admin-cabinet' }
        ]
      },
      {
        text: '05. Статусы',
        items: [
          { text: 'Private OS и Exchange lifecycle', link: '/05-statuses/lifecycles' },
          { text: 'События рейса', link: '/05-statuses/trip-events' }
        ]
      },
      {
        text: '06. Требования',
        items: [
          { text: 'Реестр REQ-001…REQ-010', link: '/06-requirements/index' },
          { text: 'REQ-001: запрос и расчёт', link: '/06-requirements/REQ-001-request-to-calculation' },
          { text: 'REQ-002: tracking', link: '/06-requirements/REQ-002-shipment-tracking' },
          { text: 'REQ-003: workflow MVP', link: '/06-requirements/REQ-003-configurable-workflow-mvp' },
          { text: 'REQ-004: tenant isolation', link: '/06-requirements/REQ-004-organizations-and-tenant-isolation' },
          { text: 'REQ-005: app shell', link: '/06-requirements/REQ-005-secure-app-shell' },
          { text: 'REQ-006: shipment handoff', link: '/06-requirements/REQ-006-agreement-to-shipment' },
          { text: 'REQ-007: Exchange listings', link: '/06-requirements/REQ-007-exchange-listings' },
          { text: 'REQ-008: search and responses', link: '/06-requirements/REQ-008-exchange-search-and-responses' },
          { text: 'REQ-009: modules and access', link: '/06-requirements/REQ-009-modules-and-entitlements' },
          { text: 'REQ-010: trust and moderation', link: '/06-requirements/REQ-010-verification-and-moderation' }
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
        text: '07. Релизы',
        items: [
          { text: 'Foundation Gate', link: '/07-mvp/foundation-gate' },
          { text: 'Public Launch MVP', link: '/07-mvp/mvp-v1' },
          { text: 'Roadmap', link: '/07-mvp/roadmap' }
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
          { text: 'Live audit 2026-09-04', link: '/10-implementation/audits/2026-09-04-super-app-live-audit' },
          { text: 'Technical recon 2026-07-27', link: '/10-implementation/audits/2026-07-27-production-technical-recon' },
          { text: 'Vercel audit 2026-07-27', link: '/10-implementation/audits/2026-07-27-vercel-audit' }
        ]
      },
      {
        text: '11. Источники',
        items: [
          { text: 'Платформенная директива 2026-08-26', link: '/10-sources/2026-08-26-platform-directive' },
          { text: 'Текущий live MVP', link: '/10-sources/current-mvp' },
          { text: 'Исходная концепция', link: '/10-sources/original-brief' }
        ]
      }
    ],
    footer: {
      message: 'Внутренняя продуктовая документация EXIM Super App',
      copyright: 'EXIM Super App Product OS'
    },
    outline: { level: [2, 4], label: 'На странице' },
    docFooter: { prev: 'Предыдущая', next: 'Следующая' },
    lastUpdated: { text: 'Обновлено' }
  }
})
