import { useEffect } from "react";
import { Link } from "react-router-dom";

export default function Pagination({productsPerPage, totalProducts, paginate, nextPage, prevPage, currentPage}:
    {productsPerPage: number, totalProducts: number, paginate:any, nextPage:any, prevPage:any, currentPage:number}
) {

const pageNumbers:any = [];

useEffect(()=>{
window.scrollTo({
    top:0,
    behavior:"smooth"
})
},[currentPage])

for(let i = 1; i <= Math.ceil(totalProducts/productsPerPage); i++) {
pageNumbers.push(i);
}
return (
    <div>
        <nav>
        <ul id="pag" className="pagination justify-content-center">
        <li className="page-item">
        <Link onClick={()=>prevPage()} className="page-link" to="#" aria-label="Previous">
          <span aria-hidden="true">&laquo;</span>
        </Link>
      </li>
      {
        pageNumbers.map((num:any) => {
           return <li className={currentPage == num ? "page-item disabled" : "page-item"}>
           <Link onClick={() => paginate(num)} className="page-link" to="#">{num}</Link></li>
        })
      }
      <li className="page-item">
        <Link onClick={()=>{nextPage(pageNumbers.length)}} className="page-link" to="#" aria-label="Next">
          <span aria-hidden="true">&raquo;</span>
        </Link>
      </li>
            </ul>
        </nav>
    </div>
)
}