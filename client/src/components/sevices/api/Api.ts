import Api from "../axios/Axios"
import todoRoutes from "../endpoints/Endpoint"


export const handleGetTodo= async()=>{
    try {
        const res = await Api.get(todoRoutes.getTodo);
        return res;
    } catch (error) {
        console.log(error)
    }
}
export const handleAddTodo = async(todo:string)=>{
    try {
        const res = Api.post(todoRoutes.addTodo,{todo});
        return res;
    } catch (error) {
        
    }
}
export const handleDeleteTodo = async (id: number) => {
  try {
    console.log(`{todoRoutes.deleteTodo}/${id}`);
    const res = Api.delete(`${todoRoutes.deleteTodo}/${id}`);
    return res;
  } catch (error) {}
};