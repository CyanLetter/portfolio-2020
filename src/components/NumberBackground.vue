<template>
	<inline-svg id="svg-bg" :class="[{ 'fade-out': this.sharedStore.state.viewingProject }]" :src="bgSvg" @loaded="svgLoaded($event)"></inline-svg>
</template>

<script>
	import InlineSvg from 'vue-inline-svg';
	import TweenMax from 'gsap';
	import _ from 'lodash';
	import projectData from '../assets/data/projectData.json';

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
				svgNumContainer: null,
				projects: projectData
			}
		},
		watch: {
			"sharedStore.state.currentProject": function() {
				this.setNumberForCurrentProject();
				this.changeGradient();
			}
		},
		created() {
			window.addEventListener("resize", this.debouncedOnResize);
		},
		destroyed() {
			window.removeEventListener("resize", this.debouncedOnResize);
		},
		methods: {
			svgLoaded: function() {
				// console.log("svg loaded");
				this.bgLoaded = true;

				this.svgDots = document.getElementById("dot-group");
				this.svgNumbers = document.getElementsByClassName("svg-number");
				this.svgNumContainer = document.getElementById("svg-num-container");

				document.getElementById("svg-bg").addEventListener("click", () => {
					this.cycleProject();
				});

				this.setNumberScale();
				this.setNumberForCurrentProject();
				this.changeGradient();
			},
			debouncedOnResize: _.debounce(function() {
				this.onResize();
			}, 50),
			onResize() {
				if (!this.bgLoaded) {
					return;
				}

				this.$nextTick(() => {
					this.setNumberScale();
				});
				
			},
			setNumberScale() {
				let dWidth = document.body.clientWidth;
				let dHeight = document.body.clientHeight;

				let scale = 1;
				var nWidth = this.svgNumContainer.viewBox.baseVal.width;
				var nHeight = this.svgNumContainer.viewBox.baseVal.height;
				var offset = 30;

				if (dWidth > dHeight) {
					// landscape
					scale = dHeight / nHeight;
					this.svgNumContainer.setAttribute("width", nWidth * scale);
					this.svgNumContainer.setAttribute("height", nHeight * scale);

					this.svgNumContainer.setAttribute("x", dWidth - (nWidth*scale) + (offset * scale));
					this.svgNumContainer.setAttribute("y", 0 + (offset * scale));
				} else {
					// portrait
					scale = dWidth / nWidth;
					this.svgNumContainer.setAttribute("width", nWidth * scale);
					this.svgNumContainer.setAttribute("height", nHeight * scale);

					this.svgNumContainer.setAttribute("x", 0 + (offset * scale));
					this.svgNumContainer.setAttribute("y", dHeight - (nHeight*scale) + (offset * scale));
				}
			},
			setNumberForCurrentProject() {
				if (!this.bgLoaded) {
					return;
				}
				for (let i = 0; i < this.svgNumbers.length; i++) {
					if (i === this.sharedStore.state.currentProject) {
						this.svgNumbers[i].classList.remove("inactive");
						this.svgNumbers[i].classList.add("active");
					} else if (this.svgNumbers[i].classList.contains("active")) {
						this.svgNumbers[i].classList.remove("active");
					} else {
						this.svgNumbers[i].classList.add("inactive");
					}
				}
			},
			cycleProject() {
				this.sharedStore.setCurrentProject(this.sharedStore.state.currentProject + 1);

				if (this.sharedStore.state.currentProject >= this.svgNumbers.length) {
					this.sharedStore.setCurrentProject(0);
				}
			},
			changeGradient() {
				if (!this.bgLoaded) {
					return;
				}
				let newGradient = this.projects[this.sharedStore.state.currentProject].gradient;
				let svgGradient = document.getElementById("svg-gradient");
				TweenMax.to(svgGradient.children[0], 0.5, {
					stopColor: newGradient.color1
				});
				TweenMax.to(svgGradient.children[1], 0.5, {
					stopColor: newGradient.color2
				});
				TweenMax.to(svgGradient, 0.5, {
					attr: {
						gradientTransform: "rotate(" + newGradient.angle + ")"
					}
				});
			}
		}
	}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
	#svg-bg {
		width: 100%;
		height: 100%;
		position: fixed;
		top: 0;
		left: 0;

		transition: 1s;

		&.fade-out {
			opacity: 0;
			transform: scale(3);
			pointer-events: none;
		}
	}

	.svg-number {
		transition: 0.2s;
		transition-timing-function: ease-in;
		opacity: 0;

		&.active {
			opacity: 1;
			transition-timing-function: ease-out;
		}

		&.inactive {
			visibility: hidden;
		}
	}
</style>
