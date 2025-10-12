// api call for upload image on imbb from client side to autometically host image
export const imageUpload=async(imageUrl)=>{
    const imageFormData = new FormData();
    imageFormData.append('image',imageUrl);
    
}