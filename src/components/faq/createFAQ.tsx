import { useActionState } from 'react'
import { Input } from '../common/input'
import { Button } from '../common/button'
import axios from 'axios'
import { URL } from '../article/article'
import { useContextApi } from '../../context/context'

export const CreateFAQ = () => {
  const {setMsg} = useContextApi()
  const [state, formAction, isPending] = useActionState<any,any>(handleSubmit, { errors: {}});
  
async function handleSubmit (_: any, formData: FormData) {
  const question = formData.get("question")?.toString() || "";
  const answer = formData.get("answer")?.toString() || "";
  const errors: Record<string, string> = {};
  if (!question) errors.title = "Question is required.";
  if (!answer) errors.description = "Answer is required.";

  if (Object.keys(errors).length > 0) {
    return { errors, formData : { question, answer} };
  }

  try {
    const { data } = await axios.post(`${URL}/api/v1/faq/add`,{ question, answer } );
    setMsg({ status: "success", content: data.message || data.msg, bg : "bg-green-500" })
    return { success: true, message: "FAQ Created successfully" };
  } catch (error: unknown) {
    const err = error as { message?: string, response? : any };
    setMsg({status : "error", content : err.response.data.message as string || err.message || "", bg : "bg-red-500"}) 
    return { errors: { general: err.message || "Something went wrong" }, formData : { answer, question} };
  }
};

  return (
    <>
       <header className='font-bold text-[1.2rem]'>FAQ</header>
        <form className='w-full flex flex-col gap-2' action={formAction}>
            <Input defaultValue={state.formData?.image} tag="input" label='Questions' labelClasses='font-semibold' className='bg-slate-300' width='w-full' type="text" placeholder='Enter question' name="question">
            {state.errors?.question && <p className="text-red-500">{state.errors.question}</p>}
           </Input>
           <Input defaultValue={state.formData?.title} tag="input" label='Answer' labelClasses='font-semibold' className='bg-slate-300' width='w-full' type="text" placeholder='Enter answer' name="answer">
            {state.errors?.answer && <p className="text-red-500">{state.errors.answer}</p>}
           </Input>
           <Button id="createButton" type={"submit"} className='py-1 px-2 w-auto text-white rounded-md bg-[rgba(48,169,185,1)]'>{isPending ? "Creating..." : "Create"}</Button>
        </form>
    </>
  )
}