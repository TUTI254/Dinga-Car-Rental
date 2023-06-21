'use client'; 

import {SearchManufacturer} from "./"
import React,{ useState} from "react"
import Image from "next/image"
import { manufacturers } from '../constants/index';
import {  useRouter } from "next/navigation";

const SearchButton = ({otherClasses}:{otherClasses:string}) => {
  return (
    <button type="submit" className={`-ml-3 z-10 ${otherClasses}`}>
      <Image src="/magnifying-glass.svg" alt="magnifying-glass" width={40} height={40} className="object-contain"/>
    </button>
  )
}

const SearchBar= ()=> {
  const [manufacturer , setManufacturer] = useState<string>("");
  const [model , setModel] = useState<string>("");
  const router = useRouter();
  const handleSearch = (e: React.FormEvent<HTMLFormElement>) =>{
    e.preventDefault()
    if(manufacturer === "" && model === ""){
      alert("Please enter a manufacturer or model")
    }
    updateSearchParams(model.toLowerCase(),manufacturer.toLowerCase())
  }
  const updateSearchParams = (model: string, manufacturer:string) =>{
    const searchParams = new URLSearchParams(window.location.search);
    if(model){
      searchParams.set("model",model)
    }else{
      searchParams.delete("model")
    }
    if(manufacturer){
      searchParams.set("manufacturer",manufacturer)
    }else{
      searchParams.delete("manufacturer")
    }
    const newPathName= `${window.location.pathname}?${searchParams.toString()}`
    
    router.push(newPathName)
  }
  return (
    <form className="searchbar shadow-md" onSubmit={handleSearch}>
        <div className="searchbar__item">
            <SearchManufacturer
            manufacturer={manufacturer}
            setManufacturer={setManufacturer}
            />
            <SearchButton otherClasses="sm:hidden"/>
        </div>
        <div className="searchbar__item">
          <Image src="/model-icon.png" alt="model-icon" width={25} height={25} className="absolute w-[20px] h-[20px] li-4"/>
          <input type="text" name="model" value={model} onChange={(e)=> setModel(e.target.value)} placeholder="Enter Model" className="searchbar__input"/>
          <SearchButton otherClasses="sm:hidden"/>
        </div>
        <SearchButton otherClasses="max-sm:hidden"/>
    </form>
  )
}

export default SearchBar