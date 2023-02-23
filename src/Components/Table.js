import React from 'react'
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import EditIcon from '@mui/icons-material/Edit';
import Button from '@mui/material/Button';









const Table=({item,onDeleteClick,onEditClick})=>{
   
        
    const {name,phone_number,district,location,price,service_charge,insert_date,probability_installation_date,vehicle_type,customer_feedback,install_status}=item;
        return( 
            <div style={{display:"flex",width:'100%',flexDirection:"row"}}>

            <div className='table'  style={{flex:8,width:'80%',backgroundColor:'white',textAlign:'left',display:'flex',flexDirection:'row',justifyContent:'center'}}>
                <p style={{flex:1}}>{name}</p>
                <p style={{flex:1.5}}>{phone_number}</p>
                <p style={{flex:1}}>{district}</p>
                <p style={{flex:1}}>{location}</p>
                <p style={{flex:1}}>{price}</p>
                <p style={{flex:1}}>{service_charge}</p>
                <p style={{flex:1}}>{insert_date}</p>
                <p style={{flex:1}}>{probability_installation_date}</p>
                <p style={{flex:1.2}}>{vehicle_type}</p>
                <p style={{flex:2.2}}>{customer_feedback}</p>
            </div>

            <div style={{flex:2,width:'100%',backgroundColor:'white',display:'flex',flexDirection:'row',justifyContent:"center",alighItem:'center'}}>
                    <Button onClick={()=>onEditClick(item)}  style={{flex:1,color:'#2B3A55',background:'none',border:'none',cursor:'pointer'}}><EditIcon/></Button>
                    <Button  style={{flex:1,background:'none',border:'none',cursor:'pointer'}}>{install_status}</Button>
                    {/* <Button onClick={()=>deleteUser(_id)} style={{padding:10,color:'red',background:'none',border:'none',cursor:'pointer'}}><DeleteForeverIcon/></Button> */}
                    <Button onClick={()=>onDeleteClick(item)}  style={{flex:1,color:'red',background:'none',border:'none',cursor:'pointer'}}><DeleteForeverIcon/></Button>
            </div>      
        </div>         
    )
}

export default Table;