<template>
<form>
    <label for="province">Select a province:</label><br>
    <select id="province" v-model="selectedProvince">
        <option value="">Select province</option>
        <option v-for="province in provinces" :key="province.province_id" :value="province.province_id">{{ province.province_name }}</option>
    </select><br>

    <label for="amphur">Select an amphur:</label><br>
    <select id="amphur" v-model="selectedAmphur">
        <option value="">Select amphur</option>
        <option v-for="amphur in filteredAmphurs" :key="amphur.amphur_id" :value="amphur.amphur_id">{{ amphur.amphur_name }}</option>
    </select><br>

    <label for="district">Select a district:</label><br>
    <select id="district" v-model="selectedDistrict">
        <option value="">Select district</option>
        <option v-for="district in filteredDistricts" :key="district.district_code" :value="district.district_code">{{ district.district_name }}</option>
    </select><br>

    <label for="zipcode">Enter a zipcode: {{zipcode}}</label><br>
    <input type="text" id="zipcode" v-model="zipcode">
</form>
</template>

  
<script>
export default {
    name: 'AddressForm',
    props: {
        name: {
            type: String,
            required: true
        }
    },
    data() {
        return {
            provinces: provinces,
            amphurs: amphurs,
            districts: districts,
            zipcodes: zipcodes,
            selectedProvince: '',
            selectedAmphur: '',
            selectedDistrict: '',
            zipcode: ''
        }
    },
    computed: {
        filteredAmphurs() {
            return this.amphurs.filter(amphur => amphur.province_id == this.selectedProvince);
        },
        filteredDistricts() {
            return this.districts.filter(district => district.amphur_id == this.selectedAmphur);
        },
        filteredZipCodes() {
            return this.zipcodes.filter(zipcode => zipcode.district_code == this.selectedDistrict);
        }
    },
    watch: {
        selectedDistrict: {
            handler(newValue) {
                const zipcode = this.zipcodes.find(zipcode => zipcode.district_code === newValue);
                this.zipcode = zipcode ? zipcode.zipcode_name : '';
            },
            deep: true
        }
    },
    methods: {
        submitForm() {
            // Emit the form data to the parent component
            this.$emit('form-submit', {
                name: this.name,
                data: {
                    selectedProvince: this.selectedProvince,
                    selectedAmphur: this.selectedAmphur,
                    selectedDistrict: this.selectedDistrict,
                    zipcode: this.zipcode
                }
            })
        }
    }
}
</script>
