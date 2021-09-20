import React from 'react';
import PropTypes from 'prop-types';

import {Modal, Pagination, Loader, Close} from '../../components/index.js';
import './index.css';

const HomePageViev = ({modal, 
                       closeModal, 
                       currentUser, 
                       users, 
                       inputValue, 
                       setInputValue, 
                       headerColumn,
                       filterUsersPage,
                       paginatePrevious,
                       paginateNext,
                       currentPage,
                       paginate,
                       usersPerPage,
                       sorting,
                       showModal,
                      }) => {
    
    return (
        <div className="main">
          <Modal modalActive={modal} showModal={closeModal}>
            <div onClick={closeModal} className="modal__icon">
              <Close />
            </div>
            <div className="modal__container">
              <p>Profile info:</p>
              <p>Selected Profile: {`${currentUser?.firstName} ${currentUser?.lastName}`}</p>
              <p>Description: {currentUser?.description}</p>
              <p>Address: {currentUser.adress?.streetAddress}</p>
              <p>City: {currentUser.adress?.city}</p>
              <p>State: {currentUser.adress?.state}</p>
              <p>Index: {currentUser.adress?.zip}</p>
            </div>
          </Modal>
         {
           users.length ?
           <>
           <div className="input">
           <input value={inputValue} 
           onChange={e=>setInputValue(e.target.value)} 
           type="text" 
           placeholder="Seach by name" 
           />
           </div>
            <div className='table'>
               <div className="table__row">
                 {
                   headerColumn.map((el,i)=>{
                     return (
                       <div key={i} onClick={()=>sorting(el)} className="cell">
                         <p>{el.label}</p>
                         <div className={`cell__triangle ${el.sort && "cell__triangle--rotate"}`}></div>
                       </div>
                     )
                   })
                 }
               </div>
              {
                filterUsersPage.map((elem,i)=>{
                  return (
              <div onClick={()=>{showModal(elem)}} key={i} className="table__row">
                <div className="cell"><p>{elem?.id}</p></div>
                <div className="cell"><p>{elem?.firstName}</p></div>
                <div className="cell"><p>{elem?.lastName}</p></div>
                <div className="cell"><p>{elem?.email}</p></div>
                <div className="cell"><p>{elem?.phone}</p></div>
                <div className="cell"><p>{elem?.adress?.state}</p></div>
              </div>
                  )
                })
              }
            </div>
            <Pagination
            paginatePrevious = {paginatePrevious}
            paginateNext = {paginateNext}
            currentPage={currentPage}
            paginate={paginate}
            usersPerPage={usersPerPage}
            totalUsers={users.length}
             />
           </>
           :
           <Loader />
         }
        </div>
    )
}

HomePageViev.propTypes = {
  modal: PropTypes.bool,
  closeModal: PropTypes.func,
  currentUser: PropTypes.object,
  users: PropTypes.array,
  inputValue: PropTypes.string,
  setInputValue: PropTypes.func,
  headerColumn: PropTypes.array,
  filterUsersPage: PropTypes.array,
  paginatePrevious: PropTypes.func,
  paginateNext: PropTypes.func,
  currentPage: PropTypes.number,
  paginate: PropTypes.func,
  usersPerPage: PropTypes.number,
  sorting: PropTypes.func,
  showModal: PropTypes.func,
}

HomePageViev.defaultProps = {
  modal: false,
  closeModal: ()=>{},
  currentUser: {},
  users: [],
  inputValue: "",
  setInputValue: ()=>{},
  headerColumn: [],
  filterUsersPage: [],
  paginatePrevious: ()=>{},
  paginateNext: ()=>{},
  currentPage: 1,
  paginate: ()=>{},
  usersPerPage: 20,
  sorting: ()=>{},
  showModal: ()=>{}
}

export default React.memo(HomePageViev);