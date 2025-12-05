// import axios from "axios";


// export const imgUpload=imageReceive=>{
//     //store image and get the photoURL
//     const formData=new FormData();
//     formData.append("image",imageReceive)
//     const image_API_URL=`https://api.imgbb.com/1/upload?key=${import.meta.env. VITE_image_host}`

//     axios.post(image_API_URL,formData)
//     .then(res=>{
//         console.log("after store",res.data.data.url)
//         return res.data.data.url
//     })
// }