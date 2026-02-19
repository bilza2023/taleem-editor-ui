<script>
	export let deckName = "taleem-deck-new";
	export let audio = "";

	export let onNew = () => {};
	export let onAddSlide = () => {};
	export let onMockTimings = () => {};
	export let onOpen = () => {};
	export let onDownload = () => {};
	export let onToggleBackground = () => {};
</script>

<div class="toolbar">

	<!-- ================= ROW 1: Controls ================= -->

	<div class="row controls">

		<button class="btn" on:click={onNew}>
			✨ New
		</button>

		<input
			class="deck-input"
			type="text"
			bind:value={deckName}
			placeholder="deck name"
		/>

		<input
			class="audio-input"
			type="text"
			bind:value={audio}
			placeholder="lesson1.opus"
		/>

		<button class="btn subtle" on:click={onMockTimings}>
			⏱
		</button>

		<button class="btn" on:click={onToggleBackground}>
			🎨
		</button>

		<button class="btn" on:click={onOpen}>
			📂
		</button>

		<button class="btn primary" on:click={onDownload}>
			💾
		</button>

	</div>


	<!-- ================= ROW 2: Slide Types ================= -->

	<div class="row slides">

		<button title="Title & Subtitle" on:click={() => onAddSlide("titleAndSubtitle")}>
			🅣
		</button>

		<button title="Paragraph" on:click={() => onAddSlide("titleAndPara")}>
			📄
		</button>

		<button title="Bullet List" on:click={() => onAddSlide("bulletList")}>
			• • •
		</button>

		<button title="Two Column" on:click={() => onAddSlide("twoColumnText")}>
			☰
		</button>

		<button title="Image" on:click={() => onAddSlide("imageSlide")}>
			🖼
		</button>

		<button title="Image Left / Bullets Right" on:click={() => onAddSlide("imageLeftBulletsRight")}>
			⬅️
		</button>

		<button title="Image Right / Bullets Left" on:click={() => onAddSlide("imageRightBulletsLeft")}>
			➡️
		</button>

		<button title="Table" on:click={() => onAddSlide("table")}>
			🔲
		</button>

		<button title="Bar Chart" on:click={() => onAddSlide("barChart")}>
			📊
		</button>

		<button title="Progress Bar" on:click={() => onAddSlide("progressbar")}>
			📈
		</button>

		<button title="Quote" on:click={() => onAddSlide("quoteSlide")}>
			❝ ❞
		</button>

		<button title="Key Ideas" on:click={() => onAddSlide("keyIdeasSlide")}>
			💡
		</button>

		<button title="Equation" on:click={() => onAddSlide("eq")}>
			∑
		</button>
		<button title="Image With Title" on:click={() => onAddSlide("imageWithTitle")}>
			🖼️🅣
		</button>
		
		<button title="Image With Caption" on:click={() => onAddSlide("imageWithCaption")}>
			🖼️💬
		</button>
		
		<button title="Fill Image" on:click={() => onAddSlide("fillImage")}>
			🧱
		</button>
		
	</div>

</div>

<style>
	.toolbar {
		background: #111;
		border-bottom: 1px solid #222;
		padding: 8px 12px;
		display: flex;
		flex-direction: column;
		gap: 8px;
	}

	.row {
		display: flex;
		align-items: center;
		gap: 8px;
		flex-wrap: wrap;
	}

	.deck-input,
	.audio-input {
		background: #0f0f0f;
		color: #eee;
		border: 1px solid #333;
		padding: 6px 8px;
		border-radius: 4px;
		font-size: 13px;
	}

	.deck-input { width: 200px; }
	.audio-input { width: 160px; }

	.btn {
		background: #1a1a1a;
		color: #eee;
		border: 1px solid #333;
		padding: 6px 10px;
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

	.slides button {
		background: #161616;
		border: 1px solid #2a2a2a;
		color: #ccc;
		padding: 6px 8px;
		border-radius: 4px;
		cursor: pointer;
		font-size: 14px;
	}

	.slides button:hover {
		background: #222;
		color: white;
	}
</style>
