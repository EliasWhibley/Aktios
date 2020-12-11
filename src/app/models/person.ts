//El country-id lo resolví en la clase mapeando los datos

export interface Persona {
    id: number,
    name: string,
    surname: string,
    surname2: string,
    sex: string,
    ['country-id']: number,
    phone: string,
    datebirthday: string,
    lastModification: string,
    country: string,

}