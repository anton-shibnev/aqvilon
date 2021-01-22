// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck

import {
  Module, VuexModule, Mutation, Action,
} from 'vuex-module-decorators';
import { axiosApi } from 'boot/api';

@Module(
  {
    name: 'UI',
    namespaced: true,
    stateFactory: true,
  },
)

export default class UI extends VuexModule {
    public isOpen = false;
    public pageInfo: any = null;
    public advantages: any = null;
    public isAdvantagesModalOpen = false;
    public isArchiveModalOpen = false;
    public isDiscountModalOpen = false;
    public isGalleryModalOpen = false;
    public albums: any = [];
    public album: any = [];
    public documents: any = {};
    public isStreamOpen = false;
    public isEvaOpen = false;

    @Action
    postMessage(data: { action: string, msg?: string }) {
      const iframe = document.getElementById('eva-iframe') as HTMLIFrameElement;
      if (iframe) {
          iframe!.contentWindow.postMessage(data, '*');
      }
    }

    @Mutation
    public TOGGLE_MENU(): void {
      this.isOpen = !this.isOpen;
    }

    @Mutation
    public CLOSE_MENU(): void {
      this.isOpen = false;
    }

    @Mutation
    public SET_PAGE_INFO(page: any): void {
      this.pageInfo = page;
    }

    @Mutation
    public SET_ADVANTAGES_INFO(adv: any) {
      this.advantages = adv;
    }

    @Mutation
    public TOGGLE_ADVANTAGES_MODAL() {
      this.isAdvantagesModalOpen = !this.isAdvantagesModalOpen;
      document.body.classList.toggle('no-scroll');
    }

    @Mutation
    public TOGGLE_ARCHIVE_MODAL() {
      this.isArchiveModalOpen = !this.isArchiveModalOpen;
      // this.bodyIsScroll(this.isArchiveModalOpen);
      document.body.classList.toggle('no-scroll');
    }

    @Mutation
    public TOGGLE_DISCOUNT_MODAL() {
      this.isDiscountModalOpen = !this.isDiscountModalOpen;
      document.body.classList.toggle('no-scroll');
    }

    @Mutation
    public TOGGLE_GALLERY_MODAL() {
      this.isGalleryModalOpen = !this.isGalleryModalOpen;

      // this.bodyIsScroll(this.isGalleryModalOpen);
      // console.log(this.isGalleryModalOpen);
      // document.body.classList[this.isGalleryModalOpen ? 'add' : 'remove']('no-scroll');
      document.body.classList.toggle('no-scroll');
    }

  @Mutation
    public SET_ALBUMS(alb: any) {
      this.albums = alb;
    }

  @Mutation
  public SET_ALBUM(alb: number) {
    this.album = alb;
  }

  @Mutation
  public SET_DOCUMENTS(documents: number) {
    this.documents = documents;
  }

  @Mutation
  public TOGGLE_STREAM(): void {
    this.isStreamOpen = !this.isStreamOpen;
  }

  @Mutation
  public TOGGLE_EVA() {
    if (this.isEvaOpen) {
      this.isEvaOpen = false;
      window.history.pushState(null, null, '');
      document.body.style.overflow = '';
    } else {
      this.isEvaOpen = true;
      document.body.style.overflow = 'hidden';
    }
  }

  @Mutation
  public CLOSE_EVA() {
    this.isEvaOpen = false;
    window.history.pushState(null, null, '');
    document.body.style.overflow = '';
  }

    @Mutation
  public OPEN_EVA() {
    this.isEvaOpen = true;
    document.body.style.overflow = 'hidden';
  }

  @Action({ commit: 'SET_PAGE_INFO' })
    public async getPageData({ name, fields = '*', options }) {
      const params = {
        type: name,
        fields,
        ...options,
      };

      const { data } = await axiosApi.get('v2/pages/', { params });

      return data.items[0];
    }

  @Action({ commit: 'SET_ADVANTAGES_INFO' })
  public async getAdvantagesData({ name, fields = '*', options }) {
    const params = {
      type: name,
      fields,
      ...options,
    };

    const { data } = await axiosApi.get('v2/pages/', { params });

    return data.items[0];
  }

  @Action({ commit: 'SET_ALBUMS' })
  public async getAlbums() {
    const { data } = await axiosApi.get('/v2/albums');

    return data;
  }

  @Action({ commit: 'SET_ALBUM' })
  public async getAlbum(id: number) {
    const { data } = await axiosApi.get(`/v2/albums/${id}`);

    return data;
  }

  @Action({ commit: 'SET_DOCUMENTS' })
  public async getDocuments() {
    const { data } = await axiosApi.get('/v2/documents');

    return data;
  }

    @Action
  public async formSend(params: any) {
    try {
      await axiosApi.post('v2/request',
        {
          ...params,
        });
    } catch (e) {
      console.log(e);
    }
  }
}
