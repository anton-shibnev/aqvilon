import { RouteConfig } from 'vue-router';

const routes: RouteConfig[] = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('pages/Index.vue') },
      { path: 'ui', component: () => import('pages/UI.vue') },
      { path: 'discount/:discountId', component: () => import('src/components/ModalArticle.vue') },
      { path: 'advantages/:id', component: () => import('src/components/modal-advantages/ModalAdvantages.vue') },
      { path: 'documents', component: () => import('src/components/DocsModal.vue') },
      { path: 'information', component: () => import('pages/Information.vue') },
    ],
  },
  {
    path: '/',
    component: () => import('layouts/StaticLayout.vue'),
    children: [
      { path: 'privacy-policy', component: () => import('pages/PrivacyPolicy.vue') },
      { path: '*', component: () => import('pages/Error404.vue') },
    ],
  },
];

export default routes;
