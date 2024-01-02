<script>
  // import DotsOverlay from "$lib/DotsOverlay.svelte";
  import Logo from "$lib/Logo.svelte";
  import Sign from "$lib/Sign.svelte";

  const metaTitle = "Pühajärve jaanituli 2024, 22. ja 23. juunil, Pühajärve pargis";
  const metaDescription =
    "Pühajärve jaanituli 2024 peaesinejateks on Nervo, Luude, Quintino, A.M.C, 1991 ja Issey Cross. Lisaks on esindatud eesti artiste paremik.";
</script>

<svelte:head>
  <title>{metaTitle}</title>
  <meta name="description" content={metaDescription} />
  <meta property="og:title" content={metaTitle} />
  <meta property="og:description" content={metaDescription} />
</svelte:head>

<video autoplay muted loop>
  <source src="bg.webm" type="video/webm" />
  <source src="bg.mp4" type="video/mp4" />
  Your browser does not support the video tag.
</video>

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
  video {
    @apply fixed top-0 object-cover w-full h-full -z-10;
  }
</style>
