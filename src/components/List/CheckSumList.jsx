import React from "react";
//Component to Show Plagiarism Report in Form of List
class List extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
      showPopUp: false,
      array: []
    };
  }

  componentDidUpdate() {}

  render() {
    var keys = this.props.plagiarismReport;
    var array = [];
    array = this.props.values[keys];
    return (
      <tr>
        <td scope="row"> {keys} </td>
        <td>
          <ul>
            {array.map(element => (
              <li>{element.match(/\d+/) + " | " + element}</li>
            ))}
          </ul>
        </td>
      </tr>
    );
  }
}

export default List;
