import React,{useState,useEffect} from 'react'
import axios from 'axios';
import Checkbox from '@mui/material/Checkbox';
import AddIcon from '@mui/icons-material/Add';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import EntryForm from './EntryForm';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Table from './Table';
import './style.css'
import './table.css'
import './form.css'
import {USER_URL} from '../utils/urls'




const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 350,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  };

const Home=()=>{
    const [state, setState] = useState({
        open:false,
        datas:[],
        searchItem:"",
        dataResults:[],
        nextday:false,
        selectedUser : null,
        deleteOpen :false
    })

    useEffect(() => {
        getUser();
      }, []);

    const getUser=()=>{
        axios.get(USER_URL)
          .then(res => {
            let data = res.data
            let old = {...state}
            old.datas = data
            old.dataResults = data
            setState(old)
          })
          .catch(error => {
            console.log(error);
          });
    }

    const deleteUser=()=>{
        axios.delete(USER_URL+state.selectedUser._id)
        .then(response => {
        let old = {...state}
        old.datas = old.datas.filter(x=>x._id!==state.selectedUser._id)
        old.deleteOpen=false
        setState(old)

        })
        .catch(error => {
          console.log(error);
        });
    }

    const onDeleteClick = (user)=>{
        let old = {...state}
        old.deleteOpen = true
        old.selectedUser= user
        setState(old)
    }

    const onEditClick=(user)=>{
        let old = {...state}
        old.open = true
        old.selectedUser= user
        setState(old) 
    }

    const onAddClick =()=>{
        let old = {...state}
        old.open = true
        old.selectedUser= null
        setState(old)
    }

    const handleClose=()=>{
        let old = {...state}
        old.open = false
        setState(old)
    }

    const handleDeleteClose=()=>{
        let old = {...state}
        old.deleteOpen = false
        setState(old)
    }

    const saveUser = user=>{
        axios.post(USER_URL,user)
        .then(x=>{
            let old = {...state}
            old.open = false
            old.datas = [x.data, ...old.datas]
            setState(old)
        })
        .catch(err=>console.log(err))
        
    }

    const updateUser=user=>{
        axios.put(USER_URL+user._id,user)
        .then(x=>{
            let datas = [...state.datas].map(x=>x._id===user._id?user:x)
            setState(old=>({...old,datas:datas,open:false}))
        })
        .catch(err=>console.log(err))
        // console.log(user)
    }

    const searchText= (e)=>{
        let searchTxt = e.target.value
        let old = {...state}
        if(searchTxt===""){
            old.datas = [...old.dataResults]
        }else{
            old.datas = [...old.dataResults].filter(x=>{
                return (
                    (x.name && x.name.toLowerCase().includes(searchTxt.toLowerCase())) ||
                    (x.phone_number && String(x.phone_number).toLowerCase().includes(searchTxt.toLowerCase())) ||
                    (x.district && x.district.toLowerCase().includes(searchTxt.toLowerCase())) ||
                    (x.location && x.location.toLowerCase().includes(searchTxt.toLowerCase())) ||
                    (x.vehicle_type && x.vehicle_type.toLowerCase().includes(searchTxt.toLowerCase())) 
                    )
            })
        }
        old.searchItem=searchTxt

        console.log(old.searchItem)

        setState(old)
       
    } 

    const getInstallationDate=strDate=>{
        let arr = strDate.split("/")
        return new Date(arr[2],arr[1]-1,arr[0],0,0,0)
    }

    const nextDayFilter=date=>{
        let d = new Date(date)
        let today = new Date()
        today.setHours(23)
        today.setMinutes(59)
        today.setSeconds(59)

        let nextDay = new Date(today.getTime())
        nextDay.setDate(nextDay.getDate()+1)


        return d.getTime()>=today.getTime() && d.getTime()<=nextDay.getTime()


    }




    const onCheckChanged=(e)=>{
        let old = {...state}
        old.nextday = !old.nextday

        if(old.nextday){
            old.datas = [...old.dataResults].filter(x=>nextDayFilter(x.probability_installation_date))
        }else{
            old.datas =[...old.dataResults] 
        }
        // console.log(getInstallationDate(old.datas[0].probability_installation_date))
        setState(old)
    }

    const DeleteModal =()=>{
        return  <Modal
        keepMounted
        open={state.deleteOpen}
        aria-labelledby="keep-mounted-modal-title"
        aria-describedby="keep-mounted-modal-description"
    >
        <Box sx={style} style={{border:'none',borderRadius:10}}>
        <Typography id="keep-mounted-modal-title" variant="h6" component="h2" marginBottom="10px">
            Do you want to delete ? 
            <h5>{state.selectedUser.name} !!!</h5> 
        </Typography>
        <button onClick={deleteUser} style={{height:30,width:70,border:'1px solid red',borderRadius:4,padding:5,color:'red',cursor:'pointer'}} >DELETE</button>
        <button style={{height:30,width:70,marginLeft:15,border:'1px solid green',borderRadius:4,padding:5,color:'green',cursor:'pointer'}} onClick={handleDeleteClose}>CANCEL</button>
        </Box>
    </Modal>
    }
    

   return(
        
        <div>
            <div className="home">
                <div className="topdiv">
                    <div className='fetchtop'>
                        <p style={{fontWeight:"bolder",padding:"10px",fontSize:"20px"}}>FACEBOOK CLIENT LIST</p>
                    </div>
                </div>
                <div className="bottomdiv">
                    <div className="middiv">
                        <div className="midhead">
                            <div style={{width:"35%",height:"50px",float:"right",backgroundColor:"orange",borderRadius:"0px 10px 0px 0px"}}>
                               <input
                                type="search" 
                                placeholder="Search..." 
                                name="search" 
                                value={state.searchItem}
                                onChange={searchText}/>
                                <Tooltip title="Add" enterDelay={500} leaveDelay={200}>
                                    <Button onClick={onAddClick} style={{float:"right",marginTop:"7px",marginRight:"10px",fontWeight:"bolder"}}><AddIcon style={{fontWeight:"bolder"}}/></Button>
                                </Tooltip>                      
                                <Tooltip  title="Next Day" enterDelay={200} leaveDelay={200}>
                                    <Checkbox style={{float:"right",height:"30px",width:"35px",marginTop:"10px"}} label="Next" checked={state.nextday}  onChange={onCheckChanged}  />
                                </Tooltip>                           
                            </div> 
                        </div>
                        <div  style={{display:'flex',flexDirection:'row',justificontent:'center',height:35, width:'100%',backgroundColor:"#7DB9B6",marginTop:-35}}>
                            <div style={{flex:8,backgroundColor:'#227C70',color:'white',fontWeight:'bold',padding:5,textAlign:'left',display:'flex',flexDirection:'row',justifyContent:'center'}}>
                            <p style={{flex:1}}>Name</p>
                            <p style={{flex:1.5}}>Mobaile</p>
                            <p style={{flex:1}}>District</p>
                            <p style={{flex:1}}>Location</p>
                            <p style={{flex:1}}>Price</p>
                            <p style={{flex:1}}>Service</p>
                            <p style={{flex:1}}>Insert Date</p>
                            <p style={{flex:1}}>Install Date</p>
                            <p style={{flex:1.2}}>Vehicle_Type</p>
                            <p style={{flex:2}}>Feedback</p>
                            </div>
                        <div style={{flex:2,backgroundColor:'#227C70',color:'white',fontWeight:'bold',padding:5}}>Action</div>
                        </div >
                        <div className='midbottom'>
                            {
                            state.datas.map((x,i)=><Table key={i} onEditClick={onEditClick}  item={x} onDeleteClick={onDeleteClick}/>)
                            }
                        </div>         
                    </div>
                </div>
            </div>
        {
            state.open && <EntryForm updateUser={updateUser} open={state.open} handleClose={handleClose} saveUser={saveUser} selectedUser={state.selectedUser}/>
        }

        { state.deleteOpen && <DeleteModal/>}
    
        </div>

    )
}

export default Home;