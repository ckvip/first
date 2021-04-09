<template>
  <a-layout>
    <a-header>
      <img src="assets\logo.png"/>
      <a-menu theme='dark' mode='horizontal' className='app-menus' defaultSelectedKeys={activeLink}>
        <a-menu-item >
          <router-link to="/names">Names</router-link>
        </a-menu-item>
        <a-menu-item >
          <router-link to="/naming-rules">Naming Rule</router-link>
        </a-menu-item>
        <a-menu-item >
          <router-link to="/about">About</router-link>
        </a-menu-item>
      </a-menu>
    </a-header>
    <a-content>
      <router-view/>

    </a-content>
    <a-footer>
      Jimmy Vue the world
    </a-footer>
  </a-layout>
</template>
