import React from "react";



const PlacesTable = ({options}) => {

    console.log(options,'.............options')

  return (
    <div>
      <table
        aria-label="customized table"
        className="custom-table datasets-table"
      >
        <thead>
          <tr className="cm_table_head">
            <th>#S No.</th>
            <th>Place Name </th>
            <th>Country</th>
            <th>Flag</th>
           
          </tr>
        </thead>
        <tbody>
          {options &&
            options.length > 0 &&
            options.map((row, i) => (
              <tr key={i}>
                <td>{(i + 1)}</td>
                <td>{row?.name}</td>
                <td>{row?.country}</td>
                <td>
  <img src={`https://flagsapi.com/${row?.countryCode}/flat/64.png`} alt="Flag" />
</td>

                
                
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
};

export default PlacesTable;