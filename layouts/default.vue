<script setup lang="ts"></script>

<template>
  <div class="w-full flex justify-center items-center">
    <div class="max-w-[1400px] w-full h-20 flex items-center sm:justify-center">
      <h1 class="bg-gradient-to-r from-blue-900 to-indigo-600 bg-clip-text text-transparent text-3xl font-black">
        minhatabela
      </h1>
    </div>
  </div>
  <div class="w-full flex justify-center">
    <div>
      <slot />
    </div>
  </div>
  <footer class="text text-slate-300 flex justify-center py-8">
    minhatabela 2024 | <a href="https://alexislopes.com.br" target="_blank" class="ml-2"> alexislopes</a> </footer>
</template>

<style scoped></style>
