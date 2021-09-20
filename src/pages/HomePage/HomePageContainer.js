import React, { useState, useEffect } from 'react';

import data from '../../data/data.js';
import HomePageViev from './HomePageViev';


    const HomePage = () => {
    
    const [users, setUsers] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [usersPerPage] = useState(20);
    const [modal,setModal] = useState(false);
    const [currentUser, setCurrentUser] = useState({});
    const [currentUsersPage, setCurrentUsersPage] = useState([]);
    const [headerColumn, setHeaderColumn] = useState(data);
    const [inputValue, setInputValue] = useState('');
    
    useEffect(() => {
     fetch('https://itrex-react-lab-files.s3.eu-central-1.amazonaws.com/react-test-api.json')
     .then(data => data.json())
     .then(data => {
      const lastUserIndex = currentPage * usersPerPage;
      const firstUserIndex = lastUserIndex - usersPerPage;
      const currentUsersPage = data.slice(firstUserIndex,lastUserIndex);
      setCurrentUsersPage(currentUsersPage);
      setUsers(data);
     })
     .catch(err => console.log(err))
        },[])

        useEffect(()=>{
       const lastUserIndex = currentPage * usersPerPage;
       const firstUserIndex = lastUserIndex - usersPerPage;
       const currentUsersPageCopy = users.slice(firstUserIndex,lastUserIndex);
       setCurrentUsersPage(currentUsersPageCopy);
        },[currentPage])

     const paginate = pageNumber => {
       setCurrentPage(pageNumber);
       setHeaderColumn(
         [
        {label: 'id', sort:false},
        {label: 'First name', sort:false},
        {label: 'Last name', sort:false},
        {label: 'Email', sort:false},
        {label: 'Phone', sort:false},
        {label: '???', sort:false},
        ]
       );
      }

     const paginateNext = () =>{ 
       setCurrentPage(currentPage+1);
       setHeaderColumn(
         [
        {label: 'id', sort:false},
        {label: 'First name', sort:false},
        {label: 'Last name', sort:false},
        {label: 'Email', sort:false},
        {label: 'Phone', sort:false},
        {label: '???', sort:false},
        ]
       );
      }

     const paginatePrevious = () => {
       setCurrentPage(currentPage-1);
       setHeaderColumn(
         [
        {label: 'id', sort:false},
        {label: 'First name', sort:false},
        {label: 'Last name', sort:false},
        {label: 'Email', sort:false},
        {label: 'Phone', sort:false},
        {label: '???', sort:false},
        ]
       );
      }

     const closeModal = () =>{
      setModal(false);
    }

     const showModal = (elem) =>{
      setCurrentUser(elem);
      setModal(true);
    }

    const sortId = column => {
      let copyHeaderColumn = [...headerColumn];
      let copyCurrentUsersPage = [...currentUsersPage];
      let foundElement = copyHeaderColumn.find(el=>el.label.toLowerCase()===column.label.toLowerCase());
      if (column.sort) {
        foundElement.sort = false;
        copyCurrentUsersPage.sort((a,b)=>b.id-a.id);
        setCurrentUsersPage(copyCurrentUsersPage);
        setHeaderColumn(copyHeaderColumn);
      }
      else {
        foundElement.sort = true;
        copyCurrentUsersPage.sort((a,b)=>a.id-b.id);
        setCurrentUsersPage(copyCurrentUsersPage);
        setHeaderColumn(copyHeaderColumn);
      }
    }

    const sortFirstName = column => {
      let copyHeaderColumn = [...headerColumn];
      let copyCurrentUsersPage = [...currentUsersPage];
      let foundElement = copyHeaderColumn.find(el=>el.label.toLowerCase()===column.label.toLowerCase());
      if (column.sort) {
        foundElement.sort = false;
        copyCurrentUsersPage.sort((a,b)=>{
          if (a.firstName.toLowerCase()>b.firstName.toLowerCase()) {
            return 1;
          } else {
            return -1;
          }
        });
        setCurrentUsersPage(copyCurrentUsersPage);
        setHeaderColumn(copyHeaderColumn);
      } else {
        foundElement.sort = true;
        copyCurrentUsersPage.sort((a,b)=>{
            if (a.firstName.toLowerCase()>b.firstName.toLowerCase()) {
            return -1;
          } else {
            return 1;
          }
        });
        setCurrentUsersPage(copyCurrentUsersPage);
        setHeaderColumn(copyHeaderColumn);
      }
    }

    const sortLastName = column => {
      let copyHeaderColumn = [...headerColumn];
      let copyCurrentUsersPage = [...currentUsersPage];
      let foundElement = copyHeaderColumn.find(el=>el.label.toLowerCase()===column.label.toLowerCase());
      if (column.sort) {
        foundElement.sort = false;
        copyCurrentUsersPage.sort((a,b)=>{
          if (a.lastName.toLowerCase()>b.lastName.toLowerCase()) {
            return 1;
          } else {
            return -1;
          }
        });
        setCurrentUsersPage(copyCurrentUsersPage);
        setHeaderColumn(copyHeaderColumn);
      } else {
        foundElement.sort = true;
        copyCurrentUsersPage.sort((a,b)=>{
            if (a.lastName.toLowerCase()>b.lastName.toLowerCase()) {
            return -1;
          } else {
            return 1;
          }
        });
        setCurrentUsersPage(copyCurrentUsersPage);
        setHeaderColumn(copyHeaderColumn);
      }
    }

    const sortEmail = column => {
      let copyHeaderColumn = [...headerColumn];
      let copyCurrentUsersPage = [...currentUsersPage];
      let foundElement = copyHeaderColumn.find(el=>el.label.toLowerCase()===column.label.toLowerCase());
      if (column.sort) {
        foundElement.sort = false;
        copyCurrentUsersPage.sort((a,b)=>{
          if (a.email.toLowerCase()>b.email.toLowerCase()) {
            return 1;
          } else {
            return -1;
          }
        });
        setCurrentUsersPage(copyCurrentUsersPage);
        setHeaderColumn(copyHeaderColumn);
      } else {
        foundElement.sort = true;
        copyCurrentUsersPage.sort((a,b)=>{
            if (a.email.toLowerCase()>b.email.toLowerCase()) {
            return -1;
          } else {
            return 1;
          }
        });
        setCurrentUsersPage(copyCurrentUsersPage);
        setHeaderColumn(copyHeaderColumn);
      }
    }

    const sortPhone = column => {
      let copyHeaderColumn = [...headerColumn];
      let copyCurrentUsersPage = [...currentUsersPage];
      let foundElement = copyHeaderColumn.find(el=>el.label.toLowerCase()===column.label.toLowerCase());
      if (column.sort) {
        foundElement.sort = false;
        copyCurrentUsersPage.sort((a,b)=>{
          a = Number(a.phone.split(")").splice(1)[0].split("-").join(""));
          b = Number(b.phone.split(")").splice(1)[0].split("-").join(""));
          return b-a;
        })
        setCurrentUsersPage(copyCurrentUsersPage);
        setHeaderColumn(copyHeaderColumn);
      }
      else {
        foundElement.sort = true;
        copyCurrentUsersPage.sort((a,b)=>{
          a = Number(a.phone.split(")").splice(1)[0].split("-").join(""));
          b = Number(b.phone.split(")").splice(1)[0].split("-").join(""));
          return a-b;
        })
        setCurrentUsersPage(copyCurrentUsersPage);
        setHeaderColumn(copyHeaderColumn);
      }
    }

    const sorting = (column) => {

      switch (column.label.toLowerCase()) {
        case 'id':
          sortId(column); 
          break;
        case 'first name':
          sortFirstName(column);
          break;
        case 'last name':
          sortLastName(column);
          break;
        case 'email':
          sortEmail(column);
          break;
        case 'phone':
          sortPhone(column);
          break;
        default:
          break;
      }
    }

    const filterUsersPage = currentUsersPage.filter(el=>el.firstName.toLowerCase().startsWith(inputValue));   

    return <HomePageViev 
            modal={modal}
            closeModal={closeModal}
            currentUser={currentUser}
            users={users}
            inputValue={inputValue}
            setInputValue={setInputValue}
            headerColumn={headerColumn}
            filterUsersPage={filterUsersPage}
            paginatePrevious={paginatePrevious}
            paginateNext={paginateNext}
            currentPage={currentPage}
            paginate={paginate}
            usersPerPage={usersPerPage}
            sorting={sorting}
            showModal={showModal}
            />
}

export default HomePage;