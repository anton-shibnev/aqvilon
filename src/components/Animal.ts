import { Vue, Component } from 'vue-property-decorator';

@Component
export default class Animal extends Vue {
  voice(): void {
    // eslint-disable-next-line no-alert
    alert('Some voice');
  }
}
