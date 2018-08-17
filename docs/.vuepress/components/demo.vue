<template lang="pug">
  div
    button.action-button.mr-1(:id='"demo-" + id' @click='runDemo') Run Demo
</template>

<script>
export default {
  name: 'demo',
  props: ['label', 'id'],

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
