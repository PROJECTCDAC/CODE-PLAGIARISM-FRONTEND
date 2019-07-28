import React from "react";
import Header from "../../components/Headers/StudentHeader.jsx";
//First Page of Student Dashboard
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
      <>
        <Header />
      </>
    );
  }
}

export default Index;

//meri awaj hi meri pehachan hai
