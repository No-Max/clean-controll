<template>
    <div id="app">
        <PoupUp />
		<Header />
		<content>
			<Points />
            <Map />
		</content>
        <Footer />
      	<Loading />
		<InfoModal />
        <CreatePoint />
        <EditPoint />
        <HistoryModal />
	</div>
</template>

<script>
import Loading from './components/Loading.vue'
import InfoModal from './components/InfoModal.vue'
import Header from './components/Header.vue'
import Points from './components/Points.vue'
import Map from './components/Map.vue'
import Footer from './components/Footer.vue'
import PoupUp from './components/PoupUp.vue'
import CreatePoint from './components/CreatePoint.vue'
import EditPoint from './components/EditPoint.vue'
import HistoryModal from './components/HistoryModal.vue'

export default {
    name: 'PestApp',
    components: {
        Loading,
        InfoModal,
        Header,
        Points,
        Map,
        Footer,
        PoupUp,
        CreatePoint,
        EditPoint,
        HistoryModal
    }
}
</script>
