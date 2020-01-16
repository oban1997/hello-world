<template>
	<div>
		<pre>{{ infoBTCPrice }}</pre>
		<div class="small">
			<BarChart :chart-data="datacollection"/>
		</div>
	</div>
</template>

<script>
	import BarChart from './Charts/Bar-Chart'

	export default {
		name: 'TwoKW',
		components: {
			BarChart
		},
		data() {
			return {
				infoBTCPrice: [],
				infoBTCKeys: [],
				date: null,
				datacollection: {}
			}
		},
		methods: {
			generateLastWeekPrice() {
				for (let daysAgo = 6; daysAgo !== -1; daysAgo--) {
					this.date = this.$moment().subtract(daysAgo, 'days').unix();
					this.infoBTCKeys.push(this.$moment.unix(this.date).format('YYYY-MM-DD'));
					this.axios
						.get('https://min-api.cryptocompare.com/data/pricehistorical?fsym=BTC&tsyms=USD&ts=' + this.date)
						.then(response => {
							this.infoBTCPrice.push(response.data.BTC.USD);
							if(this.infoBTCPrice.length == 7) {
								this.fillData();
							}
							// console.log(this.infoBTCPrice);

						})
				}
				
				console.log(this.infoBTCKeys);
			},
			generateCurrentPrice() {
				this.date = this.$moment().format('YYYY-MM-DD');
				this.axios
					.get('https://min-api.cryptocompare.com/data/price?fsym=BTC&tsyms=USD')
					.then(response => {
						this.infoBTCPrice.splice(6, 1, response.data.USD);
						this.infoBTCKeys.splice(this.infoBTCKeys.length - 1, 1, this.date);
						this.fillData();
					})
			},
			fillData() {
				console.log(this.infoBTCKeys);
				console.log(this.infoBTCPrice);
				this.datacollection = {
					labels: this.infoBTCKeys,
					datasets: [{
						label: 'Diagramm 2',
						backgroundColor: '#f87979',
						data: this.infoBTCPrice
					}]
				}
			}
		},
		mounted() {
			this.generateLastWeekPrice();
			/*this.datacollection = {
				labels: ['1', '2', '3'],
				datasets: {
					label: 
				}
			}*/
			// setInterval(() => this.generateCurrentPrice(), 3600);
			
			// console.log(this.$moment.unix(this.date).format('YYYY-MM-DD'))
		}
	}
</script>