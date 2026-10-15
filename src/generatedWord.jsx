import { languages } from "../language"

export default function generator(){
    
    const selectedLnag = languages.map(val=>val.name)
    const splitLang= selectedLnag[Math.floor(Math.random() * 9)].split("")

    return splitLang
}