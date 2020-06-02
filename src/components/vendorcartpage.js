import React, { Component } from "react";
import { withFirebase } from "./Firebase";

class Vendorcartpage extends Component {
    state = {
        display: null,
        data: null,
        items: null,
        vendor: null
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

    showItems = () => {
        if (this.state.display)
            return (<div>
                <div className="row shadow bg-light rounded">
                    {Object.keys(this.state.data["ItemsToPrepare"]).map((cartKey) => (<div className="col-6 p-0 border"><div className="col-12 h5">{this.state.data["ItemsToPrepare"][cartKey].username}</div>
                        {Object.keys(this.state.data["ItemsToPrepare"][cartKey].items).map((itemKey) => (<div className=" col-12 bg-light">{
                            Object.keys(this.state.data.ItemsToPrepare[cartKey].items[itemKey]).map((priceKey) => (<div className="d-flex col-12">
                                <div className="flex-grow-1">{this.state.items[itemKey].name} ( {this.state.items[itemKey].price[priceKey].size} x {this.state.data.ItemsToPrepare[cartKey].items[itemKey][priceKey]} )</div>

                                <div className="d-flex">
                                    <button type="button" className="btn btn-sm btn-primary" >
                                        Item Ready
                                    </button>
                                </div>
                            </div>))}
                        </div>
                        )
                        )}</div>)
                    )}
                </div>
            </div >)
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