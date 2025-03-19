<script setup lang="ts">
import * as pkg from "../package.json";
const { login } = useAuth()
const user = useSupabaseUser()
</script>

<template>
  <UApp>
    <UToaster />
    <div class="w-full flex justify-center items-center">
      <div class="max-w-[1400px] w-full h-20 flex items-center justify-between px-8 lg:px-0">
        <h1
          class="px-4 bg-gradient-to-r dark:from-violet-500 from-violet-600 dark:to-indigo-500 to-indigo-600 inline-block text-transparent bg-clip-text text-2xl font-bold">
          minhatabela
          <UBadge :ui="{ rounded: 'rounded-full' }" class="absolute ml-1" variant="subtle" color="violet"
            label="beta" />
        </h1>
        <UButton v-if="!user" color="primary" @click="login">entrar</UButton>
        <UserDisplay v-else />
      </div>
    </div>

    <div class="w-full  flex justify-center">
      <div class="max-w-[1400px] w-full">
        <slot />
      </div>
    </div>
    <footer class="text text-slate-300 flex justify-center py-8">
      minhatabela {{ new Date().getFullYear() }} | <a href="https://alexislopes.com.br" target="_blank" class="ml-2">
        alexislopes </a> <span class="ml-1"> | {{ pkg.version }} </span></footer>
  </UApp>
</template>

<style></style>
