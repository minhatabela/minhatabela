<template>
  <UPopover
    mode="hover"
    :popper="{ offsetDistance: 0 }"
  >
    <div class="flex items-center gap-3 min-w-max">
      <UAvatar
        :src="user?.user_metadata.avatar_url"
        alt="Avatar"
      />
      <span class="hidden lg:inline-block">{{ user?.user_metadata.name }}</span>
    </div>

    <template #content>
      <div class="flex flex-col">
        <UButton
          v-if="user?.user_metadata.role === 'admin'"
          @click="navigateTo('/admin/consistencia')"
          variant="link"
          color="neutral"
          icon="i-ic-outline-admin-panel-settings"
          >administrar
        </UButton>
        <USeparator />
        <UButton
          @click="logout"
          variant="link"
          color="neutral"
          icon="i-solar-logout-broken"
          >sair</UButton
        >
      </div>
    </template>
  </UPopover>
</template>

<script lang="ts" setup>
const { logout } = useAuth()
const user = useSupabaseUser()
</script>

<style></style>
