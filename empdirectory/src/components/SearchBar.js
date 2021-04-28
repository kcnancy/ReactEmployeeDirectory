import React from "react";

function SearchBar(props) {
  return (
    <form className="search">
      <div className= "form-group">
        <input
          value={props.search}
          name="searchBar"
          type="text"
          className="form=control"
          placeholder="Search by First, Last or email"
          onChange={(e) => props.filterEmployees(e)}
        />
      </div>
    </form>
  );
}

export default SearchBar;
