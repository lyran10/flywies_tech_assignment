import { useActionState } from 'react'
import { Input } from '../../common/input'
import { Button } from '../../common/button'
import axios from 'axios'
import { URL } from '../../article/article'
import { useContextApi } from '../../../context/context'


export const CreateCareer = () => {
  const {setMsg} = useContextApi()
  const [state, formAction, isPending] = useActionState<any,any>(handleSubmit, { errors: {}});
  
async function handleSubmit (_: any, formData: FormData) {
  const image = formData.get("image");
  const title = formData.get("title")?.toString() || "";
  const description = formData.get("description")?.toString() || "";
  const errors: Record<string, string> = {};
  if (!title) errors.title = "Title is required.";
  if (!description) errors.description = "Description is required.";
  if (!image) errors.image = "Image is required.";

  if (Object.keys(errors).length > 0) {
    return { errors, formData : { title, description, image} };
  }

  try {
    const { data } = await axios.post(`${URL}/api/v1/admin/Career/addCareer`,formData);
    if(data.status === 200) setMsg({ status: "success", content: "Career created successfully", bg : "bg-green-500" })
    return { success: true, message: "Article Created successfully" };
  } catch (error: unknown) {
    const err = error as { message?: string };
    setMsg({status : "error", content : err.message as string, bg : "bg-red-500"}) 
    return { errors: { general: err.message || "Something went wrong" }, formData : { title, description, image} };
  }
};

  return (
    <>
       <header className='font-bold text-[1.2rem]'>Career</header>
        <form className='w-full flex flex-col gap-2' action={formAction}>
            <Input defaultValue={state.formData?.image} tag="input" label='Select Image' labelClasses='font-semibold' className='bg-slate-300' width='w-full' type="file" placeholder='' name="image">
            {state.errors?.image && <p className="text-red-500">{state.errors.image}</p>}
           </Input>
           <Input defaultValue={state.formData?.title} tag="input" label='Title' labelClasses='font-semibold' className='bg-slate-300' width='w-full' type="text" placeholder='Enter title' name="title">
            {state.errors?.title && <p className="text-red-500">{state.errors.title}</p>}
           </Input>
           <Input defaultValue={state.formData?.description} tag="textarea" label='Description' labelClasses='font-semibold' className='bg-slate-300' width='w-full' type="text" placeholder='Enter Description' name="description">
            {state.errors?.description && <p className="text-red-500">{state.errors.description}</p>}
            </Input>
           <Button id="createButton" type={"submit"} className='py-1 px-2 w-auto text-white rounded-md bg-[rgba(48,169,185,1)]'>{isPending ? "Creating..." : "Create"}</Button>
        </form>
    </>
  )
}