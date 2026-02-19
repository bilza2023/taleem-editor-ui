<script>
	export let deckName = "taleem-deck-new";
	export let audio = "";

	// callbacks injected from parent (Editor)
	export let onNew = () => {};
	export let onAddSlide = () => {};
	export let onMockTimings = () => {};

	function handleAddSlide(e) {
		const type = e.target.value;
		if (!type) return;
		onAddSlide(type);
		e.target.value = "";
	}
</script>

<div class="topbar">

	<button class="btn" on:click={onNew}>
		🆕 New
	</button>

	<select class="select" on:change={handleAddSlide}>
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

	<button class="btn subtle" on:click={onMockTimings}>
		⏱️ Mock Timings
	</button>

</div>
