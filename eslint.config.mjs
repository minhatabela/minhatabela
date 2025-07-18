// @ts-check
import withNuxt from './.nuxt/eslint.config.mjs'

export default withNuxt({
  rules: {
    '@typescript-eslint/no-explicit-any': 'off',
    'vue/multi-word-component-names': 'off',
    '@typescript-eslint/no-extraneous-class': 'off',
    'vue/html-self-closing': 'off'
  }
})
// Your custom configs here
