// import { useQuery } from '@tanstack/react-query';
// import React, { useContext, useEffect, useState } from 'react';
// import { useNavigation } from 'react-router-dom';
// import { AuthContext } from '../../contexts/AuthProvider';
// import Loading from '../Shared/Loading';

// const AllBuyers = () => {
//     const navigation = useNavigation();
//     // const { price, email, Username, } = booking;
 
//     const { user } = useContext(AuthContext);

//     const [usersData, setUsersData] = useState([]);
//     useEffect(() => {
//         fetch(`http://localhost:5000/users?role=buyer`)
//             .then(res => res.json())
//         .then(data=>setUsersData(data))
//     }, []);
//     // const url = `http://localhost:5000/users?role=${user?.role}`;

//     // const { data: users = [] } = useQuery({
        
//     //     queryKey: ['users', user?.role],
        
//     //     queryFn: async () => {
//     //         const res = await fetch(url);
//     //         const data = await res.json();
//     //         return data;
            
//     //     }
       
//     // })

//     if (navigation.state === "loading") {
//         return <Loading></Loading>
//     }
//     return (
//         <div>
//             <h2 className="text-3xl">All Buyer</h2>
//             <div className="overflow-x-auto">
//   <table className="table w-full">
   
//     <thead>
//       <tr>
//         <th></th>
//         <th>Name</th>
//         <th>Email</th>
//         <th>Action</th>
//       </tr>
//     </thead>
//     <tbody>
      
                        
//                             {
//                                 usersData.map((users, i) => <tr key={users._id}>
//                                     <th>{1+i}</th>
//         <td>{users.name}</td>
//                                     <td>{users.email }</td>
//         <td> <button>delete</button> </td>
//       </tr>
//                                     )
//                             }
        
      
      
//     </tbody>
//   </table>
// </div>
//         </div>
//     );
// };

// export default AllBuyers;