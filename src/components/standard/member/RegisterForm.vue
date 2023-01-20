<script>
import StorageManager from '../../../utils/storage/Storage';

import provinces from '../../../master/province/provinces.json';
import amphurs from '../../../master/province/amphures.json';
import districts from '../../../master/province/districts.json';
import zipcodes from '../../../master/province/zipcodes.json';

import {
    prefix,
    education,
    exam_round,
    glyphosate,
    area_cert,
    get_receipt,
    type_receipt
} from "../../../master/data";

export default {
    name: 'LoginForm',
    components: {

    },
    data() {

        return {
            storage: new StorageManager("sessionStorage"),
            datareturn: '',
            loadingText: 'กำลังตรวจสอบข้อมูลบัญชี',

            // Master data of thailand
            provinces: provinces,
            amphurs: amphurs,
            districts: districts,
            zipcodes: zipcodes,

            // Contact Address
            no_contact: '',
            moo_contact: '',
            soi_contact: '',
            building_contact: '',
            road_contact: '',
            province_contact: '',
            district_contact: '',
            subdistrict_contact: '',
            zipcode_contact: '',

            // Shipping Address
            no_shipping: '',
            moo_shipping: '',
            soi_shipping: '',
            building_shipping: '',
            road_shipping: '',
            province_shipping: '',
            district_shipping: '',
            subdistrict_shipping: '',
            zipcode_shipping: '',

            // Corp Address
            id_corp: '',
            name_corp: '',
            no_corp: '',
            moo_corp: '',
            soi_corp: '',
            building_corp: '',
            road_corp: '',
            province_corp: '',
            district_corp: '',
            subdistrict_corp: '',
            zipcode_corp: '',

            // Contact Informayion

            prefix: prefix[0].code,
            prefixData: prefix,

            firstname: '',
            lastname: '',
            experience: '',

            citizen: '',
            phone: '',
            email: '',

            birthday: '',

            education: education[0].code,
            educationData: education,

            exam_round: '',
            exam_roundData: exam_round,

            glyphosate: '',
            glyphosateData: glyphosate,

            area_cert: '',
            area_certData: area_cert,

            get_receipt: '',
            get_receiptData: get_receipt,

            type_receipt: '',
            type_receiptData: type_receipt,
        }
    },
    methods: {
        setData(key) {
            const generateRandomNumber = () => Math.floor(Math.random() * 100) + 1;
            this.storage.set(key, generateRandomNumber());
        },
        removeData(key) {
            this.storage.remove(key);
        },
        getData(key) {

            (async () => {
                try {
                    this.datareturn = await this.storage.get(key);
                    console.log("datareturn", this.datareturn);
                } catch (error) {
                    console.error(error);
                }
            })();

        },
        onSuccess(response) {
            console.log('Success!', response.localId)
        },
        onError(error) {
            console.log('Error:', error)
        },
        submitForm(event) {
            this.$refs.formWrapper.submitForm(event)
        },
        async updateUserProfile(idToken,userId) {
            try {
                const authRoleAPI = await fetch("https://asia-southeast2-elearning-6871c.cloudfunctions.net/users/" + userId, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': 'Bearer ' + idToken
                    },
                    body: JSON.stringify({
                        'prefix': this.prefix,
                        'firstname': this.firstname,
                        'lastname': this.lastname,
                        'experience': this.experience,
                        'idToken': idToken,
                    })
                });
                const setRole = await authRoleAPI.json();
                return setRole;
            } catch (error) {
                console.log(error)
            }
        },
        async submitData() {
            try {

                // Add new user
                const registerAPI = await fetch("https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyDODKwE1BfZOj9ieB6pisJm-p2MmudWLSw", {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        email: this.email,
                        password: this.phone,
                    })
                });

                const register = await registerAPI.json();
                const status = await registerAPI.status;
                console.log("status", status);

                if (status == "200") { // Add User Success
                    console.log(register)

                    // Login To User Token
                    const resAPILogin = await fetch("https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyDODKwE1BfZOj9ieB6pisJm-p2MmudWLSw", {
                        method: 'POST',
                        headers: {'Content-Type': 'application/json'},
                        body: JSON.stringify({
                            email: this.email,
                            password: this.phone,
                            returnSecureToken: true,
                        })
                    });

                    const getLogin = await resAPILogin.json();
                    const status = resAPILogin.status;
                    console.log("resAPILogin", getLogin);

                    if (status == "200") { // Login Success
                        
                        // Update User Profile
                        const UserProfile = await fetch("https://asia-southeast2-elearning-6871c.cloudfunctions.net/users/" + getLogin.localId, {
                            method: 'POST',
                            headers: {'Content-Type': 'application/json','Authorization': 'Bearer ' + getLogin.idToken,},
                            body: JSON.stringify({
                                prefix: this.prefix,
                                firstname: this.firstname,
                                lastname: this.lastname,
                                experience: this.experience,
                            })
                        });
                        const status = UserProfile.status;
                        console.log("UserProfile", UserProfile);

                        if (status == "200") { // Edit Profile Success
                            const contactAddress = {
                                no_contact: this.no_contact,
                                moo_contact: this.moo_contact,
                                soi_contact: this.soi_contact,
                                building_contact: this.building_contact,
                                road_contact: this.road_contact,
                                province_contact: this.province_contact,
                                district_contact: this.district_contact,
                                subdistrict_contact: this.subdistrict_contact,
                                zipcode_contact: this.zipcode_contact,
                            }
                            const shippingAddress = {
                                no_shipping: this.no_shipping,
                                moo_shipping: this.moo_shipping,
                                soi_shipping: this.soi_shipping,
                                building_shipping: this.building_shipping,
                                road_shipping: this.road_shipping,
                                province_shipping: this.province_shipping,
                                district_shipping: this.district_shipping,
                                subdistrict_shipping: this.subdistrict_shipping,
                                zipcode_shipping: this.zipcode_shipping,
                            }
                            const taxAddress = {
                                id_corp: this.id_corp,
                                name_corp: this.name_corp,
                                no_corp: this.no_corp,
                                moo_corp: this.moo_corp,
                                soi_corp: this.soi_corp,
                                building_corp: this.building_corp,
                                road_corp: this.road_corp,
                                province_corp: this.province_corp,
                                district_corp: this.district_corp,
                                subdistrict_corp: this.subdistrict_corp,
                                zipcode_corp: this.zipcode_corp,
                            }
                            const prebuild = {
                                education: this.education,
                                exam_round: this.exam_round,
                                glyphosate: this.glyphosate,
                                area_cert: this.area_cert,
                                get_receipt: this.get_receipt,
                                type_receipt: this.type_receipt,
                                startc_ourse: this.startc_ourse,
                                start_pretest: this.start_pretest,
                                start_posttest: this.start_posttest,
                                start_score: this.start_score,
                                start_cert: this.start_cert,
                            }
                            // Create Bill
                            const userBill = await fetch("https://asia-southeast2-elearning-6871c.cloudfunctions.net/bills/", {
                                method: 'POST',
                                headers: {'Content-Type': 'application/json','Authorization': 'Bearer ' + getLogin.idToken,},
                                body: JSON.stringify({
                                    courseId: "L9AqQ2EOtu6oezcQr7tr",
                                    userId: getLogin.localId,
                                    email: this.email,
                                    phone: this.phone,
                                    status: 'pending',
                                    price: 700,
                                    contact: contactAddress,
                                    shipping: shippingAddress,
                                    tax: taxAddress,
                                    prebuild: prebuild,
                                })
                            });
                            const status = userBill.status;
                            console.log("userBill", userBill);

                            if (status == "200") { // Add User Bill Success

                                // Create Payment Transaction (API)
                                
                                // Redirect User to Dashboard

                            }
                        }
                    }

                } else {
                    console.log(register.error.message)
                }
                // Update User data

                // Create Bill

                // Connect Payment

                /*
                this.loading_sources = true
                const callApi = await fetch("https://asia-southeast2-elearning-6871c.cloudfunctions.net/" + this.endpoint + "/" + this.dataItem, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': 'Bearer ' + this.accessToken
                    },
                    body: JSON.stringify({
                        "name": this.name,
                    })
                });
                const finalRes = await callApi.json();

                if (finalRes.success) {
                    this.loading_sources = false
                    this.$swal({
                        title: "บันทึกข้อมูลเรียบร้อยแล้ว ?",
                        text: "คุณต้องการที่จะดำเนินการอย่างไร !",
                        type: "success",
                        showCancelButton: true,
                        confirmButtonColor: "#0054b4",
                        confirmButtonText: "กลับไปหน้าหลัก",
                        cancelButtonText: "รีเฟรซหน้านี้",
                        closeOnConfirm: false,
                        closeOnCancel: false
                    }).then((confirmed) => {
                        if (confirmed.isConfirmed) {
                            console.log("Home");
                            window.location.href = "/lesson/detail/" + this.dataItem
                        } else {
                            console.log("New");
                            window.location.reload();
                        }
                    });
                }
                */
            } catch (error) {
                console.log(error)
            }
        },
    },
    computed: {
        // Contact Address
        filteredAmphurs() {
            return this.amphurs.filter(amphur => amphur.province_id == this.province_contact);
        },
        filteredDistricts() {
            return this.districts.filter(district => district.amphur_id == this.district_contact);
        },
        filteredZipCodes() {
            return this.zipcodes.filter(zipcode => zipcode.district_code == this.subdistrict_contact);
        },

        // Shipping Address
        filteredAmphurs_shipping() {
            return this.amphurs.filter(amphur => amphur.province_id == this.province_shipping);
        },
        filteredDistricts_shipping() {
            return this.districts.filter(district => district.amphur_id == this.district_shipping);
        },
        filteredZipCodes_shipping() {
            return this.zipcodes.filter(zipcode => zipcode.district_code == this.subdistrict_shipping);
        },

        // Corp Address
        filteredAmphurs_corp() {
            return this.amphurs.filter(amphur => amphur.province_id == this.province_corp);
        },
        filteredDistricts_corp() {
            return this.districts.filter(district => district.amphur_id == this.district_corp);
        },
        filteredZipCodes_corp() {
            return this.zipcodes.filter(zipcode => zipcode.district_code == this.subdistrict_corp);
        }
    },
    mounted() {
        this.province_contact = this.provinces[0].province_id;
        this.province_shipping = this.provinces[0].province_id;
        this.province_corp = this.provinces[0].province_id;
    },
    watch: {
        // Contact
        subdistrict_contact: {
            handler(newValue) {
                const zipcode = this.zipcodes.find(zipcode => zipcode.district_code === newValue);
                this.zipcode_contact = zipcode ? zipcode.zipcode_name : '';
            },
            deep: true
        },
        province_contact: {
            handler(newValue) {
                const district = this.amphurs.filter(amphur => amphur.province_id === newValue);
                this.district_contact = district[0].amphur_id;
            },
            deep: true
        },
        district_contact: {
            handler(newValue) {
                const subdistrict = this.districts.filter(districts => districts.amphur_id === newValue);
                this.subdistrict_contact = subdistrict[0].district_code;
            },
            deep: true
        },
        // Shipping
        subdistrict_shipping: {
            handler(newValue) {
                const zipcode = this.zipcodes.find(zipcode => zipcode.district_code === newValue);
                this.zipcode_shipping = zipcode ? zipcode.zipcode_name : '';
            },
            deep: true
        },
        province_shipping: {
            handler(newValue) {
                const district = this.amphurs.filter(amphur => amphur.province_id === newValue);
                this.district_shipping = district[0].amphur_id;
            },
            deep: true
        },
        district_shipping: {
            handler(newValue) {
                const subdistrict = this.districts.filter(districts => districts.amphur_id === newValue);
                this.subdistrict_shipping = subdistrict[0].district_code;
            },
            deep: true
        },
        // Corp
        subdistrict_corp: {
            handler(newValue) {
                const zipcode = this.zipcodes.find(zipcode => zipcode.district_code === newValue);
                this.zipcode_corp = zipcode ? zipcode.zipcode_name : '';
            },
            deep: true
        },
        province_corp: {
            handler(newValue) {
                const district = this.amphurs.filter(amphur => amphur.province_id === newValue);
                this.district_corp = district[0].amphur_id;
            },
            deep: true
        },
        district_corp: {
            handler(newValue) {
                const subdistrict = this.districts.filter(districts => districts.amphur_id === newValue);
                this.subdistrict_corp = subdistrict[0].district_code;
            },
            deep: true
        }
    }
}
</script>

<template>
<!-- Section 1 -->
<section class="w-full px-2 py-10 bg-gray-100 xl:px-8">
    <div class="max-w-5xl mx-auto">
        <div class="lg:grid lg:grid-cols-12 lg:gap-x-5">

            <div class="space-y-6 sm:px-6 lg:col-span-12 lg:px-0">

                <div class="relative">
                    <h2 class="text-center text-3xl font-bold leading-8 tracking-tight text-gray-900 sm:text-4xl">หลักสูตรผู้ควบคุมการการขายวัตถุอันตรายทางการเกษตร</h2>
                    <p class="mx-auto mt-4 max-w-3xl text-center text-xl text-gray-500">รุ่นที่ 1 ระหว่างวันที่ 9 - 23 มกราคม 2566</p>
                </div>

                <div class="shadow sm:overflow-hidden sm:rounded-md">
                    <div class="space-y-6 bg-white py-6 px-4 sm:p-6">
                        <div>
                            <h2 class="text-lg font-semibold leading-8 tracking-tight text-indigo-600">รายละเอียดหลักสูตร</h2>
                            <p class="mt-3 text-base leading-7 text-gray-600">สภาอุตสาหกรรมแห่งประเทศไทย โดย FTI Academy ร่วมกับกรมวิชาการเกษตร ได้จัดอบรมหลักสูตรผู้ควบคุมการการขายวัตถุอันตรายทางการเกษตร เพื่อช่วยเหลือผู้อบรมในช่วงสถานการณ์การแพร่ระบาดของโรคติดเชื้อไวรัสโคโรนา 2019 (COVID-19) ที่ยังแพร่ระบาดอยู่อย่างต่อเนื่องในหลายจังหวัด สภาอุตสาหกรรมฯ ได้ตระหนักถึงปัจจัยความปลอดภัยต่อสุขภาพของผู้อบรมเป็นอย่างดี จึงได้ดำเนินการจัดทำโครงการจัดอบรมแบบออนไลน์ (Online) แก่กรมวิชาการเกษตร เพื่อสามารถเผยแพร่ความรู้ให้กับผู้มีวัตถุอันตรายชนิดที่ 2 หรือ ชนิดที่ 3 ไว้ในครอบครองเพื่อขายในประเทศ และเป็นการช่วยเหลือกลุ่มอุตสาหกรรมทางการเกษตรของประเทศ</p>
                        </div>
                        <div>
                            <h2 class="text-lg font-semibold leading-8 tracking-tight text-indigo-600">วัตถุประสงค์</h2>
                            <p class="mt-3 text-base leading-7 text-gray-600">1.เพื่อพัฒนาบุคลากรในกลุ่มอุตสาหกรรมทางการเกษตรของประเทศให้มีขีดความสามารถในการทำงาน และได้รับความรู้ที่ถูกต้องในการมีไว้ครอบครองซึ่งวัตถุอันตรายทางการเกษตร
                                <br>2.เพื่อผู้อบรมสามารถเข้าถึงองค์ความรู้ที่ถูกต้องได้สะดวกมากยิ่งขึ้น ผ่านรูปแบบออนไลน์ (Online) และเพื่อลดความเสี่ยงในการเดินทางช่วงสถานการณ์การแพร่ระบาดของโรคติดเชื้อไวรัสโคโรนา 2019 (COVID-19) ที่ยังแพร่ระบาดอยู่</p>
                        </div>
                        <div>
                            <h2 class="text-lg font-semibold leading-8 tracking-tight text-indigo-600">อัตราค่าบริการ</h2>
                            <p class="mt-3 text-base leading-7 text-gray-600">ราคาท่านละ 700 (รวม Vat 7% แล้ว)<br>
                                ราคานี้รวมค่าจัดส่งหนังสือคู่มือการอบรมทางไปรษณีย์แล้ว</p>
                        </div>
                    </div>
                </div>

                <form @submit.prevent="submitData">

                    <div class="shadow sm:overflow-hidden sm:rounded-md">
                        <div class="space-y-6 bg-white py-6 px-4 sm:p-6">

                            <div class="pb-5 border-b">
                                <h3 class="text-lg font-bold leading-6 text-indigo-600">ข้อมูลส่วนตัว</h3>
                                <p class="mt-1 text-sm text-gray-500">This information will be displayed publicly so be careful what you share.</p>
                            </div>

                            <div class="grid grid-cols-10 gap-6">
                                <div class="col-span-6 sm:col-span-2">
                                    <label for="prefix" class="block text-sm font-medium text-gray-700">คำนำหน้า*</label>
                                    <select v-model="prefix" id="prefix" name="prefix" class="mt-1 block w-full rounded-md border-gray-300 py-2 pl-3 pr-10 text-base focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm">
                                        <option v-for="prefixItem in prefixData" :key="prefixItem.code" :value="prefixItem.code">{{ prefixItem.name }}</option>
                                    </select>
                                </div>

                                <div class="col-span-6 sm:col-span-4">
                                    <label for="firstname" class="block text-sm font-medium text-gray-700">ชื่อจริง*</label>
                                    <input v-model="firstname" type="text" name="firstname" id="firstname" autocomplete="firstname" class="mt-1 block w-full rounded-md border border-gray-300 py-2 px-3 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm">
                                </div>

                                <div class="col-span-6 sm:col-span-4">
                                    <label for="lastname" class="block text-sm font-medium text-gray-700">นามสกุลจริง*</label>
                                    <input v-model="lastname" type="text" name="lastname" id="lastname" autocomplete="lastname" class="mt-1 block w-full rounded-md border border-gray-300 py-2 px-3 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm">
                                </div>

                            </div>

                            <div class="grid grid-cols-6 gap-6">
                                <div class="col-span-6 sm:col-span-2">
                                    <label for="education" class="block text-sm font-medium text-gray-700">วุฒิการศึกษา*</label>
                                    <select v-model="education" id="education" name="education" class="mt-1 block w-full rounded-md border-gray-300 py-2 pl-3 pr-10 text-base focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm">
                                        <option v-for="educationItem in educationData" :key="educationItem.code" :value="educationItem.code">{{ educationItem.name }}</option>
                                    </select>
                                </div>

                                <div class="col-span-6 sm:col-span-2">
                                    <label for="birthday" class="block text-sm font-medium text-gray-700">วัน/เดือน/ปี เกิด*</label>
                                    <input v-model="birthday" type="text" name="birthday" id="birthday" autocomplete="birthday" class="mt-1 block w-full rounded-md border border-gray-300 py-2 px-3 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm">
                                </div>

                                <div class="col-span-6 sm:col-span-2">
                                    <label for="experience" class="block text-sm font-medium text-gray-700">ท่านมีประสบการณ์ในการอบรมมาแล้วกี่ปี*</label>
                                    <input v-model="experience" type="text" name="experience" id="experience" autocomplete="experience" class="mt-1 block w-full rounded-md border border-gray-300 py-2 px-3 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm">
                                </div>

                            </div>

                            <div class="pt-5 pb-5 border-b">
                                <h3 class="text-lg font-bold leading-6 text-indigo-600">ข้อมูลบัญชี</h3>
                                <p class="mt-1 text-sm text-gray-500">This information will be displayed publicly so be careful what you share.</p>
                            </div>

                            <div class="grid grid-cols-6 gap-6">
                                <div class="col-span-6 sm:col-span-6">
                                    <label for="citizen" class="block text-sm font-medium text-gray-700">หมายเลขบัตรประจำตัวประชาชน*</label>
                                    <input v-model="citizen" type="text" name="citizen" id="citizen" autocomplete="citizen" class="mt-1 block w-full rounded-md border border-gray-300 py-2 px-3 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm">
                                </div>

                                <div class="col-span-6 sm:col-span-3">
                                    <label for="phone" class="block text-sm font-medium text-gray-700">เบอร์โทร*</label>
                                    <input v-model="phone" type="text" name="phone" id="phone" autocomplete="phone" class="mt-1 block w-full rounded-md border border-gray-300 py-2 px-3 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm">
                                </div>

                                <div class="col-span-6 sm:col-span-3">
                                    <label for="email" class="block text-sm font-medium text-gray-700">อีเมล*</label>
                                    <input v-model="email" type="text" name="email" id="email" autocomplete="email" class="mt-1 block w-full rounded-md border border-gray-300 py-2 px-3 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm">
                                </div>

                            </div>

                            <div class="pt-5 pb-5 border-b">
                                <h3 class="text-lg font-bold leading-6 text-indigo-600">ที่อยู่ (ที่สามารถติดต่อได้และจัดส่งหนังสือ)</h3>
                                <p class="mt-1 text-sm text-gray-500">This information will be displayed publicly so be careful what you share.</p>
                            </div>

                            <div class="grid grid-cols-6 gap-6">
                                <div class="col-span-6 sm:col-span-2">
                                    <label for="no_contact" class="block text-sm font-medium text-gray-700">เลขที่*</label>
                                    <input v-model="no_contact" type="text" name="no_contact" id="no_contact" autocomplete="no_contact" class="mt-1 block w-full rounded-md border border-gray-300 py-2 px-3 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm">
                                </div>
                                <div class="col-span-6 sm:col-span-2">
                                    <label for="moo_contact" class="block text-sm font-medium text-gray-700">หมู่ที่*</label>
                                    <input v-model="moo_contact" type="text" name="moo_contact" id="moo_contact" autocomplete="moo_contact" class="mt-1 block w-full rounded-md border border-gray-300 py-2 px-3 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm">
                                </div>
                                <div class="col-span-6 sm:col-span-2">
                                    <label for="soi_contact" class="block text-sm font-medium text-gray-700">ซอย*</label>
                                    <input v-model="soi_contact" type="text" name="soi_contact" id="soi_contact" autocomplete="soi_contact" class="mt-1 block w-full rounded-md border border-gray-300 py-2 px-3 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm">
                                </div>
                            </div>

                            <div class="grid grid-cols-6 gap-6">
                                <div class="col-span-6 sm:col-span-2">
                                    <label for="building_contact" class="block text-sm font-medium text-gray-700">อาคาร/ตึก/หมู่บ้าน/โครงการ*</label>
                                    <input v-model="building_contact" type="text" name="building_contact" id="building_contact" autocomplete="building_contact" class="mt-1 block w-full rounded-md border border-gray-300 py-2 px-3 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm">
                                </div>
                                <div class="col-span-6 sm:col-span-2">
                                    <label for="road_contact" class="block text-sm font-medium text-gray-700">ถนน*</label>
                                    <input v-model="road_contact" type="text" name="road_contact" id="road_contact" autocomplete="road_contact" class="mt-1 block w-full rounded-md border border-gray-300 py-2 px-3 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm">
                                </div>
                            </div>

                            <div class="grid grid-cols-6 gap-6">
                                <div class="col-span-6 sm:col-span-3">
                                    <label for="province_contact" class="block text-sm font-medium text-gray-700">จังหวัด*</label>
                                    <select v-model="province_contact" id="province_contact" name="province_contact" class="mt-1 block w-full rounded-md border-gray-300 py-2 pl-3 pr-10 text-base focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm">
                                        <option v-for="province in provinces" :key="province.province_id" :value="province.province_id">{{ province.province_name }}</option>
                                    </select>
                                </div>
                                <div class="col-span-6 sm:col-span-3">
                                    <label for="district_contact" class="block text-sm font-medium text-gray-700">อำเภอ*</label>
                                    <select v-model="district_contact" id="district_contact" name="district_contact" class="mt-1 block w-full rounded-md border-gray-300 py-2 pl-3 pr-10 text-base focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm">
                                        <option v-for="amphur in filteredAmphurs" :key="amphur.amphur_id" :value="amphur.amphur_id">{{ amphur.amphur_name }}</option>
                                    </select>
                                </div>
                            </div>

                            <div class="grid grid-cols-6 gap-6">
                                <div class="col-span-6 sm:col-span-3">
                                    <label for="subdistrict_contact" class="block text-sm font-medium text-gray-700">ตำบล*</label>
                                    <select v-model="subdistrict_contact" id="subdistrict_contact" name="subdistrict_contact" class="mt-1 block w-full rounded-md border-gray-300 py-2 pl-3 pr-10 text-base focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm">
                                        <option v-for="district in filteredDistricts" :key="district.district_code" :value="district.district_code">{{ district.district_name }}</option>
                                    </select>
                                </div>
                                <div class="col-span-6 sm:col-span-3">
                                    <label for="zipcode_contact" class="block text-sm font-medium text-gray-700">รหัสไปรษณีย์*</label>
                                    <input v-model="zipcode_contact" type="text" name="zipcode_contact" id="zipcode_contact" autocomplete="zipcode_contact" class="mt-1 block w-full rounded-md border border-gray-300 py-2 px-3 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm">
                                </div>
                            </div>

                            <div class="pt-5 pb-5 border-b">
                                <h3 class="text-lg font-bold leading-6 text-indigo-600">ที่อยู่ (สำหรับออกใบเสร็จรับเงิน)</h3>
                                <p class="mt-1 text-sm text-gray-500">This information will be displayed publicly so be careful what you share.</p>
                            </div>

                            <div class="grid grid-cols-6 gap-6">
                                <div class="col-span-6 sm:col-span-2">
                                    <label for="no_shipping" class="block text-sm font-medium text-gray-700">เลขที่*</label>
                                    <input v-model="no_shipping" type="text" name="no_shipping" id="no_shipping" autocomplete="no_shipping" class="mt-1 block w-full rounded-md border border-gray-300 py-2 px-3 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm">
                                </div>
                                <div class="col-span-6 sm:col-span-2">
                                    <label for="moo_shipping" class="block text-sm font-medium text-gray-700">หมู่ที่*</label>
                                    <input v-model="moo_shipping" type="text" name="moo_shipping" id="moo_shipping" autocomplete="moo_shipping" class="mt-1 block w-full rounded-md border border-gray-300 py-2 px-3 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm">
                                </div>
                                <div class="col-span-6 sm:col-span-2">
                                    <label for="soi_shipping" class="block text-sm font-medium text-gray-700">ซอย*</label>
                                    <input v-model="soi_shipping" type="text" name="soi_shipping" id="soi_shipping" autocomplete="soi_shipping" class="mt-1 block w-full rounded-md border border-gray-300 py-2 px-3 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm">
                                </div>
                            </div>

                            <div class="grid grid-cols-6 gap-6">
                                <div class="col-span-6 sm:col-span-2">
                                    <label for="building_shipping" class="block text-sm font-medium text-gray-700">อาคาร/ตึก/หมู่บ้าน/โครงการ*</label>
                                    <input v-model="building_shipping" type="text" name="building_shipping" id="building_shipping" autocomplete="building_shipping" class="mt-1 block w-full rounded-md border border-gray-300 py-2 px-3 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm">
                                </div>
                                <div class="col-span-6 sm:col-span-2">
                                    <label for="road_shipping" class="block text-sm font-medium text-gray-700">ถนน*</label>
                                    <input v-model="road_shipping" type="text" name="road_shipping" id="road_shipping" autocomplete="road_shipping" class="mt-1 block w-full rounded-md border border-gray-300 py-2 px-3 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm">
                                </div>
                            </div>

                            <div class="grid grid-cols-6 gap-6">
                                <div class="col-span-6 sm:col-span-3">
                                    <label for="province_shipping" class="block text-sm font-medium text-gray-700">จังหวัด*</label>
                                    <select v-model="province_shipping" id="province_shipping" name="province_shipping" class="mt-1 block w-full rounded-md border-gray-300 py-2 pl-3 pr-10 text-base focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm">
                                        <option v-for="province in provinces" :key="province.province_id" :value="province.province_id">{{ province.province_name }}</option>
                                    </select>
                                </div>
                                <div class="col-span-6 sm:col-span-3">
                                    <label for="district_shipping" class="block text-sm font-medium text-gray-700">อำเภอ*</label>
                                    <select v-model="district_shipping" id="district_shipping" name="district_shipping" class="mt-1 block w-full rounded-md border-gray-300 py-2 pl-3 pr-10 text-base focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm">
                                        <option v-for="amphur in filteredAmphurs_shipping" :key="amphur.amphur_id" :value="amphur.amphur_id">{{ amphur.amphur_name }}</option>
                                    </select>
                                </div>
                            </div>

                            <div class="grid grid-cols-6 gap-6">
                                <div class="col-span-6 sm:col-span-3">
                                    <label for="subdistrict_shipping" class="block text-sm font-medium text-gray-700">ตำบล*</label>
                                    <select v-model="subdistrict_shipping" id="subdistrict_shipping" name="subdistrict_shipping" class="mt-1 block w-full rounded-md border-gray-300 py-2 pl-3 pr-10 text-base focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm">
                                        <option v-for="district in filteredDistricts_shipping" :key="district.district_code" :value="district.district_code">{{ district.district_name }}</option>
                                    </select>
                                </div>
                                <div class="col-span-6 sm:col-span-3">
                                    <label for="zipcode_shipping" class="block text-sm font-medium text-gray-700">รหัสไปรษณีย์*</label>
                                    <input v-model="zipcode_shipping" type="text" name="zipcode_shipping" id="zipcode_shipping" autocomplete="given-name" class="mt-1 block w-full rounded-md border border-gray-300 py-2 px-3 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm">
                                </div>
                            </div>

                        </div>
                    </div>

                    <div class="shadow sm:overflow-hidden sm:rounded-md mt-8">
                        <div class="space-y-6 bg-white py-6 px-4 sm:p-6">

                            <fieldset class="mt-3 pb-5 border-b">
                                <legend class="text-base font-bold text-indigo-600">เลือกวันที่ทำข้อสอบ</legend>
                                <p class="text-sm text-gray-500">หมายเหตุ :<br>
                                    - ต้องทำแบบทดสอบก่อนเรียน<br>
                                    - ต้องอบรมครบ 13 บท จำนวน 13 ชั่วโมง</p>
                                <div class="mt-4 space-y-4">

                                    <div v-for="examItem in exam_roundData" :key="examItem.code" :value="examItem.code" class="flex items-center">
                                        <input :value="examItem.code" v-model="exam_round" :id="examItem.code" type="radio" class="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-500">
                                        <label :for="examItem.code" class="ml-3">
                                            <span class="block text-sm font-medium text-gray-700"><strong>{{examItem.name}}</strong><br>{{examItem.detail}}</span>
                                        </label>
                                    </div>

                                </div>
                            </fieldset>

                            <fieldset class="mt-3 pb-5 border-b">
                                <legend class="text-base font-bold text-indigo-600">ใบประกาศนียบัตรที่ผ่านการอบรม (มีอายุ 5 ปี)</legend>
                                <p class="text-sm text-gray-500">หมายเหตุ : ตรวจสอบข้อมูลการดำเนินการเกี่ยวกับวัตถุอันตราย เพื่อเลือกประเภท /อายุใบประกาศ</p>
                                <div class="mt-4 space-y-4">

                                    <div v-for="glyphosateItem in glyphosateData" :key="glyphosateItem.code" :value="glyphosateItem.code" class="flex items-center">
                                        <input :value="glyphosateItem.code" v-model="glyphosate" :id="glyphosateItem.code" type="radio" class="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-500">
                                        <label :for="glyphosateItem.code" class="ml-3">
                                            <span class="block text-sm font-medium text-gray-700"><strong>{{glyphosateItem.name}}</strong></span>
                                        </label>
                                    </div>

                                </div>
                            </fieldset>

                            <fieldset class="mt-3 pb-5 border-b">
                                <legend class="text-base font-bold text-indigo-600">ท่านนำใบประกาศนียบัตรที่ผ่านการอบรมไปขอใบอนุญาตครอบครองในพื้นที่เขตใด</legend>
                                <div class="mt-4 space-y-4">

                                    <div v-for="area_certItem in area_certData" :key="area_certItem.code" :value="area_certItem.code" class="flex items-center">
                                        <input :value="area_certItem.code" v-model="area_cert" :id="area_certItem.code" type="radio" class="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-500">
                                        <label :for="area_certItem.code" class="ml-3">
                                            <span class="block text-sm font-medium text-gray-700"><strong>{{area_certItem.name}}</strong><br>{{area_certItem.detail}}</span>
                                        </label>
                                    </div>

                                </div>
                            </fieldset>

                            <fieldset class="mt-3 pb-5 border-b">
                                <legend class="text-base font-bold text-indigo-600">เลือกวิธีการรับเอกสาร</legend>
                                <div class="mt-4 space-y-4">

                                    <div v-for="get_receiptItem in get_receiptData" :key="get_receiptItem.code" :value="get_receiptItem.code" class="flex items-center">
                                        <input :value="get_receiptItem.code" v-model="get_receipt" :id="get_receiptItem.code" type="radio" class="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-500">
                                        <label :for="get_receiptItem.code" class="ml-3">
                                            <span class="block text-sm font-medium text-gray-700"><strong>{{get_receiptItem.name}}</strong><br>{{get_receiptItem.detail}}</span>
                                        </label>
                                    </div>

                                </div>
                            </fieldset>

                            <fieldset class="mt-3 pb-5">
                                <legend class="text-base font-bold text-indigo-600">เลือกประเภทในการออกใบเสร็จรับเงิน/ใบกำกับภาษี</legend>
                                <div class="mt-4 space-y-4">

                                    <div v-for="type_receiptItem in type_receiptData" :key="type_receiptItem.code" :value="type_receiptItem.code" class="flex items-center">
                                        <input :value="type_receiptItem.code" v-model="type_receipt" :id="type_receiptItem.code" type="radio" class="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-500">
                                        <label :for="type_receiptItem.code" class="ml-3">
                                            <span class="block text-sm font-medium text-gray-700"><strong>{{type_receiptItem.name}}</strong><br>{{type_receiptItem.detail}}</span>
                                        </label>
                                    </div>

                                </div>
                            </fieldset>

                            <template v-if="this.type_receipt==='corp'">
                                <div class="pt-5 pb-5 border-b">
                                    <h3 class="text-lg font-bold leading-6 text-indigo-600">ที่อยู่ (สำหรับนิติบุคคล)</h3>
                                    <p class="mt-1 text-sm text-gray-500">This information will be displayed publicly so be careful what you share.</p>
                                </div>

                                <div class="grid grid-cols-6 gap-6">
                                    <div class="col-span-6 sm:col-span-3">
                                        <label for="id_corp" class="block text-sm font-medium text-gray-700">หมายเลขประจำตัวผู้เสียภาษี*</label>
                                        <input v-model="id_corp" type="text" name="id_corp" id="id_corp" autocomplete="id_corp" class="mt-1 block w-full rounded-md border border-gray-300 py-2 px-3 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm">
                                    </div>
                                    <div class="col-span-6 sm:col-span-3">
                                        <label for="name_corp" class="block text-sm font-medium text-gray-700">ชื่อนิติบุคคล*</label>
                                        <input v-model="name_corp" type="text" name="name_corp" id="name_corp" autocomplete="name_corp" class="mt-1 block w-full rounded-md border border-gray-300 py-2 px-3 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm">
                                    </div>
                                </div>

                                <div class="grid grid-cols-6 gap-6">
                                    <div class="col-span-6 sm:col-span-2">
                                        <label for="no_corp" class="block text-sm font-medium text-gray-700">เลขที่*</label>
                                        <input v-model="no_corp" type="text" name="no_corp" id="no_corp" autocomplete="no_corp" class="mt-1 block w-full rounded-md border border-gray-300 py-2 px-3 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm">
                                    </div>
                                    <div class="col-span-6 sm:col-span-2">
                                        <label for="moo_corp" class="block text-sm font-medium text-gray-700">หมู่ที่*</label>
                                        <input v-model="moo_corp" type="text" name="moo_corp" id="moo_corp" autocomplete="moo_corp" class="mt-1 block w-full rounded-md border border-gray-300 py-2 px-3 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm">
                                    </div>
                                    <div class="col-span-6 sm:col-span-2">
                                        <label for="soi_corp" class="block text-sm font-medium text-gray-700">ซอย*</label>
                                        <input v-model="soi_corp" type="text" name="soi_corp" id="soi_corp" autocomplete="soi_shipping" class="mt-1 block w-full rounded-md border border-gray-300 py-2 px-3 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm">
                                    </div>
                                </div>

                                <div class="grid grid-cols-6 gap-6">
                                    <div class="col-span-6 sm:col-span-2">
                                        <label for="building_corp" class="block text-sm font-medium text-gray-700">อาคาร/ตึก/หมู่บ้าน/โครงการ*</label>
                                        <input v-model="building_corp" type="text" name="building_corp" id="building_corp" autocomplete="building_corp" class="mt-1 block w-full rounded-md border border-gray-300 py-2 px-3 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm">
                                    </div>
                                    <div class="col-span-6 sm:col-span-2">
                                        <label for="road_corp" class="block text-sm font-medium text-gray-700">ถนน*</label>
                                        <input v-model="road_corp" type="text" name="road_corp" id="road_corp" autocomplete="road_corp" class="mt-1 block w-full rounded-md border border-gray-300 py-2 px-3 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm">
                                    </div>
                                </div>

                                <div class="grid grid-cols-6 gap-6">
                                    <div class="col-span-6 sm:col-span-3">
                                        <label for="province_corp" class="block text-sm font-medium text-gray-700">จังหวัด*</label>
                                        <select v-model="province_corp" id="province_corp" name="province_corp" class="mt-1 block w-full rounded-md border-gray-300 py-2 pl-3 pr-10 text-base focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm">
                                            <option v-for="province in provinces" :key="province.province_id" :value="province.province_id">{{ province.province_name }}</option>
                                        </select>
                                    </div>
                                    <div class="col-span-6 sm:col-span-3">
                                        <label for="district_corp" class="block text-sm font-medium text-gray-700">อำเภอ*</label>
                                        <select v-model="district_corp" id="district_corp" name="district_corp" class="mt-1 block w-full rounded-md border-gray-300 py-2 pl-3 pr-10 text-base focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm">
                                            <option v-for="amphur in filteredAmphurs_corp" :key="amphur.amphur_id" :value="amphur.amphur_id">{{ amphur.amphur_name }}</option>
                                        </select>
                                    </div>
                                </div>

                                <div class="grid grid-cols-6 gap-6">
                                    <div class="col-span-6 sm:col-span-3">
                                        <label for="subdistrict_corp" class="block text-sm font-medium text-gray-700">ตำบล*</label>
                                        <select v-model="subdistrict_corp" id="subdistrict_corp" name="subdistrict_corp" class="mt-1 block w-full rounded-md border-gray-300 py-2 pl-3 pr-10 text-base focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm">
                                            <option v-for="district in filteredDistricts_corp" :key="district.district_code" :value="district.district_code">{{ district.district_name }}</option>
                                        </select>
                                    </div>
                                    <div class="col-span-6 sm:col-span-3">
                                        <label for="zipcode_corp" class="block text-sm font-medium text-gray-700">รหัสไปรษณีย์*</label>
                                        <input v-model="zipcode_corp" type="text" name="zipcode_corp" id="zipcode_corp" autocomplete="given-name" class="mt-1 block w-full rounded-md border border-gray-300 py-2 px-3 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm">
                                    </div>
                                </div>

                            </template>

                        </div>
                        <div class="bg-gray-50 px-4 py-3 text-right sm:px-6">
                            <button type="submit" class="inline-flex justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:ring-offset-2">ลงทะเบียนหลักสูตร</button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    </div>
</section>
</template>
