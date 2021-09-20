import React from 'react';
import PropTypes from 'prop-types';

import './index.css';

const Pagination =  ({usersPerPage, 
                      totalUsers,
                      paginate, 
                      currentPage,
                      paginateNext,
                      paginatePrevious
                    }) => {

   const pageNambers = [];

   for(let i =1; i <= Math.ceil(totalUsers/usersPerPage);i++){
      pageNambers.push(i);
   }
    return (
      <>
      {pageNambers.length ===1 || 
      <div className='pagination'>
        <div 
        className={`pagination__previous ${pageNambers[0]===currentPage && 'disable'}`}
        onClick = {paginatePrevious}
        >
          Previous
        </div>
        {
          pageNambers.map(number=>{
            return (
              <div 
              className={`pagination__number ${currentPage===number && 'pagination__number pagination__number_select'}`} 
              onClick={()=>paginate(number)} key={number}>
                {number}
              </div>
            )
          })
        }
        <div 
        className={`pagination__next ${currentPage===pageNambers.length && 'disable'}`}
        onClick = {paginateNext}
        >
          Next
        </div>
      </div> }
      </>
    )
}

Pagination.propTypes = {
usersPerPage: PropTypes.number,
paginate: PropTypes.func,
currentPage: PropTypes.number,
paginateNext: PropTypes.func,
paginatePrevious: PropTypes.func,
}

Pagination.defaultProps = {
usersPerPage: 20,
paginate: ()=>{},
currentPage: 1,
paginateNext: ()=>{},
paginatePrevious: ()=>{}
}


export default React.memo(Pagination);