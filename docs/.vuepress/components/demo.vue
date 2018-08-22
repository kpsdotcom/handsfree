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
      let code = this.$el.previousElementSibling.innerText
      
      // Use update for instantiation demos
      if (code.includes('handsfree = new HandsfreeModule') && typeof window.handsfree !== 'undefined') {
        code = code.replace('handsfree = new HandsfreeModule', 'handsfree.update')
        code += '; handsfree.start()'
      }
      
      // Create the handsfree instance if it doesn't exist
      if (!code.includes('handsfree = new HandsfreeModule') && typeof window.handsfree === 'undefined') {
        window.handsfree = new HandsfreeModule({debug: true})
      }
      
      // Add window. to handsfree variables
      code = code.split('handsfree').join('window.handsfree')

      eval(code)
    }
  }
}
</script>
