import supabase, { supabaseUrl } from "./supabase";

// lấy code để get, delete data từ supabase.com
//https://supabase.com/dashboard/project/ibzdhmupeiarrneigyrp/api?resource=cabins
export async function getCabins() {
  /* vào trang supabase
    API Docs -> cabins -> kéo xuống Read rows copy code của READ ALL ROWS
    */
  const { data, error } = await supabase.from("cabins").select("*");
  // select tất cả data của cabins và lưu vào const data
  // nếu ko loaded gọi error, nếu đc return data
  if (error) {
    console.error(error);
    throw new Error("Cabin could not be loaded");
  }

  return data;
}

export async function deleteCabin(id) {
  // .delete().eq("id", id) === delete row có "id" === id đc truyền vào
  const { data, error } = await supabase.from("cabins").delete().eq("id", id);
  if (error) {
    console.error(error);
    throw new Error("Cabin could not be deleted");
  }

  return data;
}

export async function createEditCabin(newCabin, id) {
  // console.log(newCabin);

  // nếu là Edit và ko thay đổi dường dẫn image thì image đã có sẵn dường dẫn link đên storage supabase

  const hasImagePath = newCabin.image?.startsWith?.(supabaseUrl);

  // Edit: nêu ko thay đồi đường dần image ==> gọi lại duong dẫn có sẵn  newCabin.image
  // nếu tạo mới thì tạo unique name cho mỗi image upload lên storage

  const imageName = `${Math.random()}-${newCabin.image.name}`.replaceAll(
    "/",
    ""
  );

  // // tạo đường dẫn thư mục storage dữa vào mẫu bên supabase
  const imagePath = hasImagePath
    ? newCabin.image
    : `${supabaseUrl}/storage/v1/object/public/cabin-images/${imageName}`;

  // console.log(imagePath);
  // 1. Create/Edit cabin
  let query = supabase.from("cabins");

  // a). Create
  if (!id) query = query.insert([{ ...newCabin, image: imagePath }]);
  // insert([{ ...newCabin, image: imagePath }]) : trong []
  // add link image vào cột image trong table cabin tại supabase

  // b) Edit
  // eq("id", id) === equal cột id của table === id truyền vào
  // .update({ ...newCabin, image: imagePath }) KHÔNG CÓ []
  if (id) query = query.update({ ...newCabin, image: imagePath }).eq("id", id);

  // phải có .single() để return automatically khi insert
  const { data, error } = await query.select().single();

  if (error) {
    console.error(error);
    throw new Error("Cabin could not be created");
  }

  //2. Upload image vào storage của supabase
  if (hasImagePath) return data;

  const { error: storageError } = await supabase.storage
    .from("cabin-images")
    // tên, hình đc upload lên
    .upload(imageName, newCabin.image);

  // 3. Delete cabin vừa tạo nếu upload image bị lỗi
  if (storageError) {
    await supabase.from("cabins").delete().eq("id", data.id);
    console.error(storageError);
    throw new Error("Image cannot be uploaded and Cabin was not be created");
  }

  return data;
}
