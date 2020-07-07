import React, { Component } from 'react'
import axios from 'axios'
import {isPageEndReached} from '../utils'

const INITIAL_STATE = {
    pageSize: 20,
    start: 1547010,
    cuisines: "",
    sort: "rating",
    order: "desc",
    restaurants: []
}

const SORT_PARAMS = ["cost","rating","real_distance"]

class Home extends Component{
    constructor(props){
        super(props)
        this.state = INITIAL_STATE
    }

    componentDidMount(){
        const {pageSize,start,cuisines,sort,order} = this.state
        this.fetchRestaurants(pageSize,start,cuisines,sort,order)
        window.addEventListener('scroll',this.onScroll,false)
    }

    onScroll = () => {
        if (isPageEndReached()){
            console.log("page end")
            const {pageSize,start,cuisines,sort,order} = this.state
            this.fetchRestaurants(pageSize,start,cuisines,sort,order)
        }
    }

    fetchRestaurants = (pageSize,start,cuisines,sort,order) => {
        axios.request({
            url:"https://developers.zomato.com/api/v2.1/search",
            method: "get",
            headers:{
                'Accept':'application/json',
                'user-key': ''
            },
            params:{
                start,
                count:pageSize,
                sort,
                order,
                cuisines
            }
        })
        .then(response => {
            const newState = {...this.state}
            const restaurants_old = newState.restaurants
            this.setState({...newState,restaurants:[...restaurants_old,...response.data.restaurants],start:newState.restaurants.length+response.data.restaurants.length})
        })
        .catch(err=>{
            console.log(err)
        })
    }

    changeSort = (e) => {
        this.setState({...INITIAL_STATE,sort:e.target.value},()=>{
            const {pageSize,start,cuisines,sort,order} = this.state
            this.fetchRestaurants(pageSize,start,cuisines,sort,order)
        })
    }

    render(){
        return(
            <div style={{margin:"200px"}}>
                Home
                <select onChange={this.changeSort}>
                    {SORT_PARAMS.map(item=> <option value={item} selected={this.state.sort===item}>{item}</option>)}
                </select>
                {this.state.restaurants.map(item => {
                    return (
                        <div key={item.restaurant.id}>
                            <span>{item.restaurant.name}</span>&nbsp;&nbsp;&nbsp;&nbsp;
                            <span>{item.restaurant.user_rating.aggregate_rating}</span>&nbsp;&nbsp;&nbsp;&nbsp;
                            <span>{item.restaurant.user_rating.rating_text}</span>&nbsp;&nbsp;&nbsp;&nbsp;
                            <br/><br/><br/>
                        </div>)
                })}
            </div>
        );
    }
}

export default Home

/*

infinite

events: scroll
    detect end of page

logic
    calculate offset
    when to stop

*/