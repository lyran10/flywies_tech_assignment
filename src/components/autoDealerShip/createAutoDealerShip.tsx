import { useActionState } from 'react'
import { Input } from '../common/input'
import { Button } from '../common/button'
import axios from 'axios'
import { URL } from '../article/article'
import { useContextApi } from '../../context/context'

export const CreateAutoDealerShip = () => {
  const {setMsg} = useContextApi()
  const [state, formAction, isPending] = useActionState<any,any>(handleSubmit, { errors: {}});
  
async function handleSubmit (_: any, formData: FormData) {
  const promotedPlacementHeading = formData.get("promotedPlacementHeading");
  const everyThingHeading = formData.get("everyThingHeading");
  const title = formData.get("title")?.toString() || "";
  const description = formData.get("description")?.toString() || "";
  const errors: Record<string, string> = {};
  if (!title) errors.title = "Title is required.";
  if (!description) errors.description = "Description is required.";
  if (!promotedPlacementHeading) errors.promotedPlacementHeading = "Image is required.";
  if (!everyThingHeading) errors.everyThingHeading = "Image is required.";

  if (Object.keys(errors).length > 0) {
    return { errors, formData : { title, description, promotedPlacementHeading, everyThingHeading} };
  }

  try {
    const { data } = await axios.post(`${URL}/api/v1/admin/AutoDealerShip/addAutoDealerShip`,{ title, description, promotedPlacementHeading, everyThingHeading} );
    setMsg({ status: "success", content: data.message || data.msg, bg : "bg-green-500" })
    return { success: true, message: "FAQ updated successfully" };
  } catch (error: unknown) {
    const err = error as { message?: string, response? : any };
    setMsg({status : "error", content : err.response.data.message as string || err.message || "", bg : "bg-red-500"}) 
    return { errors: { general: err.message || "Something went wrong" }, formData : { title, description, promotedPlacementHeading, everyThingHeading}  };
  }
};

  return (
    <>
       <header className='font-bold text-[1.2rem]'>Auto Dealership</header>
        <form className='w-full flex flex-col gap-2' action={formAction}>
            <Input defaultValue={state.formData?.title} tag="input" label='Title' labelClasses='font-semibold' className='bg-slate-300' width='w-full' type="text" placeholder='Enter title' name="title">
            {state.errors?.title && <p className="text-red-500">{state.errors.title}</p>}
            </Input>
            <Input defaultValue={state.formData?.description} tag="textarea" label='Description' labelClasses='font-semibold' className='bg-slate-300' width='w-full' type="text" placeholder='Enter Description' name="description">
            {state.errors?.description && <p className="text-red-500">{state.errors.description}</p>}
            </Input>
            <Input defaultValue={state.formData?.promotedPlacementHeading} tag="textarea" label='Promoted Placement Heading' labelClasses='font-semibold' className='bg-slate-300' width='w-full' type="text" placeholder='Enter Promoted Placement Heading' name="promotedPlacementHeading">
            {state.errors?.promotedPlacementHeading && <p className="text-red-500">{state.errors.promotedPlacementHeading}</p>}
            </Input>
            <Input defaultValue={state.formData?.everyThingHeading} tag="textarea" label='Every Thing Heading' labelClasses='font-semibold' className='bg-slate-300' width='w-full' type="text" placeholder='Enter Every Thing Heading' name="everyThingHeading">
            {state.errors?.everyThingHeading && <p className="text-red-500">{state.errors.everyThingHeading}</p>}
            </Input>
           <Button id="createButton" type={"submit"} className='py-1 px-2 w-auto text-white rounded-md bg-[rgba(48,169,185,1)]'>{isPending ? "Creating..." : "Create"}</Button>
        </form>
    </>
  )
}