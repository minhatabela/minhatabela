<script setup lang="ts">
import * as pkg from "../package.json";
const { login } = useAuth()
const user = useSupabaseUser()
</script>

<template>
  <UNotifications />
  <div class="w-full flex justify-center items-center">
    <div class="max-w-[1400px] w-full h-20 flex items-center justify-between px-8 lg:px-0">
      <h1
        class="w-full bg-gradient-to-r from-violet-600 to-indigo-600 bg-clip-text text-transparent text-3xl font-black">
        minhatabela
        <UBadge :ui="{ rounded: 'rounded-full' }" class="absolute ml-1" variant="subtle" color="violet" label="beta" />
      </h1>
      <UButton v-if="!user" color="purple" @click="login">entrar</UButton>
      <UserDisplay v-else />
    </div>
  </div>
  <UAlert color="green" class="p-1 text-center text-xs" variant="soft"
    description="Dado ao fato de que as partidas oficiais ainda não foram anunciadas, essas foram geradas de forma aleatória, portanto não são oficiais." />
  <div class="w-full  flex justify-center">
    <div class="max-w-[1400px] w-full">
      <slot />
    </div>
  </div>
  <footer class="text text-slate-300 flex justify-center py-8">
    minhatabela {{ new Date().getFullYear() }} | <a href="https://alexislopes.com.br" target="_blank" class="ml-2">
      alexislopes </a> <span class="ml-1"> | {{ pkg.version }} </span></footer>
</template>

<style></style>
