import React from 'react';
import { Container, Row, Col, Button } from "reactstrap";
import Dropzone from 'react-dropzone'

class Header extends React.Component {  
    render() {  
       return (  
          <div>  
             <h1>Assignment Upload</h1>  
          </div>  
       );  
    }  
}  

class Solve extends React.Component{

    onDrop =  (acceptedFiles) => {
        console.log(acceptedFiles);
    }    


    render(){
        return (
            <div className="header bg-gradient-info pb-8 pt-5 pt-md-8">
                <Container fluid>
                    <Row>
                        <Header/>
                    </Row>
                    <Row>
                        <Col sm="12" md={{ size: 8, offset: 3 }}>
                            <Dropzone 
                            onDrop={this.onDrop} 
                            accept="text/plain"
                            minSize={0}
                            maxSize={5024} 
                            multiple >
                                {({getRootProps, getInputProps}) => (
                                    <div {...getRootProps()}>
                                        <input {...getInputProps()} directory="" webkitdirectory="" type="file" />
                                        <Button style={{ marginLeft: "22%", marginTop: "50px"}} color="success">
                                            Click Here to Upload Folder
                                        </Button>
                                    </div>
                                )}
                            </Dropzone>
                        </Col>
                    </Row>
                </Container>
            </div>
        );
    }
}

export default Solve;

//salamat rahe dosata hamara

