import supabase, { supabaseUrl } from "./supabase"

export async function getCabins() {
    
const { data, error } = await supabase
.from('cabins')
.select('*')
       
  if(error){
    console.error(error);
    throw new Error("Cabins could not be loaded");
  }

  return data;
}

export async function createEditCabin(newCabin, id){
  console.log(newCabin, id);
  // const hasImagePath = newCabin.imagestartsWith(supabase)
  const imageName = `${Math.random()}-${newCabin.image.name}`.replaceAll(
    "/",
    ""
  );

const imagePath = `https://jsxipcqondgbmlkmnzyv.supabase.co/storage/v1/object/public/cabin-images/${imageName}`

if (!(newCabin.image instanceof File || newCabin.image instanceof Blob)) {
  console.error("Invalid file type for image");
  throw new Error("Image must be a valid File or Blob object");
}

let query= supabase.from('cabins')

if(!id) query = query.insert([{...newCabin, image: imagePath}]);

if(id) query = query.update({ ...newCabin, image:imagePath }).eq("id", id);
  
const { data, error } = await query;

if(error){
  console.error(error);
  throw new Error("Cabins could not be created");
}

const {  error: storageError } = await supabase.storage
.from("cabin-images")
.upload(imageName, newCabin.image);


if(storageError){
    await supabase.from("cabins").delete.eq("id", data.id);
    console.error(storageError);
    throw new Error("Cabin could not be created");
}

return data;

}


export async function deleteCabin(id){
    
const { data, error } = await supabase
.from('cabins')
.delete()
.eq("id", id)

if(error){
  console.error(error);
  throw new Error("Cabins could not be deleted");
}

return data;
        
}