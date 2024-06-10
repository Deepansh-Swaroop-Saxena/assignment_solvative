import React, { useEffect, useState } from "react";
import { getCities } from "../config/page";
import PlacesTable from "./PlacesTable";
import Pagination from "./Pagination";

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
  const [placesList, setPlacesList] = useState([]);
 
  const getCitiesList = async () => {
    let params = {
      count: itemsPerPage,
      search: search,
      skip: (pageNo - 1) * itemsPerPage,
    };
    try {
      setLastPage(false);
      setLoading(true);
      let result = await getCities(params);
      let list = result?.data;
      console.log(list, '................list');
      if (list?.length > 0) {
        setPlacesList(list);
        if (list?.length < itemsPerPage) setLastPage(true);
      } else {
        setPlacesList([]);
        setLastPage(true);
      }
    } catch (err) {
      console.error("Error occurred while fetching reviews:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getCitiesList();
  }, [pageNo,itemsPerPage, search]);

  const debouncedHandleSearch = debounce((event) => {
    setSearchValue(event.target.value);
  }, 500);

  return (
    <>
      <div className="tableCardContainer">
        <div className="paper">
          <div className="mainContainer">
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                marginTop: "15px",
                marginBottom: "15px",
              }}
            >
              <div className="left">
                <h3>PLACES LISTING</h3>
              </div>
             
            </div>
            <input
              style={{ marginBottom: "20px" }}
              className="inputRounded search-input width-100"
              type="search"
              placeholder="Search By Territory"
              maxLength="100"
              onChange={debouncedHandleSearch}
            />
            <div id="loader"></div>
            <div id="placeList"      >
              {loader ? "Loading...." : <PlacesTable options={placesList} />}
            </div>
          </div>
          <div className="pagination">
            <div id="pagination">
              <Pagination
                pageNo={pageNo}
                setPagination={setPagination}
                lastPage={lastPage}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default PlacesManagement;
