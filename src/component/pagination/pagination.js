import React from 'react';
import {Link} from 'react-router-dom'
const Pagination=({prodPerPage,totalProd,paginate})=>{
    const page=[];
    for(let i=1;i<=Math.ceil(totalProd/prodPerPage);i++){
        page.push(i)
    }
    return(
        <nav>
        <ul className="pagination">
            {page.map(p=>(
                <li key={p} className="page-item">
                    <Link to="#"onClick={()=>paginate(p)} className="page-link">
                        {p}
                    </Link>
                       
                </li>
            ))}
        </ul>
        </nav>
    )
}
 
export default Pagination;