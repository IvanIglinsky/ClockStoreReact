import {$authHost , $host} from "./index";

export const createType = async ( type ) => {
    const { data } = await $authHost.post ( 'api/type' , type );
    return data;
};

export const fetchTypes = async () => {
    const { data } = await $host.get ( 'api/type' );
    return data;
};

export const createBrand = async ( brand ) => {
    const { data } = await $authHost.post ( 'api/brand' , brand );
    return data;
};

export const fetchBrands = async () => {
    const { data } = await $host.get ( 'api/brand' );
    return data;
};

export const createDevice = async ( device ) => {
    const { data } = await $authHost.post ( 'api/device' , device );
    return data;
};

export const fetchDevices = async ( typeId , brandId , page , limit = 5 ) => {
    const { data } = await $host.get ( 'api/device' , {
        params : { typeId , brandId , page , limit }
    } );
    return data;
};

export const updateDeviceRating = async ( deviceId , rating ) => {
    const { data } = await $authHost.put ( `api/device/${deviceId}/rating` , { rating } );
    return data;
};

export const fetchOneDevice = async ( id ) => {
    const { data } = await $host.get ( `api/device/${id}`  );
    return data;
};
export const addToBasket = async ( deviceId ) => {
    const { data } = await $host.post ( 'api/basket' , { deviceId } );
    return data;
};

export const removeFromBasket = async ( basketDeviceId ) => {
    const { data } = await $host.delete ( `api/basket/${basketDeviceId}` );
    return data;
};

export const deleteBrand = async ( name ) => {
    const {data}=await $host.get(`api/brand/${name}`);
    await $host.delete(`api/brand/${data.id}`)
    return data;
}
export const deleteType = async ( name ) => {
    const {data}=await $host.get(`api/type/${name}`);
    await $host.delete(`api/type/${data.id}`)
    return data;
}

export const deleteDevice = async ( id ) => {
    const { data } = await $host.delete ( `api/device/${id}` );
    return data;
}
export const fetchAllBasket = async ()=>{
    const {data}=await $host.get(`api/basket`);
    return data;
}
export const fetchOneBasket=async (id)=>{
    const {data}=await $host.get(`api/basket/${id}`)
    return data;
}
export const fetchOneDeviceByName=async (name)=>{
    const {data}=await $host.get(`api/device/?name=${name}`);
    return data;
}
export const fetchAlldevice=async ()=>{
    const {data}=await $host.get(`api/device`)
    return data;
}