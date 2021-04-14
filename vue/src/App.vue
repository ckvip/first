<template>
  <a-layout>
    <a-layout-header>
      <img src="@/assets/logo.png" class="logo"/>
      <a-menu theme='dark' mode='horizontal' class='app-menus' :defaultSelectedKeys="activeLink">
        <a-menu-item :key="i" v-for="(l, i) in links">
          <router-link :to="l.path">{{l.name}}</router-link>
        </a-menu-item>
      </a-menu>
    </a-layout-header>
    <a-layout-content>
      <div class="content">
        <router-view/>
      </div>
    </a-layout-content>
    <a-layout-footer>
      Jimmy Vue the world
    </a-layout-footer>
  </a-layout>
</template>
<style scoped>
  .logo {
    width: 32px;
    position: absolute;
    top: 16px;
    left: 8px;
  }

  .app-menus {
    line-height: 64px;
  }

  .content {
    margin: 30px auto auto 50px;
    background: #fff;
    width: 68%;
    max-width: 900px;
    padding: 30px;
  }
</style>

<script lang="ts">
import { Vue } from 'vue-class-component'
import { availableRoutes } from '@/router'

export default class App extends Vue {
    links = availableRoutes
    activeLink = [0]

    created (): void {
      this.getActiveLink()
    }

    private getActiveLink (): void {
      const path = window.location.hash.replace('#', '')
      const found = this.links.findIndex(x => x.path === path)
      this.activeLink = found > -1 ? [found] : [0]
    }
}
</script>
