<script>
  import { onMount } from "svelte";

  let fps = 0;
  /** @type {number[]} */
  const times = [];

  onMount(() => {
    /** @type {number} */
    let frame;

    function loop() {
      frame = requestAnimationFrame(loop);

      const now = performance.now();
      while (times.length > 0 && times[0] <= now - 1000) {
        times.shift();
      }
      times.push(now);
      fps = times.length;
    }

    loop();

    return () => cancelAnimationFrame(frame);
  });
</script>

<span class="fixed top-0 left-0 p-2">{fps} FPS</span>
