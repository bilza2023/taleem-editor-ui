<script>
	import EditorToolbar from "./EditorToolbar.svelte";
	import SoundComponent from "./SoundComponent.svelte";
	import SlideList from "./SlideList.svelte";

	export let slides = [];
	export let currentTime = 0;
	export let deckName = "taleem-deck-new";
	export let audio = "";
	export let background = {
		backgroundColor: "#111111",
		backgroundImage: null,
		backgroundImageOpacity: 0.3
	};

	let showBackgroundForm = false;

	function handleTimeUpdate(t) {
		currentTime = t;
	}

	function resetEditor() {
		deckName = "taleem-deck-new";
		slides = [];
	}

	function addSlide(type) {
		slides = [
			...slides,
			{
				type,
				start: 0,
				end: 5,
				data: []
			}
		];
	}

	function addMockTimings() {
		let t = 0;
		slides = slides.map(slide => {
			const start = t;
			const end = t + 5;
			t = end;
			return { ...slide, start, end };
		});
	}

	function updateSlide(index, updated) {
		slides[index] = updated;
		slides = slides;
	}

	function deleteSlide(index) {
		slides.splice(index, 1);
		slides = slides;
	}

	function moveSlide(from, to) {
		const item = slides.splice(from, 1)[0];
		slides.splice(to, 0, item);
		slides = slides;
	}
</script>

<EditorToolbar
	bind:deckName
	bind:audio
	onNew={resetEditor}
	onAddSlide={addSlide}
	onMockTimings={addMockTimings}
/>

<button
	style="margin: 8px 14px;"
	on:click={() => showBackgroundForm = !showBackgroundForm}
>
	🎨 Background
</button>

{#if showBackgroundForm}
	<div class="bg-form">
		<label>
			Color:
			<input
				type="color"
				bind:value={background.backgroundColor}
			/>
		</label>

		<label>
			Image URL:
			<input
				type="text"
				placeholder="image.jpg"
				bind:value={background.backgroundImage}
			/>
		</label>

		<label>
			Image Opacity:
			<input
				type="range"
				min="0"
				max="1"
				step="0.05"
				bind:value={background.backgroundImageOpacity}
			/>
		</label>
	</div>
{/if}

<SoundComponent onTimeUpdate={handleTimeUpdate} />

<SlideList
	{currentTime}
	{slides}
	onUpdate={updateSlide}
	onDelete={deleteSlide}
	onMove={moveSlide}
/>

<style>
	.bg-form {
		margin: 10px 14px;
		padding: 10px;
		background: #0f0f0f;
		border: 1px solid #222;
		border-radius: 6px;
		display: flex;
		flex-direction: column;
		gap: 10px;
		max-width: 400px;
	}

	.bg-form label {
		display: flex;
		flex-direction: column;
		font-size: 13px;
		gap: 4px;
	}

	.bg-form input[type="text"] {
		background: #111;
		color: #eee;
		border: 1px solid #333;
		padding: 6px;
		border-radius: 4px;
	}
</style>
