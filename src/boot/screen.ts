import { Screen } from 'quasar';
import { boot } from 'quasar/wrappers';

export default boot(() => {
  Screen.setSizes({
    sm: 768, md: 1365, lg: 1366, xl: 1920,
  });
});
