import { ref, watch } from 'vue'

async function updateFormFields(provinceField, amphurField, districtField, postcodeField, provinces, amphurs, districts, postcodes, defaultProvince, defaultAmphur, defaultDistrict, defaultPostcode, arrangeByName) {
  watch(provinceField, async (provinceId) => {
    amphurField.value = []
    const amphursOptions = amphurs
      .filter(amphur => amphur.province_id === provinceId && !amphur.amphur_name.includes('*'))
      .map(amphur => ({
        id: amphur.amphur_id,
        name: amphur.amphur_name,
        postcode: amphur.amphur_code,
        geo_id: amphur.geo_id
      }))
    if (arrangeByName) {
      amphurField.value = amphursOptions.sort((a, b) => a.name.localeCompare(b.name))
    } else {
      amphurField.value = amphursOptions
    }
  })

  watch(amphurField, async (amphurId) => {
    districtField.value = []
    const districtsOptions = districts
      .filter(district => district.amphur_id === amphurId)
      .map(district => ({
        id: district.district_id,
        name: district.district_name,
        geo_id: district.geo_id
      }))
    if (arrangeByName) {
      districtField.value = districtsOptions.sort((a, b) => a.name.localeCompare(b.name))
    } else {
      districtField.value = districtsOptions
    }
    const postcode = postcodes.find(postcode => postcode.district_code === district.district_code)
    postcodeField.value = postcode ? postcode.zipcode_name : ''
  })
}
