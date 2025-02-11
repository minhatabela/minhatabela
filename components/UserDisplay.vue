<template>
  <UPopover mode="hover" :popper="{ offsetDistance: 0 }">
    <div class=" flex items-center gap-3 min-w-max">
      <UAvatar :src="user.user_metadata.avatar_url" alt="Avatar" />
      <span class="hidden lg:inline-block">{{ user.user_metadata.name }}</span>
    </div>

    <template #panel>
      <UButton @click="logout" variant="link" color="purple" icon="i-solar-logout-broken">sair</UButton>
    </template>
  </UPopover>
</template>

<script lang="ts" setup>
const { logout } = useAuth()
const user = useSupabaseUser()


</script>

<style></style>