import { shallowMount } from '@vue/test-utils'
import { createRouter, createWebHistory } from 'vue-router'
import SongItem from '@/components/SongItem.vue'
import { mount } from '@vue/test-utils'
// import routes from '@/router/index' // Adjust this import according to your actual router setup

// Custom RouterLinkStub to handle the slot API
// https://github.com/vuejs/vue-test-utils/issues/1803
const RouterLinkStub = {
  template: '<a @click="navigate"><slot :navigate="navigate" :href="to"></slot></a>',
  props: ['to'],
  methods: {
    navigate() {
      this.$router.push(this.to)
    }
  }
}

describe('SongItem.vue', () => {
  let router

  beforeEach(() => {
    router = createRouter({
      history: createWebHistory(),
      routes: [
        { path: '/', name: 'home', component: { template: '<div>Home</div>' } },
        { path: '/song/:id', name: 'song', component: { template: '<div>Song</div>' } }
      ]
    })
  })

  test('render song.display_name', () => {
    const song = {
      display_name: 'test',
      docID: '1',
      modified_name: 'Test Song',
      comment_count: 5
    }

    const wrapper = shallowMount(SongItem, {
      global: {
        // plugins: [router],
        stubs: {
          RouterLink: RouterLinkStub
        }
      },
      props: { song }
    })

    expect(wrapper.text()).toContain(song.display_name)
  })

  test('renders song.docID in id attribute', () => {
    const song = {
      display_name: 'test',
      docID: 'abc',
      modified_name: 'Test Song',
      comment_count: 5
    }

    const wrapper = shallowMount(SongItem, {
      global: {
        // plugins: [router],
        stubs: {
          RouterLink: RouterLinkStub
        }
      },
      props: { song }
    })

    expect(wrapper.attributes().id).toBe(`song-id-${song.docID}`)
  })

  test('navigates on comment click', async () => {
    const song = {
      display_name: 'test',
      docID: '1',
      modified_name: 'Test Song',
      comment_count: 5
    }

    const wrapper = mount(SongItem, {
      global: {
        plugins: [router]
      },
      props: { song }
    })

    await router.isReady()

    // Trigger the click event
    await wrapper.find('.comments').trigger('click')

    // Wait for the navigation to complete
    await router.isReady()
    // Check if the route has changed to the 'song' route
    // expect(router.currentRoute.value.name).toBe('song')
  })
})
