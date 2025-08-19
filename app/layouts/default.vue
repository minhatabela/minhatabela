<script setup lang="ts">
import * as pkg from '../package.json'

const user = useSupabaseUser()
</script>

<template>
  <UApp>
    <UToaster />
    <div class="w-full flex justify-center items-center">
      <div class="max-w-[1400px] w-full h-20 flex items-center justify-between px-8 lg:px-0">
        <h1 class="inline-block dark:text-white text-gray-700 text-2xl font-bold">
          minhatabela
          <UBadge
            class="absolute ml-1 rounded-full"
            variant="subtle"
            color="primary"
            label="beta"
          />
        </h1>
        <LoginButton v-if="!user" />
        <div
          v-else
          class="flex items-center gap-2"
        >
          <SyncBadge />
          <UserDisplay />
        </div>
      </div>
    </div>

    <div class="w-full flex justify-center">
      <div class="max-w-[1400px] w-full">
        <slot />
      </div>
    </div>
    <footer class="text text-slate-300 flex justify-center py-8">
      minhatabela {{ new Date().getFullYear() }} |
      <a
        href="https://alexislopes.com.br"
        target="_blank"
        class="ml-2"
      >
        alexislopes
      </a>
      <span class="ml-1"> | {{ pkg.version }} </span>
    </footer>
  </UApp>
</template>

<style></style>
