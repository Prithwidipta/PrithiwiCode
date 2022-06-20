import React, { useEffect,useState} from 'react'
import "../Components/StyleUserPage.css"
export default function UserDetails({ authenticatedToken }  ) {
    console.log("authenticatedToken",authenticatedToken)
const [user,setUser]=useState([])
    const getUser = async () => {
        const response = await fetch("https://reqres.in/api/unknown",
            {
                method: "GET",
                headers: {
                    'Authorization': `Bearer <${authenticatedToken}>`,
                    'Content-type': 'application/json'
                     }
            }  )
        const data = await response.json()
        setUser(data.data)
    }
    useEffect(() => {
        getUser()
    } ,[])
   
    return (
        <div className="container">
            
         <h1>Users List</h1>
            <br></br>
            <table>
               <tbody>
                <tr>
                    <td>ID</td>
                    <td>Name</td>
                    <td>Color</td>
                    <td>Year</td>
                    <td>Pantone-Value</td>
             </tr>
                 {user&&user.map((element, index) => {
                         return <tr key={index}>
                             <td>{element.id}</td>
                             <td>{element.name}</td>
                             <td style={{"backgroundColor":`${element.color}`}}>{element.color}</td>
                             <td>{element.year}</td>
                             <td>{element.pantone_value}</td>
                         </tr>
                     })
                 }
                </tbody>
                </table>
     </div>
  )
}
