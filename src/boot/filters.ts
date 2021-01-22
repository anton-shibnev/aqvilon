export default ({ Vue }: {Vue: any}) => {
  Vue.filter('camelize', (s: string) => s.replace(/-./g, (x) => x.toUpperCase()[1]));
};
