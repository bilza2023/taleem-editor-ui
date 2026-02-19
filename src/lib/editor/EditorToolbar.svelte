<script>
	import SoundComponent from "./SoundComponent.svelte";
	import SlideList from "./SlideList.svelte";

	/* ----------------------------
	   Defaults
	---------------------------- */

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
	   State (Empty on load)
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

	/* ----------------------------
	   Download JSON
	---------------------------- */

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

	/* ----------------------------
	   Open JSON
	---------------------------- */

	async function handleOpenFile(e) {
		const file = e.target.files[0];
		if (!file) return;

		try {
			const text = await file.text();
			const parsed = JSON.parse(text);

			deckName = parsed.name || "taleem-deck-new";
			slides = Array.isArray(parsed.deck) ? parsed.deck : [];
			audio = parsed.audio || "";
			background = parsed.background || { ...DEFAULT_BACKGROUND };
		} catch {
			alert("Invalid JSON file");
		}

		e.target.value = "";
	}
</script>

<!-- ===========================
     TOOLBAR
=========================== -->

<div class="topbar">

	<button class="btn" on:click={createNewDeck}>
		🆕 New
	</button>

	<select class="select" on:change={(e) => {
		const type = e.target.value;
		if (!type) return;
		addSlide(type);
		e.target.value = "";
	}}>
		<option value="">➕ Add slide…</option>
		<option value="titleAndSubtitle">Title & Subtitle</option>
		<option value="titleAndPara">Title & Paragraph</option>
		<option value="bulletList">Bullet List</option>
		<option value="twoColumnText">Two Column Text</option>
		<option value="imageSlide">Image</option>
		<option value="fillImage">Fill Image</option>
		<option value="imageWithTitle">Image with Title</option>
		<option value="imageWithCaption">Image with Caption</option>
		<option value="imageLeftBulletsRight">Image Left / Bullets Right</option>
		<option value="imageRightBulletsLeft">Image Right / Bullets Left</option>
		<option value="table">Table</option>
		<option value="barChart">Bar Chart</option>
		<option value="progressbar">Progress Bar</option>
		<option value="quoteSlide">Quote</option>
		<option value="keyIdeasSlide">Key Ideas</option>
		<option value="eq">Equation (EQ)</option>
	</select>

	<input
		class="deck-input"
		type="text"
		bind:value={deckName}
		placeholder="deck name"
	/>

	<input
		type="text"
		placeholder="lesson1.opus"
		bind:value={audio}
	/>

	<button class="btn subtle" on:click={addMockTimings}>
		⏱️ Mock Timings
	</button>

	<label class="btn">
		📂 Open
		<input
			type="file"
			accept="application/json"
			on:change={handleOpenFile}
			hidden
		/>
	</label>

	<button class="btn primary" on:click={downloadJSON}>
		⬇️ Download
	</button>

</div>

<!-- ===========================
     BACKGROUND
=========================== -->

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

<!-- ===========================
     CONTENT
=========================== -->

{#if slides.length === 0}
	<div class="empty-state">
		No deck loaded. Click 🆕 New or ➕ Add slide to begin.
	</div>
{:else}
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
	.topbar {
		display: flex;
		align-items: center;
		gap: 10px;
		padding: 10px 14px;
		background: #111;
		border-bottom: 1px solid #222;
	}

	.select,
	.deck-input,
	input[type="text"] {
		background: #0f0f0f;
		color: #eee;
		border: 1px solid #333;
		padding: 6px 8px;
		border-radius: 4px;
		font-size: 13px;
	}

	.deck-input {
		max-width: 240px;
	}

	.btn {
		padding: 6px 10px;
		background: #1a1a1a;
		color: #eee;
		border: 1px solid #333;
		border-radius: 4px;
		cursor: pointer;
		font-size: 13px;
	}

	.btn:hover {
		background: #222;
	}

	.btn.primary {
		background: #1f3d2b;
		border-color: #2f6b4a;
	}

	.btn.subtle {
		opacity: 0.85;
	}

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
