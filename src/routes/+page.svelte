<script lang="ts">
	import type { PageData } from './$types';
	import { onMount } from 'svelte';
	export let data: PageData;

  onMount(async () => {
    await getEpochs();
  });

  let page = 1;
  let epochsThisPage: EpochData[] = [];
  
  const getEpochs = async () => {
    const response = await fetch(`/api/epochs?page=${page}&latest=${data.latestEpoch.epoch}`);
    const dataa = await response.json();
    epochsThisPage = dataa.reverse();
  }
</script>


<input type="number" bind:value={page} on:change={getEpochs} />

<div class="mx-auto mt-24 max-w-4xl rounded-2xl p-12 px-4 shadow-2xl sm:px-6 lg:px-8">
	<div class="mx-auto max-w-3xl">

		<div class="flow-root">
			<ul class="-mb-8">
				{#each epochsThisPage as epoch}
					<li>
						<div class="relative pb-8">
							{#if 11 > 10}
								<span class="absolute left-4 top-4 -ml-px h-full w-0.5 bg-gray-200" aria-hidden="true" />
							{/if}

							<div class="relative flex space-x-3">
								<div>
									<span class="flex h-8 w-8 items-center justify-center rounded-full bg-green-500 ring-8 ring-white">
										<svg class="h-5 w-5 text-white" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
											<path fill-rule="evenodd" d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z" clip-rule="evenodd" />
										</svg>
									</span>
								</div>
								<div class="flex min-w-0 flex-1 justify-between space-x-4 pt-1.5">
									<div>
										<p class="text-sm text-gray-500">
											<span class="font-bold text-white">{epoch.epoch}</span>
										</p>
									</div>
									<div class="whitespace-nowrap text-right text-sm text-gray-500">
										<time datetime="2020-10-04"></time>
									</div>
								</div>
							</div>
						</div>
					</li>
				{/each}
			</ul>
		</div>
	</div>
</div>
