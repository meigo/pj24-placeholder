<script>
  // import DotsOverlay from "$lib/DotsOverlay.svelte";
  import Logo from "$lib/Logo.svelte";
  import Sign from "$lib/Sign.svelte";
</script>

<h1>Pühajärve jaanituli 2024</h1>

<div class="fixed p-8 top-0 flex items-center justify-center w-full h-full">
  <div class="max-w-6xl w-full relative -top-16">
    <Logo />
  </div>
</div>

<div class="fixed top-0 flex items-end justify-center w-full h-full">
  <div class="max-w-80 w-1/2">
    <Sign />
  </div>
</div>

<!-- <DotsOverlay /> -->

<style lang="postcss">
  h1 {
    color: #0d96e6;
    opacity: 0.1;
    z-index: -20;
  }
</style>
