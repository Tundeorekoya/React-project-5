import React, { useState,useEffect } from "react";
import Alert from "./Alert";
import List from "./List"; 

const getLocalStorage = () =>{
  let list = localStorage.getItem('list')
  if (list){
    return JSON.parse(localStorage.getItem('list'))
  }
  else{
    return []
  }
}
function App() {
  const [ name, setName ] = useState('')
  const [ list, setList ] = useState(getLocalStorage())
  const [ isEdit, setIsEdit ] = useState(false)
  const [ editId, setEditId ] = useState(null)
  const [ alert, setAlert] = useState({show:'', msg: '', type:'' })


  const handleChange = (e) =>{
    e.preventDefault()

    if (!name){

      showAlert({show:true, msg:'please enter text', type: 'danger'})
    }
    else if (name && isEdit){
      // edit function
      setList(
        list.map((item)=>{
          if(item.id === editId){
          return{...item, title:name}
          }
          return item
        })
     
      )
      showAlert({show:true, msg:'added successfully', type:'success'})
      setName('')
      setIsEdit(false)
      setEditId(null)
  
  }
  else{
    showAlert({show:true, msg:'added successfully', type:'success'})
    const newItem = {id: new Date().getTime().toString(), title:name}
    setList([...list, newItem])
    setName('')
  
  }
}
  const clearList=()=>{
    showAlert({show:true, msg:'All cleared!', type:'danger'})
  
    setList([])
   }
  const editItem = (id)=>{
    const specificItem = list.find((item)=> item.id === id )
    setIsEdit(true)
    setEditId(id)
    setName(specificItem.title)
  }
  const removeItem = (id) =>{
    showAlert({show:true, msg:'All cleared!',type:'danger'})
    setList(list.filter((item)=>item.id !== id))
  }
  const showAlert = (show=false, msg='', type='')=>{
    setAlert(show,msg,type)
  }
  useEffect(()=>{
    localStorage.setItem('list',JSON.stringify(list))
  },[list])

  return (
    <section className="section-center">
      <form className="grocery-form" onSubmit={handleChange}>
       {alert.show && <Alert {...alert} removeAlert={showAlert}/>} 
       <h3>Grocery bud</h3>
       <div className="form-control">
        <input type="text" 
        className="grocery"
        value={name}
        onChange={(e)=>setName(e.target.value)}
        placeholder="e.g eggs"/>
        <button type="submit" className="submit-btn">
          {isEdit? "edit" : "submit"}
        </button>
       </div>
       {
        list.length > 0 && (
          <div>
            <List items={list} removeItem={removeItem} list={list} editItem={editItem}/> 
            <button className='clear-btn' onClick={clearList}>clear items</button>
          </div>
        )
       }
      </form>

    </section>
  );
} 

export default App;
