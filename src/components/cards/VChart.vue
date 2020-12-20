<template>
    <div>
        <Chart type="bar" :data="basicData" />
    </div>
</template>


<script>
import Chart from 'primevue/chart';
import covidService from "../../services/covid.services";
import { mapGetters } from "vuex";
// import VIndicatorsTypesSelect from "../cards/VIndicators"

export default {
    name: "VChart",
    components: { Chart },
    data() {
        return {
            basicData: {},
        };
    },
    computed: {
        ...mapGetters({
            currentIndicator: "countries/currentIndicator",
        }),
    },
    mounted(){
        covidService.getHistoricalAll().then(res => {
            this.basicData = {
                    labels: Object.keys(res[`${this.currentIndicator.key}`]),
                    datasets: [
                        {
                            label: `${this.currentIndicator.label}`,
                            backgroundColor: '#42A5F5',
                            data: Object.values(res[`${this.currentIndicator.key}`]) 
                        },
                    ]
                }
            }
        );
    }
}
</script>

<style>

</style>