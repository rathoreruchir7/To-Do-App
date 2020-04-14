import React,{Component} from 'react';
import {Button,Label,Media,Form,FormGroup,Input, Card, CardHeader, CardBody} from 'reactstrap';


function ListDetail(props)
{
    const items = props.list.map((item)=>{
        return(
            <div className="col-12 mt-5 taskButtton" key={item.id}>
        <Button onClick={this.markedFunction(item.id,item.title,item.description)}>{item.title}</Button>
        </div>
        );
    });
    return(
        <div className="container row">
          <div className="col-12 col-md-2">
         <Card>
            <CardHeader>Your Plans</CardHeader>
            <CardBody>
                {items}
                </CardBody>
         </Card>
         </div>
         
         <div className="col-12 col-md-4 offset-md-3">
            <Card className="card2">
                <CardHeader>{props.markedItem.title}</CardHeader>
                <CardBody>{props.markedItem.description}</CardBody>
                <div className="row">
                    <div className="col-5 col-md-1 offset-md-6">
                        <Button className="btn-delete">Delete Task <span className="fa fa-times-circle-o"></span></Button>
                        </div>
                        <div className="col-5 col-md-1 offset-1">
                        <Button className="btn-complete">Mark As Completed <span className="fa fa-check-square"></span></Button>
                        </div>

                </div>
            </Card>
        </div>

         </div>

        
    );
}
export default ListDetail;