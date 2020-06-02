import React, { Component } from "react";
import { withFirebase } from "./Firebase";
class AddBalance extends Component{
    state={
        users:{},
        search:""
    }
    constructor(props)
    {
        super(props);
    }
    check = (a, b) => {
        a = a.toLowerCase();
        console.log(a);
        b = b.toLowerCase();
        console.log(b);
        if (b.includes(a)) return true;
        else return false;
      };
      componentDidMount(){
          this.fetchDetails()
      }
    fetchDetails(){ 
        this.props.firebase.db.ref("users/")
        .once("value")
        .then((snapshot)=>{
            const users=snapshot.val();
            this.setState({users:users});
            console.log(this.state.users);
           
            })
        }
        showDetails(){
            
                return(
                <div className="card shadow bg-dark rounded ">
                    <div className="card m-2 p-2 bg-light">
                        
                        {Object.keys(this.state.users).map((userKey)=>{
                            if(this.check(this.state.search,this.state.users[userKey].email))
                            return (<div className="col-12">
                                <div className="col-4">{this.state.users[userKey].username}</div>
                                <div className="col-4">{this.state.users[userKey].email}</div>
                                <div className="btn btn-dark">Add Balance</div>
                            </div>)
                        }) } 
                       
                    </div>  
                </div>)
            

        }
    render(){
        return(
            <div>
                <div class="row bg-white mt-3">
                <div class="col-6 ml-5">
            
                    <input id="email" placeholder="Enter UserEmail" class="col-12 my-2" id="email" onChange={()=>{
                        var value = document.getElementById("email").value
                        this.setState({search:value})}}/>
        
                </div>
                <div>
                    <div className="btn btn-primary" onClick={() => { this.fetchDetails() }}>Show details</div>
                </div>
                </div>
                <div class="row ">
                {/*<div class="col-6 ml-5" >

                    <input placeholder="Enter Balance to be added to previous amount" class="col-12 my-2"/>
                </div>*/}
                </div>
                <div>
                    {this.showDetails()}
                </div>
            </div>
        )
    }
}
export default withFirebase(AddBalance);