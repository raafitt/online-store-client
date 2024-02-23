import { $host, $authHost } from "./index";

export const createType=async(type)=>{
    const response=await $authHost.post('api/type',type)
    return response
}

export const fetchTypes=async()=>{
    const {data}=await $host.get('api/type')
    return data
}

export const fetchBrands=async()=>{
    const {data}=await $host.get('api/brand')
    return data
}

export const createBrand=async(brand)=>{
    const response=await $authHost.post('api/brand',brand)
    return response
}

export const fetchDevices=async()=>{
    const {data}=await $host.get(`api/device`)
    return data
}


export const fetchPageDevices=async(page, selectedTypeId, selectedBrandId)=>{
    const {data}=await $host.get(`api/device?page=${page}&&brandId=${selectedBrandId}&&typeId=${selectedTypeId}`)
    return data
}

export const fetchOneDevice=async(id)=>{
    const {data}=await $host.get('api/device/'+id)
    return data
}

export const createDevice=async(formData)=>{
    const response=await $authHost.post('api/device', formData)
    return response
}

export const destroy=async(idsToDestroy)=>{
    const response=await $authHost.delete('api/device', {
        params:{
            idsToDestroy:idsToDestroy
        }
    })
    return response
}

export const addDevice=async(user_id, device_id)=>{
    const response=await $authHost.post('api/user/basket',{user_id, device_id})
    return response
}

export const fetchBasketDevices=async(id)=>{
    const {data}=await $authHost.get('api/user/basket/'+id)
    return data
}

export const removeBasketDevices=async(idsToDestroy,userId)=>{
    const response=await $authHost.delete('api/user/basket',{
        params:{
            idsToDestroy:idsToDestroy,
            id:userId
        }
    })
}

export const removeTypes=async(idsToDestroy)=>{
    await $authHost.delete('api/type',{
        params:{
            idsToDestroy:idsToDestroy
        }
    })
}

export const searchDevices=async(query)=>{
    const {data}=await $host.get(`/api/device/search/autocomplete?query=${query}`)
    return data
}
