module.exports = {
  extends: ['@commitlint/config-conventional'],
  plugins: [
    require('flowbite/plugin')
  ],
  content: [
    "./node_modules/flowbite.{js,ts}"
  ],
}
