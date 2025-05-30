import { useActionState } from 'react'
import { Input } from '../../common/input'
import { Button } from '../../common/button'
import axios from 'axios'
import { URL } from '../../article/article'
import { useContextApi } from '../../../context/context'


export const CreateCareerOpeningCategory = () => {
  const {setMsg} = useContextApi()
  const [state, formAction, isPending] = useActionState<any,any>(handleSubmit, { errors: {}});
  
async function handleSubmit (_: any, formData: FormData) {
  const title = formData.get("title")?.toString() || "";
  const type = formData.get("type")?.toString() || "";
  const errors: Record<string, string> = {};
  if (!title) errors.title = "Title is required.";
  if (!type) errors.description = "Type is required.";

  if (Object.keys(errors).length > 0) {
    return { errors, formData : { title, type } };
  }

  try {
    const { data } = await axios.post(`${URL}/api/v1/admin/CareerOpeningCategory/addCareerOpeningCategory`,{ title, type });
    setMsg({ status: "success", content: data.message || data.msg, bg : "bg-green-500" })
    return { success: true, message: "Career opening Category created successfully" };
  } catch (error: unknown) {
    const err = error as { message?: string, response? : any };
    setMsg({status : "error", content : err.response.data.message as string || err.message || "", bg : "bg-red-500"}) 
    return { errors: { general: err.message || "Something went wrong" }, formData : { title, type} };
  }
};

  return (
    <>
       <header className='font-bold text-[1.2rem]'>Career Openings Category</header>
        <form className='w-full flex flex-col gap-2' action={formAction}>
           <Input defaultValue={state.formData?.type} tag="input" label='Type' labelClasses='font-semibold' className='bg-slate-300' width='w-full' type="text" placeholder='Enter type' name="type">
            {state.errors?.type && <p className="text-red-500">{state.errors.type}</p>}
           </Input>
           <Input defaultValue={state.formData?.title} tag="input" label='Title' labelClasses='font-semibold' className='bg-slate-300' width='w-full' type="text" placeholder='Enter title' name="title">
            {state.errors?.title && <p className="text-red-500">{state.errors.title}</p>}
           </Input>
           <Button id="createButton" type={"submit"} className='py-1 px-2 w-auto text-white rounded-md bg-[rgba(48,169,185,1)]'>{isPending ? "Creating..." : "Create"}</Button>
        </form>
    </>
  )
}