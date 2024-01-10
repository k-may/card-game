<script>
    import '../scss/globals.scss';
</script>

<div class='app'>
    <slot />
</div>

<style lang='scss'>

  .app {
    position: fixed;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
  }

  //todo responsive styles for mobile....

</style>