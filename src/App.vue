<template>
  <div id="app">
    <firstKW/>
    <TwoKW/>
  </div>
</template>

<script>
	import firstKW from './components/FirstKW'
	import TwoKW from './components/TwoKW'

	export default {
	  name: 'app',
	  components: {
	  	firstKW,
	  	TwoKW
	  },
	  data () {
	    return {
	    }
	  }
	}
</script>