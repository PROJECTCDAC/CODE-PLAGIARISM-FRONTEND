import React from "react";
import Header from "../../components/Headers/TeacherHeader.jsx";
//Teacher Dashboard HomePage
class Index extends React.Component {
  state = {
    activeNav: 1
  };
  toggleNavs = (e, index) => {
    e.preventDefault();
    this.setState({
      activeNav: index
    });
    let wow = () => {
      console.log(this.state);
    };
    wow.bind(this);
    setTimeout(() => wow(), 1000);
    // this.chartReference.update();
  };
  componentWillMount() {}
  render() {
    return (
      <div>
        <Header />
      </div>
    );
  }
}

export default Index;
