import React, { Component } from "react";
import { withFirebase } from "./Firebase";
class AddBalance extends Component{
    state={
        users:{},
        search:"",
        activeKey:null
    }
    constructor(props)
    {
        super(props);
    }
    check = (a, b) => {
        a = a.toLowerCase();
        //console.log(a);
        b = b.toLowerCase();
       // console.log(b);
        if (b.includes(a)) return true;
        else return false;
      };
      componentDidMount(){
          this.fetchDetails()
      }
      componentDidUpdate(){
          if(this.state.activeKey!=null)
          {
           console.log(document.getElementById('bal').value)
          console.log(this.state.users[this.state.activeKey]["balance"]);
          }
      }
    fetchDetails(){ 
        this.props.firebase.db.ref("users/")
        .once("value")
        .then((snapshot)=>{
            const users=snapshot.val();
            this.setState({users:users});
            //console.log(this.state.users);
           
            })
        }
        addBalance(){
            if(this.state.activeKey!=null)
            {
                console.log(this.state.users[this.state.activeKey]["balance"])
                this.state.users[this.state.activeKey]["balance"]+=parseInt(document.getElementById('bal').value);
                this.props.firebase.db.ref('users/' + this.state.activeKey).set({
                   balance:this.state.users[this.state.activeKey]["balance"],   
                    email:this.state.users[this.state.activeKey]["email"],
                    passwordOne:this.state.users[this.state.activeKey]["passwordOne"], 
                    username:this.state.users[this.state.activeKey]["username"]
                  });
                  
                console.log(this.state.users[this.state.activeKey]["balance"])
                this.setState({activeKey:null})
                document.getElementById('bal').value=""
            }
        }
        showDetails(){
            
                return(
                <div className="card shadow bg-dark rounded ">
                    <div className="card m-2 p-2 bg-light">
                        
                        {Object.keys(this.state.users).map((userKey)=>{
                            
                            if(this.check(this.state.search,this.state.users[userKey].email))
                            return(
                            <div className="d-flex col-12 m-2 p-2 ">
                                <div className="col-5"><h5>{this.state.users[userKey].username}</h5></div>
                                <div className="col-5"><h5>{this.state.users[userKey].email}</h5></div>
                                <div className="col-2 btn btn-primary" data-toggle="modal" data-target="#staticBackdrop" style={{ height: 40 }} onClick={()=>{this.setState({activeKey:userKey})}}>Add Balance</div>
                                
                            </div>)
                       
                        }) } 
                      </div> 
                     
                </div>)
            

        }
        showModal(){
            return (
                <div class="modal fade  " id="staticBackdrop" data-backdrop="static" tabindex="-1" role="dialog" aria-labelledby="staticBackdropLabel" aria-hidden="true" keyboard="false">
                    <div class="modal-dialog modal-dialog-centered " role="document">
                        <div class="modal-content">
                            <div class="modal-body">
                            <input  id="bal" placeholder="Enter balance" class="col-12 my-2"  /> 
                            </div>
                            <div class="modal-footer">
                                <button type="button" class="btn btn-secondary" data-dismiss="modal" onClick={()=>{document.getElementById('bal').value="";this.setState({activeKey:null})}}>Close</button>
                                <button type="button" class="btn btn-primary" data-dismiss="modal" onClick={() => { this.addBalance() }}>Enable</button>
                            </div>
                        </div>
                    </div>
                </div>
            );
        }
    render(){
        return(
            <div>
                <div>
                    {this.showModal()}
                </div>
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