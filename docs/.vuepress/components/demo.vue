<template lang="pug">
  div
    button.action-button.mr-1(@click='runDemo') Run Demo
</template>

<script>
export default {
  name: 'demo',
  
  methods: {
    /**
     * Runs the demo
     */
    runDemo () {
      eval(this.$slots.default[0].text)
    }
  }
}
</script>
