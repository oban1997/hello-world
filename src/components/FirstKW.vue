<template id="first-krypto-watcher">
	<div>
		<pre>{{ infoBTC[5] }}</pre>
		<div class="small">
			<line-chart :chart-data="datacollection"/>	
		</div>
	</div>
</template>

<script>
	import LineChart from './Charts/Line-Chart'
	export default {
		name: 'FirstKW',
		components: {
			LineChart
		},
		data() {
			return {
				infoBTC: [],
				infoBTCKeys: [],
				datacollection: {}
			}
		},
		methods: {
			generateLastWeekPrice() {
				this.axios
					.get('https://api.coindesk.com/v1/bpi/historical/currentprice.json')
					.then(response => {
						for(let daysAgo = 6; daysAgo !== 0; daysAgo--) {
							let date = this.$moment().subtract(daysAgo, 'days').format('YYYY-MM-DD');			
							this.infoBTC.push(response.data.bpi[date]);
							this.infoBTCKeys.push(date);
						}
						this.infoBTCKeys.push(this.$moment().format('YYYY-MM-DD'));
					})
				this.axios
						.get('https://api.coindesk.com/v1/bpi/currentprice.json')
						.then(response => {
							this.infoBTC.push(response.data.bpi.USD.rate_float);
							this.fillData();
						})	
			},
			generateCurrentPrice() {
				this.axios
						.get('https://api.coindesk.com/v1/bpi/currentprice.json')
						.then(response => {
							// console.log(this.infoBTC);
							this.infoBTC.splice(6, 1, response.data.bpi.USD.rate_float);
							this.infoBTCKeys.splice(this.infoBTCKeys.length -1, 1, this.$moment().format('YYYY-MM-DD'));
							this.fillData();
						})
			},
			fillData() {
				this.datacollection = {
					labels: this.infoBTCKeys,
					datasets: [{
						label: 'Coindesk API',
						backgroundColor: '#f87979',
						data: this.infoBTC
					}] 
				}
			}
		},
		mounted() {
			this.generateLastWeekPrice();
			setInterval(() => this.generateCurrentPrice(), 3600);
		}
	}
</script>


<style>
  .small {
    max-width: 600px;
    margin:  150px auto;
  }
</style>
