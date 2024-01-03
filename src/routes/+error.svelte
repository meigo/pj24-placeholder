<script>
  import { page } from "$app/stores";
</script>

<div class="h-screen flex flex-col justify-center items-center text-cyan-100">
  <h1 class="text-8xl font-bold">{$page.status}</h1>
  <p class="text-2xl">{$page.error?.message}</p>
</div>
