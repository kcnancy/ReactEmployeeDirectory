import React from "react";
import moment from "moment";

const formatDate = (date)=>{
    return `${moment(date).format("MM-DD-YYYY")? moment(date).format("MM-DD-YYYY"):moment(date).format("MM-DD-YYYY") }`;
 }
function EmpList(props) {
  return (
    <>
      <tr>
        <td>
          <img src={props.image} alt="user"></img>
        </td>
        <td>{props.firstName}</td>
        <td>{props.lastName}</td>
        <td>{props.email}</td>
        <td>{props.phone}</td>
        <td>{formatDate(props.dob)}</td>
      </tr>
    </>
  );
}
export default EmpList;
