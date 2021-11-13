import React, { Component } from 'react'

class BtnNav extends Component {
    
    changeHandler = () => {   
        this.props.onBtnClick(true)

    }
    
    render() {
        return (
            <div className="container-fluid btnNav">
                <div className="row">
                    <div className="col">
                        {this.props.showBtn ? <button onClick={this.changeHandler} className="btn btn-outline-dark">{this.props.btnName}</button> : null }
                    </div>
                    <div className="col">
                    <form className="form-inline d-flex" to={this.props.searchUrl}>
                        <input className="form-control mr-sm-2 border-dark" type="search" placeholder="Search" aria-label="Search" />
                        <button className="btn btn-outline-dark my-2 my-sm-0 m-1" type="submit">Search</button>
                    </form>
                    </div>
                </div>
            </div>
        )
    }
}

export default BtnNav
