import React from 'react';
import Button from 'react-bootstrap/Button'
import { connect } from 'react-redux'
import { base_url } from '../../Endpoint/endpoint'
import { notifyError_with_msg } from  '../Utils/Message'

class TicketPageInfo extends React.Component{
    constructor(props){
        super(props)
            this.state = {
                close : false
            }
            this.toPost = this.toPost.bind(this);
        }


    async toPost(event){
        let data = {"status" : event.target.id}
        let TicketId = this.props.ticket._id
        const values = {
            method : "PATCH",
            headers : {
                'Content-Type' : 'application/json',
                'x-auth' : this.props.token,
            },
            body : JSON.stringify(data)
        }
        console.log(values);
        try{
        const response = await fetch(`${base_url}/${this.props.user}/tickets/${TicketId}`, values);
        console.log(response)
        if (!response.ok) {
            notifyError_with_msg(response.error._message);
        }
        if(response.ok){
        const json = await response.json();
        console.log(json)
        this.setState({ close : true })
        }}
        catch(error){
            console.log(error)
            notifyError_with_msg('Unsuccessful');
        }
    }

    render(){
        let { status, title, subTitle, description, postedBy } = this.props.ticket
        let toDisable = this.state.close
        return(
            <div>
                    <div className="container is-fluid">
                        <div className="notification">
                        <span>
                        <span>{postedBy.firstName}</span>
                            <br/>
                        <span>{postedBy.lastName}</span>
                        <br/>
                        <span>{status}</span><br/>
                    </span>
                        </div>
                    </div>

                 <div className="container is-fluid">
                    <div className="notification">
                        <p>
                        <strong>Title</strong><br/>
                       <span>{title}</span>
                        </p>
                        <p>
                        <strong>Subtitle</strong><br/>
                       <span>{subTitle}</span>
                        </p>
                        <p>
                       <strong>Description</strong><br/>
                       <span>{description}</span>
                        </p>
                        <br/>

                        {((this.props.user === 'college') ) ? (
                            <div>
                        <Button variant="outline-primary" id='closed'  onClick={this.toPost} type='button'>Close Ticket</Button>
                        <Button variant="outline-primary" id='onProgress' disabled={toDisable} onClick={this.toPost} type='button'>Set Ticket To On-Progress</Button>
                        </div>) : (null)
                        
                        }
                    </div>
                 </div>
            </div>
        )
    }
}

const mapStatesToProps = state => {
    return{
        token : state.Auth_token,
        user: state.Auth_user
    }
}


export default connect(mapStatesToProps,null) (TicketPageInfo);