<script>
export default {
  props: {
    modelValue:String
  },
  emits: ['update:modelValue']
}
</script>

<template>
  <input class="block w-full py-2 pl-5 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 "
    :value="modelValue"
    @input="$emit('update:modelValue', $event.target.value)"
  />
</template>