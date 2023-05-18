<script lang="ts">
	import Countdown from '$lib/components/Countdown.svelte';
	import type { PageData } from './$types';
	import { onMount } from 'svelte';
	export let data: PageData;

	onMount(async () => {
		await getEpochs();
	});

	let page = 1;
	let epochsThisPage: EpochData[] = [];

	const formatDate = (timestamp: number) => {
		const date = new Date(timestamp * 1000);

		const options = {
			year: 'numeric',
			month: 'long',
			day: 'numeric',
			hour: 'numeric',
			minute: 'numeric',
			second: 'numeric'
		};

		return date.toLocaleString('de-DE', options as any);
	};

	const getEpochs = async () => {
		const response = await fetch(`/api/epochs?page=${page}&latest=${data.latestEpoch.epoch}`);
		const dataa = await response.json();
		epochsThisPage = dataa.reverse();
		if (page === 1) epochsThisPage.unshift(data.latestEpoch);
	};


	const switchPage = (direction: 'next' | 'prev') => {
		if (page === 1 && direction === 'prev') return;
		if (direction === 'next') {
			page++;
		} else {
			page--;
		}
		getEpochs();
	};
</script>

<div class="mx-auto mb-8 mt-8 max-w-7xl px-4 sm:px-6 lg:px-8">
	<div class="rounded-3xl bg-gray-900 py-10">
		<h2 class="px-4 text-base font-semibold leading-7 text-white sm:px-6 lg:px-8">Alle Epochen</h2>
		<table class="mt-6 w-full whitespace-nowrap text-left">
			<colgroup>
				<col class="w-full sm:w-4/12" />
				<col class="lg:w-4/12" />
				<col class="lg:w-2/12" />
				<col class="lg:w-1/12" />
				<col class="lg:w-1/12" />
			</colgroup>
			<thead class="border-b border-white/10 text-sm leading-6 text-white">
				<tr>
					<th scope="col" class="py-2 pl-4 pr-8 font-semibold sm:pl-6 lg:pl-8">Epoche</th>
					<th scope="col" class="hidden py-2 pl-0 pr-8 font-semibold sm:table-cell">Fertig</th>
					<th scope="col" class="py-2 pl-0 pr-4 text-right font-semibold sm:pr-8 sm:text-left lg:pr-20">Status</th>
					<th scope="col" class="hidden py-2 pl-0 pr-8 font-semibold md:table-cell lg:pr-20">Duration</th>
					<th scope="col" class="hidden py-2 pl-0 pr-4 text-right font-semibold sm:table-cell sm:pr-6 lg:pr-8">More info</th>
				</tr>
			</thead>
			<tbody class="divide-y divide-white/5">
				{#each epochsThisPage as epoch}
					<tr>
						<td class="py-4 pl-4 pr-8 sm:pl-6 lg:pl-8">
							<div class="flex items-center gap-x-4">
								<!-- <img src="https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" alt="" class="h-8 w-8 rounded-full bg-gray-800" /> -->

								{#if data.latestEpoch.epoch === epoch.epoch}
									<div class="truncate text-sm font-medium leading-6 text-white">🔄 {epoch.epoch}</div>
								{:else}
									<div class="truncate text-sm font-medium leading-6 text-white">✅ {epoch.epoch}</div>
								{/if}
							</div>
						</td>
						<td class="hidden py-4 pl-0 pr-4 sm:table-cell sm:pr-8">
							<div class="flex flex-col gap-x-3">
								{#if data.latestEpoch.epoch === epoch.epoch}
									<Countdown targetTimestamp={epoch.end_time} />
								{:else}
									<div class="rounded-md bg-gray-700/40 px-2 py-1 text-xs font-medium text-gray-400 ring-1 ring-inset ring-white/10">{formatDate(epoch.end_time)}</div>
								{/if}
							</div>
						</td>
						<td class="py-4 pl-0 pr-4 text-sm leading-6 sm:pr-8 lg:pr-20">
							<div class="flex items-center justify-end gap-x-2 sm:justify-start">
								<button type="button" class="rounded-md bg-white/10 px-2.5 py-1.5 text-sm font-semibold text-white shadow-sm hover:bg-white/20 sm:hidden">more</button>
								<div class="flex-none rounded-full bg-green-400/10 p-1 text-green-400">
									<div class="h-1.5 w-1.5 rounded-full bg-current" />
								</div>
								<div class="hidden text-white sm:block">Completed</div>
							</div>
						</td>
						<td class="hidden py-4 pl-0 pr-8 text-sm leading-6 text-gray-400 md:table-cell lg:pr-20">25s</td>
						<td class="hidden py-4 pl-0 pr-4 text-right text-sm leading-6 text-gray-400 sm:table-cell sm:pr-6 lg:pr-8">
							<button type="button" class="rounded-md bg-white/10 px-2.5 py-1.5 text-sm font-semibold text-white shadow-sm hover:bg-white/20">more</button>
						</td>
					</tr>
				{/each}
			</tbody>
		</table>
		<div class="flex items-center justify-between bg-gray-900 px-4 py-3 sm:px-6">
			<div class="flex flex-1 justify-between sm:hidden">
				<a href="/" class="hover:text-black:bg-gray-50 relative inline-flex items-center rounded-md border px-4 py-2 text-sm font-medium text-gray-700">Previous</a>
				<a href="/" class="relative ml-3 inline-flex items-center rounded-md border px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50">Next</a>
			</div>
			<div class="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
				<div>
					<p class="text-sm text-white">
						Page:
						<span class="font-medium">{page}</span>
					</p>
				</div>
				<div>
					<nav class="isolate inline-flex -space-x-px rounded-md shadow-sm" aria-label="Pagination">
						<button on:click={() => switchPage('prev')} class="relative inline-flex items-center rounded-r-md px-2 py-2 text-white focus:z-20 focus:outline-offset-0 hover:text-gray-400">
							<span class="sr-only">Previous</span>
							<svg class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
								<path fill-rule="evenodd" d="M12.79 5.23a.75.75 0 01-.02 1.06L8.832 10l3.938 3.71a.75.75 0 11-1.04 1.08l-4.5-4.25a.75.75 0 010-1.08l4.5-4.25a.75.75 0 011.06.02z" clip-rule="evenodd" />
							</svg>
						</button>

						<button on:click={() => switchPage('next')} class="relative inline-flex items-center rounded-r-md px-2 py-2 text-white focus:z-20 focus:outline-offset-0 hover:text-gray-400">
							<span class="sr-only">Next</span>
							<svg class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
								<path fill-rule="evenodd" d="M7.21 14.77a.75.75 0 01.02-1.06L11.168 10 7.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 01-1.06-.02z" clip-rule="evenodd" />
							</svg>
						</button>
					</nav>
				</div>
			</div>
		</div>
	</div>
</div>
