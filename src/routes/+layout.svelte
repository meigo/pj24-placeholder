<script>
  import "../app.pcss";
  // import Fps from "$lib/Fps.svelte";

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

<slot />

<!-- <Fps /> -->

<style>
  :global(body) {
    background-color: #0d96e6;
  }
  video {
    @apply fixed top-0 object-cover w-full h-full -z-10;
  }
</style>
