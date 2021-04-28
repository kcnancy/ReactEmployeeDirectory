import React, { Component } from "react";
import EmpList from "./EmpList";
import API from "../utils/API";
import SearchBar from "./SearchBar";
class MainTable extends Component {
  state = {
    search: "",
    employees: [],
    filteredEmployees: [],
    filtered: false,
  };
  //using lifecycle hook , commonly used when making api calls within class components
  componentDidMount = () => {
    API.getEmployees()
      .then((response) => {
        console.log(response.data.results);
        this.setState({ employees: response.data.results });
      })
      .catch((err) => console.log(err));
  };

  //sort functions
  sortByFirstName = () => {
    const sortedEmployees = this.state.employees;
    sortedEmployees.sort((a, b) => (a.name.first > b.name.first ? 1 : -1));
    this.setState({ employees: sortedEmployees, filtered: false });
  };
  sortByLastName = () => {
    const sortedEmployees = this.state.employees;
    sortedEmployees.sort((a, b) => (a.name.last > b.name.last ? 1 : -1));
    this.setState({ employees: sortedEmployees, filtered: false });
  };

  sortByDob = () => {
    const sortedEmployees = this.state.employees;
    sortedEmployees.sort((a, b) => b.dob.age - a.dob.age);
    this.setState({ employees: sortedEmployees });
  };

  sortByEmail = () => {
    const sortedEmployees = this.state.employees;
    sortedEmployees.sort((a, b) => (a.email > b.email ? 1 : -1));
    this.setState({ employees: sortedEmployees, filtered: false });
  };

  //filter functions for search bar
  filterEmployees = (e) => {
    const { employees, search } = this.state;
    this.setState({ search: e.target.value });

    const filteredEmployees = employees.filter(
      (employee) =>
        employee.name.first.toLowerCase().indexOf(search.toLowerCase()) > -1 ||
        employee.name.last.toLowerCase().indexOf(search.toLowerCase()) > -1 ||
        employee.email.toLowerCase().indexOf(search.toLowerCase()) > -1
    );

    this.setState({ filteredEmployees: filteredEmployees, filtered: true });
  };

  render() {
    return (
      <div>
        <SearchBar
          filterEmployees={this.filterEmployees}
          search={this.state.search}
        />
        <table className="table table-striped">
          <thead>
            <tr>
              <th scope="col">Image</th>
              <th
                scope="col"
                className="dropdown-toggle"
                onClick={this.sortByFirstName}
              >
                FirstName
              </th>
              <th
                scope="col"
                className="dropdown-toggle"
                onClick={this.sortByLastName}
              >
                LastName
              </th>
              <th
                scope="col"
                className="dropdown-toggle"
                onClick={this.sortByEmail}
              >
                Email
              </th>
              <th scope="col">Phone number</th>
              <th
                scope="col"
                className="dropdown-toggle"
                onClick={this.sortByDob}
              >
                DOB
              </th>
            </tr>
          </thead>
          <tbody>
            {
              //render employees array if this.state.filtered is false
              !this.state.filtered
                ? this.state.employees.map((employee) => (
                    <EmpList
                      key={employee.phone}
                      image={employee.picture.medium}
                      firstName={employee.name.first}
                      lastName={employee.name.last}
                      email={employee.email}
                      phone={employee.phone}
                      dob={employee.dob.date}
                    />
                  ))
                : //render filteredEmployees array if this.state.filtered is true
                  this.state.filteredEmployees.map((employee) => (
                    <EmpList
                      key={employee.phone}
                      image={employee.picture.medium}
                      firstName={employee.name.first}
                      lastName={employee.name.last}
                      email={employee.email}
                      phone={employee.phone}
                      dob={employee.dob.date}
                    />
                  ))
            }
          </tbody>
        </table>
      </div>
    );
  }
}

export default MainTable;
