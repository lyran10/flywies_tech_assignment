import { useActionState } from 'react'
import { Input } from '../../common/input'
import { Button } from '../../common/button'
import axios from 'axios'
import { URL } from '../../article/article'
import { useContextApi } from '../../../context/context'

type Props = {
    id : string
}

export const EditCareerOpenings = ({id} : Props) => {
  const {setMsg} = useContextApi()
  const [state, formAction, isPending] = useActionState<any,any>(handleSubmit, { errors: {}});
  
async function handleSubmit (_: any, formData: FormData) {
  const location = formData.get("location");
  const title = formData.get("title")?.toString() || "";
  const description = formData.get("description")?.toString() || "";
  const errors: Record<string, string> = {};
  if (!title) errors.title = "Title is required.";
  if (!description) errors.description = "Description is required.";
  if (!location) errors.image = "Image is required.";

  if (Object.keys(errors).length > 0) {
    return { errors, formData : { title, description, location} };
  }

  try {
    const { data } = await axios.put(`${URL}/api/v1/admin/updateCareerOpening/${id}`,{ title, description, location});
    console.log(data)
    setMsg({ status: "success", content: "Career opening updated successfully", bg : "bg-green-500" })
    return { success: true, message: "Career opening updated successfully" };
  } catch (error: unknown) {
    console.log(error)
    const err = error as { message?: string, response? : any };
    setMsg({status : "error", content : err.response.data.message as string, bg : "bg-red-500"}) 
    return { errors: { general: err.message || "Something went wrong" }, formData : { title, description, location} };
  }
};

  return (
    <>
       <header className='font-bold text-[1.2rem]'>Career Openings</header>
        <form className='w-full flex flex-col gap-2' action={formAction}>
            <Input defaultValue={state.formData?.image} tag="input" label='Location' labelClasses='font-semibold' className='bg-slate-300' width='w-full' type="text" placeholder='Enter Location' name="location">
            {state.errors?.image && <p className="text-red-500">{state.errors.image}</p>}
           </Input>
           <Input defaultValue={state.formData?.title} tag="input" label='Title' labelClasses='font-semibold' className='bg-slate-300' width='w-full' type="text" placeholder='Enter title' name="title">
            {state.errors?.title && <p className="text-red-500">{state.errors.title}</p>}
           </Input>
           <Input defaultValue={state.formData?.description} tag="textarea" label='Description' labelClasses='font-semibold' className='bg-slate-300' width='w-full' type="text" placeholder='Enter Description' name="description">
            {state.errors?.description && <p className="text-red-500">{state.errors.description}</p>}
            </Input>
           <Button id="editButton" type={"submit"} className='py-1 px-2 w-auto text-white rounded-md bg-[rgba(48,169,185,1)]'>{isPending ? "Updating..." : "Update"}</Button>
        </form>
    </>
  )
}
