<template>
  <div id="app">
    <b-alert class="position-absolute m-4 bottom-0 right-0 z-index-99" v-model="alert.show" :variant="alert.variant" fade>
        {{ alert.message }}
      </b-alert>
    <b-container class="mt-4">
      <div class="mx-auto">
        <div class="d-flex justify-content-center rounded-lg overflow-hidden">
          <GmapMap
          :center="mapCenter"
          :zoom="12"
          map-type-id="terrain"
          class="map"
          @click="onMapClick"
        >
          <GmapMarker
            :position="marker"
            :clickable="true"
            :draggable="true"
          />
        </GmapMap>
        </div>
        <div class="text-right">
          <b-button 
          variant="success" 
          class="my-4 mr-0" 
          :disabled="!marker.byUser"
          @click="addCoordinate"
        >اضافه کردن مختصات</b-button>
        </div>
        <b-table 
          class="text-center cursor-pointer" 
          :fields="fields" 
          :items="coordinates" 
          @row-clicked="onRowClicked"
          striped
          hover
          show-empty>
            <template #head(#)>
              <span>ردیف</span>
            </template>
            <template #head(lat)>
              <span>عرض جغرافیایی</span>
            </template>
            <template #head(lng)>
              <span>طول جغرافیایی</span>
            </template>
            <template #head(action)>
              <span>عملیات</span>
            </template>
            <template #empty>
              <h5 class="m-0 p-3">هنوز هیچ مختصاتی اضافه نشده است!</h5>
            </template>
            <template  #cell(#)="row">
              {{row.index+1}}
            </template>
          <template  #cell(action)="row">
            <b-button variant="danger" size="sm" @click="deleteCoordinate(row)">
              حذف
            </b-button>
          </template>
        </b-table>
      </div>
    </b-container>
  </div>
</template>

<script>

export default {
  name: "App",
  data(){
    return{
      marker: {
        lat: 0,
        lng:0,
        byUser: false
      },
      mapCenter:{lat: 35.676263, lng: 51.381683},
      fields: ['#', 'lat', 'lng', 'action'],
      coordinates: [],
      alert: {
        show: false,
        message: '',
        variant: ''
      }
    }  
  },
  methods:{
    onMapClick(event){
      let coordinate = event.latLng.toJSON();
      this.marker = {
        lat: coordinate.lat,
        lng: coordinate.lng,
        byUser: true
      }
    },
    addCoordinate(){
      let newCoordinate = {
        lat: this.marker.lat,
        lng: this.marker.lng
      }
      if(this.checkDuplicate(newCoordinate)) {
        this.showError("امکان اضافه کردن مختصات تکراری وجود ندارد!", 'danger')
        return
      }
      this.coordinates.push(newCoordinate)
      this.showError('مختصات جدید با موفقیت به لیست اضافه شد.')
      this.marker.byUser = false
    },
    deleteCoordinate(row){
      if(this.coordinates[row.index].lat === this.marker.lat && this.coordinates[row.index].lng === this.marker.lng){
        this.marker = {
          lat: 0,
          lng: 0,
          byUser: false
        }
      }
      this.coordinates.splice(row.index, 1)
      this.showError('مختصات انتخاب شده با موفقیت حذف شد.')
    },
    onRowClicked(record){
      this.mapCenter = {
        lat: record.lat,
        lng: record.lng
      }
      this.marker = {
        lat: record.lat,
        lng: record.lng,
        byUser: false,
      }
    },
    checkDuplicate(newCoordinate){
      return this.coordinates.some(function(el) {
        return el.lat === newCoordinate.lat && el.lng === newCoordinate.lng;
      }); 
    },
    showError(message, variant = 'success'){
      this.alert = {
        show: true,
        message,
        variant
      }
      setTimeout(() => this.alert.show = false, 2000)
    }
  }
};
</script>



