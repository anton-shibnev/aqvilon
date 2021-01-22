// import { Cookies } from 'quasar';
// import { setAuthHeader } from 'boot/api';
//
// // eslint-disable-next-line @typescript-eslint/ban-ts-comment
// // @ts-ignore
// export default ({ router, ssrContext }) => {
//   router.beforeEach((to: { path: string; }, from: never, next: () => void) => {
//     const cookies = process.env.SERVER
//       ? Cookies.parseSSR(ssrContext)
//       : Cookies;
//
//     const token = cookies.get('token');
//
//     if (token) {
//       setAuthHeader(token);
//     }
//
//     next();
//   });
// };
