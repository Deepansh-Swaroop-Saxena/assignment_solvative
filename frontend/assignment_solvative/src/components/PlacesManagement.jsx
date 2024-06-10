import React, { useState, useEffect } from "react";
import {getCities} from "../config/page";

const debounce = (func, delay) => {
    let timeoutId;
    return function (...args) {
      const context = this;
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        func.apply(context, args);
      }, delay);
    };
  };

  
  
  const PlacesManagement = () => {
    const [pageNo, setPagination] = useState(1);
    const [itemsPerPage] = useState(5);
    const [search, setSearchValue] = useState("");
    const [lastPage, setLastPage] = useState(false);
    const [loader, setLoading] = useState(false);
    const [reviewsList, setReviewsList] = useState([]);
    const [sortObj, setSortObj] = useState({ sortKey: 'updatedAt', sortOrder: 'desc' })

    const getCitiesList =async  () => {
        let params = {
          count: itemsPerPage,
          search: search,   
        };
        try {
          setLastPage(false);
          setLoading(true)
          let result = await getCities(params);
          let list = result?.data
          console.log(list,'................list')
          if (list?.length > 0) {
            setReviewsList(list);
            if (list?.length < itemsPerPage) setLastPage(true);
          } else {
            setReviewsList([]);
            setLastPage(true);
          }
        } catch (err) {
          console.error("Error occurred while fetching reviews:", err);
        }
        finally {
          setLoading(false)
        }
      };


      
      useEffect(() => {
        getCitiesList();
      }, [itemsPerPage, search]);
    
    return (
      <div>
        
      </div>
    )
  }
  
  export default PlacesManagement
  