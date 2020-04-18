<template>
	<inline-svg id="svg-bg" :src="bgSvg" @loaded="svgLoaded($event)"></inline-svg>
</template>

<script>
	import InlineSvg from 'vue-inline-svg';

	export default {
		name: 'NumberBackground',
		components: {
			InlineSvg
		},
		props: {
			
		},
		data: function() {
			return {
				sharedStore: window.store,
				bgSvg: require('../assets/svg/BG_Cutout.svg'),
				bgLoaded: false,
				svgDots: null,
				svgNumbers: null,
			}
		},
		watch: {
			"sharedStore.state.currentProject": function() {
				this.setNumberForCurrentProject();
			}
		},
		created() {
			window.addEventListener("resize", this.onResize);
		},
		destroyed() {
			window.removeEventListener("resize", this.onResize);
		},
		methods: {
			svgLoaded: function() {
				console.log("svg loaded");
				this.bgLoaded = true;

				this.svgDots = document.getElementById("dot-group");
				this.svgNumbers = document.getElementsByClassName("svg-number");

				document.getElementById("svg-bg").addEventListener("click", () => {
					this.cycleProject();
				});

				this.setNumberScale();
				this.setNumberForCurrentProject();
			},
			onResize() {
				if (!this.bgLoaded) {
					return;
				}

				this.setNumberScale();
			},
			setNumberScale() {
				let dWidth = document.body.clientWidth;
				let dHeight = document.body.clientHeight;
				this.svgNumbers.forEach( num => {
					let scale = 1;

					var nWidth = num.viewBox.baseVal.width;
					var nHeight = num.viewBox.baseVal.height;
					var offset = 30;

					if (dWidth > dHeight) {
						// landscape
						scale = dHeight / nHeight;
						num.setAttribute("width", nWidth * scale);
						num.setAttribute("height", nHeight * scale);

						num.setAttribute("x", dWidth - (nWidth*scale) + (offset * scale));
						num.setAttribute("y", 0 + (offset * scale));
					} else {
						// portrait
						scale = dWidth / nWidth;
						num.setAttribute("width", nWidth * scale);
						num.setAttribute("height", nHeight * scale);

						num.setAttribute("x", 0 + (offset * scale));
						num.setAttribute("y", dHeight - (nHeight*scale) + (offset * scale));
					}
				});
			},
			setNumberForCurrentProject() {
				for (let i = 0; i < this.svgNumbers.length; i++) {
					if (i === this.sharedStore.state.currentProject) {
						this.svgNumbers[i].setAttribute("display", "block");
					} else {
						this.svgNumbers[i].setAttribute("display", "none");
					}
				}
			},
			cycleProject() {
				this.sharedStore.setCurrentProject(this.sharedStore.state.currentProject + 1);
				
				if (this.sharedStore.state.currentProject >= this.svgNumbers.length) {
					this.sharedStore.setCurrentProject(0);
				}
			}
		}
	}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
	#svg-bg {
		width: 100%;
		height: 100%;
		position: fixed;
		top: 0;
		left: 0;
	}

	.svg-number {
		opacity: 0;
	}

	.active {
		opacity: 1;
	}
</style>
