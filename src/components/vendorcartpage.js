import React, { Component } from "react";
import { withFirebase } from "./Firebase";
import Login from "./Login";

class Vendorcartpage extends Component {
    state = {
        display: null,
        data: null,
        items: null,
        vendor: null,
        orderVerified: false,
        vendors: null,
        inputs:{}
    };
    componentDidUpdate() {
        // this.filter()
        console.log(this.state)
        console.log(this.props)
        if (this.state.vendor == null && this.props.vendor != null) {
            this.setState({ vendor: this.props.vendor });
            //return
        }
        if (this.state.display == null && this.state.data) {
            this.setState({ display: true })
            //return
        }

        if (this.state.data == null && this.state.vendor) {
            this.fetchCart()
            //return
        }
        /* if (this.state.items == null) {
             this.fetchItems()
             //return
         }*/
    }
    componentDidMount() {
        if (this.state.vendor == null) {
            this.setState({ vendor: this.props.vendor });
        }
        this.fetchItems()
        this.fetchVendors();
    }
    fetchVendors() {
        this.props.firebase.db.ref("public/vendors").once("value")
            .then((snapshot) => {
                this.setState({ vendors: snapshot.val() })
            })
    }
    fetchCart = () => {
        this.props.firebase.db
            .ref("vendors/" + this.props.vendor)
            .on("value", (snapshot) => {
                const item = snapshot.val();
                console.log(item);
                this.setState({ data: item });
            });
    };
    fetchItems = () => {
        this.props.firebase.db
            .ref("public/items")
            .on("value", (snapshot) => {
                const item = snapshot.val();
                console.log(item)
                this.setState({ items: item });
            });

    };
    itemReady(itemKey, cartKey, priceKey, uid) {
        var updates = {}
        updates["/users/" + uid + "/prevorders/" + cartKey + "/items/" + itemKey + "/" + priceKey + "/ready"] = true;
        updates["/vendors/" + this.props.vendor + "/ItemsToPrepare/" + cartKey + "/items/" + itemKey + "/" + priceKey + "/ready"] = true
        this.props.firebase.db.ref().update(updates)
        /*this.props.firebase.db.ref("/users/" + uid + "/prevorders/" + cartKey + "/items/" + itemKey + "/" + priceKey).set({
            ready: true,
            qty: this.state.data.ItemsToPrepare[cartKey].items[itemKey][priceKey]["qty"]
        })*/

    }
    orderPickedUp(cartKey) {
        let updates = {};
        console.log(cartKey)
        updates["/vendors/" + this.props.vendor + "/ItemsToPrepare/" + cartKey] = null;
        //updates["/users/" + this.state.data.ItemsToPrepare[cartKey].userId + "/prevorders/" + cartKey + "/items/" + item]
        {
            Object.keys(this.state.data["ItemsToPrepare"][cartKey].items).map((itemKey) => {

                {
                    Object.keys(this.state.data["ItemsToPrepare"][cartKey].items[itemKey]).map((priceKey) => {
                        updates["/users/" + this.state.data.ItemsToPrepare[cartKey].userId + "/prevorders/" + cartKey + "/items/" + itemKey + "/" + priceKey + "/taken"] = true
                    })
                }

            })
        }
        this.props.firebase.db.ref().update(updates);
    }
    showItems = () => {
        if (this.state.display) {
            if(this.state.data.ItemsToPrepare)
            return (<div >
                <div className="row shadow bg-light rounded">
                    {Object.keys(this.state.data["ItemsToPrepare"]).map((cartKey) => (<div className="col-6 p-0 border"><div className="col-12 h5">{this.state.data["ItemsToPrepare"][cartKey].username}</div>

                        <div className="btn btn-secondary">OTP: {this.state.data["ItemsToPrepare"][cartKey].otp}</div>
                        <div className="btn btn-danger" id={cartKey + "1"} onClick={() => { this.orderPickedUp(cartKey) }}>Order Picked Up</div>
                        {Object.keys(this.state.data["ItemsToPrepare"][cartKey].items).map((itemKey) => (<div className=" col-12 bg-light">{
                            Object.keys(this.state.data.ItemsToPrepare[cartKey].items[itemKey]).map((priceKey) => (<div className="d-flex col-12">
                                <div className="flex-grow-1">{this.state.items[itemKey].name} ( {this.state.items[itemKey].price[priceKey].size} x {this.state.data.ItemsToPrepare[cartKey].items[itemKey][priceKey]["qty"]} )</div>

                                <div className="d-flex">
                                    {this.state.data.ItemsToPrepare[cartKey].items[itemKey][priceKey].ready == true ?
                                        (this.state.data.ItemsToPrepare[cartKey].items[itemKey][priceKey].taken == true ?
                                            <button className="btn btn-sm btn-success">Item Picked by User</button> :
                                            <button className="btn btn-sm btn-success">Item Ready</button>)
                                        : <button type="button" className="btn btn-sm btn-primary" onClick={() => { this.itemReady(itemKey, cartKey, priceKey, this.state.data["ItemsToPrepare"][cartKey]["userId"]) }}>
                                            Set Item Ready
                                        </button>}
                                </div>
                            </div>))}
                        </div>
                        )
                        )}</div>)

                    )}
                </div>
            </div >)
            else return <div>Nothing to show</div>
        }//chll reha
    }

    render() {
        return (
            <div class="container ">
                {/* <div>
                    {this.showModal()}
                </div>*/}
                {/*<h2 class="section-header">CART</h2>*/}
                <h2 class="section-header">ORDERS</h2>
                <div className="card-body ">
                    <div className="d-flex">
                        {/* <div className="col-4"><h4>ITEM ( SIZE )</h4></div>
                        <div className="col-3"><h4>QUANTITY</h4></div>
            <div className="col-4"><h4>ORDER STATUS</h4></div>*/}

                    </div>
                    <div class="cart-items">
                        {this.showItems()}

                    </div>

                </div>
            </div >
        );
    }
}

export default withFirebase(Vendorcartpage);