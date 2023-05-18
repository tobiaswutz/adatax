<script lang="ts">
  import { onMount, onDestroy } from 'svelte';

  export let targetTimestamp: number;

  let countdown = '';
  let countdownTimeout: NodeJS.Timeout;

  function formatCountdown(duration: number): string {
    const seconds = Math.floor((duration % 60)).toString().padStart(2, '0');
    const minutes = Math.floor((duration / 60) % 60).toString().padStart(2, '0');
    const hours = Math.floor((duration / (60 * 60)) % 24).toString().padStart(2, '0');
    const days = Math.floor(duration / (60 * 60 * 24)).toString();

    return `${days}D, ${hours}D ${minutes}M ${seconds}S`;
  }

  onMount(() => {
    const updateCountdown = (): void => {
      const currentTime = Math.floor(Date.now() / 1000);
      const timeDifference = targetTimestamp - currentTime;

      if (timeDifference > 0) {
        countdown = formatCountdown(timeDifference);
        countdownTimeout = setTimeout(updateCountdown, 1000);
      } else {
        countdown = 'Countdown abgelaufen';
      }
    };

    updateCountdown();
  });

  onDestroy(() => {
    clearTimeout(countdownTimeout);
  });
</script>

<main>
  <p class="text-white">{countdown}</p>
</main>
