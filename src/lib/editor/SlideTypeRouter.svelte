<script>
	// text
	import TitleAndSubtitleEditor from './slides/TitleAndSubtitleEditor.svelte';
	import TitleAndParaEditor from './slides/TitleAndParaEditor.svelte';
	import BulletListEditor from './slides/BulletListEditor.svelte';
	import TwoColumnTextEditor from './slides/TwoColumnTextEditor.svelte';

	// images
	import ImageSlideEditor from './slides/ImageSlideEditor.svelte';
	import ImageWithTitleEditor from './slides/ImageWithTitleEditor.svelte';
	import ImageWithCaptionEditor from './slides/ImageWithCaptionEditor.svelte';
	import ImageLeftBulletsRightEditor from './slides/ImageLeftBulletsRightEditor.svelte';
	import ImageRightBulletsLeftEditor from './slides/ImageRightBulletsLeftEditor.svelte';

	// data / charts
	import TableEditor from './slides/TableEditor.svelte';
	import BarChartEditor from './slides/BarChartEditor.svelte';
	import ProgressBarEditor from './slides/ProgressBarEditor.svelte';

	// misc
	import QuoteSlideEditor from './slides/QuoteSlideEditor.svelte';
	import KeyIdeasSlideEditor from './slides/KeyIdeasSlideEditor.svelte';

	// eq
	import EqSlideEditor from './slides/EqSlideEditor.svelte';

	export let type;
	export let data = [];
	export let onChange;
	export let currentTime=0;
</script>

{#if type === 'titleAndSubtitle'}
	<TitleAndSubtitleEditor {data} {onChange}  currentTime={currentTime} />

{:else if type === 'titleAndPara'}
	<TitleAndParaEditor {data} {onChange}  currentTime={currentTime} />

{:else if type === 'bulletList'}
	<BulletListEditor {data} {onChange} currentTime={currentTime}/>

{:else if type === 'twoColumnText'}
	<TwoColumnTextEditor {data} {onChange}  currentTime={currentTime} />

{:else if type === 'imageSlide' || type === 'fillImage'}
	<ImageSlideEditor {data} {onChange}  currentTime={currentTime} />

{:else if type === 'imageWithTitle'}
	<ImageWithTitleEditor {data} {onChange}  currentTime={currentTime} />

{:else if type === 'imageWithCaption'}
	<ImageWithCaptionEditor {data} {onChange}  currentTime={currentTime} />

{:else if type === 'imageLeftBulletsRight'}
	<ImageLeftBulletsRightEditor {data} {onChange}  currentTime={currentTime} />

{:else if type === 'imageRightBulletsLeft'}
	<ImageRightBulletsLeftEditor {data} {onChange}  currentTime={currentTime} />

{:else if type === 'table'}
	<TableEditor {data} {onChange}  currentTime={currentTime} />

{:else if type === 'barChart'}
	<BarChartEditor {data} {onChange}  currentTime={currentTime} />

{:else if type === 'progressbar'}
	<ProgressBarEditor {data} {onChange}  currentTime={currentTime} />

{:else if type === 'quoteSlide'}
	<QuoteSlideEditor {data} {onChange}  currentTime={currentTime} />

{:else if type === 'keyIdeasSlide'}
	<KeyIdeasSlideEditor {data} {onChange}  currentTime={currentTime} />

{:else if type === 'eq'}
	<EqSlideEditor {data} {onChange}  currentTime={currentTime} />

{:else}
	<div style="margin-top:8px;color:red;">
		Unknown slide type: <b>{type}</b>
	</div>
{/if}
