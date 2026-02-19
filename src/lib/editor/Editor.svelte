
<script>
	import EditorToolbar from "./EditorToolbar.svelte";
	import SoundComponent from "./SoundComponent.svelte";
	import SlideList from "./SlideList.svelte";

	const DEFAULT_BACKGROUND = {
		backgroundColor: "#111111",
		backgroundImage: null,
		backgroundImageOpacity: 0.3
	};

	function createEmptySlides() {
		return [
			{
				type: "titleAndSubtitle",
				start: 0,
				end: 5,
				data: [
					{ name: "line", type: "text", content: "Title Here" },
					{ name: "line", type: "text", content: "Subtitle Here" }
				]
			}
		];
	}

	/* ----------------------------
	   State
	---------------------------- */

	export let slides = [];
	export let currentTime = 0;
	export let deckName = "";
	export let audio = "";
	export let background = { ...DEFAULT_BACKGROUND };

	let showBackgroundForm = false;

	/* ----------------------------
	   Core Actions
	---------------------------- */

	function createNewDeck() {
		deckName = "taleem-deck-new";
		audio = "";
		background = { ...DEFAULT_BACKGROUND };
		slides = createEmptySlides();
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

	function handleTimeUpdate(t) {
		currentTime = t;
	}

	function downloadJSON() {
		const payload = {
			version: "deck-v1",
			name: deckName || "taleem-deck",
			audio,
			background,
			deck: slides
		};

		const blob = new Blob(
			[JSON.stringify(payload, null, 2)],
			{ type: "application/json" }
		);

		const url = URL.createObjectURL(blob);
		const a = document.createElement("a");
		a.href = url;
		a.download = `${deckName || "deck"}.json`;
		a.click();
		URL.revokeObjectURL(url);
	}

	async function handleOpenFile(e) {
		debugger;
		const file = e.target.files[0];
		if (!file) return;

		try {
			const text = await file.text();
			const parsed = JSON.parse(text);

			deckName = parsed.name || "";
			slides = parsed.deck || [];
			audio = parsed.audio || "";
			background = parsed.background || { ...DEFAULT_BACKGROUND };
		} catch {
			alert("Invalid JSON file");
		}

		e.target.value = "";
	}
</script>

<!-- ===========================
     TOOLBAR (INSIDE EDITOR)
=========================== -->

<EditorToolbar
	bind:deckName
	bind:audio
	onNew={createNewDeck}
	onAddSlide={addSlide}
	onMockTimings={addMockTimings}
	onDownload={downloadJSON}
	onOpen={handleOpenFile}
/>

<!-- ===========================
     CONTENT
=========================== -->

{#if slides.length === 0}
	<div class="empty-state">
		No deck loaded. Click 🆕 New or ➕ Add slide to begin.
	</div>
{:else}

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
				<input type="color" bind:value={background.backgroundColor} />
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

{/if}

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

	.empty-state {
		padding: 40px;
		text-align: center;
		color: #777;
		font-size: 14px;
	}
</style>
